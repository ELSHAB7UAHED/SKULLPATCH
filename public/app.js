// Global variables
let currentTool = null;
let uploadedFiles = [];
let socket = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupScrollAnimations();
    setupMobileNavigation();
});

// Initialize the application
function initializeApp() {
    // Initialize Socket.IO connection
    try {
        socket = io();
        setupSocketListeners();
    } catch (error) {
        console.log('Socket.IO not available');
    }
    
    // Add scroll animations to elements
    addScrollAnimations();
    
    // Initialize tool items
    initializeToolItems();
}

// Setup event listeners
function setupEventListeners() {
    // File input change
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Drag and drop events
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        uploadArea.addEventListener('click', () => fileInput.click());
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Setup Socket.IO listeners
function setupSocketListeners() {
    if (!socket) return;
    
    socket.on('connect', () => {
        console.log('Connected to server');
    });
    
    socket.on('progress_update', (data) => {
        updateProgress(data);
    });
    
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
}

// Initialize tool items
function initializeToolItems() {
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('click', function() {
            const toolType = this.getAttribute('data-tool');
            openTool(toolType);
        });
    });
}

// Open specific tool
function openTool(toolType) {
    currentTool = toolType;
    
    // Hide tools section
    document.getElementById('tools').classList.add('hidden');
    
    // Show tool interface
    const toolInterface = document.getElementById('tool-interface');
    toolInterface.classList.remove('hidden');
    
    // Update tool title
    const toolTitle = document.getElementById('current-tool-title');
    toolTitle.textContent = getToolTitle(toolType);
    
    // Load tool options
    loadToolOptions(toolType);
    
    // Scroll to tool interface
    toolInterface.scrollIntoView({ behavior: 'smooth' });
}

// Get tool title
function getToolTitle(toolType) {
    const titles = {
        'compress': 'ضغط الصور',
        'resize': 'تغيير حجم الصور',
        'convert': 'تحويل صيغ الصور',
        'watermark': 'إضافة علامة مائية',
        'merge-pdf': 'دمج ملفات PDF',
        'split-pdf': 'تقسيم ملف PDF',
        'pdf-to-image': 'تحويل PDF إلى صور',
        'compress-video': 'ضغط الفيديو',
        'convert-video': 'تحويل صيغ الفيديو',
        'batch': 'معالجة مجمعة',
        'ocr': 'استخراج النصوص'
    };
    
    return titles[toolType] || 'أداة معالجة الملفات';
}

// Load tool options
function loadToolOptions(toolType) {
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    
    const options = getToolOptions(toolType);
    options.forEach(option => {
        const optionElement = createOptionElement(option);
        optionsGrid.appendChild(optionElement);
    });
    
    // Show options
    document.getElementById('tool-options').classList.remove('hidden');
}

// Get tool options
function getToolOptions(toolType) {
    const options = {
        'compress': [
            { type: 'range', name: 'quality', label: 'جودة الصورة', min: 10, max: 100, value: 80, step: 5 },
            { type: 'select', name: 'format', label: 'صيغة الإخراج', options: ['jpeg', 'png', 'webp'] }
        ],
        'resize': [
            { type: 'number', name: 'width', label: 'العرض', placeholder: '800', min: 100, max: 4000 },
            { type: 'number', name: 'height', label: 'الارتفاع', placeholder: '600', min: 100, max: 4000 },
            { type: 'checkbox', name: 'maintainAspectRatio', label: 'الحفاظ على النسبة' }
        ],
        'convert': [
            { type: 'select', name: 'format', label: 'صيغة الإخراج', options: ['jpeg', 'png', 'webp', 'gif', 'bmp'] }
        ],
        'watermark': [
            { type: 'file', name: 'watermark', label: 'ملف العلامة المائية', accept: 'image/*' },
            { type: 'select', name: 'position', label: 'موضع العلامة', options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'] },
            { type: 'range', name: 'opacity', label: 'الشفافية', min: 0, max: 100, value: 50, step: 5 }
        ],
        'merge-pdf': [
            { type: 'info', text: 'قم برفع ملفات PDF متعددة للدمج' }
        ],
        'compress-video': [
            { type: 'select', name: 'quality', label: 'جودة الفيديو', options: ['low', 'medium', 'high'] }
        ]
    };
    
    return options[toolType] || [];
}

// Create option element
function createOptionElement(option) {
    const div = document.createElement('div');
    div.className = 'option-group';
    
    const label = document.createElement('label');
    label.textContent = option.label;
    div.appendChild(label);
    
    let input;
    
    switch (option.type) {
        case 'range':
            input = document.createElement('input');
            input.type = 'range';
            input.name = option.name;
            input.min = option.min;
            input.max = option.max;
            input.value = option.value;
            input.step = option.step;
            
            const valueDisplay = document.createElement('span');
            valueDisplay.textContent = option.value;
            valueDisplay.style.marginRight = '10px';
            div.appendChild(valueDisplay);
            
            input.addEventListener('input', function() {
                valueDisplay.textContent = this.value;
            });
            break;
            
        case 'select':
            input = document.createElement('select');
            input.name = option.name;
            option.options.forEach(opt => {
                const optionElement = document.createElement('option');
                optionElement.value = opt;
                optionElement.textContent = opt.toUpperCase();
                input.appendChild(optionElement);
            });
            break;
            
        case 'number':
            input = document.createElement('input');
            input.type = 'number';
            input.name = option.name;
            input.placeholder = option.placeholder;
            input.min = option.min;
            input.max = option.max;
            break;
            
        case 'checkbox':
            input = document.createElement('input');
            input.type = 'checkbox';
            input.name = option.name;
            input.checked = true;
            break;
            
        case 'file':
            input = document.createElement('input');
            input.type = 'file';
            input.name = option.name;
            input.accept = option.accept;
            break;
            
        case 'info':
            const info = document.createElement('p');
            info.textContent = option.text;
            info.style.color = 'var(--text-secondary)';
            info.style.fontStyle = 'italic';
            div.appendChild(info);
            return div;
    }
    
    div.appendChild(input);
    return div;
}

// Handle file selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    uploadedFiles = files;
    
    if (files.length > 0) {
        displaySelectedFiles(files);
        document.getElementById('tool-options').classList.remove('hidden');
    }
}

// Handle drag and drop
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    uploadedFiles = files;
    
    if (files.length > 0) {
        displaySelectedFiles(files);
        document.getElementById('tool-options').classList.remove('hidden');
    }
}

// Display selected files
function displaySelectedFiles(files) {
    const uploadArea = document.getElementById('upload-area');
    uploadArea.innerHTML = '';
    
    files.forEach((file, index) => {
        const fileElement = createFileElement(file, index);
        uploadArea.appendChild(fileElement);
    });
}

// Create file element
function createFileElement(file, index) {
    const div = document.createElement('div');
    div.className = 'file-item';
    div.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--bg-primary);
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        border: 1px solid var(--border-light);
    `;
    
    const icon = document.createElement('i');
    icon.className = getFileIcon(file.type);
    icon.style.cssText = `
        font-size: 2rem;
        color: var(--primary-color);
    `;
    
    const info = document.createElement('div');
    info.innerHTML = `
        <h4 style="margin: 0 0 0.25rem 0;">${file.name}</h4>
        <p style="margin: 0; color: var(--text-secondary);">${formatFileSize(file.size)}</p>
    `;
    
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.style.cssText = `
        background: var(--error-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        margin-right: auto;
    `;
    removeBtn.addEventListener('click', () => removeFile(index));
    
    div.appendChild(icon);
    div.appendChild(info);
    div.appendChild(removeBtn);
    
    return div;
}

// Get file icon
function getFileIcon(mimeType) {
    if (mimeType.startsWith('image/')) return 'fas fa-image';
    if (mimeType.startsWith('video/')) return 'fas fa-video';
    if (mimeType === 'application/pdf') return 'fas fa-file-pdf';
    if (mimeType.includes('word')) return 'fas fa-file-word';
    if (mimeType.includes('text')) return 'fas fa-file-alt';
    return 'fas fa-file';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Remove file
function removeFile(index) {
    uploadedFiles.splice(index, 1);
    if (uploadedFiles.length === 0) {
        resetUploadArea();
    } else {
        displaySelectedFiles(uploadedFiles);
    }
}

// Reset upload area
function resetUploadArea() {
    const uploadArea = document.getElementById('upload-area');
    uploadArea.innerHTML = `
        <div class="upload-content">
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>اسحب وأفلت الملفات هنا</h3>
            <p>أو اضغط لاختيار الملفات</p>
            <input type="file" id="file-input" multiple accept="image/*,video/*,.pdf,.doc,.docx" hidden>
            <button class="btn btn-primary" onclick="document.getElementById('file-input').click()">
                اختيار الملفات
            </button>
        </div>
    `;
    
    document.getElementById('tool-options').classList.add('hidden');
    document.getElementById('results').classList.add('hidden');
}

// Process files
async function processFiles() {
    if (uploadedFiles.length === 0) {
        showNotification('يرجى رفع ملف واحد على الأقل', 'error');
        return;
    }
    
    showLoadingModal();
    
    try {
        const formData = new FormData();
        const options = getFormOptions();
        
        // Add files
        uploadedFiles.forEach(file => {
            formData.append('files', file);
        });
        
        // Add options
        Object.keys(options).forEach(key => {
            formData.append(key, options[key]);
        });
        
        const response = await fetch(`/api/${currentTool}`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayResults(result);
        } else {
            showNotification(result.error || 'حدث خطأ أثناء المعالجة', 'error');
        }
    } catch (error) {
        console.error('Error processing files:', error);
        showNotification('حدث خطأ في الاتصال بالخادم', 'error');
    } finally {
        hideLoadingModal();
    }
}

// Get form options
function getFormOptions() {
    const options = {};
    const form = document.getElementById('tool-options');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            options[input.name] = input.checked;
        } else if (input.value) {
            options[input.name] = input.value;
        }
    });
    
    return options;
}

// Display results
function displayResults(result) {
    const resultsSection = document.getElementById('results');
    const resultsList = document.getElementById('results-list');
    
    resultsList.innerHTML = '';
    
    if (result.downloadUrl) {
        const resultItem = createResultItem(result);
        resultsList.appendChild(resultItem);
    } else if (result.results) {
        result.results.forEach(fileResult => {
            const resultItem = createResultItem(fileResult);
            resultsList.appendChild(resultItem);
        });
    }
    
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Create result item
function createResultItem(result) {
    const div = document.createElement('div');
    div.className = 'result-item';
    
    const info = document.createElement('div');
    info.className = 'result-info';
    
    const icon = document.createElement('div');
    icon.className = 'result-icon';
    icon.innerHTML = '<i class="fas fa-check"></i>';
    
    const text = document.createElement('div');
    text.innerHTML = `
        <h4 style="margin: 0;">${result.filename || 'ملف معالج'}</h4>
        <p style="margin: 0; color: var(--text-secondary);">
            ${result.message || 'تمت المعالجة بنجاح'}
        </p>
    `;
    
    info.appendChild(icon);
    info.appendChild(text);
    
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> تحميل';
    downloadBtn.addEventListener('click', () => downloadFile(result.downloadUrl));
    
    div.appendChild(info);
    div.appendChild(downloadBtn);
    
    return div;
}

// Download file
function downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show loading modal
function showLoadingModal() {
    document.getElementById('loading-modal').classList.remove('hidden');
}

// Hide loading modal
function hideLoadingModal() {
    document.getElementById('loading-modal').classList.add('hidden');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        color: white;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Show tools section
function showToolsSection() {
    document.getElementById('tool-interface').classList.add('hidden');
    document.getElementById('tools').classList.remove('hidden');
    
    // Reset everything
    uploadedFiles = [];
    currentTool = null;
    resetUploadArea();
    
    // Scroll to tools
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
}

// Add scroll animations to elements
function addScrollAnimations() {
    const elements = document.querySelectorAll('.tool-category, .feature-card, .tech-item');
    elements.forEach((el, index) => {
        el.classList.add('scroll-animate');
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Setup mobile navigation
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
}

// Handle contact form
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your server
    console.log('Contact form data:', data);
    
    showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
    event.target.reset();
}

// Update progress (for real-time updates)
function updateProgress(data) {
    console.log('Progress update:', data);
    // Implement progress bar updates here
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling to all internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}, 10));

// Add navbar background on scroll
window.addEventListener('scroll', debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10));

// Initialize tooltips and other UI enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
                submitBtn.disabled = true;
            }
        });
    });
});

// Export functions for global use
window.openTool = openTool;
window.showToolsSection = showToolsSection;
window.scrollToSection = scrollToSection;
window.processFiles = processFiles;