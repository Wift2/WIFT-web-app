import type { Theme } from '@mui/material/styles';
import { createBaseTheme, mergeComponents, baseComponents } from '../base';

// WIFT Theme Color System (Updated Brand Colors)
const wiftColors = {
  // Primary Blue (Brand Primary: #0369a1)
  primaryBlue: '#0369a1',
  primaryBlueLight: '#0ea5e9',
  primaryBlueDark: '#075985',
  primaryBlueDeep: '#0c4a6e',
  primaryBlueExtra: '#1e40af',

  // Secondary Green (Brand Secondary: #11b83a)
  secondaryGreen: '#11b83a',
  // secondaryGreenLight: '#22c55e',
  secondaryGreenLight: '#10B981',
  secondaryGreenDark: '#15803d',
  secondaryGreenDeep: '#166534',

  // Accent Colors (Complementary)
  accentCyan: '#06b6d4',
  accentCyanLight: '#22d3ee',
  accentCyanDark: '#0891b2',

  // Additional Wift Colors
  energyOrange: '#f97316',
  vibrantTeal: '#14b8a6',
  electricYellow: '#eab308',

  // Neutral Colors
  wiftWhite: '#ffffff',
  wiftBlack: '#0f172a',
  wiftGray: '#64748b',
  wiftGrayLight: '#f8fafc',
  wiftGrayDark: '#334155',

  // Background Colors
  primaryBackground: '#ffffff',
  secondaryBackground: '#f8fafc',
  cardBackground: '#ffffff',
  // darkBackground: '#040d24ff',
  darkBackground: '#010716ff',
  // darkSecondaryBackground: '#0e131bff',
  darkSecondaryBackground: '#0e131bff',
  // darkBackground: '#0f172a',
  // darkSecondaryBackground: '#1e293b',

  // Text Colors
  primaryText: '#0f172a',
  secondaryText: '#64748b',
  lightText: '#ffffff',
  accentText: '#0369a1',

  // Border and Separator Colors
  border: '#e2e8f0',
  borderHover: '#cbd5e1',
  separator: '#f1f5f9',
};

// WIFT-specific component overrides
const wiftComponents = {
  MuiButton: {
    styleOverrides: {
      contained: {
        background: `linear-gradient(135deg, ${wiftColors.primaryBlueLight} 0%, ${wiftColors.primaryBlue} 100%)`,
        color: wiftColors.wiftWhite,
        '&:hover': {
          background: `linear-gradient(135deg, ${wiftColors.primaryBlue} 0%, ${wiftColors.primaryBlueDark} 100%)`,
          boxShadow: '0px 4px 12px rgba(3, 105, 161, 0.25)',
        },
      },
      outlined: {
        borderColor: wiftColors.primaryBlue,
        color: wiftColors.primaryBlue,
        '&:hover': {
          backgroundColor: `${wiftColors.primaryBlue}10`,
          borderColor: wiftColors.primaryBlueDark,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        border: `1px solid ${wiftColors.border}`,
        boxShadow: '0px 4px 12px rgba(124, 58, 237, 0.08)',
        background: wiftColors.cardBackground,
        '&:hover': {
          boxShadow: '0px 8px 24px rgba(124, 58, 237, 0.12)',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      filled: {
        background: `linear-gradient(135deg, ${wiftColors.primaryBlue} 0%, ${wiftColors.secondaryGreen} 100%)`,
        color: wiftColors.wiftWhite,
      },
      outlined: {
        borderColor: wiftColors.primaryBlue,
        color: wiftColors.primaryBlue,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        background: `linear-gradient(135deg, ${wiftColors.primaryBlue} 0%, ${wiftColors.primaryBlueDark} 100%)`,
        boxShadow: '0px 4px 20px rgba(3, 105, 161, 0.15)',
        '& .MuiToolbar-root': {
          color: wiftColors.wiftWhite,
          '& .MuiIconButton-root': {
            color: wiftColors.wiftWhite,
            '& svg': {
              color: wiftColors.wiftWhite,
            },
          },
          '& .MuiTypography-root': {
            color: wiftColors.wiftWhite,
          },
          '& .MuiButton-root': {
            color: wiftColors.wiftWhite,
          },
          '& .MuiSvgIcon-root': {
            color: wiftColors.wiftWhite,
          },
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        background: wiftColors.primaryBackground,
        borderRight: `1px solid ${wiftColors.border}`,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          background: `linear-gradient(135deg, ${wiftColors.primaryBlue}15 0%, ${wiftColors.secondaryGreen}15 100%)`,
          borderLeft: `3px solid ${wiftColors.primaryBlue}`,
          color: `${wiftColors.primaryBlue} !important`,
          '& .MuiListItemIcon-root': {
            color: `${wiftColors.primaryBlue} !important`,
            '& svg': {
              color: `${wiftColors.primaryBlue} !important`,
            },
          },
          '& .MuiListItemText-primary': {
            color: `${wiftColors.primaryBlue} !important`,
            fontWeight: '600 !important',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${wiftColors.primaryBlue}20 0%, ${wiftColors.secondaryGreen}20 100%)`,
          },
        },
        '&:hover': {
          background: `${wiftColors.primaryBlue}08`,
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: wiftColors.border,
          },
          '&:hover fieldset': {
            borderColor: wiftColors.primaryBlue,
          },
          '&.Mui-focused fieldset': {
            borderColor: wiftColors.primaryBlue,
            boxShadow: `0 0 0 2px ${wiftColors.primaryBlue}20`,
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        background: wiftColors.cardBackground,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        background: wiftColors.cardBackground,
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        background: wiftColors.cardBackground,
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        background: wiftColors.cardBackground,
      },
    },
  },
};

// Light theme
export const wiftLight: Theme = createBaseTheme({
  palette: {
    mode: 'light',
    primary: {
      main: wiftColors.primaryBlue,
      light: wiftColors.primaryBlueLight,
      dark: wiftColors.primaryBlueDark,
      contrastText: wiftColors.wiftWhite,
    },
    secondary: {
      main: wiftColors.secondaryGreen,
      light: wiftColors.secondaryGreenLight,
      dark: wiftColors.secondaryGreenDark,
      contrastText: wiftColors.wiftWhite,
    },
    info: {
      main: wiftColors.accentCyan,
      light: wiftColors.accentCyanLight,
      dark: wiftColors.accentCyanDark,
      contrastText: wiftColors.wiftWhite,
    },
    success: {
      main: wiftColors.vibrantTeal,
      contrastText: wiftColors.wiftWhite,
    },
    warning: {
      main: wiftColors.energyOrange,
      contrastText: wiftColors.wiftWhite,
    },
    error: {
      main: '#EF4444',
      contrastText: wiftColors.wiftWhite,
    },
    background: {
      default: wiftColors.primaryBackground,
      paper: wiftColors.cardBackground,
    },
    text: {
      primary: wiftColors.primaryText,
      secondary: wiftColors.secondaryText,
    },
    divider: wiftColors.border,
  },
  typography: {
    h1: {
      background: `linear-gradient(135deg, ${wiftColors.primaryBlue} 0%, ${wiftColors.secondaryGreen} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      color: wiftColors.primaryText,
    },
    h3: {
      color: wiftColors.primaryText,
    },
    h4: {
      color: wiftColors.primaryText,
    },
    h5: {
      color: wiftColors.primaryText,
    },
    h6: {
      color: wiftColors.primaryText,
    },
    body1: {
      color: wiftColors.primaryText,
    },
    body2: {
      color: wiftColors.secondaryText,
    },
  },
  components: mergeComponents(baseComponents, wiftComponents),
});

// WIFT dark theme specific components
const wiftDarkComponents = {
  MuiButton: {
    styleOverrides: {
      contained: {
        background: `linear-gradient(135deg, ${wiftColors.primaryBlueLight} 0%, ${wiftColors.primaryBlue} 100%)`,
        color: wiftColors.wiftWhite,
        '&:hover': {
          background: `linear-gradient(135deg, ${wiftColors.primaryBlue} 0%, ${wiftColors.primaryBlueDark} 100%)`,
          boxShadow: '0px 4px 12px rgba(14, 165, 233, 0.25)',
        },
      },
      outlined: {
        borderColor: wiftColors.primaryBlueLight,
        color: wiftColors.primaryBlueLight,
        '&:hover': {
          backgroundColor: `${wiftColors.primaryBlueLight}20`,
          borderColor: wiftColors.primaryBlue,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        border: `1px solid #374151`,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
        background: wiftColors.darkSecondaryBackground,
        '&:hover': {
          boxShadow: '0px 8px 24px rgba(14, 165, 233, 0.15)',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      filled: {
        background: `linear-gradient(135deg, ${wiftColors.primaryBlueLight} 0%, ${wiftColors.secondaryGreenLight} 100%)`,
        color: wiftColors.wiftWhite,
      },
      outlined: {
        borderColor: wiftColors.primaryBlueLight,
        color: wiftColors.primaryBlueLight,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        background: `linear-gradient(135deg, ${wiftColors.darkBackground} 0%, ${wiftColors.darkSecondaryBackground} 100%)`,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        '& .MuiToolbar-root': {
          color: wiftColors.wiftWhite,
          '& .MuiIconButton-root': {
            color: wiftColors.wiftWhite,
            '& svg': {
              color: wiftColors.wiftWhite,
            },
          },
          '& .MuiTypography-root': {
            color: wiftColors.wiftWhite,
          },
          '& .MuiButton-root': {
            color: wiftColors.wiftWhite,
          },
          '& .MuiSvgIcon-root': {
            color: wiftColors.wiftWhite,
          },
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        background: wiftColors.darkSecondaryBackground,
        borderRight: `1px solid #374151`,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          background: `linear-gradient(135deg, ${wiftColors.primaryBlueLight}25 0%, ${wiftColors.secondaryGreenLight}25 100%)`,
          borderLeft: `3px solid ${wiftColors.secondaryGreenLight}`,
          color: `${wiftColors.primaryBlueLight} !important`,
          '& .MuiListItemIcon-root': {
            color: `${wiftColors.primaryBlueLight} !important`,
            '& svg': {
              color: `${wiftColors.primaryBlueLight} !important`,
            },
          },
          '& .MuiListItemText-primary': {
            color: `${wiftColors.primaryBlueLight} !important`,
            fontWeight: '600 !important',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${wiftColors.primaryBlueLight}35 0%, ${wiftColors.secondaryGreenLight}35 100%)`,
          },
        },
        '&:hover': {
          background: `${wiftColors.primaryBlueLight}15`,
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#374151',
          },
          '&:hover fieldset': {
            borderColor: wiftColors.primaryBlueLight,
          },
          '&.Mui-focused fieldset': {
            borderColor: wiftColors.primaryBlueLight,
            boxShadow: `0 0 0 2px ${wiftColors.primaryBlueLight}30`,
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        background: wiftColors.darkSecondaryBackground,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        background: wiftColors.darkSecondaryBackground,
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        background: wiftColors.darkSecondaryBackground,
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        background: wiftColors.darkSecondaryBackground,
      },
    },
  },
};

// Dark theme
export const wiftDark: Theme = createBaseTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: wiftColors.primaryBlueLight,
      light: wiftColors.primaryBlue,
      dark: wiftColors.primaryBlueDark,
      contrastText: wiftColors.wiftWhite,
    },
    secondary: {
      main: wiftColors.secondaryGreenLight,
      light: wiftColors.secondaryGreen,
      dark: wiftColors.secondaryGreenDark,
      contrastText: wiftColors.wiftWhite,
    },
    info: {
      main: wiftColors.accentCyanLight,
      light: wiftColors.accentCyan,
      dark: wiftColors.accentCyanDark,
      contrastText: wiftColors.wiftBlack,
    },
    success: {
      main: wiftColors.vibrantTeal,
      contrastText: wiftColors.wiftWhite,
    },
    warning: {
      main: wiftColors.energyOrange,
      contrastText: wiftColors.wiftWhite,
    },
    error: {
      main: '#F87171',
      contrastText: wiftColors.wiftWhite,
    },
    background: {
      default: wiftColors.darkBackground,
      paper: wiftColors.darkSecondaryBackground,
    },
    text: {
      primary: wiftColors.lightText,
      secondary: '#9CA3AF',
    },
    divider: '#374151',
  },
  typography: {
    h1: {
      background: `linear-gradient(135deg, ${wiftColors.primaryBlueLight} 0%, ${wiftColors.secondaryGreenLight} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      color: wiftColors.lightText,
    },
    h3: {
      color: wiftColors.lightText,
    },
    h4: {
      color: wiftColors.lightText,
    },
    h5: {
      color: wiftColors.lightText,
    },
    h6: {
      color: wiftColors.lightText,
    },
    body1: {
      color: wiftColors.lightText,
    },
    body2: {
      color: '#9CA3AF',
    },
  },
  components: mergeComponents(baseComponents, wiftDarkComponents),
});

// Export the complete wift theme
export const wiftTheme = {
  light: wiftLight,
  dark: wiftDark,
};
