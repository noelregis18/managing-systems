/**
 * Settings Component
 * 
 * This component provides essential settings for the timetable management system.
 * Users can customize timetable display preferences and basic application settings.
 * 
 * Features:
 * - Timetable display preferences
 * - Notification settings
 * - Real-time settings application
 * - Settings persistence
 * - Reset functionality
 */

// Import React and useState hook for state management
import React, { useState } from 'react'
// Import Lucide React icons for UI elements
import { Settings as SettingsIcon, Save, RefreshCw, Bell, CheckCircle, XCircle } from 'lucide-react'

/**
 * Settings Component
 * 
 * This component provides comprehensive settings management:
 * - Timetable display customization
 * - Notification preferences
 * - Real-time settings application
 * - Settings persistence in localStorage
 */
const Settings = () => {
  // Essential settings for timetable management
  // State object containing all application settings
  const [settings, setSettings] = useState({
    // Timetable-specific settings
    timetable: {
      defaultView: 'weekly', // Default view mode (weekly, daily, list)
      showWeekends: false,   // Whether to display weekends in timetable
      startTime: '09:30',    // Start time for timetable display
      endTime: '17:00',      // End time for timetable display
      autoRefresh: true      // Auto-refresh timetable data
    },
    // Notification preferences
    notifications: {
      classReminders: true,      // Class reminder notifications
      scheduleChanges: true,     // Schedule change notifications
      activityUpdates: true      // Activity update notifications
    }
  })

  /**
   * Handle settings changes
   * Updates the settings state when user modifies any setting
   * 
   * @param {string} category - The settings category (timetable, notifications)
   * @param {string} setting - The specific setting name
   * @param {any} value - The new value for the setting
   */
  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  /**
   * Save settings
   * Applies current settings and saves them to localStorage
   */
  const handleSaveSettings = () => {
    console.log('Settings saved:', settings)
    // Apply settings to timetable
    applySettingsToTimetable()
    // Show success notification
  }

  /**
   * Apply settings to timetable view
   * Saves settings to localStorage and navigates to timetable
   */
  const applySettingsToTimetable = () => {
    // Store settings in localStorage for persistence across sessions
    localStorage.setItem('timetableSettings', JSON.stringify(settings))
    
    // Navigate to timetable with new settings applied
    window.location.href = '/timetable'
  }

  /**
   * Handle immediate view change
   * Changes the default view and applies it immediately
   * 
   * @param {string} newView - The new view mode (weekly, daily, list)
   */
  const handleViewChange = (newView) => {
    handleSettingChange('timetable', 'defaultView', newView)
    // Apply view change immediately with a small delay
    setTimeout(() => {
      applySettingsToTimetable()
    }, 500)
  }

  /**
   * Handle immediate time change
   * Changes start or end time and applies it immediately
   * 
   * @param {string} type - The time type ('startTime' or 'endTime')
   * @param {string} newTime - The new time value
   */
  const handleTimeChange = (type, newTime) => {
    handleSettingChange('timetable', type, newTime)
    // Apply time change immediately with a small delay
    setTimeout(() => {
      applySettingsToTimetable()
    }, 500)
  }

  /**
   * Reset settings to default
   * Restores all settings to their original default values
   */
  const handleResetSettings = () => {
    setSettings({
      timetable: {
        defaultView: 'weekly',
        showWeekends: false,
        startTime: '09:30',
        endTime: '17:00',
        autoRefresh: true
      },
      notifications: {
        classReminders: true,
        scheduleChanges: true,
        activityUpdates: true
      }
    })
  }

  return (
    // Main settings page container with padding and background
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Page Header Section */}
      <div className="mb-8">
        {/* Main settings page title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        {/* Settings page description */}
        <p className="text-gray-600">
          Customize your timetable management preferences.
        </p>
      </div>

      {/* Settings Content Container */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Timetable Settings Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          {/* Timetable settings header with icon */}
          <div className="flex items-center mb-6">
            <SettingsIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Timetable Settings</h2>
          </div>

          {/* Timetable settings grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default View Setting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
              <select 
                value={settings.timetable.defaultView}
                onChange={(e) => handleViewChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
              >
                <option value="weekly">Weekly View</option>
                <option value="daily">Daily View</option>
                <option value="list">List View</option>
              </select>
            </div>

            {/* Start Time Setting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={settings.timetable.startTime}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* End Time Setting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={settings.timetable.endTime}
                onChange={(e) => handleTimeChange('endTime', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Checkbox Settings */}
            <div className="space-y-3">
              {/* Show Weekends Checkbox */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.timetable.showWeekends}
                  onChange={(e) => handleSettingChange('timetable', 'showWeekends', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Show Weekends</span>
              </label>

              {/* Auto Refresh Checkbox */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.timetable.autoRefresh}
                  onChange={(e) => handleSettingChange('timetable', 'autoRefresh', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Auto Refresh Timetable</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          {/* Notification settings header with icon */}
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
          </div>

          {/* Notification checkboxes */}
          <div className="space-y-4">
            {/* Class Reminders Checkbox */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.classReminders}
                onChange={(e) => handleSettingChange('notifications', 'classReminders', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Class Reminders</span>
            </label>

            {/* Schedule Changes Checkbox */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.scheduleChanges}
                onChange={(e) => handleSettingChange('notifications', 'scheduleChanges', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Schedule Change Notifications</span>
            </label>

            {/* Activity Updates Checkbox */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.activityUpdates}
                onChange={(e) => handleSettingChange('notifications', 'activityUpdates', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Activity Updates</span>
            </label>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex justify-end space-x-4">
          {/* Reset to Default Button */}
          <button
            onClick={handleResetSettings}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </button>
          {/* Save Settings Button */}
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

// Export the Settings component as the default export
export default Settings