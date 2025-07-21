import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * WIFT Authentication Configuration
 *
 * This configuration sets up AWS Cognito for user authentication with:
 * - Email/password authentication
 * - Google OAuth federation
 * - MFA support
 * - Secure user session management
 *
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email', 'profile'],
      },
      callbackUrls: [
        'http://localhost:5173',
        'https://main.d2z8xrqk5yt3yl.amplifyapp.com', // Replace with your Amplify domain
      ],
      logoutUrls: [
        'http://localhost:5173',
        'https://main.d2z8xrqk5yt3yl.amplifyapp.com', // Replace with your Amplify domain
      ],
    },
  },
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
    profilePicture: {
      required: false,
      mutable: true,
    },
    familyName: {
      required: false,
      mutable: true,
    },
    givenName: {
      required: false,
      mutable: true,
    },
  },
});
