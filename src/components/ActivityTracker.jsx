/**
 * ActivityTracker Component
 *
 * This component manages real-time activity tracking and provides
 * an allow/deny system for changes made to the timetable.
 * Now shows actual upcoming classes based on current date and time.
 * 
 * Features:
 * - Real-time class tracking
 * - Current and next class detection
 * - Activity approval system
 * - Live time updates
 * - Priority-based activity management
 */

// Import React hooks for state management and side effects
import React, { useState, useEffect } from 'react'
// Import Lucide React icons for UI elements
import { Clock, CheckCircle, XCircle, AlertCircle, Activity, Settings, Calendar, BookOpen } from 'lucide-react'
// Import Clerk authentication hooks
import { useUser } from '@clerk/clerk-react'
// Import user profile service
import { loadUserProfile } from '../services/userProfileService'

/**
 * ActivityTracker Component
 * 
 * @param {function} onActivityChange - Callback function to notify parent of activity changes
 * 
 * This component provides real-time activity tracking for the timetable system:
 * - Tracks current and upcoming classes
 * - Provides activity approval/rejection system
 * - Updates automatically based on current time
 * - Shows live activity feed
 */
const ActivityTracker = ({ onActivityChange }) => {
  // Clerk hook to get current user information
  const { user, isSignedIn } = useUser()
  
  // Get selected section from user profile (prioritize profile section over localStorage)
  const [selectedSection, setSelectedSection] = useState(() => {
    // First try localStorage (for backward compatibility)
    return localStorage.getItem('selectedSection') || 'CSE B'
  })

  // Timetable data for all sections (matching Timetable component structure)
  const timetableDataA = {
    'Tuesday': {
      '09:30-10:20': { course: 'PCC CS-501', instructor: 'J(CS)', subject: 'Compiler Design' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'BR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PCC CS-502', instructor: 'RKM(CS)', subject: 'Operating Systems' },
      '12:00-12:50': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      '13:40-14:30': { course: 'PCC CS-503', instructor: 'SKHC(CS)', subject: 'Object Oriented Programming' },
      '14:30-15:20': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' }
    },
    'Wednesday': {
      '09:30-10:20': { course: 'PEC IT-501B', instructor: 'PC(CS)', subject: 'Artificial Intelligence' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'BR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PCC CS-502', instructor: 'RKM(CS)', subject: 'Operating Systems' },
      '12:00-12:50': { course: 'PCC CS-501', instructor: 'J(CS)', subject: 'Compiler Design' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '15:20-16:10': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      '16:10-17:00': { course: 'GROOM', instructor: 'BR(CS)', subject: 'Grooming Session' }
    },
    'Thursday': {
      '09:30-10:20': { course: 'PCC CS-501', instructor: 'J(CS)', subject: 'Compiler Design' },
      '10:20-11:10': { course: 'PCC CS-503', instructor: 'SKHC(CS)', subject: 'Object Oriented Programming' },
      '11:10-12:00': { course: 'ESC-501', instructor: 'BR(CS)', subject: 'Software Engineering' },
      '12:00-12:50': { course: 'PEC IT-501B', instructor: 'PC(CS)', subject: 'Artificial Intelligence' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'SKHC(CS)+AS(CS)+PC(CS)+AD(CS)', subject: 'Object Oriented Programming Lab' },
      '15:20-16:10': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'SKHC(CS)+AS(CS)+PC(CS)+AD(CS)', subject: 'Object Oriented Programming Lab' },
      '16:10-17:00': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'SKHC(CS)+AS(CS)+PC(CS)+AD(CS)', subject: 'Object Oriented Programming Lab' }
    },
    'Friday': {
      '09:30-10:20': { course: 'ESC-501', instructor: 'BR(CS)', subject: 'Software Engineering' },
      '10:20-11:10': { course: 'PCC CS-502', instructor: 'RKM(CS)', subject: 'Operating Systems' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'PC(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-503', instructor: 'SKHC(CS)', subject: 'Object Oriented Programming' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+PR(CS)+LKM(CS)', subject: 'Software Engineering Lab' },
      '15:20-16:10': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+PR(CS)+LKM(CS)', subject: 'Software Engineering Lab' },
      '16:10-17:00': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+PR(CS)+LKM(CS)', subject: 'Software Engineering Lab' }
    },
    'Saturday': {
      '09:30-10:20': { course: 'PCC CS-502', instructor: 'RKM(CS)', subject: 'Operating Systems' },
      '10:20-11:10': { course: 'PCC CS-503', instructor: 'SKHC(CS)', subject: 'Object Oriented Programming' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'PC(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-501', instructor: 'J(CS)', subject: 'Compiler Design' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '15:20-16:10': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '16:10-17:00': { course: 'APTI', instructor: 'BR(CS)', subject: 'Aptitude Training' }
    }
  }

  const timetableDataB = {
    'Tuesday': {
      '09:30-10:20': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      '13:40-14:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '14:30-15:20': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      '15:20-16:10': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      '16:10-17:00': { course: 'GROOM', instructor: 'PR(CS)', subject: 'Grooming Session' }
    },
    'Wednesday': {
      '09:30-10:20': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      '13:40-14:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '14:30-15:20': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' },
      '15:20-16:10': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' },
      '16:10-17:00': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' }
    },
    'Thursday': {
      '09:30-10:20': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
      '10:20-11:10': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
      '11:10-12:00': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
      '12:00-12:50': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
      '13:40-14:30': { course: 'LIB', instructor: 'LIBRARIAN', subject: 'Library' },
      '14:30-15:20': { course: 'PCC CS-593 (LAB 3&4)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-593 (LAB 3&4)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-593 (LAB 3&4)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' }
    },
    'Friday': {
      '09:30-10:20': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
      '10:20-11:10': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
      '11:10-12:00': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      '12:00-12:50': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'APTI', instructor: 'AM(CS)', subject: 'Aptitude Training' },
      '15:20-16:10': { course: 'APTI', instructor: 'BTM(CS)', subject: 'Aptitude Training' },
      '16:10-17:00': { course: 'GROOM', instructor: 'PKC(CS)', subject: 'Grooming Session' }
    },
    'Saturday': {
      '09:30-10:20': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
      '12:00-12:50': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
      '13:40-14:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '14:30-15:20': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' },
      '15:20-16:10': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' },
      '16:10-17:00': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' }
    }
  }

  const timetableDataC = {
    'Tuesday': {
      '09:30-10:20': { course: 'PCC CS-503', instructor: 'PR(CS)', subject: 'Object Oriented Programming' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SK(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'SKM(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-501', instructor: 'AS(CS)', subject: 'Compiler Design' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '15:20-16:10': { course: 'GROOM', instructor: 'BTM(CS)', subject: 'Grooming Session' },
      '16:10-17:00': { course: 'APTI', instructor: 'SG(CS)', subject: 'Aptitude Training' }
    },
    'Wednesday': {
      '09:30-10:20': { course: 'PEC IT-501B', instructor: 'SKM(CS)', subject: 'Artificial Intelligence' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SK(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PCC CS-501', instructor: 'AS(CS)', subject: 'Compiler Design' },
      '12:00-12:50': { course: 'PCC CS-503', instructor: 'PR(CS)', subject: 'Object Oriented Programming' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'PR(CS)+RKM(CS)+PKC(CS)+SP(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'PR(CS)+RKM(CS)+PKC(CS)+SP(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'PR(CS)+RKM(CS)+PKC(CS)+SP(CS)', subject: 'Operating Systems Lab' }
    },
    'Thursday': {
      '09:30-10:20': { course: 'PCC CS-501', instructor: 'AS(CS)', subject: 'Compiler Design' },
      '10:20-11:10': { course: 'PCC CS-503', instructor: 'PR(CS)', subject: 'Object Oriented Programming' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'SKM(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'ESC-501', instructor: 'SK(CS)', subject: 'Software Engineering' },
      '13:40-14:30': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      '14:30-15:20': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+SAR(CS)+LKM(CS)+SP(CS)', subject: 'Software Engineering Lab' },
      '15:20-16:10': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+SAR(CS)+LKM(CS)+SP(CS)', subject: 'Software Engineering Lab' },
      '16:10-17:00': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+SAR(CS)+LKM(CS)+SP(CS)', subject: 'Software Engineering Lab' }
    },
    'Friday': {
      '09:30-10:20': { course: 'PCC CS-503', instructor: 'PR(CS)', subject: 'Object Oriented Programming' },
      '10:20-11:10': { course: 'PCC CS-501', instructor: 'AS(CS)', subject: 'Compiler Design' },
      '11:10-12:00': { course: 'PCC CS-502', instructor: 'AC(CS)', subject: 'Operating Systems' },
      '12:00-12:50': { course: 'PCC CS-502', instructor: 'AC(CS)', subject: 'Operating Systems' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '15:20-16:10': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '16:10-17:00': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' }
    },
    'Saturday': {
      '09:30-10:20': { course: 'PCC CS-502', instructor: 'AC(CS)', subject: 'Operating Systems' },
      '10:20-11:10': { course: 'PCC CS-502', instructor: 'AC(CS)', subject: 'Operating Systems' },
      '11:10-12:00': { course: 'ESC-501', instructor: 'SK(CS)', subject: 'Software Engineering' },
      '12:00-12:50': { course: 'PEC IT-501B', instructor: 'SKM(CS)', subject: 'Artificial Intelligence' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'AC(CS)+BM(CS)+AM(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'AC(CS)+BM(CS)+AM(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'AC(CS)+BM(CS)+AM(CS)', subject: 'Operating Systems Lab' }
    }
  }

  // Get timetable data based on selected section
  const getTimetableData = () => {
    switch (selectedSection) {
      case 'CSE A': return timetableDataA
      case 'CSE B': return timetableDataB
      case 'CSE C': return timetableDataC
      default: return timetableDataB
    }
  }

  // Time slots in order - defines the daily schedule structure (matching Timetable format)
  const timeSlots = [
    '09:30-10:20', '10:20-11:10', '11:10-12:00', '12:00-12:50', 
    'LUNCH', '13:40-14:30', '14:30-15:20', '15:20-16:10', '16:10-17:00'
  ]

  // Days of the week when classes are held (excluding Sunday and Monday)
  const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Load section from user profile and listen for changes
  useEffect(() => {
    const loadSectionFromProfile = async () => {
      if (!isSignedIn || !user?.id) {
        // Fallback to localStorage if not signed in
        const localSection = localStorage.getItem('selectedSection') || 'CSE B'
        setSelectedSection(localSection)
        return
      }

      try {
        const profile = await loadUserProfile(user.id)
        if (profile?.section) {
          // Use section from user profile
          setSelectedSection(profile.section)
          // Also update localStorage for backward compatibility
          localStorage.setItem('selectedSection', profile.section)
        } else {
          // If no section in profile, use localStorage or default
          const localSection = localStorage.getItem('selectedSection') || 'CSE B'
          setSelectedSection(localSection)
        }
      } catch (error) {
        console.error('Failed to load section from profile:', error)
        // Fallback to localStorage on error
        const localSection = localStorage.getItem('selectedSection') || 'CSE B'
        setSelectedSection(localSection)
      }
    }

    // Load initially
    loadSectionFromProfile()

    // Listen for localStorage changes (when Timetable page changes section)
    const handleStorageChange = () => {
      const newSection = localStorage.getItem('selectedSection') || 'CSE B'
      setSelectedSection(newSection)
    }

    // Check for profile changes every 5 seconds
    const profileInterval = setInterval(loadSectionFromProfile, 5000)

    // Check for localStorage changes every second (for Timetable page updates)
    const storageInterval = setInterval(handleStorageChange, 1000)

    // Also listen to storage events (when changed from another tab/window)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      clearInterval(profileInterval)
      clearInterval(storageInterval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [isSignedIn, user?.id])

  // State management for activities and current time
  const [activities, setActivities] = useState([]) // Array of current activities
  const [currentTime, setCurrentTime] = useState(new Date()) // Current time for live updates

  // Permission settings for activity management
  const [permissions, setPermissions] = useState({
    autoApprove: false,        // Automatically approve activities
    requireConfirmation: true, // Require manual confirmation
    notifyOnChanges: true,     // Show notifications for changes
    trackAllActivities: true   // Track all activity types
  })

  /**
   * Get the next class based on current date and time for selected section
   * Determines which class is coming up next based on current time
   * 
   * @returns {Object|null} - Next class information or null if no classes
   */
  const getNextClass = () => {
    const timetableData = getTimetableData()
    const now = new Date()
    const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    
    // Convert current time to minutes for easier comparison
    const currentTimeInMinutes = currentHour * 60 + currentMinute
    
    // Map JavaScript day numbers to our timetable days
    const dayMap = {
      0: null, // Sunday - no classes
      1: null, // Monday - no classes  
      2: 'Tuesday',
      3: 'Wednesday', 
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }
    
    const currentDayName = dayMap[currentDay]
    
    // If it's Sunday or Monday, show Tuesday's first class
    if (!currentDayName) {
      const tuesdayData = timetableData['Tuesday']
      if (tuesdayData && tuesdayData['09:30-10:20']) {
        const firstClass = tuesdayData['09:30-10:20']
        return {
          day: 'Tuesday',
          time: '09:30-10:20',
          class: firstClass,
          message: `Next class: ${firstClass.course} (${firstClass.subject}) on Tuesday at 9:30 AM`,
          priority: 'high',
          status: 'upcoming'
        }
      }
    }
    
    // Find the next class for today
    const dayData = timetableData[currentDayName]
    if (dayData) {
      for (let i = 0; i < timeSlots.length; i++) {
        const timeSlot = timeSlots[i]
        if (timeSlot === 'LUNCH') continue // Skip lunch break
        
        const [startTime] = timeSlot.split('-')
        const [startHour, startMinute] = startTime.split(':').map(Number)
        const startTimeInMinutes = startHour * 60 + startMinute
        
        // If this time slot is in the future today
        if (startTimeInMinutes > currentTimeInMinutes) {
          const classData = dayData[timeSlot]
          if (classData) {
            const timeDisplay = startTime.replace(/^0/, '') // Remove leading zero for display
            return {
              day: currentDayName,
              time: timeSlot,
              class: classData,
              message: `Next class: ${classData.course} (${classData.subject}) on ${currentDayName} at ${timeDisplay}`,
              priority: 'high',
              status: 'upcoming'
            }
          }
        }
      }
    }
    
    // If no more classes today, find tomorrow's first class
    const currentDayIndex = days.indexOf(currentDayName)
    const nextDayIndex = (currentDayIndex + 1) % days.length
    const nextDay = days[nextDayIndex]
    
    // Find first class of next day
    const nextDayData = timetableData[nextDay]
    if (nextDayData) {
      for (const timeSlot of timeSlots) {
        if (timeSlot === 'LUNCH') continue // Skip lunch break
        
        const classData = nextDayData[timeSlot]
        if (classData) {
          const [startTime] = timeSlot.split('-')
          const timeDisplay = startTime.replace(/^0/, '') // Remove leading zero for display
          return {
            day: nextDay,
            time: timeSlot,
            class: classData,
            message: `Next class: ${classData.course} (${classData.subject}) on ${nextDay} at ${timeDisplay}`,
            priority: 'medium',
            status: 'upcoming'
          }
        }
      }
    }
    
    return null
  }

  /**
   * Get current class if any for selected section
   * Determines if user is currently in a class based on current time
   * 
   * @returns {Object|null} - Current class information or null if not in class
   */
  const getCurrentClass = () => {
    const timetableData = getTimetableData()
    const now = new Date()
    const currentDay = now.getDay()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute
    
    // Map JavaScript day numbers to timetable days
    const dayMap = {
      0: null, 1: null, 2: 'Tuesday', 3: 'Wednesday', 
      4: 'Thursday', 5: 'Friday', 6: 'Saturday'
    }
    
    const currentDayName = dayMap[currentDay]
    if (!currentDayName) return null
    
    const dayData = timetableData[currentDayName]
    if (!dayData) return null
    
    // Check if we're currently in a class time slot
    for (let i = 0; i < timeSlots.length; i++) {
      const timeSlot = timeSlots[i]
      if (timeSlot === 'LUNCH') continue // Skip lunch break
      
      const [startTime, endTime] = timeSlot.split('-')
      const [startHour, startMinute] = startTime.split(':').map(Number)
      const [endHour, endMinute] = endTime.split(':').map(Number)
      
      const startTimeInMinutes = startHour * 60 + startMinute
      const endTimeInMinutes = endHour * 60 + endMinute
      
      // Check if current time falls within this class time slot
      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
        const classData = dayData[timeSlot]
        if (classData) {
          return {
            day: currentDayName,
            time: timeSlot,
            class: classData,
            message: `Currently in: ${classData.course} (${classData.subject})`,
            priority: 'high',
            status: 'ongoing'
          }
        }
      }
    }
    
    return null
  }

  /**
   * Generate real-time activities based on timetable
   * Creates activity objects for current and next classes
   * 
   * @returns {Array} - Array of activity objects
   */
  const generateRealTimeActivities = () => {
    const newActivities = []
    
    // Add current class if any
    const currentClass = getCurrentClass()
    if (currentClass) {
      newActivities.push({
        id: Date.now(),
        type: 'current_class',
        message: currentClass.message,
        timestamp: new Date(),
        status: 'ongoing',
        priority: 'high',
        requiresApproval: false,
        classData: currentClass
      })
    }
    
    // Add next class
    const nextClass = getNextClass()
    if (nextClass) {
      newActivities.push({
        id: Date.now() + 1,
        type: 'next_class',
        message: nextClass.message,
        timestamp: new Date(),
        status: 'upcoming',
        priority: 'medium',
        requiresApproval: false,
        classData: nextClass
      })
    }
    
    return newActivities
  }

  // Update activities and current time every minute, and when section changes
  useEffect(() => {
    const updateActivities = () => {
      const newActivities = generateRealTimeActivities()
      setActivities(newActivities)
      setCurrentTime(new Date())
    }
    
    // Update immediately when component mounts or section changes
    updateActivities()
    
    // Update every minute (60000 milliseconds)
    const interval = setInterval(updateActivities, 60000)
    
    // Cleanup interval when component unmounts
    return () => clearInterval(interval)
  }, [selectedSection])

  /**
   * Handle activity approval/rejection
   * Updates activity status and notifies parent component
   * 
   * @param {number} activityId - The ID of the activity to update
   * @param {string} action - The action to perform ('approved' or 'denied')
   */
  const handleActivityAction = (activityId, action) => {
    // Update activity status in local state
    setActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? { ...activity, status: action }
          : activity
      )
    )

    // Notify parent component of the change
    if (onActivityChange) {
      onActivityChange(activityId, action)
    }
  }

  /**
   * Get priority color for styling
   * Returns appropriate CSS classes based on priority level
   * 
   * @param {string} priority - Priority level ('high', 'medium', 'low')
   * @returns {string} - CSS classes for styling
   */
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  /**
   * Get status icon for activity display
   * Returns appropriate icon component based on activity status
   * 
   * @param {string} status - Activity status
   * @returns {JSX.Element} - Icon component
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'denied': return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />
      case 'ongoing': return <Clock className="w-4 h-4 text-blue-500" />
      case 'upcoming': return <Calendar className="w-4 h-4 text-green-500" />
      default: return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  /**
   * Format timestamp for display
   * Converts timestamp to human-readable relative time
   * 
   * @param {Date} timestamp - The timestamp to format
   * @returns {string} - Formatted time string
   */
  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    // Main activity tracker container
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {/* Activity icon */}
          <Activity className="w-6 h-6 text-primary-600 mr-3" />
          {/* Header title */}
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        {/* Current time display */}
        <div className="text-sm text-gray-500">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Activity List Section */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Map through activities to display each one */}
        {activities.map((activity) => (
          <div key={activity.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Activity message and status */}
                <div className="flex items-center mb-2">
                  {/* Status icon */}
                  {getStatusIcon(activity.status)}
                  {/* Activity message */}
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {activity.message}
                  </span>
                  {/* Course badge if class data exists */}
                  {activity.classData && (
                    <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {activity.classData.class.course}
                    </span>
                  )}
                </div>
                {/* Activity metadata */}
                <div className="flex items-center text-xs text-gray-500">
                  {/* Timestamp */}
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimestamp(activity.timestamp)}
                  {/* Instructor information if class data exists */}
                  {activity.classData && (
                    <>
                      <span className="mx-2">•</span>
                      <BookOpen className="w-3 h-3 mr-1" />
                      {activity.classData.class.instructor}
                    </>
                  )}
                </div>
              </div>
              
              {/* Action Buttons for Pending Activities */}
              {activity.status === 'pending' && activity.requiresApproval && (
                <div className="flex items-center space-x-2 ml-4">
                  {/* Approve button */}
                  <button
                    onClick={() => handleActivityAction(activity.id, 'approved')}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  {/* Deny button */}
                  <button
                    onClick={() => handleActivityAction(activity.id, 'denied')}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Deny"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State - shown when no activities exist */}
      {activities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No recent activity</p>
        </div>
      )}
    </div>
  )
}

// Export the ActivityTracker component as the default export
export default ActivityTracker 