import type { Theme } from '@aws-amplify/ui-react';

/**
 * Material-UI inspired theme for AWS Amplify Authenticator
 *
 * This theme provides consistent styling that matches the Material-UI
 * design system used throughout the WIFT application.
 */
export const materialUITheme: Theme = {
  name: 'wift-material-theme',
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
      background: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
      },
      border: {
        primary: '#e0e0e0',
        secondary: '#bdbdbd',
      },
    },
    components: {
      authenticator: {
        router: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
      button: {
        primary: {
          backgroundColor: '{colors.brand.primary.80}',
          _hover: {
            backgroundColor: '{colors.brand.primary.90}',
          },
        },
        link: {
          color: '{colors.brand.primary.80}',
        },
      },
      fieldcontrol: {
        borderColor: '{colors.border.primary}',
        _focus: {
          borderColor: '{colors.brand.primary.80}',
          boxShadow: '0 0 0 1px {colors.brand.primary.80}',
        },
      },
    },
    space: {
      medium: '16px',
      large: '24px',
    },
    fontSizes: {
      medium: '14px',
      large: '16px',
    },
  },
};
