/**
 * Landing Page Navbar Component
 * 
 * This component provides the navigation bar for the landing page.
 * It includes the app branding and a sign-in button for user authentication.
 * 
 * Key features:
 * - Clean, modern design matching the white/blue theme
 * - Sign-in button with Clerk authentication
 * - Responsive layout
 * - Professional branding
 */

import React from 'react'
import { SignInButton, useUser } from '@clerk/clerk-react'
import { Calendar, LogIn } from 'lucide-react'

const Navbar = () => {
  const { isSignedIn } = useUser()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Timetable Manager</h1>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="flex items-center space-x-4">
            {!isSignedIn && (
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
