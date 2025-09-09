/**
 * Help Component
 * 
 * This component provides help documentation and support information.
 * Users can find answers to common questions about the timetable application.
 * 
 * Features:
 * - Searchable FAQ section
 * - Quick start guide
 * - Contact information
 * - Expandable FAQ items
 * - Responsive design
 */

// Import React and useState hook for state management
import React, { useState } from 'react'
// Import Lucide React icons for UI elements
import { HelpCircle, Search, Book, MessageCircle, Mail, ChevronDown, ChevronRight } from 'lucide-react'

/**
 * Help Component
 * 
 * This component provides comprehensive help and support functionality:
 * - Searchable FAQ system
 * - Quick start guide for new users
 * - Contact information for support
 * - App information and version details
 */
const Help = () => {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('')
  // State for tracking which FAQ item is expanded
  const [expandedFaq, setExpandedFaq] = useState(null)

  // FAQ data relevant to our timetable app
  // Each FAQ object contains an id, question, and detailed answer
  const faqs = [
    {
      id: 1,
      question: 'How do I view my timetable?',
      answer: 'Navigate to the Timetable page from the sidebar. You can switch between Weekly, Daily, and List views using the view buttons at the top of the page.'
    },
    {
      id: 2,
      question: 'How do I enable weekends in the timetable?',
      answer: 'Go to Settings > Timetable Settings and check the "Show Weekends" option. This will display Monday and Sunday in your timetable view.'
    },
    {
      id: 3,
      question: 'What does "No Lunch Break" mean on Monday and Sunday?',
      answer: 'Monday and Sunday are holidays, so there is no lunch break scheduled. The system automatically shows "No Lunch Break" for these days when weekends are enabled.'
    },
    {
      id: 4,
      question: 'How do I change the default view of the timetable?',
      answer: 'Go to Settings > Timetable Settings and select your preferred default view (Weekly, Daily, or List) from the "Default View" dropdown.'
    },
    {
      id: 5,
      question: 'Can I customize the time slots?',
      answer: 'Yes, you can modify the start and end times in Settings > Timetable Settings. The timetable will automatically adjust to your preferred time range.'
    }
  ]

  /**
   * Filter FAQs based on search term
   * Searches both question and answer text for matches
   * 
   * @returns {Array} - Filtered array of FAQ items
   */
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /**
   * Toggle FAQ expansion
   * If the clicked FAQ is already expanded, collapse it
   * Otherwise, expand the clicked FAQ and collapse others
   * 
   * @param {number} faqId - The ID of the FAQ item to toggle
   */
  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  return (
    // Main help page container with padding and background
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Page Header Section */}
      <div className="mb-8">
        {/* Main help page title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        {/* Help page description */}
        <p className="text-gray-600">
          Find answers to common questions about using the Timetable Manager.
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <div className="relative max-w-2xl mx-auto">
          {/* Search icon positioned absolutely */}
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          {/* Search input field */}
          <input
            type="text"
            placeholder="Search for help topics or FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      {/* Three-column layout on large screens, single column on smaller screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Section - Takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2">
          {/* Quick Start Guide Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            {/* Guide header with icon */}
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg mr-4">
                <Book className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Quick Start Guide</h2>
            </div>
            {/* Step-by-step guide content */}
            <div className="space-y-3 text-gray-600">
              <p>1. <strong>Dashboard:</strong> View your semester overview and quick statistics</p>
              <p>2. <strong>Timetable:</strong> Check your class schedule in Weekly, Daily, or List view</p>
              <p>3. <strong>Settings:</strong> Customize your timetable preferences and notifications</p>
              <p>4. <strong>Help:</strong> Find answers to common questions (you're here!)</p>
            </div>
          </div>

          {/* FAQs Section */}
          <div>
            {/* FAQs header */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            {/* FAQ items container */}
            <div className="space-y-4">
              {/* Map through filtered FAQs to create expandable items */}
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
                  {/* FAQ question button - clickable to expand/collapse */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    {/* Question text */}
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    {/* Expand/collapse icon - changes based on state */}
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {/* FAQ answer - only shown when expanded */}
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Section - Takes 1/3 of the width on large screens */}
        <div className="space-y-6">
          {/* Contact Support Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            {/* Contact header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            {/* Contact description */}
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Contact our support team.
            </p>
            {/* Email contact information */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Contact via Email:</h4>
              <div className="space-y-2">
                {/* First support email */}
                <a 
                  href="mailto:noel.regis04@gmail.com"
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  noel.regis04@gmail.com
                </a>
                {/* Second support email */}
                <a 
                  href="mailto:mdrakqibalam@gmail.com"
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  mdrakqibalam@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* App Information Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            {/* App info header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">App Information</h3>
            {/* App version information */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export the Help component as the default export
export default Help