/**
 * Courses Component
 * 
 * This component manages the list of courses in the system.
 * It allows users to view, add, edit, and delete course information.
 * 
 * Key features:
 * - Course listing and management
 * - Search and filter functionality
 * - Add, edit, and delete operations
 * - Course details display
 * - Real-time data updates
 * - Professional course management interface
 */

// Import React and useState hook for state management
import React, { useState, useEffect, useRef } from 'react'
// Import Lucide React icons for UI elements
import { BookOpen, Plus, Search, Edit, Trash2, Clock, Users, ChevronDown } from 'lucide-react'
// Import Clerk authentication hooks
import { useUser } from '@clerk/clerk-react'
// Import courses service for Supabase operations
import { loadUserCourses, createCourse, updateCourse, deleteCourse } from '../services/coursesService'

/**
 * Courses Component
 * 
 * This component provides comprehensive course management functionality:
 * - Display all courses in the system
 * - Search and filter courses
 * - Add new courses
 * - Edit existing course information
 * - Delete courses with confirmation
 * - View detailed course information
 */
const Courses = () => {
  // Clerk hook to get current user information
  const { user, isSignedIn } = useUser()
  
  // State management for courses data
  // Real 5th Semester CSE B courses data with comprehensive information (default/fallback data)
  const defaultCourses = [
    // Software Engineering course
    {
      id: 1,
      name: 'Software Engineering',
      code: 'ESC-501',
      department: 'CSE / Engineering Science',
      instructor: 'SAR(CS)',
      credits: 3,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Compiler Design course
    {
      id: 2,
      name: 'Compiler Design',
      code: 'PCC CS-501',
      department: 'CSE / Core',
      instructor: 'RDB(CS)',
      credits: 3,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Operating Systems course
    {
      id: 3,
      name: 'Operating Systems',
      code: 'PCC CS-502',
      department: 'CSE / Core',
      instructor: 'BTM(CS)',
      credits: 3,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Object Oriented Programming course
    {
      id: 4,
      name: 'Object Oriented Programming',
      code: 'PCC CS-503',
      department: 'CSE / Core',
      instructor: 'AB(CS)',
      credits: 3,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Introduction to Industrial Management course
    {
      id: 5,
      name: 'Introduction to Industrial Management (Humanities III)',
      code: 'HSMC 501',
      department: 'Humanities/Management',
      instructor: 'NF',
      credits: 3,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Artificial Intelligence course
    {
      id: 6,
      name: 'Artificial Intelligence',
      code: 'PEC IT-501B',
      department: 'Department Elective',
      instructor: 'PKP(CS)',
      credits: 3,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Software Engineering Lab course
    {
      id: 7,
      name: 'Software Engineering Lab',
      code: 'ESC 591',
      department: 'CSE / Lab',
      instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)',
      credits: 2,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Operating System Lab course
    {
      id: 8,
      name: 'Operating System Lab',
      code: 'PCC CS-592',
      department: 'CSE / Lab',
      instructor: 'BTM(CS)+PR(CS)+MM(CS)+PKC(CS)',
      credits: 2,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Object Oriented Programming Lab course
    {
      id: 9,
      name: 'Object Oriented Programming Lab',
      code: 'PCC CS-593',
      department: 'CSE / Lab',
      instructor: 'AB(CS)+LKM(CS)+RR(CS)',
      credits: 2,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    },
    // Constitution of India course
    {
      id: 10,
      name: 'Constitution of India',
      code: 'MC CS-501A',
      department: 'Mandatory (MC)',
      instructor: 'TB(E)',
      credits: 0,
      duration: '6 months',
      students: 65,
      semester: 'Fall 2025'
    }
  ]

  // State for courses loaded from Supabase
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [isEditing, setIsEditing] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [isAddingCourse, setIsAddingCourse] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    department: 'CSE / Core',
    instructor: '',
    credits: 3,
    duration: '6 months',
    students: 0,
    semester: 'Fall 2025'
  })
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false)  // Department dropdown open state
  const [isAddCourseDeptDropdownOpen, setIsAddCourseDeptDropdownOpen] = useState(false)  // Add Course modal department dropdown
  const [isEditCourseDeptDropdownOpen, setIsEditCourseDeptDropdownOpen] = useState(false)  // Edit Course modal department dropdown

  // Departments for dropdown
  const departments = ['All Departments', 'CSE / Core', 'CSE / Engineering Science', 'CSE / Lab', 'Humanities/Management', 'Department Elective', 'Mandatory (MC)']

  // Refs for department dropdowns
  const departmentDropdownRef = useRef(null)
  const addCourseDeptDropdownRef = useRef(null)
  const editCourseDeptDropdownRef = useRef(null)

  // Load courses from Supabase on mount and merge with default courses
  // Supabase courses (edited/created) take priority over default courses
  useEffect(() => {
    async function fetchCourses() {
      if (!isSignedIn || !user?.id) {
        // If not signed in, use default courses only
        setCourses(defaultCourses)
        setIsLoading(false)
        return
      }
      
      try {
        // Load courses from Supabase first
        const data = await loadUserCourses(user.id)
        
        // Convert Supabase courses to component format
        const supabaseCourses = (data || []).map(course => ({
          id: course.id,
          name: course.name,
          code: course.code,
          department: course.department,
          instructor: course.instructor,
          credits: course.credits,
          duration: course.duration,
          students: course.students,
          semester: course.semester
        }))
        
        // Create a map of Supabase course codes (for quick lookup)
        const supabaseCourseCodes = new Set(
          supabaseCourses.map(c => c.code.toLowerCase())
        )
        
        // Start with default courses to preserve their original order
        const mergedCourses = []
        
        // Map to track which default courses have been replaced by Supabase versions
        const replacedDefaults = new Set()
        
        // First, go through default courses and include them or their Supabase replacement
        defaultCourses.forEach(defaultCourse => {
          const supabaseVersion = supabaseCourses.find(
            c => c.code.toLowerCase() === defaultCourse.code.toLowerCase()
          )
          
          if (supabaseVersion) {
            // Use Supabase version (edited course) at the default course's position
            mergedCourses.push(supabaseVersion)
            replacedDefaults.add(supabaseVersion.code.toLowerCase())
          } else {
            // Default course hasn't been edited, include it
            mergedCourses.push(defaultCourse)
          }
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
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [isSignedIn, user?.id])

  // Handle click outside to close department dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) {
        setIsDepartmentDropdownOpen(false)
      }
      if (addCourseDeptDropdownRef.current && !addCourseDeptDropdownRef.current.contains(event.target)) {
        setIsAddCourseDeptDropdownOpen(false)
      }
      if (editCourseDeptDropdownRef.current && !editCourseDeptDropdownRef.current.contains(event.target)) {
        setIsEditCourseDeptDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  /**
   * Filter courses based on search term and selected department
   */
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = selectedDepartment === 'All Departments' || course.department === selectedDepartment
    
    return matchesSearch && matchesDepartment
  })

  /**
   * Handle course deletion
   */
  const handleDeleteCourse = async (courseId) => {
    try {
      if (isSignedIn && user?.id) {
        // Delete from Supabase (only if it's a Supabase course, not a default one)
        // Check if courseId is a UUID (Supabase format) vs a number (default course)
        if (typeof courseId === 'string' && courseId.includes('-')) {
          // UUID format indicates Supabase course - delete from database
          await deleteCourse(user.id, courseId)
        }
        // If it's a number, it's a default course - just remove from local state
        // The default course will reappear on next page load since it's not in Supabase
      }
      // Update local state immediately
    setCourses(courses.filter(course => course.id !== courseId))
    } catch (error) {
      console.error('Failed to delete course:', error)
      alert('Failed to delete course. Please try again.')
    }
  }

  const handleEditCourse = (course) => {
    setEditingCourse({ ...course })
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingCourse(null)
    setIsEditCourseDeptDropdownOpen(false)
  }

  const handleSaveCourse = async (updatedCourse) => {
    // Validate required fields
    if (!updatedCourse.name || !updatedCourse.code) {
      alert('Please fill in the course name and code')
      return
    }
    
    try {
      const originalId = updatedCourse.id
      let finalCourse = { ...updatedCourse }
      
      if (isSignedIn && user?.id) {
        // Check if this is a Supabase course (UUID format) or default course
        if (typeof updatedCourse.id === 'string' && updatedCourse.id.includes('-')) {
          // Update existing Supabase course
          const updated = await updateCourse(user.id, updatedCourse.id, updatedCourse)
          finalCourse = {
            id: updated.id,
            name: updated.name,
            code: updated.code,
            department: updated.department,
            instructor: updated.instructor,
            credits: updated.credits,
            duration: updated.duration,
            students: updated.students,
            semester: updated.semester
          }
        } else {
          // Default course was edited - check if there's already a Supabase course with the same code
          const existingCourses = await loadUserCourses(user.id)
          const existingCourse = existingCourses.find(
            c => c.code.toLowerCase() === updatedCourse.code.toLowerCase()
          )
          
          if (existingCourse) {
            // Update the existing Supabase course with the same code
            const updated = await updateCourse(user.id, existingCourse.id, updatedCourse)
            finalCourse = {
              id: updated.id,
              name: updated.name,
              code: updated.code,
              department: updated.department,
              instructor: updated.instructor,
              credits: updated.credits,
              duration: updated.duration,
              students: updated.students,
              semester: updated.semester
            }
          } else {
            // Create new course in Supabase for default courses that were edited
            const created = await createCourse(user.id, updatedCourse)
            finalCourse = {
              id: created.id,
              name: created.name,
              code: created.code,
              department: created.department,
              instructor: created.instructor,
              credits: created.credits,
              duration: created.duration,
              students: created.students,
              semester: created.semester
            }
          }
        }
      }
      
      // Update local state immediately to reflect changes - preserve position
      setCourses(prevCourses => {
        // Find the index of the original course to preserve its position
        const originalIndex = prevCourses.findIndex(c => c.id === originalId)
        
        // Create a new array
        const newCourses = [...prevCourses]
        
        // Check if there's already another course with the same code (from defaults)
        // If so, remove it first
        const duplicateIndex = newCourses.findIndex(
          c => c.id !== originalId && c.code.toLowerCase() === finalCourse.code.toLowerCase()
        )
        
        if (duplicateIndex !== -1) {
          // Remove the duplicate
          newCourses.splice(duplicateIndex, 1)
          // Adjust originalIndex if duplicate was before it
          const adjustedIndex = duplicateIndex < originalIndex ? originalIndex - 1 : originalIndex
          // Replace the course at its original position
          if (adjustedIndex !== -1) {
            newCourses[adjustedIndex] = finalCourse
          } else {
            // If course not found (shouldn't happen), add at end
            newCourses.push(finalCourse)
          }
        } else {
          // No duplicate, just replace at original position
          if (originalIndex !== -1) {
            newCourses[originalIndex] = finalCourse
          } else {
            // If original not found, add at end
            newCourses.push(finalCourse)
          }
        }
        
        return newCourses
      })
      
    setIsEditing(false)
    setEditingCourse(null)
      setIsEditCourseDeptDropdownOpen(false)
    } catch (error) {
      console.error('Failed to update course:', error)
      alert('Failed to save course. Please try again.')
      // Don't update local state on error - let user try again
    }
  }

  /**
   * Handle add course modal
   */
  const handleAddCourse = () => {
    setIsAddingCourse(true)
    setNewCourse({
      name: '',
      code: '',
      department: 'CSE / Core',
      instructor: '',
      credits: 3,
      duration: '6 months',
      students: 0,
      semester: 'Fall 2025'
    })
  }

  /**
   * Handle save new course
   */
  const handleSaveNewCourse = async () => {
    // Validate required fields
    if (!newCourse.name || !newCourse.code) {
      alert('Please fill in the course name and code')
      return
    }
    
    try {
      if (isSignedIn && user?.id) {
        // Create in Supabase
        const created = await createCourse(user.id, newCourse)
        // Add to local state with the ID from Supabase
        const newCourseWithId = {
          id: created.id,
          name: created.name,
          code: created.code,
          department: created.department,
          instructor: created.instructor,
          credits: created.credits,
          duration: created.duration,
          students: created.students,
          semester: created.semester
        }
        setCourses(prevCourses => [...prevCourses, newCourseWithId])
      } else {
        // If not signed in, just add locally with temporary ID
        setCourses(prevCourses => [...prevCourses, { ...newCourse, id: Date.now() }])
      }
      setIsAddingCourse(false)
      setIsAddCourseDeptDropdownOpen(false)
      setNewCourse({
        name: '',
        code: '',
        department: 'CSE / Core',
        instructor: '',
        credits: 3,
        duration: '6 months',
        students: 0,
        semester: 'Fall 2025'
      })
    } catch (error) {
      console.error('Failed to create course:', error)
      alert('Failed to create course. Please try again.')
    }
  }

  /**
   * Handle cancel add course
   */
  const handleCancelAddCourse = () => {
    setIsAddingCourse(false)
    setIsAddCourseDeptDropdownOpen(false)
    setNewCourse({
      name: '',
      code: '',
      department: 'CSE / Core',
      instructor: '',
      credits: 3,
      duration: '6 months',
      students: 0,
      semester: 'Fall 2025'
    })
  }

  return (
    <div className="min-h-full pb-32">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">5th Semester CSE - Courses</h1>
            <p className="text-gray-600">
              Complete course details for Fall 2025 semester | Computer Science & Engineering
            </p>
          </div>
          <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Semester: Fall 2025</div>
            <div className="text-sm text-gray-500">Students: 65</div>
            </div>
            <button
              onClick={handleAddCourse}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Courses</h3>
          <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
          <p className="text-xs text-gray-500">Theory + Lab + Electives</p>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Students</h3>
          <div className="text-2xl font-bold text-gray-900">
            {courses.length > 0 ? courses.reduce((sum, course) => sum + (course.students || 0), 0) : 0}
          </div>
          <p className="text-xs text-gray-500">5th Semester CSE</p>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-50 rounded-lg mb-4">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Credits</h3>
          <div className="text-2xl font-bold text-gray-900">
            {courses.length > 0 ? courses.reduce((sum, course) => sum + (course.credits || 0), 0) : 0}
          </div>
          <p className="text-xs text-gray-500">Credit hours per semester</p>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 rounded-lg mb-4">
            <BookOpen className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Semester</h3>
          <div className="text-lg font-bold text-gray-900">
            {courses.length > 0 && courses[0]?.semester ? courses[0].semester : 'Fall 2025'}
          </div>
          <p className="text-xs text-gray-500">Current academic term</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            />
          </div>
          <div className="flex space-x-3">
            <div className="relative" ref={departmentDropdownRef}>
              <button
                onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-gray-700 font-medium flex items-center space-x-2 min-w-[260px]"
                aria-label="Select Department"
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{selectedDepartment}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isDepartmentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDepartmentDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 min-w-[260px] bg-white border border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden">
                  {departments.map((department) => (
                    <button
                      key={department}
                      onClick={() => {
                        setSelectedDepartment(department)
                        setIsDepartmentDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap ${
                        selectedDepartment === department ? 'bg-primary-50 text-primary-700 font-medium' : ''
                      }`}
                    >
                      {department}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      )}

      {/* Courses Table */}
      {!isLoading && (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-6 font-semibold text-gray-900">Course</th>
                <th className="text-left p-6 font-semibold text-gray-900">Instructor</th>
                <th className="text-left p-6 font-semibold text-gray-900">Department</th>
                <th className="text-left p-8 font-semibold text-gray-900">Credits</th>
                <th className="text-left p-6 font-semibold text-gray-900">Students</th>
                <th className="text-left p-8 font-semibold text-gray-900">Duration</th>
                <th className="text-left p-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6">
                    <div>
                      <div className="font-semibold text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-600">{course.code}</div>
                    </div>
                  </td>
                  <td className="p-6 text-gray-900">{course.instructor}</td>
                  <td className="p-6 text-gray-600">{course.department}</td>
                  <td className="p-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">
                      <span className="text-sm">{course.credits}</span>
                      <span className="text-sm ml-1.5">Credits</span>
                    </span>
                  </td>
                  <td className="p-6 text-gray-900">{course.students}</td>
                  <td className="p-8 text-gray-600 whitespace-nowrap">
                    <span className="inline-flex items-center">
                      {course.duration.includes(' ') ? (
                        <>
                          <span className="text-sm">{course.duration.split(' ')[0]}</span>
                          <span className="text-sm ml-1.5">{course.duration.split(' ').slice(1).join(' ')}</span>
                        </>
                      ) : (
                        <span className="text-sm">{course.duration}</span>
                      )}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditCourse(course)}
                        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredCourses.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first course.'}
          </p>
          <button onClick={handleAddCourse} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      )}

      {isEditing && editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Course</h3>

            <div className="space-y-6">
              {/* First row - Course Name and Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <input
                    type="text"
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <input
                    type="text"
                    value={editingCourse.code}
                    onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Second row - Instructor and Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor (Teacher Name)</label>
                  <input
                    type="text"
                    value={editingCourse.instructor}
                    onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., John Doe"
                  />
                </div>

                <div className="relative" ref={editCourseDeptDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <button
                    type="button"
                    onClick={() => setIsEditCourseDeptDropdownOpen(!isEditCourseDeptDropdownOpen)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-left flex items-center justify-between"
                  >
                    <span>{editingCourse.department}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isEditCourseDeptDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isEditCourseDeptDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden">
                      {departments.filter(d => d !== 'All Departments').map((department) => (
                        <button
                          key={department}
                          type="button"
                          onClick={() => {
                            setEditingCourse({ ...editingCourse, department })
                            setIsEditCourseDeptDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                            editingCourse.department === department ? 'bg-primary-50 text-primary-700 font-medium' : ''
                          }`}
                        >
                          {department}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Third row - Credits and Students */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <input
                    type="number"
                    value={editingCourse.credits}
                    onChange={(e) => setEditingCourse({ ...editingCourse, credits: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                  <input
                    type="number"
                    value={editingCourse.students}
                    onChange={(e) => setEditingCourse({ ...editingCourse, students: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Fourth row - Duration and Semester */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <input
                    type="text"
                    value={editingCourse.semester}
                    onChange={(e) => setEditingCourse({ ...editingCourse, semester: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveCourse(editingCourse)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Course</h3>

            <div className="space-y-6">
              {/* First row - Course Name and Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <input
                    type="text"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Second row - Instructor and Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor (Teacher Name)</label>
                  <input
                    type="text"
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., John Doe"
                  />
                </div>

                <div className="relative" ref={addCourseDeptDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <button
                    type="button"
                    onClick={() => setIsAddCourseDeptDropdownOpen(!isAddCourseDeptDropdownOpen)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-left flex items-center justify-between"
                  >
                    <span>{newCourse.department}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isAddCourseDeptDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isAddCourseDeptDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden">
                      {departments.filter(d => d !== 'All Departments').map((department) => (
                        <button
                          key={department}
                          type="button"
                          onClick={() => {
                            setNewCourse({ ...newCourse, department })
                            setIsAddCourseDeptDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                            newCourse.department === department ? 'bg-primary-50 text-primary-700 font-medium' : ''
                          }`}
                        >
                          {department}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Third row - Credits and Students */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <input
                    type="number"
                    value={newCourse.credits}
                    onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                  <input
                    type="number"
                    value={newCourse.students}
                    onChange={(e) => setNewCourse({ ...newCourse, students: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Fourth row - Duration and Semester */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 6 months"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <input
                    type="text"
                    value={newCourse.semester}
                    onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Fall 2025"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelAddCourse}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewCourse}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Courses