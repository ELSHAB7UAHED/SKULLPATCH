#!/bin/bash

# mo7aoil Deployment Script
echo "🚀 Deploying mo7aoil application..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 globally..."
    npm install -g pm2
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads/temp uploads/processed logs

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Set environment
export NODE_ENV=production
export PORT=3000

# Build the application if needed
if [ -f "package.json" ] && grep -q "build" package.json; then
    echo "🔨 Building the application..."
    npm run build
fi

# Start with PM2
echo "🌟 Starting mo7aoil with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running on port $PORT"
echo "📊 Use 'pm2 status' to check application status"
echo "📝 Use 'pm2 logs mo7aoil' to view logs"
echo "🔄 Use 'pm2 restart mo7aoil' to restart the application"