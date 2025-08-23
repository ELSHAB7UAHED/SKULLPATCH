# واجهة برمجة التطبيقات (API) - mo7aoil

آخر تحديث: يناير 2024

## 📋 نظرة عامة

واجهة برمجة التطبيقات (API) لموقع mo7aoil تتيح للمطورين الوصول لخدمات معالجة الملفات برمجياً.

## 🚀 البدء السريع

### نقطة النهاية الأساسية
```
https://api.mo7aoil.com/v1
```

### المفتاح الأساسي
```bash
# إضافة في header
Authorization: Bearer YOUR_API_KEY
```

### مثال بسيط
```bash
curl -X POST https://api.mo7aoil.com/v1/compress-image \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@image.jpg" \
  -F "quality=80"
```

## 🔐 المصادقة

### أنواع المصادقة
- **API Key**: مفتاح API للمطورين
- **OAuth 2.0**: للمستخدمين المتقدمين
- **JWT**: للجلسات المؤقتة

### الحصول على API Key
1. إنشاء حساب على [mo7aoil.com](https://mo7aoil.com)
2. الذهاب لإعدادات المطور
3. إنشاء مفتاح API جديد
4. نسخ المفتاح وحفظه بأمان

### استخدام API Key
```bash
# في Header
Authorization: Bearer YOUR_API_KEY

# في Query Parameter (غير موصى به)
?api_key=YOUR_API_KEY
```

## 📊 معدلات الاستخدام

### الحدود المجانية
- **100 طلب/يوم**: للمستخدمين المجانيين
- **1000 طلب/شهر**: إجمالي الطلبات
- **حجم الملف**: 10 ميجابايت كحد أقصى

### الحدود المدفوعة
- **10000 طلب/يوم**: للمستخدمين المدفوعين
- **100000 طلب/شهر**: إجمالي الطلبات
- **حجم الملف**: 100 ميجابايت كحد أقصى

### رؤوس الاستجابة
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 🖼️ معالجة الصور

### ضغط الصور
```http
POST /v1/compress-image
```

**المعاملات:**
- `file` (مطلوب): ملف الصورة
- `quality` (اختياري): جودة الضغط (1-100)
- `format` (اختياري): تنسيق الإخراج (jpg, png, webp)

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/compress-image \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@image.jpg" \
  -F "quality=80" \
  -F "format=webp"
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "original_size": 1024000,
    "compressed_size": 256000,
    "compression_ratio": 75,
    "download_url": "https://api.mo7aoil.com/download/abc123",
    "expires_at": "2024-02-01T00:00:00Z"
  }
}
```

### تغيير حجم الصور
```http
POST /v1/resize-image
```

**المعاملات:**
- `file` (مطلوب): ملف الصورة
- `width` (اختياري): العرض المطلوب
- `height` (اختياري): الارتفاع المطلوب
- `maintain_aspect` (اختياري): الحفاظ على النسبة (true/false)

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/resize-image \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@image.jpg" \
  -F "width=800" \
  -F "height=600" \
  -F "maintain_aspect=true"
```

### تحويل تنسيق الصور
```http
POST /v1/convert-image
```

**المعاملات:**
- `file` (مطلوب): ملف الصورة
- `format` (مطلوب): تنسيق الإخراج (jpg, png, gif, webp, bmp)

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/convert-image \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@image.png" \
  -F "format=webp"
```

## 📄 معالجة PDF

### دمج ملفات PDF
```http
POST /v1/merge-pdf
```

**المعاملات:**
- `files[]` (مطلوب): مصفوفة ملفات PDF
- `order` (اختياري): ترتيب الملفات

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/merge-pdf \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "files[]=@doc1.pdf" \
  -F "files[]=@doc2.pdf" \
  -F "order=1,2"
```

### تقسيم ملف PDF
```http
POST /v1/split-pdf
```

**المعاملات:**
- `file` (مطلوب): ملف PDF
- `pages` (مطلوب): الصفحات المطلوبة (مثال: "1-3,5,7-10")

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/split-pdf \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@document.pdf" \
  -F "pages=1-5,10,15-20"
```

### تحويل PDF إلى صور
```http
POST /v1/pdf-to-image
```

**المعاملات:**
- `file` (مطلوب): ملف PDF
- `format` (اختياري): تنسيق الصور (jpg, png)
- `quality` (اختياري): جودة الصور (1-100)
- `pages` (اختياري): الصفحات المطلوبة

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/pdf-to-image \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@document.pdf" \
  -F "format=png" \
  -F "quality=90" \
  -F "pages=1-3"
```

## 🎥 معالجة الفيديو

### ضغط الفيديو
```http
POST /v1/compress-video
```

**المعاملات:**
- `file` (مطلوب): ملف الفيديو
- `quality` (اختياري): جودة الفيديو (low, medium, high)
- `format` (اختياري): تنسيق الإخراج (mp4, avi, mov)

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/compress-video \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@video.mp4" \
  -F "quality=medium" \
  -F "format=mp4"
```

### تحويل تنسيق الفيديو
```http
POST /v1/convert-video
```

**المعاملات:**
- `file` (مطلوب): ملف الفيديو
- `format` (مطلوب): تنسيق الإخراج
- `resolution` (اختياري): الدقة المطلوبة

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/convert-video \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@video.avi" \
  -F "format=mp4" \
  -F "resolution=720p"
```

## 🔧 الأدوات المتقدمة

### معالجة مجمعة
```http
POST /v1/batch-process
```

**المعاملات:**
- `files[]` (مطلوب): مصفوفة الملفات
- `operation` (مطلوب): العملية المطلوبة
- `options` (اختياري): خيارات إضافية

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/batch-process \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "files[]=@image1.jpg" \
  -F "files[]=@image2.jpg" \
  -F "operation=compress" \
  -F "options={\"quality\":80}"
```

### التعرف على النصوص (OCR)
```http
POST /v1/ocr
```

**المعاملات:**
- `file` (مطلوب): ملف الصورة أو PDF
- `language` (اختياري): اللغة (ar, en, fr, es)
- `output_format` (اختياري): تنسيق الإخراج (txt, json)

**مثال:**
```bash
curl -X POST https://api.mo7aoil.com/v1/ocr \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@document.jpg" \
  -F "language=ar" \
  -F "output_format=json"
```

## 📊 الحالة والتقدم

### تتبع المهمة
```http
GET /v1/job/{job_id}
```

**مثال:**
```bash
curl -X GET https://api.mo7aoil.com/v1/job/abc123 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**الاستجابة:**
```json
{
  "job_id": "abc123",
  "status": "processing",
  "progress": 75,
  "estimated_time": 30,
  "result": null
}
```

### إلغاء المهمة
```http
DELETE /v1/job/{job_id}
```

**مثال:**
```bash
curl -X DELETE https://api.mo7aoil.com/v1/job/abc123 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 📥 تحميل الملفات

### رابط التحميل
```http
GET /v1/download/{file_id}
```

**مثال:**
```bash
curl -X GET https://api.mo7aoil.com/v1/download/xyz789 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -o downloaded_file.jpg
```

### معلومات الملف
```http
GET /v1/file/{file_id}/info
```

**مثال:**
```bash
curl -X GET https://api.mo7aoil.com/v1/file/xyz789/info \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**الاستجابة:**
```json
{
  "file_id": "xyz789",
  "filename": "compressed_image.jpg",
  "size": 256000,
  "mime_type": "image/jpeg",
  "created_at": "2024-01-01T12:00:00Z",
  "expires_at": "2024-02-01T00:00:00Z"
}
```

## ⚠️ رموز الخطأ

### رموز HTTP الشائعة
- `200`: نجح الطلب
- `201`: تم إنشاء المورد
- `400`: طلب خاطئ
- `401`: غير مصرح
- `403`: محظور
- `404`: غير موجود
- `429`: تجاوز حد الطلبات
- `500`: خطأ في الخادم

### أمثلة على الأخطاء
```json
{
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "نوع الملف غير مدعوم",
    "details": "الملف يجب أن يكون من نوع: jpg, png, gif"
  }
}
```

```json
{
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "الملف كبير جداً",
    "details": "الحد الأقصى: 10 ميجابايت"
  }
}
```

## 🔄 WebSocket للتحديثات المباشرة

### الاتصال
```javascript
const socket = io('https://api.mo7aoil.com', {
  auth: {
    token: 'YOUR_API_KEY'
  }
});
```

### الاستماع للأحداث
```javascript
// تحديث حالة المهمة
socket.on('job_update', (data) => {
  console.log(`المهمة ${data.job_id}: ${data.progress}%`);
});

// اكتمال المهمة
socket.on('job_complete', (data) => {
  console.log(`اكتملت المهمة: ${data.result.download_url}`);
});

// خطأ في المهمة
socket.on('job_error', (data) => {
  console.error(`خطأ في المهمة: ${data.error.message}`);
});
```

## 📚 مكتبات العميل

### JavaScript/Node.js
```bash
npm install mo7aoil-api
```

```javascript
const Mo7aoilAPI = require('mo7aoil-api');

const api = new Mo7aoilAPI('YOUR_API_KEY');

// ضغط صورة
const result = await api.compressImage('image.jpg', {
  quality: 80,
  format: 'webp'
});

console.log(result.download_url);
```

### Python
```bash
pip install mo7aoil-api
```

```python
from mo7aoil_api import Mo7aoilAPI

api = Mo7aoilAPI('YOUR_API_KEY')

# ضغط صورة
result = api.compress_image('image.jpg', quality=80, format='webp')
print(result['download_url'])
```

### PHP
```bash
composer require mo7aoil/api
```

```php
use Mo7aoil\API\Mo7aoilAPI;

$api = new Mo7aoilAPI('YOUR_API_KEY');

// ضغط صورة
$result = $api->compressImage('image.jpg', [
    'quality' => 80,
    'format' => 'webp'
]);

echo $result['download_url'];
```

## 🧪 اختبار API

### بيئة الاختبار
```
https://api-test.mo7aoil.com/v1
```

### أدوات الاختبار
- **Postman**: مجموعة Postman جاهزة
- **Insomnia**: مجموعة Insomnia متاحة
- **cURL**: أمثلة cURL في هذا الدليل
- **Swagger**: وثائق تفاعلية

### أمثلة الاختبار
```bash
# اختبار المصادقة
curl -X GET https://api.mo7aoil.com/v1/me \
  -H "Authorization: Bearer YOUR_API_KEY"

# اختبار رفع ملف
curl -X POST https://api.mo7aoil.com/v1/compress-image \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@test.jpg" \
  -F "quality=50"
```

## 📈 مراقبة الاستخدام

### إحصائيات API
```http
GET /v1/stats
```

**مثال:**
```bash
curl -X GET https://api.mo7aoil.com/v1/stats \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**الاستجابة:**
```json
{
  "total_requests": 1500,
  "requests_today": 45,
  "requests_this_month": 1200,
  "remaining_requests": 8500,
  "reset_date": "2024-02-01T00:00:00Z"
}
```

### سجل الطلبات
```http
GET /v1/logs
```

**المعاملات:**
- `page` (اختياري): رقم الصفحة
- `limit` (اختياري): عدد النتائج في الصفحة
- `date_from` (اختياري): تاريخ البداية
- `date_to` (اختياري): تاريخ النهاية

## 🔐 الأمان

### أفضل الممارسات
- **حماية المفتاح**: لا تشارك مفتاح API
- **HTTPS**: استخدم HTTPS دائماً
- **التحقق**: تحقق من صحة الملفات
- **الحدود**: احترم حدود الاستخدام

### تشفير البيانات
- **TLS 1.3**: تشفير قوي للاتصالات
- **API Keys**: مفاتيح مشفرة
- **ملفات مؤقتة**: حذف تلقائي للملفات

## 📞 الدعم

### قنوات الدعم
- **البريد الإلكتروني**: [api@mo7aoil.com](mailto:api@mo7aoil.com)
- **GitHub**: [issues](https://github.com/username/mo7aoil/issues)
- **Discord**: [server](https://discord.gg/mo7aoil)
- **التواصل**: [contact@mo7aoil.com](mailto:contact@mo7aoil.com)

### أوقات الدعم
- **الأحد - الخميس**: 9:00 ص - 6:00 م (توقيت السعودية)
- **الجمعة - السبت**: مغلق
- **الطوارئ**: دعم محدود للطوارئ

---

**آخر تحديث**: يناير 2024  
**الإصدار**: 1.0.0  
**المراجعة التالية**: يوليو 2024

**تذكر**: اقرأ [شروط الخدمة](TERMS.md) و[سياسة الخصوصية](PRIVACY.md) قبل استخدام API! 📋🔒