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
import React, { useState, useEffect, useMemo } from 'react'
// Import useNavigate hook for programmatic navigation
import { useNavigate } from 'react-router-dom'
// Import Clerk authentication hooks
import { useUser } from '@clerk/clerk-react'
// Import Lucide React icons for statistics cards
import { BookOpen, Building, Users, Calendar } from 'lucide-react'
// Import custom components
import StatCard from './StatCard' // Reusable statistics card component
import ActivityTracker from './ActivityTracker' // Real-time activity tracking component
// Import user profile service
import { loadUserProfile } from '../services/userProfileService'
// Import courses service to load courses for statistics
import { loadUserCourses } from '../services/coursesService'

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
  // Clerk hook to get current user information
  const { user, isSignedIn } = useUser()
  
  // State for tracking activity log entries
  // Stores array of activity change events with timestamps
  const [activityLog, setActivityLog] = useState([])
  
  // State for user section from profile
  const [userSection, setUserSection] = useState('CSE B')
  
  // State for user profile from Supabase
  const [userProfile, setUserProfile] = useState(null)
  
  // Default courses data (matching Courses component)
  const defaultCourses = [
    { id: 1, name: 'Software Engineering', code: 'ESC-501', department: 'CSE / Engineering Science', instructor: 'SAR(CS)', credits: 3, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 2, name: 'Compiler Design', code: 'PCC CS-501', department: 'CSE / Core', instructor: 'RDB(CS)', credits: 3, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 3, name: 'Operating Systems', code: 'PCC CS-502', department: 'CSE / Core', instructor: 'BTM(CS)', credits: 3, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 4, name: 'Object Oriented Programming', code: 'PCC CS-503', department: 'CSE / Core', instructor: 'AB(CS)', credits: 3, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 5, name: 'Introduction to Industrial Management (Humanities III)', code: 'HSMC 501', department: 'Humanities/Management', instructor: 'NF', credits: 3, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 6, name: 'Artificial Intelligence', code: 'PEC IT-501B', department: 'Department Elective', instructor: 'PKP(CS)', credits: 3, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 7, name: 'Software Engineering Lab', code: 'ESC 591', department: 'CSE / Lab', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', credits: 2, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 8, name: 'Operating System Lab', code: 'PCC CS-592', department: 'CSE / Lab', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PKC(CS)', credits: 2, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 9, name: 'Object Oriented Programming Lab', code: 'PCC CS-593', department: 'CSE / Lab', instructor: 'AB(CS)+LKM(CS)+RR(CS)', credits: 2, duration: '6 months', students: 65, semester: 'Fall 2025' },
    { id: 10, name: 'Constitution of India', code: 'MC CS-501A', department: 'Mandatory (MC)', instructor: 'TB(E)', credits: 0, duration: '6 months', students: 65, semester: 'Fall 2025' }
  ]
  
  // State for courses data (to calculate statistics)
  const [courses, setCourses] = useState(defaultCourses)
  
  // Section to lecture hall mapping (matching Timetable component)
  const sectionToLectureHall = {
    'CSE A': 'LH-124',
    'CSE B': 'LH-136',
    'CSE C': 'LH-132'
  }
  
  // Load user section and profile from Supabase
  useEffect(() => {
    const loadUserSection = async () => {
      if (!isSignedIn || !user?.id) {
        // Fallback to localStorage or default
        const localSection = localStorage.getItem('selectedSection') || 'CSE B'
        setUserSection(localSection)
        return
      }

      try {
        const profile = await loadUserProfile(user.id)
        setUserProfile(profile) // Store the full profile
        if (profile?.section) {
          setUserSection(profile.section)
        } else {
          // Fallback to localStorage or default
          const localSection = localStorage.getItem('selectedSection') || 'CSE B'
          setUserSection(localSection)
        }
      } catch (error) {
        console.error('Failed to load user section:', error)
        // Fallback to localStorage or default
        const localSection = localStorage.getItem('selectedSection') || 'CSE B'
        setUserSection(localSection)
      }
    }

    loadUserSection()
    
    // Check for profile updates every 5 seconds
    const interval = setInterval(loadUserSection, 5000)
    
    return () => clearInterval(interval)
  }, [isSignedIn, user?.id])

  // Load courses from Supabase for statistics (same logic as Courses component)
  useEffect(() => {
    async function fetchCourses() {
      if (!isSignedIn || !user?.id) {
        // If not signed in, use default courses only
        setCourses(defaultCourses)
        return
      }
      
      try {
        // Load courses from Supabase
        const data = await loadUserCourses(user.id)
        
        // Convert Supabase courses to component format
        const supabaseCourses = (data || []).map(course => ({
          id: course.id,
          name: course.name,
          code: course.code,
          department: course.department,
          instructor: course.instructor,
          credits: course.credits || 0,
          duration: course.duration,
          students: course.students,
          semester: course.semester
        }))
        
        // Create a map to track which default courses have been replaced
        const replacedDefaults = new Set()
        
        // Start with default courses and replace with Supabase versions if they exist
        const mergedCourses = defaultCourses.map(defaultCourse => {
          const supabaseVersion = supabaseCourses.find(
            c => c.code.toLowerCase() === defaultCourse.code.toLowerCase()
          )
          
          if (supabaseVersion) {
            replacedDefaults.add(supabaseVersion.code.toLowerCase())
            return supabaseVersion
          }
          return defaultCourse
        })
        
        // Add any additional Supabase courses that don't match default courses
        supabaseCourses.forEach(supabaseCourse => {
          if (!replacedDefaults.has(supabaseCourse.code.toLowerCase())) {
            mergedCourses.push(supabaseCourse)
          }
        })
        
        setCourses(mergedCourses)
      } catch (error) {
        console.error('Failed to load courses:', error)
        // Fallback to default courses on error
        setCourses(defaultCourses)
      }
    }
    
    fetchCourses()
    
    // Refresh courses every 5 seconds to get updates when courses are added/modified
    const interval = setInterval(fetchCourses, 5000)
    
    return () => clearInterval(interval)
  }, [isSignedIn, user?.id])

  /**
   * Get time-based greeting based on current time of day
   * Returns "Good morning", "Good afternoon", or "Good evening"
   * 
   * @returns {string} - Time-based greeting
   */
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      return 'Good morning'
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }

  /**
   * Get user's first name from Supabase profile or Clerk user object
   * Capitalizes only the first letter, rest lowercase
   * Falls back to 'User' if name is not available
   * 
   * @returns {string} - User's first name with proper capitalization
   */
  const getUserFirstName = () => {
    let firstName = ''
    
    // First try to get name from Supabase profile
    if (userProfile?.name) {
      firstName = userProfile.name.split(' ')[0]
    } else if (user?.firstName) {
      firstName = user.firstName
    } else if (user?.fullName) {
      firstName = user.fullName.split(' ')[0]
    } else {
      return 'User'
    }
    
    // Capitalize first letter, lowercase the rest
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
  }

  // Calculate statistics from courses using useMemo for performance
  const courseStats = useMemo(() => {
    const totalCourses = courses.length
    const totalCredits = courses.reduce((sum, course) => sum + (course.credits || 0), 0)
    const currentSemester = courses.length > 0 && courses[0]?.semester ? courses[0].semester : 'Fall 2025'
    
    return {
      totalCourses,
      totalCredits,
      currentSemester
    }
  }, [courses])

  // Real data for 5th Semester CSE B dashboard statistics
  // Each stat object contains title, value, icon, colors, and description
  const stats = [
    {
      title: 'Total Courses',
      value: courseStats.totalCourses.toString(),
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
      value: courseStats.totalCredits.toString(),
      icon: Calendar, // Calendar icon for credits
      color: 'text-purple-600', // Purple text color
      bgColor: 'bg-purple-50', // Light purple background
      description: 'Credit hours this semester'
    },
    {
      title: 'Current Semester',
      value: courseStats.currentSemester,
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
    navigate('/timetable', { state: { highlightLabs: true } })
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
    <div className="h-full overflow-hidden">
      {/* Page Header Section */}
      <div className="mb-8">
        {/* Main dashboard title with time-based greeting */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getTimeBasedGreeting()}, {getUserFirstName()}!
        </h1>
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
              <div className="text-sm text-gray-600">
                Browse 5th Semester {userSection} courses
              </div>
            </button>
            {/* Check Timetable button */}
            <button 
              onClick={handleCheckTimetable}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="font-medium text-gray-900">Check Timetable</div>
              <div className="text-sm text-gray-600">
                View {sectionToLectureHall[userSection] || 'LH-136'} weekly schedule ({userSection})
              </div>
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