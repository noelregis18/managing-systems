/**
 * Main Application Entry Point
 * 
 * This file initializes the React application and sets up the routing system.
 * It serves as the bridge between the HTML and the React component tree.
 * 
 * Key responsibilities:
 * - Initialize React application
 * - Set up routing with HashRouter (for Electron compatibility)
 * - Enable React StrictMode for development warnings
 * - Import global styles
 */

// Import React core library for component creation
import React from 'react'
// Import ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client'
// Import HashRouter for client-side routing (works better with Electron)
import { HashRouter } from 'react-router-dom'
// Import Clerk for authentication
import { ClerkProvider } from '@clerk/clerk-react'
// Import the main App component that contains the application logic
import App from './App.jsx'
// Import global CSS styles for the entire application
import './index.css'

// Clerk publishable key - using the provided key directly
const clerkPubKey = 'pk_test_dHJ1c3RpbmctbGFicmFkb3ItOTguY2xlcmsuYWNjb3VudHMuZGV2JA'

// Create the root element and render the application
// BrowserRouter enables client-side routing for navigation
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode enables additional development checks and warnings
  <React.StrictMode>
    {/* ClerkProvider wraps the app to provide authentication context */}
    <ClerkProvider publishableKey={clerkPubKey}>
      {/* HashRouter uses URL hash for routing, better for Electron apps */}
      <HashRouter>
        {/* Main App component that contains all application logic */}
        <App />
      </HashRouter>
    </ClerkProvider>
  </React.StrictMode>,
)