# استخدام صورة Node.js الرسمية
FROM node:18-alpine

# تعيين مجلد العمل
WORKDIR /app

# نسخ ملفات التبعيات
COPY package*.json ./

# تثبيت التبعيات
RUN npm ci --only=production

# نسخ باقي الملفات
COPY . .

# بناء المشروع
RUN npm run build

# إنشاء المجلدات المطلوبة
RUN mkdir -p uploads/temp uploads/processed

# تعريض المنفذ
EXPOSE 3000

# تعيين متغيرات البيئة
ENV NODE_ENV=production
ENV PORT=3000

# تشغيل التطبيق
CMD ["npm", "start"]