import { createContext, useEffect, useState, type ReactNode } from 'react';
import { getCurrentUser, signOut, type AuthUser } from 'aws-amplify/auth';
import {
  Authenticator,
  ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './authenticator-styles.css';
import '../lib/amplify';
import { materialUITheme } from './auth-theme';

/**
 * AuthProvider - Handles authentication with AWS Cognito
 *
 * Features:
 * - Development mode bypass for local development
 * - AWS Cognito integration with OAuth flow
 * - Google OAuth federation support
 * - Automatic user session management
 */

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Development mode - bypass authentication if no real AWS config
  const isDevelopmentMode =
    !import.meta.env.VITE_AWS_USER_POOL_ID ||
    import.meta.env.VITE_AWS_USER_POOL_ID === 'us-east-1_XXXXXXXXX';

  useEffect(() => {
    async function checkAuth() {
      if (isDevelopmentMode) {
        // Mock user for development
        setUser({
          username: 'demo-user',
          userId: 'demo-123',
          signInDetails: {
            loginId: 'demo@example.com',
            authFlowType: 'USER_SRP_AUTH',
          },
        } as AuthUser);
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [isDevelopmentMode]);

  const handleSignOut = async () => {
    if (isDevelopmentMode) {
      setUser(null);
      return;
    }

    try {
      await signOut();
      setUser(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signOut: handleSignOut,
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <AmplifyThemeProvider theme={materialUITheme}>
          <Authenticator>
            {({ signOut: authSignOut, user: authUser }) => {
              // Update the user state when authenticated
              if (authUser) {
                setUser(authUser);
              }
              return (
                <AuthContext.Provider
                  value={{
                    user: authUser || null,
                    loading: false,
                    signOut: authSignOut
                      ? async () => authSignOut()
                      : async () => {
                          // No-op fallback for signOut
                        },
                  }}
                >
                  {children}
                </AuthContext.Provider>
              );
            }}
          </Authenticator>
        </AmplifyThemeProvider>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
