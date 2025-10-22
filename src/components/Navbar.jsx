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
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg ring-4 ring-primary-100/50">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Timetable Manager
              </h1>
              <p className="text-xs text-gray-500 font-medium -mt-1">Smart Schedule Management</p>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="flex items-center space-x-4">
            {!isSignedIn && (
              <SignInButton mode="modal">
                <button className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
                  <LogIn className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Sign In
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
