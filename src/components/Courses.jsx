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
  // State management for courses data
  // Real 5th Semester CSE B courses data with comprehensive information
  const [courses, setCourses] = useState([
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
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [isEditing, setIsEditing] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false)  // Department dropdown open state

  // Departments for dropdown
  const departments = ['All Departments', 'CSE / Core', 'CSE / Engineering Science', 'CSE / Lab', 'Humanities/Management', 'Department Elective', 'Mandatory (MC)']

  // Ref for department dropdown
  const departmentDropdownRef = useRef(null)

  // Handle click outside to close department dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) {
        setIsDepartmentDropdownOpen(false)
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
  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId))
  }

  const handleEditCourse = (course) => {
    setEditingCourse({ ...course })
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingCourse(null)
  }

  const handleSaveCourse = (updatedCourse) => {
    setCourses(prevCourses => prevCourses.map(c => c.id === updatedCourse.id ? updatedCourse : c))
    setIsEditing(false)
    setEditingCourse(null)
  }

  return (
    <div className="min-h-full">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">5th Semester CSE B - Courses</h1>
            <p className="text-gray-600">
              Complete course details for Fall 2025 semester | Computer Science & Engineering
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Semester: Fall 2025</div>
            <div className="text-sm text-gray-500">Students: 65</div>
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
          <div className="text-2xl font-bold text-gray-900">10</div>
          <p className="text-xs text-gray-500">Theory + Lab + Electives</p>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Students</h3>
          <div className="text-2xl font-bold text-gray-900">65</div>
          <p className="text-xs text-gray-500">5th Semester CSE B</p>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-50 rounded-lg mb-4">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Credits</h3>
          <div className="text-2xl font-bold text-gray-900">24</div>
          <p className="text-xs text-gray-500">Credit hours per semester</p>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 rounded-lg mb-4">
            <BookOpen className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Semester</h3>
          <div className="text-lg font-bold text-gray-900">Fall 2025</div>
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
                className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-gray-700 font-medium flex items-center space-x-2 min-w-[180px]"
                aria-label="Select Department"
              >
                <span>{selectedDepartment}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDepartmentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDepartmentDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-10 overflow-hidden">
                  {departments.map((department) => (
                    <button
                      key={department}
                      onClick={() => {
                        setSelectedDepartment(department)
                        setIsDepartmentDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
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

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-6 font-semibold text-gray-900">Course</th>
                <th className="text-left p-6 font-semibold text-gray-900">Instructor</th>
                <th className="text-left p-6 font-semibold text-gray-900">Department</th>
                <th className="text-left p-6 font-semibold text-gray-900">Credits</th>
                <th className="text-left p-6 font-semibold text-gray-900">Students</th>
                <th className="text-left p-6 font-semibold text-gray-900">Duration</th>
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
                  <td className="p-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {course.credits} Credits
                    </span>
                  </td>
                  <td className="p-6 text-gray-900">{course.students}</td>
                  <td className="p-6 text-gray-600">{course.duration}</td>
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

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first course.'}
          </p>
          <button className="btn-primary">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={editingCourse.department}
                    onChange={(e) => setEditingCourse({ ...editingCourse, department: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  >
                    <option>CSE / Core</option>
                    <option>CSE / Engineering Science</option>
                    <option>CSE / Lab</option>
                    <option>Humanities/Management</option>
                    <option>Department Elective</option>
                    <option>Mandatory (MC)</option>
                  </select>
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
    </div>
  )
}

export default Courses