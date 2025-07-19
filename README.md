# WIFT - Custom Floorplan Creator

A modern web application for creating and managing custom floorplans. Built with React, TypeScript, and Material-UI, featuring AWS Cognito authentication with Google OAuth support.

## Features

- **Custom Floorplan Creation**: Intuitive interface for designing custom floorplans
- **Professional Templates**: Pre-built templates for residential and commercial properties  
- **Drag & Drop Designer**: Easy-to-use design tools (coming soon)
- **3D Visualization**: View your floorplans in 3D (coming soon)
- **Collaboration Tools**: Share and collaborate on designs (coming soon)
- **Export Options**: Multiple format support for your designs (coming soon)
- **AWS Cognito Authentication**: Secure user authentication with Google OAuth support
- **Responsive Design**: Mobile-first responsive design with Material-UI components
- **Professional Navigation**: Clean sidebar navigation with floorplan management
- **Code Quality**: Comprehensive ESLint, Prettier, and Unicorn plugin setup
- **Testing**: Vitest and React Testing Library integration
- **Hot Module Replacement**: Fast development with Vite

## Tech Stack

- **React 19** - Latest React with modern hooks and Strict Mode
- **TypeScript 5.8** - Type-safe development with strict configuration
- **Material UI Toolpad Core 0.16** - Professional dashboard framework
- **Material UI 7.2** - Complete design system with theming
- **Roboto Font** - Google's Material Design font for consistent typography
- **AWS Amplify 6.15** - AWS Cognito authentication integration
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
│   │   └── AuthProvider.tsx  # Authentication context with dev mode
│   ├── components/
│   │   ├── DashboardLayout.tsx      # Toolpad Core layout configuration
│   │   └── DashboardLayoutDemo.tsx  # Router and page management
│   ├── config/
│   │   └── aws-config.ts     # AWS Cognito configuration
│   ├── hooks/
│   │   └── useAuth.ts        # Authentication hook
│   ├── lib/
│   │   └── amplify.ts        # AWS Amplify setup
│   ├── pages/
│   │   ├── DashboardPage.tsx # Main dashboard with metrics
│   │   ├── FloorplansPage.tsx # Floorplans and building layouts
│   │   └── SettingsPage.tsx  # User settings and preferences
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

The application includes a development mode bypass for local development without AWS setup:

```bash
# Quick start - no AWS configuration needed
npm install
npm run dev
```

The app will run with a mock authenticated user for immediate development.

### Production AWS Setup (Optional)

For production deployment with real AWS Cognito authentication:

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
   VITE_AWS_USER_POOL_ID=us-east-1_XXXXXXXXX
   VITE_AWS_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   VITE_AWS_OAUTH_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
   VITE_AWS_REDIRECT_SIGN_IN=http://localhost:5174/
   VITE_AWS_REDIRECT_SIGN_OUT=http://localhost:5174/
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR

# Building
npm run build        # TypeScript compilation + Vite build
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # ESLint check and auto-fix
npm run lint:check   # ESLint check only (no fixes)
npm run format       # Prettier formatting
npm run format:check # Check formatting without changes
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run Vitest tests
```

## Application Features

### Authentication Flow

- **Development Mode**: Automatic mock authentication for local development
- **Production Mode**: Full AWS Cognito integration with OAuth flow
- **Google OAuth**: One-click sign-in with Google accounts via Cognito federation
- **User Management**: Secure sign-in/sign-out with user context
- **Protected Routes**: Authentication-gated dashboard access

### Dashboard Pages

- **Dashboard** - Overview with metrics cards, charts, and activity feeds
- **Floorplans** - Building layouts and property floorplan management
- **Settings** - User preferences and application configuration

### Material-UI Integration

- **Toolpad Core**: Professional dashboard layout with responsive navigation
- **Custom Theming**: WIFT brand colors with light/dark mode support
- **Roboto Typography**: Google's Material Design font with full weight variants (300, 400, 500, 700)
- **Component Library**: Full Material-UI v7 component ecosystem
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Authentication UI**: Custom Material-UI styled Authenticator with Google OAuth support

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
4. **Styling**: Follow Material-UI patterns with sx props and theme usage

## Production Deployment

### AWS Amplify Deployment (Recommended)

WIFT is optimized for AWS Amplify with automatic CI/CD and backend integration:

```bash
# Deploy to Amplify
npm run amplify:deploy

# Start local sandbox environment
npm run amplify:sandbox
```

**Features:**
- **One-Click Deploy**: Connect Git repo for automatic deployments
- **Backend Integration**: AWS Cognito authentication pre-configured
- **Global CDN**: Automatic SSL and worldwide distribution
- **Environment Management**: Automatic branch-based deployments

See [AMPLIFY_DEPLOYMENT.md](AMPLIFY_DEPLOYMENT.md) for complete setup instructions.

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

## Troubleshooting

### Common Development Issues

**Port Conflicts**: Vite automatically finds available ports (usually 5174+)
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

**Development Mode**: Ensure no `.env.local` file exists for mock authentication

**Production Mode**: 
- Verify AWS credentials and User Pool configuration
- Check redirect URLs match your deployed domain
- Confirm environment variables are properly set

**Google OAuth Issues**:
- Ensure Google OAuth credentials are properly configured in Google Cloud Console
- Verify that authorized redirect URIs include your Cognito domain
- Check that Google identity provider is properly configured in AWS Cognito
- Confirm attribute mapping between Google and Cognito user attributes

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
