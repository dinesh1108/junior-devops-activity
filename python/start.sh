#!/bin/bash

# Simple startup script for Python FastAPI service

echo "🚀 Starting Python Sum Service..."

# Create .env from .env.example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
fi

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Start the server
echo "✨ Starting server..."
python app/main.py
