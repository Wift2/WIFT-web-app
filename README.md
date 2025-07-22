# WIFT - Custom Floorplan Creator

A modern web application for creating and managing custom floorplans. Built with React, TypeScript, and Material-UI, featuring AWS Cognito authentication with Google OAuth support and advanced theming capabilities.

## Features

- **Custom Floorplan Creation**: Intuitive interface for designing custom floorplans
- **Professional Templates**: Pre-built templates for residential and commercial properties
- **Drag & Drop Designer**: Easy-to-use design tools (coming soon)
- **3D Visualization**: View your floorplans in 3D (coming soon)
- **Collaboration Tools**: Share and collaborate on designs (coming soon)
- **Export Options**: Multiple format support for your designs (coming soon)
- **AWS Cognito Authentication**: Secure user authentication with Google OAuth support via Amplify Gen 2
- **WIFT Theme System**: Custom brand theme with professional blue/green color scheme
- **Responsive Design**: Mobile-first responsive design optimized for all devices
- **Professional Navigation**: Clean sidebar navigation with integrated theme controls
- **Code Quality**: Comprehensive ESLint, Prettier, and Unicorn plugin setup
- **Testing**: Vitest and React Testing Library integration
- **Hot Module Replacement**: Fast development with Vite

## Quick Start

### Cross-Platform Setup

**Windows:**

```cmd
setup.bat
```

**macOS/Linux:**

```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup (All Platforms):**

```bash
npm install
cp .env.example .env.local  # Copy environment template (optional)
npm run setup               # Run initial setup
npm run dev                 # Start development server (works immediately with mock auth)
```

> 📚 **Detailed Setup**: See [Cross-Platform Development Guide](./CROSS_PLATFORM_GUIDE.md) for platform-specific instructions, troubleshooting, and advanced configuration.

## Tech Stack

- **React 19** - Latest React with modern hooks and Strict Mode
- **TypeScript 5.8** - Type-safe development with strict configuration
- **Material UI Toolpad Core 0.16** - Professional dashboard framework with integrated theming
- **Material UI 7.2** - Complete design system with advanced theming capabilities
- **WIFT Theme System** - Custom brand implementation optimized for the platform
- **Roboto Font** - Google's Material Design font for consistent typography
- **AWS Amplify 6.15** - Modern Amplify Gen 2 backend with automatic resource generation
- **Vite 7.0** - Lightning-fast build tool and development server
- **ESLint 9.30 + Unicorn** - Advanced code quality enforcement
- **Prettier 3.6** - Consistent code formatting
- **Vitest 3.2** - Fast unit testing framework

## Project Structure

```
├── public/
│   ├── wift-favicon.webp     # Browser favicon
│   └── wift-medium.webp      # Dashboard logo
├── src/
│   ├── auth/
│   │   ├── AuthProvider.tsx  # Authentication context with dev mode
│   │   └── auth-theme.ts     # AWS Amplify Authenticator theme
│   ├── components/
│   │   ├── DashboardLayout.tsx      # Toolpad Core layout with theme integration
│   │   ├── DashboardLayoutDemo.tsx  # Router and page management
│   │   └── ThemeSelector.tsx        # Theme switcher component
│   ├── config/
│   │   └── aws-config.ts     # AWS Cognito configuration
│   ├── hooks/
│   │   └── useAuth.ts        # Authentication hook
│   ├── lib/
│   │   └── amplify.ts        # AWS Amplify setup
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.tsx # Main dashboard with metrics
│   │   ├── Floorplans/
│   │   │   ├── FloorplansPage.tsx # Floorplans and building layouts
│   │   │   └── components/       # Floorplan-specific components
│   │   └── Settings/
│   │       └── SettingsPage.tsx  # User settings and preferences
│   ├── themes/              # WIFT theme system
│   │   ├── base/
│   │   │   └── index.ts     # Base theme components shared across themes
│   │   ├── wift/
│   │   │   └── index.ts     # WIFT brand theme implementation
│   │   └── index.ts         # Theme registry and utilities
│   └── utils/
│       └── helpers.ts        # Utility functions
├── eslint.config.js          # ESLint configuration with Unicorn
├── prettier.config.js        # Prettier formatting rules
├── vite.config.ts           # Vite build configuration
└── vitest.config.ts         # Testing configuration
```

## Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **AWS Account** with Cognito User Pool (optional for development)

### Development Mode

The application includes a development mode bypass for immediate local development without any AWS setup:

```bash
# Quick start - no AWS configuration needed
npm install
npm run dev
```

The app will automatically run with a mock authenticated user when no AWS configuration is detected, allowing you to develop and test the UI immediately.

### Testing Real Cognito Authentication

To test with real AWS Cognito authentication, you have two options:

#### Option 1: Amplify Sandbox (Recommended)

Use Amplify's sandbox environment to create temporary AWS resources for testing:

```bash
# Start Amplify sandbox (creates temporary AWS backend)
npm run amplify:sandbox

# In another terminal, start your dev server
npm run dev
```

The sandbox will:
- Create temporary AWS Cognito User Pool
- Generate `amplify_outputs.json` automatically
- Enable real authentication flows (sign-up, sign-in, Google OAuth)
- Clean up resources when stopped

#### Option 2: Manual AWS Configuration

Create your own AWS resources and configure manually:

1. **Set up AWS credentials** using `aws configure` or environment variables
2. **Create `.env.local`** with your AWS settings (see `.env.example`)
3. **Set `VITE_DEV_MODE=false`** to disable mock authentication
4. **Start development server** with `npm run dev`

### Production AWS Setup (Manual Configuration)

For production deployment or custom AWS setup, you can manually configure AWS resources:

1. **Create AWS Cognito User Pool**
   - Configure OAuth settings with your domain
   - Set up app client with appropriate scopes
   - Note: User Pool ID, Client ID, OAuth Domain

2. **Configure Google OAuth Provider**
   - Go to AWS Cognito Console → Your User Pool → Sign-in experience → Federated providers
   - Add Google as an identity provider:
     - Get Google Client ID and Secret from [Google Cloud Console](https://console.cloud.google.com)
     - Create OAuth 2.0 credentials for your web application
     - Add authorized redirect URIs: `https://your-domain.auth.region.amazoncognito.com/oauth2/idpresponse`
   - Map Google attributes to Cognito user pool attributes (email, name, etc.)

3. **Environment Configuration**

   Create `.env.local` with your AWS settings:

   ```env
   VITE_DEV_MODE=false  # Disable development mode
   VITE_AWS_USER_POOL_ID=us-east-1_XXXXXXXXX
   VITE_AWS_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   VITE_AWS_OAUTH_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
   VITE_AWS_REDIRECT_SIGN_IN=http://localhost:5173/
   VITE_AWS_REDIRECT_SIGN_OUT=http://localhost:5173/
   ```

   **Note**: When using Amplify Gen 2 (recommended), the `amplify_outputs.json` file will automatically configure these settings, making manual `.env.local` setup unnecessary.

### Available Scripts

````bash
# Development
npm run dev          # Start development server with HMR

# Building
npm run build        # TypeScript compilation + Vite build
npm run preview      # Preview production build locally

### Available Scripts

```bash
# Development
npm run dev              # Start development server with HMR
npm run dev:host         # Start development server with network access (mobile testing)

# Building
npm run build            # TypeScript compilation + Vite build
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # ESLint check and auto-fix
npm run lint:check       # ESLint check only (no fixes)
npm run format           # Prettier formatting
npm run format:check     # Check formatting without changes
npm run fix:line-endings # Fix line ending issues (Windows/Mac/Linux compatibility)
npm run type-check       # TypeScript type checking

# AWS Amplify Backend
npm run amplify:sandbox  # Start temporary AWS backend for testing
npm run amplify:generate # Generate types from backend schema
npm run amplify:deploy   # Deploy backend to AWS

# Testing
npm run test             # Run Vitest tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage

# Maintenance
npm run clean            # Clean build artifacts
npm run clean:install    # Clean and reinstall dependencies
npm run setup            # Initial project setup
npm run setup:dev        # Setup and start development
````

## Application Features

### Authentication Flow

- **Development Mode**: Automatic mock authentication for immediate local development (no AWS setup required)
- **Sandbox Mode**: Real AWS Cognito testing with temporary resources via `npm run amplify:sandbox`
- **Production Mode**: Full AWS Cognito integration with persistent backend resources
- **Google OAuth**: One-click sign-in with Google accounts via Cognito federation (requires Google Cloud setup)
- **Custom Theming**: WIFT-styled Authenticator with brand colors and consistent design
- **User Management**: Secure sign-in/sign-out with user context
- **Protected Routes**: Authentication-gated dashboard access

### Dashboard Pages

- **Dashboard** - Overview with metrics cards, charts, and activity feeds
- **Floorplans** - Building layouts and property floorplan management
- **Settings** - User preferences and application configuration

### Material-UI Integration

- **Toolpad Core**: Professional dashboard layout with responsive navigation
- **WIFT Theme Support**: Custom WIFT brand theme with blue/green color scheme
- **Roboto Typography**: Google's Material Design font with full weight variants (300, 400, 500, 700)
- **Component Library**: Full Material-UI v7 component ecosystem
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Theme System**: Single WIFT theme optimized for the platform (expandable for future themes)

## Development Workflow

### Code Quality Standards

The project enforces high code quality with:

- **ESLint**: TypeScript, React, and Unicorn rules for modern JavaScript patterns
- **Prettier**: Consistent code formatting across the entire codebase
- **TypeScript**: Strict type checking with comprehensive type coverage
- **Hot Reloading**: Instant feedback during development with Vite HMR

### Adding New Features

1. **New Pages**: Create components in `src/pages/` and add routes to `DashboardLayoutDemo.tsx`
2. **Navigation**: Update `NAVIGATION` array in `DashboardLayout.tsx`
3. **Authentication**: Use `useAuth()` hook for user state and actions
4. **Theming**: Use WIFT theme context for consistent brand design
5. **Theme Expansion**: Add new themes in `src/themes/` and register in the theme system when needed

## Production Deployment

### AWS Amplify Deployment (Recommended)

WIFT is optimized for AWS Amplify Gen 2 with automatic CI/CD and backend integration:

```bash
# Deploy backend to AWS
npm run amplify:deploy

# Start local sandbox environment for testing
npm run amplify:sandbox
```

**Features:**

- **One-Click Deploy**: Connect Git repo for automatic deployments
- **Amplify Gen 2 Backend**: Modern backend-as-code with TypeScript definitions
- **Auto-Generated Config**: `amplify_outputs.json` automatically created and updated
- **Global CDN**: Automatic SSL and worldwide distribution
- **Environment Management**: Automatic branch-based deployments

See [AMPLIFY_DEPLOYMENT.md](AMPLIFY_DEPLOYMENT.md) for complete setup instructions.

> 📚 **Additional Guides**: 
> - [Cross-Platform Development Guide](./CROSS_PLATFORM_GUIDE.md) - Platform-specific setup and troubleshooting
> - [Routing Implementation Guide](./ROUTING.md) - Custom URL routing with Toolpad Core

### Manual Build Process

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Deployment Checklist

1. **AWS Configuration**: Update Cognito redirect URLs for production domain
2. **Environment Variables**: Set `VITE_*` variables in hosting platform
3. **Build Artifacts**: Deploy the generated `dist/` folder
4. **Static Hosting**: Compatible with Vercel, Netlify, AWS S3, etc.

### Performance Features

- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: Dynamic imports for optimal loading
- **Asset Optimization**: Image and bundle size optimization
- **Modern JavaScript**: ES2020+ with automatic polyfills

## Architecture Decisions

### Why Toolpad Core?

- **Professional UI**: Enterprise-grade dashboard components out of the box
- **Material-UI Integration**: Consistent design system with theming support
- **Responsive Layout**: Mobile-first approach with flexible navigation
- **Developer Experience**: Excellent TypeScript support and documentation

### Why AWS Cognito?

- **Security**: Industry-standard OAuth 2.0 and OpenID Connect
- **Scalability**: Handles millions of users with AWS infrastructure
- **Integration**: Seamless AWS ecosystem integration
- **Compliance**: GDPR, HIPAA, and SOC compliance support

## Testing Cognito Authentication

### Development Mode (No AWS Setup)

For immediate development and UI testing:

```bash
npm run dev
```

The app automatically detects when no AWS configuration exists and runs in development mode with a mock authenticated user. This allows you to:
- Test UI components and navigation
- Develop features without AWS dependencies
- Test authentication context and hooks

### Sandbox Testing (Real AWS, Temporary)

For testing real authentication flows without permanent AWS resources:

1. **Start Amplify Sandbox**:
   ```bash
   npm run amplify:sandbox
   ```
   
2. **Wait for deployment** (2-5 minutes). The sandbox will:
   - Create temporary AWS Cognito User Pool
   - Generate `amplify_outputs.json` automatically
   - Configure authentication settings

3. **Start development server** (in another terminal):
   ```bash
   npm run dev
   ```

4. **Test authentication flows**:
   - ✅ New user registration with email verification
   - ✅ Sign in with email/password
   - ✅ Password reset functionality
   - ✅ Sign out and session management
   - ✅ Google OAuth (if configured with secrets)

5. **Stop sandbox** when done:
   - Press `Ctrl+C` in the sandbox terminal
   - Temporary AWS resources are automatically cleaned up

### Google OAuth Testing (Optional)

To test Google OAuth in sandbox mode:

1. **Set up Google OAuth credentials** in [Google Cloud Console](https://console.cloud.google.com)
2. **Add secrets to sandbox**:
   ```bash
   npx ampx sandbox secret set GOOGLE_CLIENT_ID
   npx ampx sandbox secret set GOOGLE_CLIENT_SECRET
   ```
3. **Test Google sign-in flow** in your application

### Production Testing

For testing against permanent AWS resources:

1. **Deploy backend**:
   ```bash
   npm run amplify:deploy
   ```
2. **Configure production domains** in callback URLs
3. **Test with production user pool** and OAuth settings

### Authentication Test Checklist

#### Basic Authentication:
- [ ] User registration with email
- [ ] Email verification process
- [ ] Sign in with verified credentials
- [ ] Password reset flow
- [ ] Sign out functionality
- [ ] Session persistence across page refreshes

#### Error Handling:
- [ ] Invalid email format validation
- [ ] Password strength requirements
- [ ] Duplicate email registration handling
- [ ] Wrong credentials error messages
- [ ] Network connectivity error handling

#### OAuth Integration:
- [ ] Google OAuth button appears
- [ ] Google sign-in flow completes
- [ ] User profile data mapping
- [ ] OAuth error handling

## Troubleshooting

### Common Development Issues

**Port Conflicts**: Vite automatically finds available ports (usually 5173+)

```bash
# Force specific port
npm run dev -- --port 3000
```

**TypeScript Errors**: Run type checking to identify issues

```bash
npm run type-check
```

**ESLint Issues**: Auto-fix most formatting and style issues

```bash
npm run lint
```

### Authentication Issues

**Development Mode**: Ensure no `.env.local` file exists or `VITE_DEV_MODE=true` for mock authentication

**Sandbox Mode**:
- Run `npm run amplify:sandbox` and wait for "Watching for file changes" message
- Ensure AWS credentials are configured (`aws configure` or environment variables)
- Check that `amplify_outputs.json` was generated after sandbox startup

**Production Mode**:
- Verify AWS credentials and User Pool configuration
- Check redirect URLs match your deployed domain
- Confirm environment variables are properly set in hosting platform

**Google OAuth Issues**:
- Ensure Google OAuth credentials are properly configured in Google Cloud Console
- Verify that authorized redirect URIs include your Cognito domain: `https://your-domain.auth.region.amazoncognito.com/oauth2/idpresponse`
- Check that Google identity provider is properly configured in AWS Cognito
- Confirm attribute mapping between Google and Cognito user attributes
- For sandbox testing, ensure secrets are set: `npx ampx sandbox secret set GOOGLE_CLIENT_ID`

### Build Issues

**Dependency Conflicts**: Clear and reinstall dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

**Memory Issues**: Increase Node.js memory limit

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## Contributing

1. Follow the established code style with ESLint and Prettier
2. Write TypeScript with strict type checking
3. Add tests for new functionality
4. Update documentation for significant changes
5. Ensure all quality checks pass before submitting PRs

## License

MIT License - Open source and free to use for any purpose.
