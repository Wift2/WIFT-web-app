import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Cross-platform path resolution
  // Uses Node.js path.resolve() instead of Unix-style '/src' for Windows compatibility
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Development server configuration with cross-platform support
  server: {
    // Enable network access for mobile device testing (set VITE_HOST=true)
    host: process.env.VITE_HOST === 'true',

    // Configurable port (default: 5173, Vite standard)
    port: Number(process.env.VITE_PORT) || 5173,

    // Auto-open browser option (set VITE_OPEN=true)
    open: process.env.VITE_OPEN === 'true',

    // Enable CORS for cross-origin requests (mobile testing, etc.)
    cors: true,
  },

  // Production preview server with same cross-platform options
  preview: {
    port: Number(process.env.VITE_PREVIEW_PORT) || 4173,
    host: process.env.VITE_HOST === 'true',
    open: process.env.VITE_OPEN === 'true',
  },

  // Build configuration optimized for cross-platform deployment
  build: {
    // Generate sourcemaps for development/staging, exclude from production
    sourcemap: process.env.NODE_ENV !== 'production',

    // Browser targets covering Windows (Edge), macOS (Safari), Linux (Chrome/Firefox)
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },

  // Pre-bundle dependencies for consistent performance across platforms
  // Reduces platform-specific module resolution issues and file system differences
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@toolpad/core',
      'aws-amplify',
    ],
  },
});
