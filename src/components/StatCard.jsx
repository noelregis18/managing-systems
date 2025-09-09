/**
 * StatCard Component
 * 
 * A reusable card component for displaying statistics on the dashboard.
 * Shows an icon, title, value, and description in a clean, professional layout.
 * 
 * Features:
 * - Customizable icon and colors
 * - Hover effects and animations
 * - Responsive design
 * - Professional styling
 */

// Import React for component creation
import React from 'react'

/**
 * StatCard Component
 * 
 * @param {string} title - The title/label for the statistic
 * @param {string|number} value - The main value to display
 * @param {React.Component} icon - The icon component to display
 * @param {string} color - CSS class for icon color
 * @param {string} bgColor - CSS class for icon background color
 * @param {string} description - Additional description text
 * 
 * This component creates a professional-looking statistic card with:
 * - Icon with customizable colors
 * - Title and value display
 * - Optional description
 * - Hover effects and animations
 */
const StatCard = ({ title, value, icon: Icon, color, bgColor, description }) => {
  return (
    // Main card container with professional styling and hover effects
    <div className="stat-card animate-fade-in group">
      {/* Icon Container with customizable background color */}
      <div className={`inline-flex items-center justify-center w-12 h-12 ${bgColor} rounded-lg mb-4`}>
        {/* Icon component with customizable color */}
        <Icon className={`w-6 h-6 ${color}`} />
      </div>

      {/* Card Content Section */}
      <div>
        {/* Title text with medium font weight and gray color */}
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        {/* Main value display with large, bold text */}
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        {/* Description text with small, light gray styling */}
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {/* Hover Effect Indicator - Animated top border on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  )
}

// Export the StatCard component as the default export
export default StatCard