#!/bin/bash

# mo7aoil Development Script
echo "🔧 Starting mo7aoil in development mode..."

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

# Install nodemon if not installed
if ! npm list -g nodemon &> /dev/null; then
    echo "📦 Installing nodemon globally..."
    npm install -g nodemon
fi

# Set environment
export NODE_ENV=development
export PORT=3001

# Start the application in development mode
echo "🌟 Starting mo7aoil server in development mode on port $PORT..."
echo "🌐 Open your browser at: http://localhost:$PORT"
echo "🔄 Server will restart automatically on file changes"
echo "📱 Press Ctrl+C to stop the server"
echo ""

# Start the server with nodemon
npm run dev