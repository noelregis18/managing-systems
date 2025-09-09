/**
 * ActivityLog Component
 * 
 * This component provides a comprehensive view of all activities
 * with filtering, search, and bulk action capabilities.
 * 
 * Key features:
 * - Activity listing and tracking
 * - Advanced filtering and search
 * - Bulk action operations
 * - Status and priority management
 * - Export and data management
 * - Real-time activity monitoring
 */

// Import React hooks for state management and side effects
import React, { useState, useEffect } from 'react'
// Import Lucide React icons for UI elements
import { 
  Clock,           // Time-related operations icon
  CheckCircle,     // Success/approval icon
  XCircle,         // Error/denial icon
  AlertCircle,     // Warning/alert icon
  Activity,        // Activity tracking icon
  Search,          // Search functionality icon
  Filter,          // Filter operations icon
  Download,        // Export/download icon
  Trash2,          // Delete/remove icon
  Eye,             // View/details icon
  Calendar,        // Date/time icon
  User             // User-related icon
} from 'lucide-react'

/**
 * ActivityLog Component
 * 
 * @param {Array} activities - Array of activity objects to display
 * @param {function} onBulkAction - Callback for bulk action operations
 * 
 * This component provides comprehensive activity logging functionality:
 * - Display all activities with detailed information
 * - Filter activities by status, priority, and search terms
 * - Perform bulk actions on selected activities
 * - Export activity data
 * - Track activity status and progress
 * - Manage activity priorities and categories
 */
const ActivityLog = ({ activities = [], onBulkAction }) => {
  // State management for filtering and search functionality
  const [searchTerm, setSearchTerm] = useState('')                    // Search term for filtering activities
  const [statusFilter, setStatusFilter] = useState('all')            // Filter by activity status
  const [priorityFilter, setPriorityFilter] = useState('all')        // Filter by activity priority
  const [selectedActivities, setSelectedActivities] = useState([])   // Selected activities for bulk actions
  const [viewMode, setViewMode] = useState('list')                   // View mode: list or grid

  // Filter activities based on search terms and selected filters
  // This creates a filtered view of activities based on user criteria
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.message.toLowerCase().includes(searchTerm.toLowerCase())  // Text search
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter        // Status filter
    const matchesPriority = priorityFilter === 'all' || activity.priority === priorityFilter // Priority filter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  /**
   * Handle bulk actions on selected activities
   * Performs operations on multiple activities at once
   * 
   * @param {string} action - The action to perform (e.g., 'approve', 'deny', 'delete')
   */
  const handleBulkAction = (action) => {
    // Don't proceed if no activities are selected
    if (selectedActivities.length === 0) return
    
    // Call parent component's bulk action handler
    if (onBulkAction) {
      onBulkAction(selectedActivities, action)
    }
    
    // Clear selections after action is performed
    setSelectedActivities([])
  }

  /**
   * Toggle activity selection for bulk operations
   * Adds or removes an activity from the selection list
   * 
   * @param {string|number} activityId - The ID of the activity to toggle
   */
  const toggleActivitySelection = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)  // Remove if already selected
        : [...prev, activityId]                 // Add if not selected
    )
  }

  /**
   * Select all filtered activities
   * Selects all activities currently visible in the filtered view
   */
  const selectAllActivities = () => {
    setSelectedActivities(filteredActivities.map(activity => activity.id))
  }

  /**
   * Clear all activity selections
   * Resets the selection state to empty
   */
  const clearSelections = () => {
    setSelectedActivities([])
  }

  /**
   * Get CSS classes for status-based styling
   * Returns appropriate color classes based on activity status
   * 
   * @param {string} status - The activity status
   * @returns {string} CSS classes for styling
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50'    // Green for approved
      case 'denied': return 'text-red-600 bg-red-50'          // Red for denied
      case 'pending': return 'text-yellow-600 bg-yellow-50'   // Yellow for pending
      case 'completed': return 'text-blue-600 bg-blue-50'     // Blue for completed
      default: return 'text-gray-600 bg-gray-50'              // Gray for unknown status
    }
  }

  /**
   * Get CSS classes for priority-based styling
   * Returns appropriate color classes based on activity priority
   * 
   * @param {string} priority - The activity priority
   * @returns {string} CSS classes for styling
   */
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'            // Red for high priority
      case 'medium': return 'text-yellow-600 bg-yellow-50'    // Yellow for medium priority
      case 'low': return 'text-green-600 bg-green-50'         // Green for low priority
      default: return 'text-gray-600 bg-gray-50'              // Gray for unknown priority
    }
  }

  /**
   * Format timestamp
   * Converts a timestamp to a human-readable relative time (e.g., "5m ago", "2h ago", "3d ago")
   * 
   * @param {number} timestamp - The timestamp to format
   * @returns {string} Formatted relative time
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Activity Log</h2>
          <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            {filteredActivities.length} activities
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title={`Switch to ${viewMode === 'list' ? 'grid' : 'list'} view`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
          <option value="completed">Completed</option>
        </select>
        
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        
        <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedActivities.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedActivities.length} activities selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve All
              </button>
              <button
                onClick={() => handleBulkAction('deny')}
                className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Deny All
              </button>
              <button
                onClick={clearSelections}
                className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activities List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div 
            key={activity.id} 
            className={`border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors ${
              selectedActivities.includes(activity.id) ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-start">
              {/* Checkbox for selection */}
              <input
                type="checkbox"
                checked={selectedActivities.includes(activity.id)}
                onChange={() => toggleActivitySelection(activity.id)}
                className="mt-1 mr-3"
              />
              
              {/* Activity content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity.priority)}`}>
                      {activity.priority}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
                
                {/* Activity details */}
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {activity.timestamp.toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    System
                  </span>
                  {activity.requiresApproval && (
                    <span className="text-orange-600 font-medium">
                      Requires Approval
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action buttons for pending activities */}
              {activity.status === 'pending' && activity.requiresApproval && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onBulkAction && onBulkAction([activity.id], 'approve')}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onBulkAction && onBulkAction([activity.id], 'deny')}
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

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">No activities found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Pagination */}
      {filteredActivities.length > 0 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {filteredActivities.length} of {activities.length} activities
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActivityLog 