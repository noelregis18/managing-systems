/**
 * PostCSS Configuration File
 * 
 * This file configures PostCSS for CSS processing in the Timetable Manager application.
 * PostCSS is a tool for transforming CSS with JavaScript plugins.
 * 
 * Key features:
 * - Tailwind CSS processing
 * - Automatic vendor prefixing
 * - CSS optimization and transformation
 */

// Export PostCSS configuration object
export default {
  // Plugins configuration - defines which PostCSS plugins to use
  plugins: {
    // Tailwind CSS plugin - processes Tailwind directives and generates utility classes
    tailwindcss: {},
    
    // Autoprefixer plugin - automatically adds vendor prefixes to CSS properties
    // Ensures cross-browser compatibility for modern CSS features
    autoprefixer: {},
  },
}