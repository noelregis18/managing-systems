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
  ArrowRight,
  X
} from 'lucide-react'
import Navbar from './Navbar'
import { SignInButton } from '@clerk/clerk-react'

const LandingPage = () => {
  const benefits = [
    'Automated conflict detection',
    'Real-time schedule updates',
    'Mobile-responsive design',
    'Integration with existing systems',
    '24/7 technical support',
    'Regular feature updates'
  ]

  const statistics = [
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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Run your college
              <span className="block">timetable like a pro</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              All-in-one platform for managing courses, schedules, and resources without
              the chaos. Experience seamless scheduling and efficient resource management.
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

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-base md:text-lg text-gray-500 mb-4">
              Why choose us?
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              The <span className="text-primary-600">Details</span> Speak
              <span className="block">for Themselves</span>
            </h2>
          </div>

          <div className="bg-[#F5F5F0] rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {statistics.map((stat, index) => {
                const Icon = stat.icon
                const isLastInRow = (index + 1) % 3 === 0
                const isInSecondRow = index >= 3
                const isFirstInRow = index % 3 === 0
              return (
                  <div 
                    key={index} 
                    className={`
                      relative p-8 bg-[#F5F5F0]
                      ${!isLastInRow ? 'border-r border-dotted border-gray-400' : ''}
                      ${!isInSecondRow ? 'border-b border-dotted border-gray-400' : ''}
                      ${index === 0 ? 'rounded-tl-3xl' : ''}
                      ${index === 2 ? 'rounded-tr-3xl' : ''}
                      ${index === 3 ? 'rounded-bl-3xl' : ''}
                      ${index === 5 ? 'rounded-br-3xl' : ''}
                    `}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="flex items-center justify-center w-16 h-16">
                        <Icon className="w-10 h-10 text-primary-600" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
                      {stat.title}
                      </h3>
                    
                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">
                      {stat.description}
                      </p>
                </div>
              )
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-base md:text-lg text-gray-500 mb-4">
              Is this for you?
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              This Platform Is a <span className="text-primary-600">Perfect</span> Fit If You're Ready to ...
              </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* This is for you */}
            <div className="bg-primary-600 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">THIS IS FOR YOU IF:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <p className="text-white">You want to streamline timetable management for your college</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <p className="text-white">You're tired of manual scheduling and conflict resolution</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <p className="text-white">You value efficient resource allocation and room management</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <p className="text-white">You need a comprehensive system to manage courses and schedules</p>
                    </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <p className="text-white">You're ready to transform your college's academic operations</p>
                </div>
              </div>
            </div>

            {/* This is not for you */}
            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">THIS IS NOT FOR YOU IF:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white">You prefer manual paper-based scheduling systems</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white">You don't need automated conflict detection and resolution</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white">You dislike structured, organized timetable management</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white">You just want basic scheduling without comprehensive features</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-white">You're seeking a simple calendar without course management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center w-full py-20 bg-gradient-to-b from-primary-600 to-primary-800 text-white/70">
        {/* Logo/Icon */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
            <h3 className="text-2xl font-bold text-white">
                  Timetable Manager
                </h3>
            <p className="text-sm text-white/70 -mt-1">Smart Schedule Management</p>
              </div>
            </div>
            
        {/* Description */}
        <p className="mt-4 text-center max-w-xl text-sm font-normal leading-relaxed text-white/80">
          Professional Time Table Management System for Educational Excellence. 
          Empowering colleges worldwide with the most advanced timetable management tools. 
          Transform your academic scheduling into reality.
        </p>

        {/* Copyright */}
        <div className="border-t border-white/10 w-full max-w-7xl mt-8 pt-6 space-y-6">
          <p className="text-center text-sm font-normal text-white/60">
            Copyright © 2025 <span className="text-white/80 font-semibold">Timetable Manager</span>. All rights reserved. | Built with ❤️ for Education
          </p>
          <p className="text-center text-sm font-semibold text-white/80 tracking-wide">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-sm">
              <span className="mr-2 text-xs uppercase tracking-[0.2em] text-white/60">Created by</span>
              <span className="text-white font-semibold">Noel Regis</span>
              <span className="mx-2 text-white/50">•</span>
              <span className="text-white font-semibold">Md. Raqib Alam</span>
              <span className="mx-2 text-white/50">•</span>
              <span className="text-white font-semibold">Md. Dilnawaz Ahmad</span>
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
