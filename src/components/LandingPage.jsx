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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 bg-primary-600 rounded-2xl shadow-lg">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your College
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to simplify academic administration and enhance productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-6">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Timetable Manager?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of educational institutions that trust our platform 
                to manage their academic operations efficiently.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full">
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
                  <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200">
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Timetable Manager</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional Time Table Management System
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Timetable Manager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
