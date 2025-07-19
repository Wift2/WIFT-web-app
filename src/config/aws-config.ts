import type { ResourcesConfig } from 'aws-amplify';

// AWS Cognito configuration
// Replace these values with your actual Cognito configuration
export const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId:
        import.meta.env.VITE_AWS_USER_POOL_ID || 'us-east-1_XXXXXXXXX',
      userPoolClientId:
        import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID ||
        'xxxxxxxxxxxxxxxxxxxxxxxxxx',
      loginWith: {
        oauth: {
          domain:
            import.meta.env.VITE_AWS_OAUTH_DOMAIN ||
            'your-domain.auth.us-east-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: [
            import.meta.env.VITE_AWS_REDIRECT_SIGN_IN ||
              'http://localhost:5174/',
          ],
          redirectSignOut: [
            import.meta.env.VITE_AWS_REDIRECT_SIGN_OUT ||
              'http://localhost:5174/',
          ],
          responseType: 'code',
          providers: ['Google'],
        },
        username: true,
        email: true,
      },
    },
  },
};

// Default theme for Amplify UI
export const amplifyTheme = {
  name: 'wiftai-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f0f9ff',
          20: '#e0f2fe',
          40: '#0ea5e9',
          60: '#0284c7',
          80: '#0369a1',
          90: '#0c4a6e',
          100: '#082f49',
        },
      },
    },
  },
};
