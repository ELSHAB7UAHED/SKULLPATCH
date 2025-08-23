#!/bin/bash

# mo7aoil Startup Script
echo "🚀 Starting mo7aoil application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads/temp uploads/processed logs

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Set environment
export NODE_ENV=development
export PORT=3001

# Start the application
echo "🌟 Starting mo7aoil server on port $PORT..."
echo "🌐 Open your browser at: http://localhost:$PORT"
echo "📱 Press Ctrl+C to stop the server"
echo ""

# Start the server
npm start