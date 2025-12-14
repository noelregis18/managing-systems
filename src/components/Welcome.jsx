/**
 * Welcome/Onboarding Component
 * 
 * This component displays a welcome page for new users after signing in.
 * It allows users to enter their profile details for the first time.
 * After saving, users are redirected to the dashboard.
 * 
 * Key features:
 * - Welcome message for new users
 * - Profile form with all user details
 * - Save to Supabase database
 * - Redirect to dashboard after saving
 * - Same form fields as User page
 */

// Import React and useState hook for state management
import React, { useState, useEffect } from 'react'
// Import Lucide React icons for UI elements
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  GraduationCap, 
  Building2, 
  Hash, 
  MapPin, 
  Save,
  Loader,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
// Import Clerk authentication hooks
import { useUser } from '@clerk/clerk-react'
// Import user profile service for Supabase operations
import { loadUserProfile, upsertUserProfile } from '../services/userProfileService'
// Import useNavigate for redirecting after profile creation
import { useNavigate } from 'react-router-dom'

/**
 * Welcome Component
 * 
 * This component provides onboarding for new users:
 * - Display welcome message
 * - Collect user profile information
 * - Save profile to Supabase
 * - Redirect to dashboard after successful save
 */
const Welcome = () => {
  // Clerk hooks
  const { user, isSignedIn } = useUser()
  const navigate = useNavigate()

  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    semester_year: '',
    section: '',
    university_roll: '',
    college_roll: '',
    address: ''
  })

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false)
  }, [user?.imageUrl])

  // Load user profile on mount to check if profile exists
  useEffect(() => {
    const checkProfile = async () => {
      if (isSignedIn && user?.id) {
        try {
          setIsLoading(true)
          const profile = await loadUserProfile(user.id)
          
          // If profile exists, redirect to dashboard
          if (profile) {
            navigate('/dashboard')
            return
          }
          
          // Initialize form with Clerk user data
          setFormData({
            name: user.fullName || user.firstName || '',
            email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '',
            phone_number: user.primaryPhoneNumber?.phoneNumber || '',
            semester_year: '',
            section: '',
            university_roll: '',
            college_roll: '',
            address: ''
          })
        } catch (err) {
          // If profile doesn't exist (PGRST116), that's fine - user is new
          if (err.code !== 'PGRST116') {
            console.error('Error checking profile:', err)
            setError('Failed to load profile. Please refresh the page.')
          } else {
            // Profile doesn't exist - initialize form with Clerk data
            setFormData({
              name: user.fullName || user.firstName || '',
              email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '',
              phone_number: user.primaryPhoneNumber?.phoneNumber || '',
              semester_year: '',
              section: '',
              university_roll: '',
              college_roll: '',
              address: ''
            })
          }
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    checkProfile()
  }, [isSignedIn, user?.id, navigate])

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setIsSaving(true)
      setError(null)
      setShowSuccess(false)
      
      if (!user?.id) {
        throw new Error('User not authenticated')
      }
      
      // Validate required fields
      if (!formData.name || !formData.email) {
        throw new Error('Name and email are required fields')
      }
      
      console.log('Saving user profile:', formData)
      const savedProfile = await upsertUserProfile(user.id, formData)
      console.log('Profile saved successfully:', savedProfile)
      
      // Show success message
      setShowSuccess(true)
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
      
    } catch (err) {
      console.error('Failed to save profile:', err)
      setError(err.message || 'Failed to save profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto">
      {/* Welcome Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 mb-4 overflow-hidden border-4 border-white shadow-lg">
          {user?.imageUrl && !imageError ? (
            <img
              src={user.imageUrl}
              alt={user.fullName || user.firstName || 'User'}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <UserIcon className="w-10 h-10 text-white" />
          )}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome! 👋</h1>
        <p className="text-lg text-gray-600">Let's get started by setting up your profile</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center animate-fade-in">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <p className="text-green-800 font-medium">Profile saved successfully! Redirecting to dashboard...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Profile Form Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Complete Your Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                Full Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                Email Address <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Semester & Year Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                Semester & Year
              </label>
              <input
                type="text"
                name="semester_year"
                value={formData.semester_year}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 5th Semester, 2025"
              />
            </div>

            {/* Section Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                Section
              </label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., CSE A, CSE B, CSE C"
              />
            </div>

            {/* University Roll Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 mr-2 text-gray-500" />
                University Roll Number
              </label>
              <input
                type="text"
                name="university_roll"
                value={formData.university_roll}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your university roll number"
              />
            </div>

            {/* College Roll Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 mr-2 text-gray-500" />
                College Roll Number
              </label>
              <input
                type="text"
                name="college_roll"
                value={formData.college_roll}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your college roll number"
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Enter your address"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center px-6 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save & Continue
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> You can edit these details later from your profile page. Only name and email are required fields.
          </p>
        </div>
      </div>
    </div>
  )
}

// Export the Welcome component as the default export
export default Welcome

