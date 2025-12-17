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
import React, { useState, useRef, useEffect } from 'react'
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
  // State for search results dropdown
  const [showSearchResults, setShowSearchResults] = useState(false)
  // Ref for search input
  const searchRef = useRef(null)

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

  // Additional searchable content
  const searchableContent = [
    { type: 'FAQ', title: 'View Timetable', content: 'Navigate to the Timetable page from the sidebar' },
    { type: 'FAQ', title: 'Weekend View', content: 'Enable weekends in timetable settings' },
    { type: 'FAQ', title: 'Lunch Break', content: 'Monday and Sunday are holidays with no lunch break' },
    { type: 'FAQ', title: 'Default View', content: 'Change default timetable view in settings' },
    { type: 'FAQ', title: 'Time Slots', content: 'Customize start and end times in settings' },
    { type: 'Guide', title: 'Dashboard', content: 'View semester overview and statistics' },
    { type: 'Guide', title: 'Timetable Views', content: 'Weekly, Daily, and List view options' },
    { type: 'Guide', title: 'Settings', content: 'Customize preferences and notifications' },
    { type: 'Guide', title: 'Help', content: 'Find answers to common questions' },
    { type: 'Contact', title: 'Email Support', content: 'Contact via noel.regis04@gmail.com' },
    { type: 'Contact', title: 'Alternative Email', content: 'Contact via mdrakqibalam@gmail.com' },
    { type: 'Contact', title: 'Additional Email', content: 'Contact via wazir3404@gmail.com' },
    { type: 'App', title: 'Version', content: 'Current app version is 1.0.0' }
  ]

  /**
   * Filter FAQs based on search term
   * Searches both question and answer text for matches
   * Also matches against searchable content titles
   * 
   * @returns {Array} - Filtered array of FAQ items
   */
  const filteredFaqs = searchTerm.length > 0
    ? faqs.filter(faq => {
        const searchLower = searchTerm.toLowerCase()
        // Direct match in question or answer
        const directMatch = faq.question.toLowerCase().includes(searchLower) ||
                           faq.answer.toLowerCase().includes(searchLower)
        
        // Match through searchable content
        const searchableMatch = searchableContent.some(item =>
          item.type === 'FAQ' &&
          (item.title.toLowerCase().includes(searchLower) ||
           item.content.toLowerCase().includes(searchLower)) &&
          (faq.question.toLowerCase().includes(item.title.toLowerCase()) ||
           faq.answer.toLowerCase().includes(item.title.toLowerCase()) ||
           faq.question.toLowerCase().includes(item.content.toLowerCase()) ||
           faq.answer.toLowerCase().includes(item.content.toLowerCase()))
        )
        
        return directMatch || searchableMatch
      })
    : faqs

  /**
   * Filter searchable content based on search term
   * Searches title and content for matches
   * 
   * @returns {Array} - Filtered array of searchable content
   */
  const filteredSearchResults = searchableContent.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /**
   * Handle search input changes
   * Shows/hides search results dropdown based on input
   * 
   * @param {Event} e - Input change event
   */
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setShowSearchResults(value.length > 0)
  }
  
  /**
   * Auto-expand matching FAQ when search term changes
   * This effect runs whenever searchTerm changes
   */
  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase()
      
      // First, try direct match in FAQ question or answer
      const directMatch = faqs.find(faq =>
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower)
      )
      
      if (directMatch) {
        setExpandedFaq(directMatch.id)
        return
      }
      
      // If no direct match, try to find through searchable content
      const searchableItem = searchableContent.find(item =>
        item.type === 'FAQ' &&
        (item.title.toLowerCase().includes(searchLower) ||
         item.content.toLowerCase().includes(searchLower))
      )
      
      if (searchableItem) {
        // Map searchable content titles to FAQ IDs
        const searchableToFaqMap = {
          'view timetable': 1,
          'weekend view': 2,
          'lunch break': 3,
          'default view': 4,
          'time slots': 5
        }
        
        const searchableTitleLower = searchableItem.title.toLowerCase()
        const mappedFaqId = searchableToFaqMap[searchableTitleLower]
        
        if (mappedFaqId) {
          setExpandedFaq(mappedFaqId)
        } else {
          // Fallback: try to find FAQ by matching keywords
          const mappedFaq = faqs.find(faq => {
            const faqText = (faq.question + ' ' + faq.answer).toLowerCase()
            // Check if FAQ contains key words from searchable content
            const keywords = searchableItem.content.toLowerCase().split(' ')
            return keywords.some(keyword => 
              keyword.length > 3 && faqText.includes(keyword)
            )
          })
          
          if (mappedFaq) {
            setExpandedFaq(mappedFaq.id)
          }
        }
      }
    } else {
      // Clear expanded FAQ when search is cleared
      setExpandedFaq(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  /**
   * Handle search result selection
   * Closes dropdown and focuses on selected item
   * 
   * @param {Object} item - Selected search result item
   */
  const handleSearchResultClick = (item) => {
    setSearchTerm(item.title)
    setShowSearchResults(false)
    // Scroll to relevant section if it's a FAQ
    if (item.type === 'FAQ') {
      // Try to find FAQ by matching title or content
      const faqId = faqs.find(faq =>
        faq.question.toLowerCase().includes(item.title.toLowerCase()) ||
        faq.answer.toLowerCase().includes(item.title.toLowerCase()) ||
        faq.question.toLowerCase().includes(item.content.toLowerCase()) ||
        faq.answer.toLowerCase().includes(item.content.toLowerCase())
      )?.id
      if (faqId) {
        setExpandedFaq(faqId)
        // Scroll to FAQ section after a short delay
        setTimeout(() => {
          const faqElement = document.getElementById(`faq-${faqId}`)
          if (faqElement) {
            faqElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
    }
  }

  /**
   * Handle click outside search to close dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
    <div className="min-h-full">
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
      <div className="mb-8">
        <div className="relative w-full" ref={searchRef}>
          {/* Search icon positioned absolutely */}
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          {/* Search input field with pill-shaped design */}
          <input
            type="text"
            placeholder="Search item"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-full text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          />
          
          {/* Search Results Dropdown */}
          {showSearchResults && filteredSearchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {filteredSearchResults.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchResultClick(item)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {item.type === 'FAQ' && <HelpCircle className="w-4 h-4 text-blue-500" />}
                      {item.type === 'Guide' && <Book className="w-4 h-4 text-green-500" />}
                      {item.type === 'Contact' && <Mail className="w-4 h-4 text-purple-500" />}
                      {item.type === 'App' && <MessageCircle className="w-4 h-4 text-orange-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.content}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {item.type}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* No Results Message */}
          {showSearchResults && filteredSearchResults.length === 0 && searchTerm.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 text-center text-gray-500">
                No results found for "{searchTerm}"
              </div>
            </div>
          )}
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
              {/* Show message when search has no results */}
              {searchTerm.length > 0 && filteredFaqs.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
                  <p className="text-gray-600">No FAQs found matching "{searchTerm}"</p>
                </div>
              )}
              {/* Map through filtered FAQs to create expandable items */}
              {filteredFaqs.map((faq) => (
                <div key={faq.id} id={`faq-${faq.id}`} className="bg-white rounded-lg shadow-sm border border-gray-100">
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
                <a 
                  href="mailto:wazir3404@gmail.com"
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  wazir3404@gmail.com
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