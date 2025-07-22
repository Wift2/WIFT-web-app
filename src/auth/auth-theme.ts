import type { Theme } from '@aws-amplify/ui-react';

/**
 * WIFT-branded theme for AWS Amplify Authenticator
 *
 * This theme provides consistent styling that matches the WIFT
 * design system used throughout the application.
 */
export const materialUITheme: Theme = {
  name: 'wift-auth-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f0f9ff',
          20: '#e0f2fe',
          40: '#0ea5e9', // primaryBlueLight
          60: '#075985', // primaryBlueDark
          80: '#0369a1', // primaryBlue (main brand color)
          90: '#0c4a6e', // primaryBlueDeep
          100: '#082f49',
        },
        secondary: {
          10: '#f0fdf4',
          20: '#dcfce7',
          40: '#16a34a',
          60: '#15803d', // secondaryGreenDark
          80: '#11b83a', // secondaryGreen
          90: '#166534', // secondaryGreenDeep
          100: '#14532d',
        },
      },
      background: {
        primary: '#ffffff', // wiftWhite
        secondary: '#f8fafc', // wiftGrayLight
      },
      border: {
        primary: '#e2e8f0', // border
        secondary: '#cbd5e1', // borderHover
      },
      font: {
        primary: '#0f172a', // primaryText
        secondary: '#64748b', // secondaryText
        tertiary: '#9ca3af',
      },
    },
    components: {
      authenticator: {
        router: {
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.08)',
          backgroundColor: '{colors.background.primary}',
        },
      },
      button: {
        primary: {
          backgroundColor: '{colors.brand.primary.80}',
          _hover: {
            backgroundColor: '{colors.brand.primary.90}',
          },
          _focus: {
            backgroundColor: '{colors.brand.primary.90}',
          },
        },
        link: {
          color: '{colors.brand.primary.80}',
          _hover: {
            color: '{colors.brand.primary.90}',
          },
        },
      },
      fieldcontrol: {
        borderColor: '{colors.border.primary}',
        _focus: {
          borderColor: '{colors.brand.primary.80}',
          boxShadow: '0 0 0 2px rgba(3, 105, 161, 0.2)',
        },
      },
      heading: {
        color: '{colors.font.primary}',
      },
      text: {
        primary: {
          color: '{colors.font.primary}',
        },
        secondary: {
          color: '{colors.font.secondary}',
        },
      },
    },
    space: {
      small: '8px',
      medium: '16px',
      large: '24px',
      xl: '32px',
    },
    fontSizes: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem',
      xl: '1.25rem',
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      bold: '600',
    },
    radii: {
      small: '8px',
      medium: '12px',
      large: '16px',
    },
  },
};
