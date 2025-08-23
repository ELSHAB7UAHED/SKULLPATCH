.PHONY: help install build dev start clean docker-build docker-run docker-stop

# المتغيرات
APP_NAME = mo7aoil
PORT = 3000

# المساعدة
help: ## عرض المساعدة
	@echo "أوامر متاحة:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# التثبيت والبناء
install: ## تثبيت التبعيات
	npm install

build: ## بناء المشروع
	npm run build

# التشغيل
dev: ## تشغيل في وضع التطوير
	npm run dev

start: ## تشغيل في وضع الإنتاج
	npm start

# التنظيف
clean: ## تنظيف الملفات المؤقتة
	rm -rf node_modules
	rm -rf dist
	rm -rf uploads/temp/*
	rm -rf uploads/processed/*

# Docker
docker-build: ## بناء صورة Docker
	docker build -t $(APP_NAME) .

docker-run: ## تشغيل حاوية Docker
	docker run -p $(PORT):$(PORT) -d --name $(APP_NAME) $(APP_NAME)

docker-stop: ## إيقاف حاوية Docker
	docker stop $(APP_NAME) || true
	docker rm $(APP_NAME) || true

docker-compose-up: ## تشغيل باستخدام docker-compose
	docker-compose up -d

docker-compose-down: ## إيقاف docker-compose
	docker-compose down

# الاختبار
test: ## تشغيل الاختبارات
	npm test

# النشر
deploy: build ## نشر المشروع
	@echo "تم بناء المشروع بنجاح!"
	@echo "يمكنك الآن نشر الملفات في مجلد dist/"

# التحديث
update: ## تحديث التبعيات
	npm update

# الحالة
status: ## عرض حالة المشروع
	@echo "حالة المشروع:"
	@echo "- Node.js: $(shell node --version)"
	@echo "- npm: $(shell npm --version)"
	@echo "- التبعيات: $(shell if [ -d "node_modules" ]; then echo "مثبتة"; else echo "غير مثبتة"; fi)"
	@echo "- البناء: $(shell if [ -d "dist" ]; then echo "مكتمل"; else echo "غير مكتمل"; fi)"