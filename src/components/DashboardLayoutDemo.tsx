import * as React from 'react';
import type { Router } from '@toolpad/core';
import DashboardLayoutBasic from '../components/DashboardLayout';
import DashboardPage from '../pages/DashboardPage';
import FloorplansPage from '../pages/FloorplansPage';
import CreateFloorplanPage from '../pages/CreateFloorplanPage';
import SettingsPage from '../pages/SettingsPage';

function PageContent({
  pathname,
  router,
}: {
  pathname: string;
  router: Router;
}) {
  switch (pathname) {
    case '/dashboard': {
      return <DashboardPage />;
    }
    case '/floorplans': {
      return <FloorplansPage router={router} />;
    }
    case '/floorplans/create': {
      return <CreateFloorplanPage />;
    }
    case '/settings': {
      return <SettingsPage />;
    }
    default: {
      return <DashboardPage />;
    }
  }
}

export default function DashboardLayoutBasicDemo() {
  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <DashboardLayoutBasic pathname={pathname} router={router}>
      <PageContent pathname={pathname} router={router} />
    </DashboardLayoutBasic>
  );
}
