#!/bin/bash

# mo7aoil Cleanup Script
echo "🧹 Cleaning up mo7aoil application..."

# Stop PM2 processes if running
if command -v pm2 &> /dev/null; then
    echo "🛑 Stopping PM2 processes..."
    pm2 stop mo7aoil 2>/dev/null || true
    pm2 delete mo7aoil 2>/dev/null || true
fi

# Clean up temporary files
echo "🗑️ Cleaning temporary files..."
rm -rf uploads/temp/*
rm -rf logs/*
rm -rf node_modules

# Clean up build files
echo "🗑️ Cleaning build files..."
rm -rf dist/
rm -rf build/

# Clean up package-lock
echo "🗑️ Cleaning package-lock..."
rm -f package-lock.json

# Clean up environment files
echo "🗑️ Cleaning environment files..."
rm -f .env.local
rm -f .env.production

echo "✅ Cleanup completed successfully!"
echo "📦 Run 'npm install' to reinstall dependencies"
echo "🚀 Run './scripts/start.sh' to start the application"