import * as React from 'react';
import type { Router } from '@toolpad/core';
import DashboardLayoutBasic from '../components/DashboardLayout';
import DashboardPage from '../pages/Dashboard';
import FloorplansPage from '../pages/Floorplans';
import CreateFloorplanPage from '../pages/Floorplans/CreateFloorplanPage';
import SettingsPage from '../pages/Settings';

/**
 * Real URL Router Implementation
 * See ROUTING.md for complete documentation and usage examples.
 */

/**
 * Route-to-Component Mapping
 * Add new routes here when creating new pages.
 */
const PageContent = ({
  pathname,
  router,
}: {
  pathname: string;
  router: Router;
}) => {
  switch (pathname) {
    case '/dashboard': {
      return <DashboardPage />;
    }
    case '/floorplans': {
      return <FloorplansPage router={router} />;
    }
    case '/floorplans/create': {
      return <CreateFloorplanPage router={router} />;
    }
    case '/settings': {
      return <SettingsPage />;
    }
    default: {
      return <DashboardPage />;
    }
  }
};

const DashboardLayoutBasicDemo = () => {
  // Initialize pathname from current browser URL, fallback to dashboard
  const [pathname, setPathname] = React.useState(() => {
    const currentPath = globalThis.location.pathname;
    // If at root or empty path, default to dashboard
    return currentPath === '/' || !currentPath ? '/dashboard' : currentPath;
  });

  // Initialize search parameters from current browser URL
  const [searchParams, setSearchParams] = React.useState(() => {
    return new URLSearchParams(globalThis.location.search);
  });

  // Handle initial redirect to dashboard if at root
  React.useEffect(() => {
    if (globalThis.location.pathname === '/' && pathname === '/dashboard') {
      globalThis.history.replaceState({}, '', '/dashboard');
    }
  }, [pathname]);

  // Sync internal state changes to browser URL
  React.useEffect(() => {
    const url = searchParams.toString()
      ? `${pathname}?${searchParams}`
      : pathname;

    if (globalThis.location.pathname + globalThis.location.search !== url) {
      globalThis.history.pushState({}, '', url);
    }
  }, [pathname, searchParams]);

  // Listen for browser back/forward navigation
  React.useEffect(() => {
    const handlePopState = () => {
      setPathname(globalThis.location.pathname);
      setSearchParams(new URLSearchParams(globalThis.location.search));
    };

    globalThis.addEventListener('popstate', handlePopState);
    return () => globalThis.removeEventListener('popstate', handlePopState);
  }, []);

  // Create router object with real URL functionality
  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams,
      navigate: (path) => {
        const url = String(path);
        const [newPathname, search] = url.split('?');

        setPathname(newPathname);
        setSearchParams(new URLSearchParams(search || ''));
      },
    };
  }, [pathname, searchParams]);

  return (
    <DashboardLayoutBasic pathname={pathname} router={router}>
      <PageContent pathname={pathname} router={router} />
    </DashboardLayoutBasic>
  );
};

export default DashboardLayoutBasicDemo;
