import {
  createTheme,
  type Theme,
  type ThemeOptions,
} from '@mui/material/styles';

// Base component styles that all themes inherit
export const baseComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none' as const,
        boxShadow: 'none',
        '&:hover': {
          transform: 'translateY(-1px)',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        borderRadius: 0, // Remove all border radius from AppBar
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: 0, // Remove all border radius from Drawer
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        margin: '4px 0',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 16,
      },
    },
  },
};

// Base typography settings
export const baseTypography = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
  },
  h2: {
    fontWeight: 600,
    fontSize: '2rem',
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.25rem',
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.125rem',
  },
  h6: {
    fontWeight: 500,
    fontSize: '1rem',
  },
  body1: {
    fontSize: '1rem',
  },
  body2: {
    fontSize: '0.875rem',
  },
  button: {
    fontWeight: 600,
    textTransform: 'none' as const,
  },
};

// Base shape settings
export const baseShape = {
  borderRadius: 12,
};

// Base shadows for light themes
export const lightShadows = [
  'none',
  '0px 2px 4px rgba(124, 58, 237, 0.05)',
  '0px 4px 8px rgba(124, 58, 237, 0.08)',
  '0px 8px 16px rgba(124, 58, 237, 0.12)',
  '0px 12px 24px rgba(124, 58, 237, 0.15)',
  '0px 16px 32px rgba(124, 58, 237, 0.18)',
  '0px 20px 40px rgba(124, 58, 237, 0.20)',
  '0px 24px 48px rgba(124, 58, 237, 0.22)',
  '0px 28px 56px rgba(124, 58, 237, 0.24)',
  '0px 32px 64px rgba(124, 58, 237, 0.26)',
  '0px 36px 72px rgba(124, 58, 237, 0.28)',
  '0px 40px 80px rgba(124, 58, 237, 0.30)',
  '0px 44px 88px rgba(124, 58, 237, 0.32)',
  '0px 48px 96px rgba(124, 58, 237, 0.34)',
  '0px 52px 104px rgba(124, 58, 237, 0.36)',
  '0px 56px 112px rgba(124, 58, 237, 0.38)',
  '0px 60px 120px rgba(124, 58, 237, 0.40)',
  '0px 64px 128px rgba(124, 58, 237, 0.42)',
  '0px 68px 136px rgba(124, 58, 237, 0.44)',
  '0px 72px 144px rgba(124, 58, 237, 0.46)',
  '0px 76px 152px rgba(124, 58, 237, 0.48)',
  '0px 80px 160px rgba(124, 58, 237, 0.50)',
  '0px 84px 168px rgba(124, 58, 237, 0.52)',
  '0px 88px 176px rgba(124, 58, 237, 0.54)',
  '0px 92px 184px rgba(124, 58, 237, 0.56)',
];

// Base shadows for dark themes
export const darkShadows = [
  'none',
  '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '0px 4px 8px rgba(0, 0, 0, 0.15)',
  '0px 8px 16px rgba(0, 0, 0, 0.2)',
  '0px 12px 24px rgba(0, 0, 0, 0.25)',
  '0px 16px 32px rgba(0, 0, 0, 0.3)',
  '0px 20px 40px rgba(0, 0, 0, 0.35)',
  '0px 24px 48px rgba(0, 0, 0, 0.4)',
  '0px 28px 56px rgba(0, 0, 0, 0.45)',
  '0px 32px 64px rgba(0, 0, 0, 0.5)',
  '0px 36px 72px rgba(0, 0, 0, 0.55)',
  '0px 40px 80px rgba(0, 0, 0, 0.6)',
  '0px 44px 88px rgba(0, 0, 0, 0.65)',
  '0px 48px 96px rgba(0, 0, 0, 0.7)',
  '0px 52px 104px rgba(0, 0, 0, 0.75)',
  '0px 56px 112px rgba(0, 0, 0, 0.8)',
  '0px 60px 120px rgba(0, 0, 0, 0.85)',
  '0px 64px 128px rgba(0, 0, 0, 0.9)',
  '0px 68px 136px rgba(0, 0, 0, 0.95)',
  '0px 72px 144px rgba(0, 0, 0, 1)',
  '0px 76px 152px rgba(0, 0, 0, 1)',
  '0px 80px 160px rgba(0, 0, 0, 1)',
  '0px 84px 168px rgba(0, 0, 0, 1)',
  '0px 88px 176px rgba(0, 0, 0, 1)',
  '0px 92px 184px rgba(0, 0, 0, 1)',
];

// Utility function to merge theme options with base
export function createBaseTheme(themeOptions: ThemeOptions): Theme {
  const shadows =
    themeOptions.palette?.mode === 'dark' ? darkShadows : lightShadows;

  return createTheme({
    typography: {
      ...baseTypography,
      ...themeOptions.typography,
    },
    shape: {
      ...baseShape,
      ...themeOptions.shape,
    },
    shadows: shadows as unknown as Theme['shadows'],
    components: {
      ...baseComponents,
      ...themeOptions.components,
    },
    ...themeOptions,
  });
}

// Deep merge function for component overrides
export function mergeComponents(
  baseComponents: Record<string, unknown>,
  themeComponents: Record<string, unknown>
) {
  return {
    ...baseComponents,
    ...themeComponents,
  };
}
