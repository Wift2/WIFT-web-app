# Amplify Deployment Guide

This guide explains how to deploy the WIFT Floorplan Creator to AWS Amplify.

## Prerequisites

1. **AWS Account**: You need an active AWS account
2. **AWS CLI**: Install and configure the AWS CLI
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Deployment Steps

### 1. Connect Repository to Amplify

1. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Choose your Git provider and repository
4. Select the main branch

### 2. Configure Build Settings

The `amplify.yml` file in the root directory will automatically configure the build process:

```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - npm ci --cache .npm --prefer-offline
        - npx amplify generate
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - .npm/**/*
      - node_modules/**/*
```

### 3. Environment Variables (Optional)

If you want to use Google OAuth, add these **secrets** in the Amplify console:

- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID (stored as Amplify secret)
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret (stored as Amplify secret)

**Note**: These are configured as Amplify secrets using the `secret()` function in the auth configuration, not regular environment variables.

### 4. Deploy

1. Review your settings and click "Save and deploy"
2. Amplify will build and deploy your application
3. The first deployment may take 5-10 minutes

## Backend Configuration

The application uses Amplify Gen 2 for backend services:

- **Authentication**: AWS Cognito with email/password and Google OAuth
- **Infrastructure**: Defined in `amplify/` directory
- **Auto-generated**: `amplify_outputs.json` is generated during deployment

## Local Development with Amplify

To run the app locally with Amplify backend:

```bash
# Install dependencies
npm install

# Start Amplify sandbox (optional)
npm run amplify:sandbox

# Start development server
npm run dev
```

## Production URLs

After deployment, update the callback URLs in:

1. **`amplify/auth/resource.ts`**: Update `callbackUrls` and `logoutUrls`
2. **Google OAuth Console**: Add your Amplify domain to authorized origins

## Monitoring

- **Amplify Console**: Monitor deployments and performance
- **CloudWatch**: View application logs and metrics
- **Cognito Console**: Manage users and authentication settings

## Troubleshooting

### Common Issues

1. **Build Fails**: Check the build logs in Amplify console
2. **Authentication Issues**: Verify OAuth settings and callback URLs
3. **Environment Variables**: Ensure all required variables are set

### Support Resources

- [Amplify Documentation](https://docs.amplify.aws/react/)
- [Amplify Gen 2 Guide](https://docs.amplify.aws/gen2/)
- [Cognito Documentation](https://docs.aws.amazon.com/cognito/)
