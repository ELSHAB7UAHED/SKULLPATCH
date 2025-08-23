# 🚀 mo7aoil - موقع احترافي وعصري لمعالجة الصور والملفات

موقع `mo7aoil` هو منصة احترافية وعصرية جداً لمعالجة الصور والملفات بأحدث التقنيات وأكثرها تقدماً. يوفر الموقع مجموعة شاملة من الأدوات القوية لجميع احتياجات معالجة الملفات.

## ✨ المميزات الرئيسية

### 🖼️ أدوات الصور
- **ضغط الصور**: تقليل حجم الصور مع الحفاظ على الجودة
- **تغيير الحجم**: تغيير أبعاد الصور حسب احتياجاتك
- **تحويل الصيغ**: تحويل الصور بين مختلف الصيغ المدعومة
- **إضافة علامة مائية**: حماية صورك بإضافة علامات مائية احترافية

### 📄 أدوات PDF
- **دمج PDF**: دمج عدة ملفات PDF في ملف واحد
- **تقسيم PDF**: تقسيم ملف PDF إلى عدة ملفات
- **PDF إلى صورة**: تحويل صفحات PDF إلى صور

### 🎥 أدوات الفيديو
- **ضغط الفيديو**: تقليل حجم ملفات الفيديو
- **تحويل الفيديو**: تحويل الفيديو بين مختلف الصيغ

### ⚙️ أدوات متقدمة
- **معالجة مجمعة**: معالجة عدة ملفات في نفس الوقت
- **استخراج النصوص**: استخراج النصوص من الصور (OCR)

## 🛠️ التقنيات المستخدمة

### Backend
- **Node.js** - بيئة تشغيل JavaScript
- **Express.js** - إطار عمل الويب
- **Socket.IO** - اتصال في الوقت الفعلي
- **Sharp** - معالجة الصور عالية الأداء
- **PDF-lib** - معالجة ملفات PDF
- **Multer** - معالجة رفع الملفات

### Frontend
- **HTML5** - هيكل الصفحة
- **CSS3** - التصميم والأنيميشن
- **JavaScript ES6+** - التفاعل والمنطق
- **Font Awesome** - الأيقونات
- **Google Fonts** - الخطوط العربية

### المميزات التقنية
- **تصميم متجاوب** - يعمل على جميع الأجهزة
- **PWA Ready** - جاهز للتطبيق المحمول
- **SEO Optimized** - محسن لمحركات البحث
- **Security** - حماية وأمان عالي
- **Performance** - أداء عالي وسرعة فائقة

## 🚀 كيفية التشغيل

### المتطلبات الأساسية
- Node.js (الإصدار 16 أو أحدث)
- npm أو yarn

### الطريقة السريعة (موصى بها)
1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd mo7aoil
```

2. **تشغيل المشروع**
```bash
# في Linux/Mac
./start.sh

# في Windows
start.sh
```

### الطريقة التقليدية
1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd mo7aoil
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **بناء المشروع**
```bash
npm run build
```

4. **إنشاء المجلدات المطلوبة**
```bash
mkdir -p uploads/temp uploads/processed
```

5. **تشغيل الخادم**
```bash
# للتطوير
npm run dev

# للإنتاج
npm start
```

6. **فتح المتصفح**
```
http://localhost:3000
```

## 📁 هيكل المشروع

```
mo7aoil/
├── public/                 # الملفات العامة
│   ├── index.html         # الصفحة الرئيسية
│   ├── styles.css         # ملف التصميم
│   ├── app.js            # ملف JavaScript
│   └── favicon.ico       # أيقونة الموقع
├── uploads/               # مجلد الملفات المرفوعة
│   ├── temp/             # الملفات المؤقتة
│   └── processed/        # الملفات المعالجة
├── server.js             # الخادم الرئيسي
├── package.json          # تبعيات المشروع
└── README.md            # هذا الملف
```

## 🛠️ سكريبتات التشغيل

### start.sh
سكريبت التشغيل السريع الذي يقوم بـ:
- التحقق من وجود Node.js و npm
- تثبيت التبعيات تلقائياً
- بناء المشروع
- إنشاء المجلدات المطلوبة
- تشغيل الخادم

```bash
./start.sh
```

### dev.sh
سكريبت التطوير مع nodemon:
- إعادة تشغيل تلقائي عند تغيير الملفات
- مناسب للتطوير والاختبار

```bash
./dev.sh
```

### Makefile
أوامر سريعة باستخدام Make:

```bash
# عرض المساعدة
make help

# تثبيت التبعيات
make install

# بناء المشروع
make build

# تشغيل في وضع التطوير
make dev

# تشغيل في وضع الإنتاج
make start

# تنظيف الملفات المؤقتة
make clean

# عرض حالة المشروع
make status
```

## 🔧 إعدادات البيئة

يمكنك تخصيص إعدادات الموقع من خلال متغيرات البيئة:

```bash
# ملف .env
PORT=3000
NODE_ENV=production
UPLOAD_LIMIT=100MB
MAX_FILES=20
```

## 🐳 النشر باستخدام Docker

### تشغيل سريع
```bash
# بناء وتشغيل التطبيق
docker-compose up -d

# إيقاف التطبيق
docker-compose down
```

### بناء صورة Docker
```bash
# بناء الصورة
docker build -t mo7aoil .

# تشغيل الحاوية
docker run -p 3000:3000 -d mo7aoil
```

## 🌐 النشر على الإنترنت

### Heroku
```bash
heroku create mo7aoil-app
git push heroku main
```

### Vercel
```bash
vercel --prod
```

### Docker
```bash
# رفع الصورة إلى Docker Hub
docker tag mo7aoil username/mo7aoil
docker push username/mo7aoil

# تشغيل من Docker Hub
docker run -p 3000:3000 username/mo7aoil
```

### DigitalOcean
```bash
# رفع الملفات إلى الخادم
npm install --production
npm start
```

## 📱 المميزات المتقدمة

### 🔒 الأمان
- حماية من CSRF
- Rate Limiting
- Helmet.js للأمان
- CORS محسن

### ⚡ الأداء
- ضغط الملفات
- Cache Headers
- Lazy Loading
- Image Optimization

### 📊 المراقبة
- Socket.IO للتحديثات المباشرة
- Logging متقدم
- Error Handling
- Performance Monitoring

## 🎨 التخصيص

### تغيير الألوان
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #f59e0b;
    --accent-color: #ec4899;
}
```

### إضافة أدوات جديدة
```javascript
// في server.js
app.post('/api/new-tool', upload.single('file'), async (req, res) => {
    // منطق الأداة الجديدة
});
```

## 🐛 استكشاف الأخطاء

### مشاكل شائعة

1. **خطأ في تثبيت التبعيات**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. **مشكلة في الصلاحيات**
```bash
chmod +x uploads/
chmod +x uploads/temp/
chmod +x uploads/processed/
```

3. **مشكلة في المنفذ**
```bash
# تغيير المنفذ في server.js
const PORT = process.env.PORT || 3001;
```

## 📈 التطوير المستقبلي

### المميزات المخطط لها
- [ ] دعم الذكاء الاصطناعي
- [ ] معالجة الفيديو المتقدمة
- [ ] دعم المزيد من الصيغ
- [ ] API للمطورين
- [ ] نظام المستخدمين
- [ ] التخزين السحابي

### المساهمة
نرحب بمساهماتكم! يرجى:
1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push إلى الفرع
5. إنشاء Pull Request

## 📞 الدعم والاتصال

- **البريد الإلكتروني**: support@mo7aoil.com
- **الهاتف**: +966 50 123 4567
- **العنوان**: الرياض، المملكة العربية السعودية

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف `LICENSE` للتفاصيل.

## 🙏 الشكر والتقدير

شكر خاص لجميع المساهمين والمطورين الذين ساعدوا في تطوير هذا المشروع.

---

**تم التطوير بـ ❤️ من فريق mo7aoil**

*موقع احترافي وعصري لمعالجة الصور والملفات بأحدث التقنيات*
