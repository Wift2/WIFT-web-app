import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * WIFT Floorplan Creator - Amplify Backend Configuration
 *
 * This backend provides authentication and data services for the WIFT application.
 * Users can sign in with email/password or use Google OAuth federation.
 */
defineBackend({
  auth,
  data,
});
