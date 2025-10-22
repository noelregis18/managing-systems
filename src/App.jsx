/**
 * Main Application Component
 * 
 * This is the root component that manages the overall layout and routing.
 * It combines the sidebar navigation with the main content area and handles
 * the application's routing logic.
 * 
 * Key responsibilities:
 * - Manage application state and navigation
 * - Set up routing for all application pages
 * - Provide the main layout structure
 * - Handle page transitions and active state
 */

// Import React core and useState hook for state management
import React, { useState } from 'react'
// Import routing components from React Router
import { Routes, Route } from 'react-router-dom'
// Import Clerk authentication hooks
import { useUser } from '@clerk/clerk-react'

// Import all application components
import Sidebar from './components/Sidebar' // Navigation sidebar
import Dashboard from './components/Dashboard' // Main dashboard page
import Timetable from './components/Timetable' // Timetable management
import Courses from './components/Courses' // Course management
import Rooms from './components/Rooms' // Room management
import Help from './components/Help' // Help and documentation
import LandingPage from './components/LandingPage' // Landing page for unauthenticated users

/**
 * Main App Component
 * 
 * This component serves as the application shell, providing:
 * - Navigation sidebar on the left
 * - Main content area on the right
 * - Routing system for page navigation
 * - State management for active page tracking
 */
function App() {
  // State to track the currently active page for navigation highlighting
  // This helps users know which page they're currently viewing
  const [activePage, setActivePage] = useState('dashboard')
  
  // Get user authentication status from Clerk
  const { isSignedIn, isLoaded } = useUser()

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show landing page for unauthenticated users
  if (!isSignedIn) {
    return <LandingPage />
  }

  // Show main application for authenticated users
  return (
    // Main application container with flexbox layout
    // h-screen makes it full height, bg-gray-50 provides light gray background
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation - Fixed on the left side */}
      {/* Passes active page state and setter function to sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      {/* Main Content Area - Takes remaining space with proper spacing */}
      <main className="flex-1 overflow-hidden bg-gray-100">
        {/* Scrollable container for main content */}
        <div className="h-full overflow-auto px-8 py-8">
          {/* React Router Routes configuration */}
          <Routes>
            {/* Define all application routes */}
            {/* Default route redirects to dashboard */}
            <Route path="/" element={<Dashboard />} />
            {/* Dashboard route for main overview */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Timetable route for schedule management */}
            <Route path="/timetable" element={<Timetable />} />
            {/* Courses route for course management */}
            <Route path="/courses" element={<Courses />} />
            {/* Rooms route for room management */}
            <Route path="/rooms" element={<Rooms />} />
            {/* Help route for documentation and support */}
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

// Export the App component as the default export
export default App