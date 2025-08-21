// Professional Portfolio JavaScript
// Ahmed Nour Ahmed Abdel Hakeem

class PortfolioApp {
    constructor() {
        this.currentLanguage = 'ar';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isFullscreen = false;
        this.typingTexts = {
            ar: [
                'متخصص أمن سيبراني 🔒',
                'مطور أدوات اختبار الاختراق 🛠️',
                'مطور مواقع احترافي 💻',
                'خبير في القرصنة الأخلاقية 🎯',
                'مبرمج بـ 6+ لغات برمجة 🚀',
                'مصمم مواقع إبداعي 🎨'
            ],
            en: [
                'Cybersecurity Specialist 🔒',
                'Penetration Testing Developer 🛠️',
                'Professional Web Developer 💻',
                'Ethical Hacking Expert 🎯',
                'Programmer in 6+ Languages 🚀',
                'Creative Web Designer 🎨'
            ]
        };
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseTime = 2000;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.initializeLanguage();
        this.startTypingAnimation();
        this.initializeScrollEffects();
        this.initializeSkillBars();
        this.initializeCursorTrail();
        this.initializeParticles();
        this.initializeContactForm();
        this.hideLoadingScreen();
        this.initializeAOS();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Language toggle
        const langToggle = document.getElementById('lang-toggle');
        langToggle?.addEventListener('click', () => this.toggleLanguage());

        // Fullscreen toggle
        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        fullscreenToggle?.addEventListener('click', () => this.toggleFullscreen());

        // Navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        hamburger?.addEventListener('click', () => this.toggleMobileMenu());

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    this.closeMobileMenu();
                }
            });
        });

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        backToTop?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveNavLink();
        });

        // Resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Fullscreen change events
        document.addEventListener('fullscreenchange', () => {
            this.handleFullscreenChange();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Contact form validation
        const contactForm = document.getElementById('contact-form');
        contactForm?.addEventListener('submit', (e) => {
            this.handleContactForm(e);
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
        this.animateThemeTransition();
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    animateThemeTransition() {
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    initializeLanguage() {
        this.updateLanguageDisplay();
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        document.documentElement.setAttribute('lang', this.currentLanguage);
        document.body.setAttribute('dir', this.currentLanguage === 'ar' ? 'rtl' : 'ltr');
        this.updateLanguageDisplay();
        this.updateTextContent();
        this.restartTypingAnimation();
    }

    updateLanguageDisplay() {
        const langToggle = document.querySelector('#lang-toggle span');
        if (langToggle) {
            langToggle.textContent = this.currentLanguage === 'ar' ? 'EN' : 'AR';
        }
    }

    updateTextContent() {
        document.querySelectorAll('[data-ar][data-en]').forEach(element => {
            const text = this.currentLanguage === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
            element.textContent = text;
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                this.isFullscreen = true;
                this.updateFullscreenIcon();
            }).catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen().then(() => {
                this.isFullscreen = false;
                this.updateFullscreenIcon();
            }).catch(err => {
                console.error('Error attempting to exit fullscreen:', err);
            });
        }
    }

    updateFullscreenIcon() {
        const fullscreenIcon = document.querySelector('#fullscreen-toggle i');
        if (fullscreenIcon) {
            fullscreenIcon.className = this.isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
        }
    }

    handleFullscreenChange() {
        this.isFullscreen = !!document.fullscreenElement;
        this.updateFullscreenIcon();
    }

    toggleMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');
    }

    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }

    startTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        this.typeText(typingElement);
    }

    restartTypingAnimation() {
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.startTypingAnimation();
    }

    typeText(element) {
        const texts = this.typingTexts[this.currentLanguage];
        const currentText = texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.typeText(element), typeSpeed);
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        const scrollY = window.scrollY;

        // Navbar scroll effect
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 300) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }

        // Parallax effects
        this.updateParallaxEffects(scrollY);
    }

    updateParallaxEffects(scrollY) {
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const speed = scrollY * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.setProperty('--level', `${level}%`);
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('skill-item')) {
                        entry.target.classList.add('animate');
                    }
                    
                    if (entry.target.classList.contains('project-card')) {
                        entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                        entry.target.classList.add('fade-in-up');
                    }
                }
            });
        }, observerOptions);

        // Observe skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }

    initializeScrollEffects() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        scrollIndicator?.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    initializeCursorTrail() {
        const cursorTrail = document.querySelector('.cursor-trail');
        if (!cursorTrail) return;

        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateTrail = () => {
            const dx = mouseX - trailX;
            const dy = mouseY - trailY;
            
            trailX += dx * 0.1;
            trailY += dy * 0.1;
            
            cursorTrail.style.left = trailX - 10 + 'px';
            cursorTrail.style.top = trailY - 10 + 'px';
            
            requestAnimationFrame(animateTrail);
        };

        animateTrail();

        // Hide cursor trail on touch devices
        if ('ontouchstart' in window) {
            cursorTrail.style.display = 'none';
        }
    }

    initializeParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        if (!particlesContainer) return;

        // Create additional floating particles
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: 0.6;
                animation: float ${10 + Math.random() * 10}s infinite linear;
                animation-delay: ${Math.random() * 10}s;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                box-shadow: 0 0 6px var(--primary-color);
            `;
            particlesContainer.appendChild(particle);
        }
    }

    initializeContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Add input animation effects
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name;
        
        // Remove existing error states
        field.classList.remove('error', 'success');
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        let isValid = true;
        let errorMessage = '';

        // Validation logic
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = this.currentLanguage === 'ar' ? 'الاسم يجب أن يكون أكثر من حرفين' : 'Name must be at least 2 characters';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = this.currentLanguage === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = this.currentLanguage === 'ar' ? 'الموضوع يجب أن يكون أكثر من 5 أحرف' : 'Subject must be at least 5 characters';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = this.currentLanguage === 'ar' ? 'الرسالة يجب أن تكون أكثر من 10 أحرف' : 'Message must be at least 10 characters';
                }
                break;
        }

        if (value && !isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentElement.appendChild(errorDiv);
        } else if (value && isValid) {
            field.classList.add('success');
        }

        return isValid;
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        
        // Validate all fields
        let isFormValid = true;
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification(
                this.currentLanguage === 'ar' ? 'يرجى تصحيح الأخطاء في النموذج' : 'Please correct the errors in the form',
                'error'
            );
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            this.showNotification(
                this.currentLanguage === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!',
                'success'
            );
            
            form.reset();
            
            // Remove focused states
            fields.forEach(field => {
                field.classList.remove('error', 'success');
                field.parentElement.classList.remove('focused');
            });
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--info-color)'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        
        if (this.currentLanguage === 'ar') {
            notification.style.right = 'auto';
            notification.style.left = '20px';
            notification.style.transform = 'translateX(-100%)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = this.currentLanguage === 'ar' ? 'translateX(-100%)' : 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + D for dark mode toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            this.toggleTheme();
        }

        // Ctrl/Cmd + L for language toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            this.toggleLanguage();
        }

        // F11 for fullscreen
        if (e.key === 'F11') {
            e.preventDefault();
            this.toggleFullscreen();
        }

        // Escape to close mobile menu
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
    }

    handleResize() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }

        // Update cursor trail position
        const cursorTrail = document.querySelector('.cursor-trail');
        if (cursorTrail && window.innerWidth <= 768) {
            cursorTrail.style.display = 'none';
        } else if (cursorTrail) {
            cursorTrail.style.display = 'block';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }

    initializeAOS() {
        // Initialize AOS (Animate On Scroll) library
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                offset: 100
            });
        }
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Performance optimization
    optimizePerformance() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Optimize scroll events
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16)); // 60fps
    }

    // Analytics and tracking (placeholder)
    trackEvent(eventName, eventData = {}) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', eventName, eventData);
        
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, eventData);
        // }
    }

    // Error handling
    handleError(error, context = 'General') {
        console.error(`Error in ${context}:`, error);
        
        // You could send errors to a logging service here
        // this.trackEvent('error', {
        //     error_message: error.message,
        //     error_context: context,
        //     user_agent: navigator.userAgent,
        //     url: window.location.href
        // });
    }

    // Accessibility improvements
    enhanceAccessibility() {
        // Add skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = this.currentLanguage === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content';
        skipLink.className = 'skip-link sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Improve keyboard navigation
        this.improveKeyboardNavigation();

        // Add ARIA labels where needed
        this.addAriaLabels();
    }

    improveKeyboardNavigation() {
        // Add focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                        element.click();
                    }
                }
            });
        });
    }

    addAriaLabels() {
        // Add ARIA labels to interactive elements
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 
                this.currentLanguage === 'ar' ? 'تبديل الوضع المظلم/الفاتح' : 'Toggle dark/light mode'
            );
        }

        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.setAttribute('aria-label', 
                this.currentLanguage === 'ar' ? 'تبديل اللغة' : 'Toggle language'
            );
        }

        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        if (fullscreenToggle) {
            fullscreenToggle.setAttribute('aria-label', 
                this.currentLanguage === 'ar' ? 'تبديل الشاشة الكاملة' : 'Toggle fullscreen'
            );
        }
    }

    // PWA functionality
    initializePWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }

        // Handle install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button
            const installButton = document.createElement('button');
            installButton.textContent = this.currentLanguage === 'ar' ? 'تثبيت التطبيق' : 'Install App';
            installButton.className = 'install-btn btn btn-primary';
            installButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 1000;
                border-radius: 25px;
                padding: 10px 20px;
                font-size: 14px;
            `;
            
            installButton.addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                    installButton.remove();
                });
            });
            
            document.body.appendChild(installButton);
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (installButton.parentNode) {
                    installButton.remove();
                }
            }, 10000);
        });
    }

    // Performance monitoring
    monitorPerformance() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            this.trackEvent('page_performance', {
                load_time: pageLoadTime,
                dom_ready: perfData.domContentLoadedEventEnd - perfData.navigationStart,
                first_paint: perfData.responseStart - perfData.navigationStart
            });
        });

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                    console.warn('High memory usage detected');
                    this.trackEvent('performance_warning', {
                        type: 'high_memory_usage',
                        used: memory.usedJSHeapSize,
                        limit: memory.jsHeapSizeLimit
                    });
                }
            }, 30000); // Check every 30 seconds
        }
    }

    // Initialize all features
    initializeAllFeatures() {
        try {
            this.optimizePerformance();
            this.enhanceAccessibility();
            this.initializePWA();
            this.monitorPerformance();
            
            // Track successful initialization
            this.trackEvent('app_initialized', {
                theme: this.currentTheme,
                language: this.currentLanguage,
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                viewport_size: `${window.innerWidth}x${window.innerHeight}`
            });
            
        } catch (error) {
            this.handleError(error, 'Feature Initialization');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Initialize additional features after main app
    setTimeout(() => {
        app.initializeAllFeatures();
    }, 1000);
    
    // Make app globally accessible for debugging
    window.portfolioApp = app;
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('App is online');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    console.log('App is offline');
    document.body.classList.add('offline');
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (window.portfolioApp) {
        window.portfolioApp.handleError(e.error, 'Global Error Handler');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    if (window.portfolioApp) {
        window.portfolioApp.handleError(e.reason, 'Unhandled Promise Rejection');
    }
});

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}