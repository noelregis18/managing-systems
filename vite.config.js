/**
 * Vite Configuration File
 * 
 * This file configures Vite for the React + Electron application.
 * It sets up the build process, development server, and path resolution.
 * 
 * Key features:
 * - React plugin integration
 * - Electron-compatible build settings
 * - Development server configuration
 * - Path aliases for cleaner imports
 */

// Import Vite's configuration function
import { defineConfig } from 'vite'
// Import React plugin for Vite
import react from '@vitejs/plugin-react'
// Import Node.js path module for resolving file paths
import { resolve } from 'path'

// Vite configuration for React + Electron
// This configuration ensures proper building for both web and electron environments
export default defineConfig({
  // Plugins array - React plugin enables JSX and React features
  plugins: [react()],
  
  // Base URL for the application - './' is crucial for Electron compatibility
  // This ensures assets are loaded relative to the app directory
  base: './',
  
  // Build configuration for production builds
  build: {
    outDir: 'dist',        // Output directory for built files
    assetsDir: 'assets',   // Directory for static assets (CSS, images, etc.)
    rollupOptions: {
      input: {
        // Main entry point - points to the HTML file
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  
  // Development server configuration
  server: {
    port: 5173,           // Development server port
    strictPort: true,     // Fail if port is already in use
    host: true,           // Listen on all network interfaces
    cors: true,           // Enable CORS for cross-origin requests
  },
  
  // Path resolution configuration
  resolve: {
    alias: {
      // Create '@' alias pointing to the src directory
      // This allows imports like: import Component from '@/components/Component'
      '@': resolve(__dirname, 'src'),
    },
  },
})