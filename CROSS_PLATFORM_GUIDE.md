# Cross-Platform Development Guide

This guide helps you set up and develop the WIFT AI Web App across different operating systems.

## Quick Start

### All Platforms
1. **Prerequisites**: Node.js 18+ and npm
2. **Clone the repository** and navigate to the project directory
3. **Run the setup script** for your platform (see below)
4. **Start development**: `npm run dev` (works immediately with mock authentication)
5. **Optional**: Set up real AWS authentication for testing (see Authentication Testing section)

## Platform-Specific Setup

### Windows

#### Option 1: PowerShell/Command Prompt
```cmd
# Run the Windows setup script
setup.bat

# Or manually:
npm install
npm run setup
npm run dev  # Starts immediately with mock authentication
```

#### Option 2: Windows Subsystem for Linux (WSL)
```bash
# Run the Unix setup script
chmod +x setup.sh
./setup.sh

# Or manually:
npm install
npm run setup
npm run dev  # Starts immediately with mock authentication
```

### macOS

```bash
# Run the setup script
chmod +x setup.sh
./setup.sh

# Or manually:
npm install
npm run setup
npm run dev  # Starts immediately with mock authentication
```

### Linux (Ubuntu/Debian/Fedora/etc.)

```bash
# Run the setup script
chmod +x setup.sh
./setup.sh

# Or manually:
npm install
npm run setup
npm run dev  # Starts immediately with mock authentication
```

## Development Workflow

### Starting Development Server

```bash
# Standard development (localhost only)
npm run dev

# Network accessible (for mobile testing)
npm run dev:host

# With specific port
VITE_PORT=3000 npm run dev
```

### Environment Variables

The project uses environment variables for configuration, but **setup is optional for development**.

#### Development Mode (Default - No Setup Required)
The app automatically runs in development mode with mock authentication when no AWS configuration is detected. No `.env.local` file is needed.

#### Testing Real Authentication (Optional)
For testing real AWS Cognito authentication, you have two options:

**Option 1: Amplify Sandbox (Recommended)**
```bash
# Start temporary AWS backend
npm run amplify:sandbox
# No .env.local needed - amplify_outputs.json is auto-generated
```

**Option 2: Manual AWS Configuration**
Create `.env.local` with your AWS settings:

```env
VITE_DEV_MODE=false
VITE_AWS_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_AWS_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_AWS_OAUTH_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
```

### Cross-Platform Commands

All these commands work identically across platforms:

```bash
# Development
npm run dev              # Start development server
npm run dev:host         # Start with network access
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Lint and auto-fix
npm run lint:check       # Lint without fixing
npm run format           # Format code
npm run format:check     # Check formatting
npm run fix:line-endings # Fix cross-platform line ending issues
npm run type-check       # TypeScript type checking

# AWS Amplify Backend
npm run amplify:sandbox  # Start temporary AWS backend for testing
npm run amplify:generate # Generate types from backend schema
npm run amplify:deploy   # Deploy backend to AWS

# Testing
npm run test             # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage

# Maintenance
npm run clean            # Clean build artifacts
npm run clean:install    # Clean and reinstall dependencies
npm run setup            # Initial project setup
npm run setup:dev        # Setup and start development
```

## Authentication Testing

### Immediate Development (No AWS Setup)
```bash
npm run dev
```
The app automatically runs with mock authentication - perfect for UI development and testing.

### Real Authentication Testing

#### Option 1: Amplify Sandbox (Recommended)
```bash
# Terminal 1: Start temporary AWS backend
npm run amplify:sandbox

# Terminal 2: Start development server
npm run dev
```

#### Option 2: Manual AWS Setup
1. Create `.env.local` with AWS credentials
2. Set `VITE_DEV_MODE=false`
3. Run `npm run dev`

## Platform-Specific Considerations

### Windows

- **Line Endings**: The project is configured to handle CRLF/LF differences automatically
- **Paths**: Use forward slashes in configuration files (handled automatically)
- **Environment Variables**: Use double quotes for values with spaces
- **PowerShell**: Some npm scripts may require execution policy changes

### macOS

- **Xcode Command Line Tools**: Required for some dependencies
- **Homebrew**: Recommended for installing Node.js
- **File Permissions**: Scripts may need `chmod +x` to be executable

### Linux

- **Node.js Installation**: Use your distribution's package manager or NodeSource
- **File Permissions**: Scripts may need `chmod +x` to be executable
- **Dependencies**: Some packages may require build tools (`build-essential` on Ubuntu)

## Network Development

### Mobile Device Testing

1. **Start with network access**:
   ```bash
   npm run dev:host
   ```

2. **Find your IP address**:
   - **Windows**: `ipconfig`
   - **macOS/Linux**: `ifconfig` or `ip addr`

3. **Access from mobile**: `http://YOUR_IP:5173`

### Firewall Configuration

Make sure port 5173 is accessible:

- **Windows**: Windows Defender Firewall
- **macOS**: System Preferences > Security & Privacy > Firewall
- **Linux**: `ufw allow 5173` (Ubuntu) or equivalent

## IDE Setup

### VS Code (Recommended)

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json"
  ]
}
```

### Settings for Cross-Platform Development

Add to VS Code settings:

```json
{
  "files.eol": "auto",
  "prettier.endOfLine": "auto",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Troubleshooting

### Common Issues

#### Node.js Version Issues
```bash
# Check version
node --version

# Update Node.js (use nvm for better version management)
# Windows: https://github.com/coreybutler/nvm-windows
# macOS/Linux: https://github.com/nvm-sh/nvm
```

#### Permission Errors
```bash
# macOS/Linux: Fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# Or use sudo (not recommended)
sudo npm install
```

#### Line Ending Issues
```bash
# Fix all line endings
npm run fix:line-endings

# Configure git globally
git config --global core.autocrlf false  # All platforms
```

#### Port Already in Use
```bash
# Use different port
VITE_PORT=3001 npm run dev

# Find and kill process using port (Linux/macOS)
lsof -ti:5173 | xargs kill -9

# Find and kill process using port (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Getting Help

1. **Check the console output** for specific error messages
2. **Verify environment variables** in `.env.local`
3. **Check Node.js and npm versions** are compatible
4. **Try cleaning and reinstalling**: `npm run clean:install`
5. **Check platform-specific issues** in this guide

## Contributing

When contributing to the project:

1. **Use the cross-platform scripts** to ensure consistency
2. **Test on multiple platforms** when possible
3. **Use `npm run fix:line-endings`** before committing
4. **Follow the established patterns** for environment variables and configuration
