@echo off
setlocal enabledelayedexpansion

REM WIFT AI Web App - Windows Setup Script

echo 🚀 Setting up WIFT AI Web App for development...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ and try again.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm and try again.
    pause
    exit /b 1
)

echo ✅ npm detected

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Copy environment template if .env.local doesn't exist
if not exist ".env.local" (
    echo 📋 Creating .env.local from template...
    copy ".env.example" ".env.local" >nul
    echo ⚠️  Please edit .env.local with your AWS Cognito settings
) else (
    echo ✅ .env.local already exists
)

REM Run type checking
echo 🔍 Running type check...
call npm run type-check
if %errorlevel% neq 0 (
    echo ⚠️  Type check failed, but continuing setup...
)

REM Run formatting and linting
echo 🎨 Formatting and linting code...
call npm run format
call npm run lint

echo.
echo 🎉 Setup complete! Your development environment is ready.
echo.
echo 📝 Next steps:
echo    1. Edit .env.local with your AWS Cognito settings
echo    2. Run 'npm run dev' to start the development server
echo    3. Run 'npm run dev:host' to expose server to network (useful for mobile testing)
echo.
echo 🔧 Available scripts:
echo    npm run dev           - Start development server
echo    npm run dev:host      - Start development server with network access
echo    npm run build         - Build for production
echo    npm run test          - Run tests
echo    npm run lint          - Lint and fix code
echo    npm run format        - Format code
echo.
pause
