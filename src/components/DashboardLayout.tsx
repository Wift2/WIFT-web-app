import * as React from 'react';
import {
  AppProvider,
  DashboardLayout,
  type Navigation,
  type Router,
  Account,
  ThemeSwitcher,
} from '@toolpad/core';
import { Stack, Typography, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useSidebar } from '../hooks/useSidebar';
import { SidebarProvider } from '../contexts/SidebarContext';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Map as FloorplansIcon,
  LocationOn as VenueIcon,
} from '@mui/icons-material';
import wiftMediumLogo from '../assets/wift-medium.webp';
import wiftLogo from '../assets/wift-logo.png';
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
    segment: 'venues',
    title: 'Venues',
    icon: <VenueIcon />,
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
  title: (
    <Typography
      variant="h6"
      sx={{ fontSize: '1.5rem', ml: -1, letterSpacing: '2.0075px' }}
    >
      IFT
    </Typography>
  ),
  logo: <img src={wiftMediumLogo} alt="WIFT AI" style={{ height: 40 }} />,
};

interface DemoProps {
  pathname: string;
  router: Router;
  children: React.ReactNode;
}

// Sidebar Footer Component that tracks mini state
const SidebarFooter = ({ mini }: { mini?: boolean }) => {
  const { setIsMini } = useSidebar();

  React.useEffect(() => {
    setIsMini(!!mini);
  }, [mini, setIsMini]);

  return (
    <Box sx={{ p: mini ? 0 : 2, textAlign: 'center' }}>
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
        <img
          src={wiftLogo}
          alt="WIFT Logo"
          style={{
            height: '32px',
            width: 'auto',
            marginLeft: mini ? '14px' : '0px',
          }}
        />
      </Box>
      {!mini && (
        <Typography variant="caption" color="text.secondary">
          Copyright © 2025 WIFT, Inc. - All Rights Reserved.
        </Typography>
      )}
      {mini && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            textAlign: 'center',
            marginLeft: '14px',
          }}
        >
          © WIFT
        </Typography>
      )}
    </Box>
  );
};

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

  const sidebarFooter = React.useMemo(() => SidebarFooter, []);

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
          sidebarFooter,
        }}
      >
        {props.children}
      </DashboardLayout>
    </AppProvider>
  );
};

// Main export that wraps with SidebarProvider
const DashboardLayoutWithSidebar = (props: DemoProps) => {
  return (
    <SidebarProvider>
      <DashboardLayoutBasic {...props} />
    </SidebarProvider>
  );
};

export default DashboardLayoutWithSidebar;
