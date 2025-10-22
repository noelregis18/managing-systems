/**
 * Landing Page Component
 * 
 * This is the main landing page that users see before authentication.
 * It showcases the Timetable Manager application with a modern design
 * using the existing white and blue theme.
 * 
 * Key features:
 * - Hero section with compelling headline
 * - Feature showcase with icons
 * - Call-to-action for sign-in
 * - Professional design matching app theme
 * - Responsive layout
 */

import React from 'react'
import { 
  Calendar, 
  BookOpen, 
  Building, 
  Users, 
  BarChart3, 
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Navbar from './Navbar'
import { SignInButton } from '@clerk/clerk-react'

const LandingPage = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Timetable Management',
      description: 'Create and manage complex college timetables with intelligent scheduling algorithms.'
    },
    {
      icon: BookOpen,
      title: 'Course Organization',
      description: 'Organize courses, subjects, and academic programs with ease and efficiency.'
    },
    {
      icon: Building,
      title: 'Room Management',
      description: 'Track and manage classroom availability and resource allocation.'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Manage faculty, students, and administrative access with role-based permissions.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get insights into timetable utilization and academic performance metrics.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with reliable data backup and recovery systems.'
    }
  ]

  const benefits = [
    'Automated conflict detection',
    'Real-time schedule updates',
    'Mobile-responsive design',
    'Integration with existing systems',
    '24/7 technical support',
    'Regular feature updates'
  ]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-50 via-white to-white py-24">
        {/* Decorative background accents */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary-200/50 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-blue-200/50 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 bg-primary-600 rounded-2xl shadow-xl ring-4 ring-white/60">
                <Calendar className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Streamline Your
              <span className="text-primary-600 block">Time Table Management</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The most comprehensive timetable management system for colleges and universities. 
              Simplify scheduling, manage courses, and optimize resources with our intelligent platform.
            </p>

            <div className="flex justify-center">
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Everything You Need to Manage Your College
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to simplify academic administration and enhance productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group relative h-full">
                  {/* Card with enhanced styling */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden h-full flex flex-col">
                    {/* Icon with enhanced styling */}
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Timetable Manager?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of educational institutions that trust our platform 
                to manage their academic operations efficiently.
              </p>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary-600 rounded-full">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl shadow-md">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Transform Your College?
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your journey towards efficient timetable management today.
                </p>
                <SignInButton mode="modal">
                  <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors duration-200">
                    Sign In to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg ring-4 ring-primary-100/20">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Timetable Manager
                </h3>
                <p className="text-sm text-gray-400 -mt-1">Smart Schedule Management</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Professional Time Table Management System for Educational Excellence
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">System Online</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Secure Platform</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-8">
              <p className="text-sm text-gray-500">
                © 2025 Timetable Manager. All rights reserved. | Built with ❤️ for Education
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
