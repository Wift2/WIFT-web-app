#!/bin/bash

# WIFT AI Web App - Cross-Platform Setup Script
# This script works on macOS, Linux, and Windows (with Git Bash or WSL)

set -e  # Exit on any error

echo "🚀 Setting up WIFT AI Web App for development..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is not supported. Please install Node.js 18+ and try again."
    exit 1
fi

echo "✅ Node.js $NODE_VERSION detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment template if .env.local doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📋 Creating .env.local from template..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your AWS Cognito settings"
else
    echo "✅ .env.local already exists"
fi

# Run type checking
echo "🔍 Running type check..."
npm run type-check

# Run formatting and linting
echo "🎨 Formatting and linting code..."
npm run format
npm run lint

echo ""
echo "🎉 Setup complete! Your development environment is ready."
echo ""
echo "📝 Next steps:"
echo "   1. Edit .env.local with your AWS Cognito settings"
echo "   2. Run 'npm run dev' to start the development server"
echo "   3. Run 'npm run dev:host' to expose server to network (useful for mobile testing)"
echo ""
echo "🔧 Available scripts:"
echo "   npm run dev           - Start development server"
echo "   npm run dev:host      - Start development server with network access"
echo "   npm run build         - Build for production"
echo "   npm run test          - Run tests"
echo "   npm run lint          - Lint and fix code"
echo "   npm run format        - Format code"
echo ""
