/**
 * Dashboard Component
 * 
 * This is the main dashboard page that displays key statistics and metrics.
 * It shows summary cards for courses, rooms, departments, and weekly classes
 * exactly as shown in the provided design mockup.
 * Now includes real-time activity tracking with allow/deny system.
 * 
 * Key features:
 * - Statistics overview cards
 * - Real-time activity tracking
 * - Quick action buttons
 * - Responsive grid layout
 * - Navigation integration
 */

// Import React and useState hook for state management
import React, { useState } from 'react'
// Import useNavigate hook for programmatic navigation
import { useNavigate } from 'react-router-dom'
// Import Lucide React icons for statistics cards
import { BookOpen, Building, Users, Calendar } from 'lucide-react'
// Import custom components
import StatCard from './StatCard' // Reusable statistics card component
import ActivityTracker from './ActivityTracker' // Real-time activity tracking component

/**
 * Dashboard Component
 * 
 * This component serves as the main landing page and provides:
 * - Overview statistics for the 5th Semester CSE B
 * - Real-time activity tracking
 * - Quick navigation to other sections
 * - Professional dashboard layout
 */
const Dashboard = () => {
  // React Router hook for programmatic navigation
  const navigate = useNavigate()
  
  // State for tracking activity log entries
  // Stores array of activity change events with timestamps
  const [activityLog, setActivityLog] = useState([])

  // Real data for 5th Semester CSE B dashboard statistics
  // Each stat object contains title, value, icon, colors, and description
  const stats = [
    {
      title: 'Total Courses',
      value: '10',
      icon: BookOpen, // Book icon for courses
      color: 'text-blue-600', // Blue text color
      bgColor: 'bg-blue-50', // Light blue background
      description: 'Theory + Lab + Electives'
    },
    {
      title: 'Total Students',
      value: '195',
      icon: Users, // Users icon for students
      color: 'text-green-600', // Green text color
      bgColor: 'bg-green-50', // Light green background
      description: '5th Semester CSE A+B+C'
    },
    {
      title: 'Total Credits',
      value: '24',
      icon: Calendar, // Calendar icon for credits
      color: 'text-purple-600', // Purple text color
      bgColor: 'bg-purple-50', // Light purple background
      description: 'Credit hours this semester'
    },
    {
      title: 'Current Semester',
      value: 'Fall 2025',
      icon: Building, // Building icon for semester
      color: 'text-orange-600', // Orange text color
      bgColor: 'bg-orange-50', // Light orange background
      description: 'Active academic term'
    }
  ]

  // Navigation handlers for Quick Actions section
  // These functions navigate to different sections of the application
  
  /**
   * Navigate to the Courses page
   */
  const handleViewCourses = () => {
    navigate('/courses')
  }

  /**
   * Navigate to the Timetable page
   */
  const handleCheckTimetable = () => {
    navigate('/timetable')
  }

  /**
   * Navigate to the Timetable page (for lab sessions)
   */
  const handleLabSessions = () => {
    navigate('/timetable')
  }

  /**
   * Handle activity changes from ActivityTracker component
   * Creates a new log entry when activities are allowed or denied
   * 
   * @param {string} activityId - The ID of the activity being changed
   * @param {string} action - The action performed ('allowed' or 'denied')
   */
  const handleActivityChange = (activityId, action) => {
    // Create a new log entry with timestamp and details
    const newLogEntry = {
      id: Date.now(), // Unique ID using timestamp
      activityId, // Activity identifier
      action, // Action performed
      timestamp: new Date(), // Current timestamp
      message: `Activity ${activityId} was ${action}` // Human-readable message
    }
    
    // Add new entry to the beginning of the log array
    setActivityLog(prev => [newLogEntry, ...prev])
    // Log to console for debugging
    console.log(`Activity ${activityId} ${action} at ${new Date().toLocaleTimeString()}`)
  }

  return (
    // Main dashboard container with padding and background
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Page Header Section */}
      <div className="mb-8">
        {/* Main dashboard title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        {/* Welcome message and description */}
        <p className="text-gray-600">
          Welcome to your 5th Semester CSE A+B+C timetable management system. Here's an overview of your current semester.
        </p>
      </div>

      {/* Statistics Grid Section */}
      {/* Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Map through stats array to create StatCard components */}
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
            description={stat.description}
          />
        ))}
      </div>

      {/* Additional Dashboard Content Section */}
      {/* Two-column layout on large screens, single column on smaller screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity Tracker Component */}
        <ActivityTracker onActivityChange={handleActivityChange} />

        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          {/* Quick Actions header */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          {/* Quick action buttons container */}
          <div className="space-y-3">
            {/* View Courses button */}
            <button 
              onClick={handleViewCourses}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="font-medium text-gray-900">View Courses</div>
              <div className="text-sm text-gray-600">Browse 5th Semester CSE B courses</div>
            </button>
            {/* Check Timetable button */}
            <button 
              onClick={handleCheckTimetable}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="font-medium text-gray-900">Check Timetable</div>
              <div className="text-sm text-gray-600">View LH-136 weekly schedule</div>
            </button>
            {/* Lab Sessions button */}
            <button 
              onClick={handleLabSessions}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="font-medium text-gray-900">Lab Sessions</div>
              <div className="text-sm text-gray-600">View lab timings and instructors</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export the Dashboard component as the default export
export default Dashboard