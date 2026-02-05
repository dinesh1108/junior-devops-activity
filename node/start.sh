#!/bin/bash

# Simple startup script for Node Express service

echo "🚀 Starting Node Multiply Service..."

# Create .env from .env.example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start the server
echo "✨ Starting server..."
npm start
