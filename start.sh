#!/bin/bash

echo "🚀 بدء تشغيل موقع mo7aoil..."

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيته أولاً."
    exit 1
fi

# التحقق من وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت. يرجى تثبيته أولاً."
    exit 1
fi

# تثبيت التبعيات إذا لم تكن موجودة
if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت التبعيات..."
    npm install
fi

# بناء المشروع
echo "🔨 بناء المشروع..."
npm run build

# إنشاء المجلدات المطلوبة
mkdir -p uploads/temp uploads/processed

# تشغيل الخادم
echo "🌐 تشغيل الخادم على المنفذ 3000..."
echo "📱 يمكنك الوصول للموقع على: http://localhost:3000"
echo "⏹️  اضغط Ctrl+C لإيقاف الخادم"

node server.js