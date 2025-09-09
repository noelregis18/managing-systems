// ESLint Configuration File for Timetable Manager
// This file configures code linting rules and plugins for the React/Electron application

// Import ESLint's recommended JavaScript rules
import js from '@eslint/js'
// Import browser globals for proper environment detection
import globals from 'globals'
// Import React-specific linting plugin
import react from 'eslint-plugin-react'
// Import React Hooks linting plugin for hooks rules
import reactHooks from 'eslint-plugin-react-hooks'
// Import React Refresh plugin for development hot reloading
import reactRefresh from 'eslint-plugin-react-refresh'

// Export the ESLint configuration array
export default [
  // First configuration object: Ignore build directories
  { ignores: ['dist', 'dist-electron'] }, // Ignore build output directories
  
  // Second configuration object: Main linting rules for JavaScript/JSX files
  {
    // Apply these rules to all .js and .jsx files
    files: ['**/*.{js,jsx}'],
    
    // Language options for parsing and environment
    languageOptions: {
      ecmaVersion: 2020, // Use ES2020 features
      globals: globals.browser, // Include browser globals (window, document, etc.)
      parserOptions: {
        ecmaVersion: 'latest', // Use latest ECMAScript features
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Treat files as ES modules
      },
    },
    
    // React-specific settings
    settings: { react: { version: '18.2' } }, // Specify React version for proper linting
    
    // Configure plugins for React development
    plugins: {
      react, // React-specific linting rules
      'react-hooks': reactHooks, // Hooks-specific rules
      'react-refresh': reactRefresh, // Hot reload development rules
    },
    
    // Define the actual linting rules
    rules: {
      // Include recommended rules from ESLint
      ...js.configs.recommended.rules,
      // Include recommended React rules
      ...react.configs.recommended.rules,
      // Include JSX runtime rules for React 17+ automatic JSX transform
      ...react.configs['jsx-runtime'].rules,
      // Include recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // Custom rule overrides
      'react/jsx-no-target-blank': 'off', // Allow target="_blank" in links
      
      // React Refresh rules for development
      'react-refresh/only-export-components': [
        'warn', // Show warning instead of error
        { allowConstantExport: true }, // Allow constant exports for components
      ],
    },
  },
]