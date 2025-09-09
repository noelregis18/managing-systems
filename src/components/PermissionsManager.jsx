/**
 * PermissionsManager Component
 * 
 * This component provides comprehensive control over activity permissions,
 * approval workflows, and bulk action management.
 * 
 * Key features:
 * - Activity permission management
 * - Approval workflow configuration
 * - Notification settings control
 * - Bulk action operations
 * - Security and access control
 * - Real-time permission updates
 */

// Import React and useState hook for state management
import React, { useState } from 'react'
// Import Lucide React icons for UI elements
import { 
  Shield,           // Security and permissions icon
  CheckCircle,      // Approval/allow icon
  XCircle,          // Denial/reject icon
  AlertTriangle,    // Warning/notification icon
  Settings,         // Settings/configuration icon
  Users,            // Users/roles icon
  Lock,             // Lock/secure icon
  Unlock,           // Unlock/permit icon
  Activity,         // Activity tracking icon
  Clock,            // Time-based operations icon
  UserCheck,        // User approval icon
  UserX             // User rejection icon
} from 'lucide-react'

/**
 * PermissionsManager Component
 * 
 * @param {function} onPermissionChange - Callback for permission changes
 * @param {function} onBulkAction - Callback for bulk actions
 * 
 * This component provides comprehensive permission management:
 * - Core and advanced permission controls
 * - Approval workflow configuration
 * - Notification settings management
 * - Bulk action operations
 * - Security and access control features
 */
const PermissionsManager = ({ onPermissionChange, onBulkAction }) => {
  // State management for permissions and settings
  const [permissions, setPermissions] = useState({
    autoApprove: false,              // Automatically approve all changes
    requireConfirmation: true,       // Require manual confirmation for changes
    notifyOnChanges: true,           // Send notifications for all changes
    trackAllActivities: true,        // Track and log all activities
    allowBulkApproval: false,        // Allow bulk approval actions
    requireReasonForDenial: true,    // Require reason when denying changes
    allowSystemChanges: false,       // Allow system-level changes
    requireAdminApproval: false,     // Require admin approval for sensitive changes
    autoBackupBeforeChanges: true,   // Auto-backup before making changes
    logAllActions: true              // Log all user actions
  })

  // State for approval workflow configuration
  const [approvalWorkflow, setApprovalWorkflow] = useState({
    singleApproval: true,            // Single level approval process
    multiLevelApproval: false,       // Multi-level approval workflow
    timeBasedApproval: false,        // Time-based approval system
    roleBasedApproval: true          // Role-based approval hierarchy
  })

  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,        // Receive notifications via email
    pushNotifications: false,        // Receive push notifications
    desktopNotifications: true,      // Show desktop notifications
    weeklyReports: false,            // Receive weekly activity reports
    immediateAlerts: true            // Get immediate alerts for urgent changes
  })

  /**
   * Handle permission changes
   * Updates local state and notifies parent component
   * 
   * @param {string} key - The permission key to change
   * @param {boolean} value - The new permission value
   */
  const handlePermissionChange = (key, value) => {
    // Update local permissions state
    setPermissions(prev => ({
      ...prev,
      [key]: value
    }))

    // Notify parent component of the change
    if (onPermissionChange) {
      onPermissionChange(key, value)
    }
  }

  /**
   * Handle workflow changes
   * Updates approval workflow configuration
   * 
   * @param {string} key - The workflow key to change
   * @param {boolean} value - The new workflow value
   */
  const handleWorkflowChange = (key, value) => {
    setApprovalWorkflow(prev => ({
      ...prev,
      [key]: value
    }))
  }

  /**
   * Handle notification changes
   * Updates notification settings
   * 
   * @param {string} key - The notification key to change
   * @param {boolean} value - The new notification value
   */
  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  /**
   * Bulk action handlers
   * Functions for performing bulk operations on permissions
   */
  
  /**
   * Allow all pending changes
   * Bulk approve all pending activities
   */
  const handleAllowAllChanges = () => {
    if (onBulkAction) {
      onBulkAction('allow_all')
    }
  }

  /**
   * Deny all pending changes
   * Bulk reject all pending activities
   */
  const handleDenyAllChanges = () => {
    if (onBulkAction) {
      onBulkAction('deny_all')
    }
  }

  /**
   * Reset permissions to default values
   * Restores all permissions to their original state
   */
  const handleResetPermissions = () => {
    setPermissions({
      autoApprove: false,
      requireConfirmation: true,
      notifyOnChanges: true,
      trackAllActivities: true,
      allowBulkApproval: false,
      requireReasonForDenial: true,
      allowSystemChanges: false,
      requireAdminApproval: false,
      autoBackupBeforeChanges: true,
      logAllActions: true
    })
  }

  return (
    // Main container with spacing between sections
    <div className="space-y-6">
      {/* Main Permissions Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {/* Section header with icon */}
        <div className="flex items-center mb-6">
          <Shield className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Activity Permissions</h2>
        </div>

        {/* Permissions grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Permissions - Basic permission controls */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-3">Core Permissions</h3>
            {/* Map through first 5 permissions for core controls */}
            {Object.entries(permissions).slice(0, 5).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                {/* Permission description */}
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {key === 'autoApprove' && 'Automatically approve all changes'}
                    {key === 'requireConfirmation' && 'Require manual approval for changes'}
                    {key === 'notifyOnChanges' && 'Send notifications for all changes'}
                    {key === 'trackAllActivities' && 'Track and log all activities'}
                    {key === 'allowBulkApproval' && 'Allow bulk approval actions'}
                  </div>
                </div>
                {/* Toggle switch for permission */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handlePermissionChange(key, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>
            ))}
          </div>

          {/* Advanced Permissions - Advanced security and control features */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-3">Advanced Permissions</h3>
            {/* Map through remaining permissions for advanced controls */}
            {Object.entries(permissions).slice(5).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                {/* Permission description */}
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {key === 'requireReasonForDenial' && 'Require reason when denying changes'}
                    {key === 'allowSystemChanges' && 'Allow system-level changes'}
                    {key === 'requireAdminApproval' && 'Require admin approval for sensitive changes'}
                    {key === 'autoBackupBeforeChanges' && 'Auto-backup before making changes'}
                    {key === 'logAllActions' && 'Log all user actions'}
                  </div>
                </div>
                {/* Toggle switch for permission */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handlePermissionChange(key, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approval Workflow Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {/* Section header with icon */}
        <div className="flex items-center mb-6">
          <UserCheck className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Approval Workflow</h2>
        </div>

        {/* Workflow configuration grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map through all workflow settings */}
          {Object.entries(approvalWorkflow).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              {/* Workflow description */}
              <div>
                <div className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
                <div className="text-sm text-gray-600">
                  {key === 'singleApproval' && 'Single level approval process'}
                  {key === 'multiLevelApproval' && 'Multi-level approval workflow'}
                  {key === 'timeBasedApproval' && 'Time-based approval system'}
                  {key === 'roleBasedApproval' && 'Role-based approval hierarchy'}
                </div>
              </div>
              {/* Toggle switch for workflow setting */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleWorkflowChange(key, e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {/* Section header with icon */}
        <div className="flex items-center mb-6">
          <AlertTriangle className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
        </div>

        {/* Notification configuration grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map through all notification settings */}
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              {/* Notification description */}
              <div>
                <div className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
                <div className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications'}
                  {key === 'desktopNotifications' && 'Show desktop notifications'}
                  {key === 'weeklyReports' && 'Receive weekly activity reports'}
                  {key === 'immediateAlerts' && 'Get immediate alerts for urgent changes'}
                </div>
              </div>
              {/* Toggle switch for notification setting */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {/* Section header with icon */}
        <div className="flex items-center mb-6">
          <Activity className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>

        {/* Quick action buttons grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Allow All Changes Button */}
          <button
            onClick={handleAllowAllChanges}
            className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">Allow All Changes</span>
          </button>

          {/* Deny All Changes Button */}
          <button
            onClick={handleDenyAllChanges}
            className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <XCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700 font-medium">Deny All Changes</span>
          </button>

          {/* Reset Permissions Button */}
          <button
            onClick={handleResetPermissions}
            className="flex items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Reset Permissions</span>
          </button>
        </div>

        {/* Information notice */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
            <div className="text-sm text-blue-700">
              <strong>Note:</strong> Changes to permissions will affect all future activities. 
              Existing pending activities will retain their current approval requirements.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export the PermissionsManager component as the default export
export default PermissionsManager 