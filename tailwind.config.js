/**
 * Tailwind CSS Configuration File
 * 
 * This file configures Tailwind CSS for the Timetable Manager application.
 * It defines custom colors, animations, and content paths for the build process.
 * 
 * Key features:
 * - Custom primary color palette
 * - Sidebar-specific color scheme
 * - Custom animations for smooth interactions
 * - Content scanning for CSS purging
 */

/** @type {import('tailwindcss').Config} */
export default {
  // Content paths - tells Tailwind where to look for CSS classes
  // This ensures unused styles are purged in production builds
  content: [
    "./index.html",                    // Main HTML file
    "./src/**/*.{js,ts,jsx,tsx}",      // All JavaScript/TypeScript files in src
  ],
  
  // Theme customization - extends Tailwind's default theme
  theme: {
    extend: {
      // Custom color palette for professional look
      // Primary colors follow a blue-based scheme for consistency
      colors: {
        primary: {
          50: '#eff6ff',   // Very light blue - backgrounds
          100: '#dbeafe',  // Light blue - hover states
          200: '#bfdbfe',  // Medium light blue - borders
          300: '#93c5fd',  // Medium blue - secondary elements
          400: '#60a5fa',  // Blue - interactive elements
          500: '#3b82f6',  // Primary blue - main brand color
          600: '#2563eb',  // Dark blue - active states
          700: '#1d4ed8',  // Darker blue - pressed states
          800: '#1e40af',  // Very dark blue - text on light backgrounds
          900: '#1e3a8a',  // Darkest blue - text on white backgrounds
        },
        // Sidebar-specific colors for navigation
        sidebar: {
          bg: '#1e40af',      // Sidebar background color
          hover: '#1d4ed8',   // Hover state color
          active: '#2563eb',  // Active/selected state color
        }
      },
      
      // Custom animations for smooth interactions
      // These provide subtle motion effects for better UX
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',    // Smooth fade in effect
        'slide-in': 'slideIn 0.3s ease-out',     // Slide down animation
      },
      
      // Keyframe definitions for custom animations
      keyframes: {
        // Fade in animation - opacity transition
        fadeIn: {
          '0%': { opacity: '0' },     // Start completely transparent
          '100%': { opacity: '1' },   // End fully visible
        },
        // Slide in animation - combines movement and opacity
        slideIn: {
          '0%': { 
            transform: 'translateY(-10px)',  // Start 10px above final position
            opacity: '0'                     // Start transparent
          },
          '100%': { 
            transform: 'translateY(0)',      // End at final position
            opacity: '1'                     // End fully visible
          },
        }
      }
    },
  },
  
  // Plugins array - currently empty but can be extended with Tailwind plugins
  plugins: [],
}