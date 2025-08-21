# أحمد نور أحمد عبد الحكيم - الموقع الشخصي
# Ahmed Nour Ahmed Abdel Hakeem - Personal Portfolio

موقع شخصي احترافي متعدد اللغات يعرض مهارات ومشاريع أحمد نور في مجال الأمن السيبراني وتطوير المواقع.

A professional multilingual portfolio website showcasing Ahmed Nour's skills and projects in cybersecurity and web development.

## 🌟 الميزات الرئيسية | Key Features

### 🎨 التصميم | Design
- تصميم عصري ومتجاوب | Modern and responsive design
- وضع مظلم وفاتح | Dark and light mode
- دعم كامل للغتين العربية والإنجليزية | Full Arabic and English support
- تأثيرات بصرية متقدمة | Advanced visual effects
- رسوم متحركة سلسة | Smooth animations

### 💻 الوظائف التقنية | Technical Features
- تبديل الشاشة الكاملة | Fullscreen toggle
- تبديل اللغة الفوري | Instant language switching
- تبديل الوضع المظلم/الفاتح | Dark/light theme toggle
- تأثيرات التمرير | Scroll effects
- نموذج اتصال تفاعلي | Interactive contact form
- تحسين محركات البحث | SEO optimized

### 🔧 التقنيات المستخدمة | Technologies Used
- HTML5 الدلالي | Semantic HTML5
- CSS3 مع المتغيرات المخصصة | CSS3 with custom properties
- JavaScript الحديث (ES6+) | Modern JavaScript (ES6+)
- مكتبة AOS للرسوم المتحركة | AOS animation library
- Font Awesome للأيقونات | Font Awesome icons
- Google Fonts للخطوط | Google Fonts

## 🚀 كيفية التشغيل | How to Run

### الطريقة الأولى: خادم محلي | Method 1: Local Server
```bash
# فتح الملف مباشرة في المتصفح
# Open file directly in browser
open index.html
```

### الطريقة الثانية: خادم Python | Method 2: Python Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# ثم افتح المتصفح على
# Then open browser at
http://localhost:8000
```

### الطريقة الثالثة: خادم Node.js | Method 3: Node.js Server
```bash
# تثبيت serve عالمياً
# Install serve globally
npm install -g serve

# تشغيل الخادم
# Run server
serve -s . -l 3000

# أو استخدام npx
# Or use npx
npx serve -s . -l 3000
```

## 📁 هيكل المشروع | Project Structure

```
/
├── index.html          # الملف الرئيسي | Main HTML file
├── styles.css          # ملف الأنماط | Styles file
├── script.js           # ملف JavaScript | JavaScript file
├── README.md           # ملف التوثيق | Documentation file
└── assets/             # مجلد الأصول (اختياري) | Assets folder (optional)
    ├── images/         # الصور | Images
    ├── icons/          # الأيقونات | Icons
    └── fonts/          # الخطوط | Fonts
```

## 🎯 الأقسام الرئيسية | Main Sections

### 🏠 الصفحة الرئيسية | Home
- مقدمة ترحيبية | Welcome introduction
- عرض المهارات الأساسية | Core skills display
- نص متحرك تفاعلي | Interactive animated text

### 👤 نبذة عني | About Me
- المعلومات الشخصية | Personal information
- قصة الرحلة المهنية | Professional journey story
- الإنجازات والخبرات | Achievements and experience

### 💪 المهارات | Skills
- لغات البرمجة | Programming languages
- الأمن السيبراني | Cybersecurity
- تطوير المواقع | Web development
- الأدوات والتقنيات | Tools and technologies

### 🚀 المشاريع | Projects
- أدوات الأمن السيبراني | Cybersecurity tools
- مواقع الويب | Web applications
- حالة المشاريع | Project status
- روابط مباشرة | Direct links

### 📅 الرحلة الزمنية | Timeline
- المحطات الرئيسية | Key milestones
- التطور المهني | Professional development
- الإنجازات بالتواريخ | Dated achievements

### 📞 اتصل بي | Contact
- معلومات الاتصال | Contact information
- نموذج رسائل تفاعلي | Interactive message form
- روابط التواصل الاجتماعي | Social media links

## ⚙️ التخصيص | Customization

### تغيير الألوان | Changing Colors
```css
:root {
    --primary-color: #00ff88;    /* اللون الأساسي | Primary color */
    --secondary-color: #0066cc;  /* اللون الثانوي | Secondary color */
    --accent-color: #ff6b6b;     /* لون التمييز | Accent color */
}
```

### إضافة مشاريع جديدة | Adding New Projects
```html
<div class="project-card" data-aos="fade-up">
    <div class="project-header">
        <div class="project-icon">
            <i class="fas fa-your-icon"></i>
        </div>
        <div class="project-status">
            <span class="status-badge live">متاح</span>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">اسم المشروع</h3>
        <p class="project-description">وصف المشروع</p>
        <!-- باقي المحتوى -->
    </div>
</div>
```

### تعديل النصوص المتحركة | Modifying Animated Texts
```javascript
this.typingTexts = {
    ar: [
        'النص الأول',
        'النص الثاني',
        // أضف المزيد
    ],
    en: [
        'First Text',
        'Second Text',
        // Add more
    ]
};
```

## 🎨 الوضع المظلم | Dark Mode

يدعم الموقع تبديل تلقائي بين الوضع الفاتح والمظلم مع حفظ الإعداد في التخزين المحلي.

The website supports automatic switching between light and dark modes with settings saved in local storage.

### استخدام الوضع المظلم | Using Dark Mode
- انقر على أيقونة القمر/الشمس | Click moon/sun icon
- استخدم الاختصار Ctrl+D | Use Ctrl+D shortcut
- يحفظ الإعداد تلقائياً | Settings saved automatically

## 🌐 دعم اللغات | Language Support

### التبديل بين اللغات | Language Switching
- زر التبديل في الأعلى | Toggle button at top
- اختصار Ctrl+L | Ctrl+L shortcut
- تحديث فوري للمحتوى | Instant content update

### إضافة لغة جديدة | Adding New Language
1. أضف النصوص في HTML | Add texts in HTML:
```html
<span data-ar="النص العربي" data-en="English Text" data-fr="Texte Français">النص العربي</span>
```

2. حدث JavaScript | Update JavaScript:
```javascript
this.typingTexts = {
    ar: ['...'],
    en: ['...'],
    fr: ['...']  // اللغة الجديدة | New language
};
```

## 📱 التجاوب | Responsiveness

الموقع متجاوب بالكامل ويعمل على جميع الأجهزة:
- 🖥️ أجهزة سطح المكتب | Desktop computers
- 💻 أجهزة اللابتوب | Laptops
- 📱 الهواتف الذكية | Smartphones
- 📟 الأجهزة اللوحية | Tablets

## ⚡ الأداء | Performance

### تحسينات الأداء | Performance Optimizations
- تحميل كسول للصور | Lazy loading images
- تحسين الرسوم المتحركة | Optimized animations
- ضغط الملفات | File compression
- تخزين مؤقت للموارد | Resource caching

### نصائح الأداء | Performance Tips
- استخدم أدوات ضغط الصور | Use image compression tools
- قلل من استخدام الخطوط الخارجية | Minimize external fonts
- فعل الضغط على الخادم | Enable server compression

## 🔒 الأمان | Security

### ميزات الأمان | Security Features
- تنظيف مدخلات النماذج | Form input sanitization
- حماية من XSS | XSS protection
- التحقق من صحة البيانات | Data validation
- استخدام HTTPS | HTTPS usage

## 🐛 إصلاح الأخطاء | Troubleshooting

### مشاكل شائعة | Common Issues

#### الموقع لا يعمل | Website Not Working
```bash
# تأكد من وجود جميع الملفات
# Ensure all files exist
ls -la

# تحقق من وحدة التحكم للأخطاء
# Check console for errors
F12 -> Console
```

#### الخطوط لا تظهر | Fonts Not Loading
```css
/* تأكد من رابط Google Fonts في HTML */
/* Ensure Google Fonts link in HTML */
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

#### الرسوم المتحركة لا تعمل | Animations Not Working
```javascript
// تأكد من تحميل مكتبة AOS
// Ensure AOS library is loaded
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```

## 📈 التطوير المستقبلي | Future Development

### ميزات مخطط لها | Planned Features
- [ ] تطبيق PWA | PWA application
- [ ] نظام إدارة المحتوى | Content management system
- [ ] تكامل قاعدة البيانات | Database integration
- [ ] نظام التعليقات | Comments system
- [ ] مدونة شخصية | Personal blog
- [ ] متجر للأدوات | Tools marketplace

### تحسينات مقترحة | Suggested Improvements
- [ ] تحسين SEO أكثر | Further SEO optimization
- [ ] إضافة اختبارات وحدة | Add unit tests
- [ ] تحسين إمكانية الوصول | Accessibility improvements
- [ ] دعم لغات إضافية | Additional language support

## 🤝 المساهمة | Contributing

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

We welcome contributions! Please follow these steps:

1. انسخ المشروع | Fork the project
2. أنشئ فرع جديد | Create a new branch
3. اعمل تغييراتك | Make your changes
4. اختبر التغييرات | Test changes
5. أرسل طلب دمج | Submit pull request

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 الدعم | Support

للحصول على الدعم أو الاستفسارات:

For support or inquiries:

- 📧 البريد الإلكتروني | Email: amedelshab7@gmail.com
- 📱 الهاتف | Phone: 01014812328
- 🐙 GitHub: [ELSHAB7UAHED](https://github.com/ELSHAB7UAHED)
- 💬 Telegram: [@Ghosteryly](https://t.me/Ghosteryly)
- 🌐 الموقع | Website: [ghost13.odoo.com](https://ghost13.odoo.com)

## 🙏 شكر وتقدير | Acknowledgments

- شكر خاص لمجتمع المطورين | Special thanks to developer community
- مكتبات مفتوحة المصدر المستخدمة | Open source libraries used
- الأصدقاء والزملاء للدعم | Friends and colleagues for support

---

**صُنع بـ ❤️ والكثير من الكود من قبل أحمد نور أحمد عبد الحكيم**

**Made with ❤️ and lots of code by Ahmed Nour Ahmed Abdel Hakeem**

© 2025 جميع الحقوق محفوظة | All rights reserved