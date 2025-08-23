# mo7aoil Makefile
.PHONY: help install start dev build deploy clean docker-build docker-run docker-stop test lint

# Default target
help:
	@echo "🚀 mo7aoil - Available Commands:"
	@echo ""
	@echo "📦 Setup:"
	@echo "  install     Install dependencies"
	@echo "  setup       Setup project directories"
	@echo ""
	@echo "🚀 Development:"
	@echo "  start       Start the application"
	@echo "  dev         Start in development mode with auto-reload"
	@echo "  build       Build the application"
	@echo ""
	@echo "🐳 Docker:"
	@echo "  docker-build Build Docker image"
	@echo "  docker-run   Run with Docker Compose"
	@echo "  docker-stop  Stop Docker containers"
	@echo ""
	@echo "🔧 Utilities:"
	@echo "  clean       Clean up project files"
	@echo "  test        Run tests"
	@echo "  lint        Run linting"
	@echo "  logs        View application logs"
	@echo ""

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install

# Setup project directories
setup:
	@echo "📁 Setting up project directories..."
	mkdir -p uploads/temp uploads/processed logs
	@echo "✅ Setup completed!"

# Start the application
start:
	@echo "🚀 Starting mo7aoil..."
	@./scripts/start.sh

# Start in development mode
dev:
	@echo "🔧 Starting in development mode..."
	@./scripts/dev.sh

# Build the application
build:
	@echo "🔨 Building the application..."
	npm run build

# Deploy the application
deploy:
	@echo "🚀 Deploying the application..."
	@./scripts/deploy.sh

# Clean up project files
clean:
	@echo "🧹 Cleaning up project files..."
	@./scripts/cleanup.sh

# Build Docker image
docker-build:
	@echo "🐳 Building Docker image..."
	docker build -t mo7aoil .

# Run with Docker Compose
docker-run:
	@echo "🐳 Starting with Docker Compose..."
	docker-compose up -d

# Stop Docker containers
docker-stop:
	@echo "🐳 Stopping Docker containers..."
	docker-compose down

# Run tests
test:
	@echo "🧪 Running tests..."
	npm test

# Run linting
lint:
	@echo "🔍 Running linting..."
	npm run lint

# View logs
logs:
	@echo "📝 Viewing application logs..."
	tail -f logs/app.log

# Health check
health:
	@echo "🏥 Running health check..."
	node healthcheck.js

# Production start
prod:
	@echo "🚀 Starting in production mode..."
	NODE_ENV=production PORT=3000 npm start

# Install PM2 globally
install-pm2:
	@echo "📦 Installing PM2 globally..."
	npm install -g pm2

# Install nodemon globally
install-nodemon:
	@echo "📦 Installing nodemon globally..."
	npm install -g nodemon

# Show status
status:
	@echo "📊 Application Status:"
	@if command -v pm2 &> /dev/null; then \
		pm2 status; \
	else \
		echo "PM2 not installed. Run 'make install-pm2' to install."; \
	fi

# Restart application
restart:
	@echo "🔄 Restarting application..."
	@if command -v pm2 &> /dev/null; then \
		pm2 restart mo7aoil; \
	else \
		echo "PM2 not installed. Run 'make install-pm2' to install."; \
	fi

# Show help for scripts
scripts-help:
	@echo "📜 Available Scripts:"
	@echo "  ./scripts/start.sh    - Start the application"
	@echo "  ./scripts/dev.sh       - Start in development mode"
	@echo "  ./scripts/deploy.sh    - Deploy the application"
	@echo "  ./scripts/cleanup.sh  - Clean up project files"