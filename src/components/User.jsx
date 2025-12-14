/**
 * User Profile Component
 * 
 * This component displays and manages user profile information.
 * It allows users to view and edit their profile details including
 * name, email, phone number, semester, section, roll numbers, and address.
 * It also provides the ability to delete their account.
 * 
 * Key features:
 * - View user profile information
 * - Edit profile details
 * - Save changes to Supabase
 * - Delete account functionality
 * - Attractive, modern UI design
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
  Edit2, 
  Save, 
  X, 
  Trash2,
  AlertTriangle,
  Loader
} from 'lucide-react'
// Import Clerk authentication hooks
import { useUser, useClerk } from '@clerk/clerk-react'
// Import user profile service for Supabase operations
import { loadUserProfile, upsertUserProfile, deleteUserProfile } from '../services/userProfileService'
// Import useNavigate for redirecting after account deletion
import { useNavigate } from 'react-router-dom'

/**
 * User Component
 * 
 * This component provides comprehensive user profile management:
 * - Display user profile information from Clerk and Supabase
 * - Edit profile details with a form interface
 * - Save changes to Supabase
 * - Delete account with confirmation
 */
const User = () => {
  // Clerk hooks
  const { user, isSignedIn } = useUser()
  const clerk = useClerk()
  const navigate = useNavigate()

  // State management
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)

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

  // Load user profile on mount
  useEffect(() => {
    if (isSignedIn && user?.id) {
      loadProfile()
    } else {
      setIsLoading(false)
    }
  }, [isSignedIn, user?.id])

  // Initialize form data when profile loads or user changes
  useEffect(() => {
    if (user && !isLoading) {
      // If profile exists, use it; otherwise use Clerk user data for initial values
      setFormData({
        name: profile?.name || user.fullName || user.firstName || '',
        email: profile?.email || user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '',
        phone_number: profile?.phone_number || user.primaryPhoneNumber?.phoneNumber || '',
        semester_year: profile?.semester_year || '',
        section: profile?.section || '',
        university_roll: profile?.university_roll || '',
        college_roll: profile?.college_roll || '',
        address: profile?.address || ''
      })
    }
  }, [user, profile, isLoading])

  /**
   * Load user profile from Supabase
   */
  const loadProfile = async () => {
    try {
      setIsLoading(true)
      setError(null)
      if (!user?.id) {
        setIsLoading(false)
        return
      }
      
      console.log('Loading user profile for:', user.id)
      const data = await loadUserProfile(user.id)
      console.log('Loaded profile data:', data)
      setProfile(data)
      
      // Update form data with loaded profile or Clerk user data
      if (user) {
        setFormData({
          name: data?.name || user.fullName || user.firstName || '',
          email: data?.email || user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '',
          phone_number: data?.phone_number || user.primaryPhoneNumber?.phoneNumber || '',
          semester_year: data?.semester_year || '',
          section: data?.section || '',
          university_roll: data?.university_roll || '',
          college_roll: data?.college_roll || '',
          address: data?.address || ''
        })
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
      // Don't show error if profile doesn't exist yet (this is normal for new users)
      if (err.code !== 'PGRST116') {
        setError('Failed to load profile. Please refresh the page.')
      }
    } finally {
      setIsLoading(false)
    }
  }

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
   * Handle edit button click
   */
  const handleEdit = () => {
    setIsEditing(true)
    setError(null)
  }

  /**
   * Handle cancel edit
   */
  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
    // Reset form data to current profile
    if (user) {
      setFormData({
        name: profile?.name || user.fullName || user.firstName || '',
        email: profile?.email || user.primaryEmailAddress?.emailAddress || '',
        phone_number: profile?.phone_number || user.primaryPhoneNumber?.phoneNumber || '',
        semester_year: profile?.semester_year || '',
        section: profile?.section || '',
        university_roll: profile?.university_roll || '',
        college_roll: profile?.college_roll || '',
        address: profile?.address || ''
      })
    }
  }

  /**
   * Handle save profile
   */
  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError(null)
      
      if (!user?.id) {
        throw new Error('User not authenticated')
      }
      
      console.log('Saving user profile:', formData)
      const savedProfile = await upsertUserProfile(user.id, formData)
      console.log('Profile saved successfully:', savedProfile)
      
      setProfile(savedProfile)
      setIsEditing(false)
      
      // Show success message (optional - you can add a toast notification here)
      // For now, the profile state update will reflect the changes
    } catch (err) {
      console.error('Failed to save profile:', err)
      setError(err.message || 'Failed to save profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  /**
   * Handle delete account confirmation
   */
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  /**
   * Handle delete account cancellation
   */
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false)
  }

  /**
   * Handle account deletion
   */
  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true)
      setError(null)

      // Delete profile from Supabase
      if (user?.id) {
        await deleteUserProfile(user.id)
      }

      // Delete account from Clerk
      if (user && clerk) {
        // Use Clerk's delete method to delete the user's account
        await user.delete()
        // Sign out after deletion
        await clerk.signOut()
      }

      // Redirect to landing page
      navigate('/')
    } catch (err) {
      console.error('Failed to delete account:', err)
      setError('Failed to delete account. Please try again.')
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">View and manage your profile information</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card - Left Side */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            {/* Header with Edit Button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    disabled={isSaving}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.name || 'Not set'}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.email || 'Not set'}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.phone_number || 'Not set'}</p>
                )}
              </div>

              {/* Semester & Year Field */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                  Semester & Year
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="semester_year"
                    value={formData.semester_year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 5th Semester, 2025"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.semester_year || 'Not set'}</p>
                )}
              </div>

              {/* Section Field */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                  Section
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., CSE A, CSE B, CSE C"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.section || 'Not set'}</p>
                )}
              </div>

              {/* University Roll Field */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Hash className="w-4 h-4 mr-2 text-gray-500" />
                  University Roll Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="university_roll"
                    value={formData.university_roll}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your university roll number"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.university_roll || 'Not set'}</p>
                )}
              </div>

              {/* College Roll Field */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Hash className="w-4 h-4 mr-2 text-gray-500" />
                  College Roll Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="college_roll"
                    value={formData.college_roll}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your college roll number"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.college_roll || 'Not set'}</p>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.address || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary Card - Right Side */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="text-center">
              {/* Profile Image or Icon */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center border-2 border-white shadow-md">
                {user?.imageUrl && !imageError ? (
                  <img
                    src={user.imageUrl}
                    alt={formData.name || user?.fullName || 'User'}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <UserIcon className="w-12 h-12 text-white" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {formData.name || user?.fullName || 'User'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {formData.section || 'No section assigned'}
              </p>
              {formData.semester_year && (
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                  {formData.semester_year.split(',')[0].trim() || formData.semester_year}
                </div>
              )}
            </div>
          </div>

          {/* Delete Account Card */}
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={handleDeleteClick}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Delete Account</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data including courses, rooms, and timetable information.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Export the User component as the default export
export default User

