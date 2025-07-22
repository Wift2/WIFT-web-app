import * as React from 'react';
import {
  AppProvider,
  DashboardLayout,
  type Navigation,
  type Router,
  Account,
  ThemeSwitcher,
} from '@toolpad/core';
import { Stack } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Map as FloorplansIcon,
} from '@mui/icons-material';
import wiftMediumLogo from '../assets/wift-medium.webp';
import { getTheme, type ThemeNames } from '../themes';
import ThemeSelector from './ThemeSelector';

// Navigation configuration
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'floorplans',
    title: 'Floorplans',
    icon: <FloorplansIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Settings',
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
];

const BRANDING = {
  title: 'WIFT',
  logo: <img src={wiftMediumLogo} alt="WIFT AI" style={{ height: 40 }} />,
};

interface DemoProps {
  pathname: string;
  router: Router;
  children: React.ReactNode;
}

const DashboardLayoutBasic = (props: DemoProps) => {
  const { router } = props;
  const { user, signOut } = useAuth();
  const [currentTheme, setCurrentTheme] = React.useState<ThemeNames>('wift');

  const handleThemeChange = React.useCallback((themeName: ThemeNames) => {
    setCurrentTheme(themeName);
  }, []);

  const session = React.useMemo(
    () => ({
      user: {
        name: user?.username || 'Unknown User',
        email: user?.signInDetails?.loginId || 'user@example.com',
        image: `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`,
      },
    }),
    [user]
  );

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        // This won't be called since we handle auth at a higher level
      },
      signOut: async () => {
        await signOut();
      },
    };
  }, [signOut]);

  const currentThemeObj = React.useMemo(() => {
    const lightTheme = getTheme(currentTheme, 'light');
    const darkTheme = getTheme(currentTheme, 'dark');

    // Default to dark mode for all themes
    return { light: darkTheme, dark: lightTheme };
  }, [currentTheme]);

  const toolbarActions = React.useMemo(
    () => (
      <Stack direction="row" spacing={1} alignItems="center">
        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
        <ThemeSwitcher />
        <Account />
      </Stack>
    ),
    [currentTheme, handleThemeChange]
  );

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={BRANDING}
      router={router}
      theme={currentThemeObj}
    >
      <DashboardLayout
        slots={{
          toolbarActions: () => toolbarActions,
        }}
      >
        {props.children}
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutBasic;
