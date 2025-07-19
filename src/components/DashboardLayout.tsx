import * as React from 'react';
import {
  AppProvider,
  DashboardLayout,
  type Navigation,
  type Router,
} from '@toolpad/core';
import { useAuth } from '../hooks/useAuth';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Architecture as FloorplansIcon,
} from '@mui/icons-material';

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
  logo: <img src="/wift-medium.webp" alt="WIFT" style={{ height: 24 }} />,
};

interface DemoProps {
  pathname: string;
  router: Router;
  children: React.ReactNode;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { router } = props;
  const { user, signOut } = useAuth();

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

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={BRANDING}
      router={router}
    >
      <DashboardLayout>{props.children}</DashboardLayout>
    </AppProvider>
  );
}
