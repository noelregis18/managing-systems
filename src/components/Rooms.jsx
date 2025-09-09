/**
 * Rooms Component
 * 
 * This component manages classroom and facility information.
 * Users can view, add, edit, and manage room details and availability.
 * 
 * Key features:
 * - Room listing and management
 * - Search and filter functionality
 * - Add, edit, and delete room operations
 * - Room availability tracking
 * - Schedule management
 * - Professional room management interface
 */

// Import React and useState hook for state management
import React, { useState } from 'react'
// Import Lucide React icons for UI elements
import { Building, Plus, Search, Edit, Trash2, MapPin, Users, Wifi } from 'lucide-react'
// Import useNavigate hook for programmatic navigation
import { useNavigate } from 'react-router-dom'

/**
 * Rooms Component
 * 
 * This component provides comprehensive room management functionality:
 * - Display all rooms and facilities
 * - Search and filter rooms by type and availability
 * - Add new rooms with detailed information
 * - Edit existing room details
 * - Delete rooms with confirmation
 * - Track room schedules and instructors
 * - Manage room capacity and status
 */
const Rooms = () => {
  // Navigation hook for programmatic routing
  const navigate = useNavigate()
  
  // State management for room editing
  const [editingRoom, setEditingRoom] = useState(null)        // Currently editing room
  const [isEditing, setIsEditing] = useState(false)           // Edit mode flag
  const [isAddingRoom, setIsAddingRoom] = useState(false)     // Add mode flag
  
  // State for new room form data
  const [newRoom, setNewRoom] = useState({
    name: '',                    // Room name
    capacity: 65,                // Room capacity
    type: 'Lecture Hall',        // Room type
    status: 'Available',         // Room status
    subjects: [],                // Subjects taught in room
    schedule: '',                // Room schedule
    instructors: ''              // Assigned instructors
  })
  
  // State management for rooms data
  // Real rooms data based on 5th Semester CSE B timetable
  const [rooms, setRooms] = useState([
    // Main Lecture Hall
    {
      id: 1,
      name: 'LH-136',
      capacity: 65,
      type: 'Lecture Hall',
      status: 'Available',
      subjects: ['Software Engineering', 'Compiler Design', 'Operating Systems', 'Object Oriented Programming', 'Artificial Intelligence', 'Introduction to Industrial Management', 'Constitution of India'],
      schedule: 'Monday to Saturday, 9:30 AM - 5:00 PM'
    },
    // Software Engineering Lab
    {
      id: 2,
      name: 'Computer Lab 3&4',
      capacity: 65,
      type: 'Computer Lab',
      status: 'Available',
      subjects: ['Software Engineering Lab (ESC 591)'],
      schedule: 'Wednesday, 2:30 PM - 5:00 PM',
      instructors: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)'
    },
    // Operating Systems Lab
    {
      id: 3,
      name: 'Computer Lab 3&4',
      capacity: 65,
      type: 'Computer Lab',
      status: 'Available',
      subjects: ['Operating Systems Lab (PCC CS-593)'],
      schedule: 'Thursday, 2:30 PM - 5:00 PM',
      instructors: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)'
    },
    // Object Oriented Programming Lab
    {
      id: 4,
      name: 'Computer Lab 7&8',
      capacity: 65,
      type: 'Computer Lab',
      status: 'Available',
      subjects: ['Object Oriented Programming Lab (PCC CS-593)'],
      schedule: 'Saturday, 2:30 PM - 5:00 PM',
      instructors: 'AB(CS)+LKM(CS)+RR(CS)'
    },
    // Library
    {
      id: 5,
      name: 'Library',
      capacity: 65,
      type: 'Library',
      status: 'Available',
      subjects: ['Library Session'],
      schedule: 'Thursday & Friday, 1:40 PM - 2:30 PM',
      instructors: 'LIBRARIAN'
    },
    // Aptitude Training Room
    {
      id: 6,
      name: 'Aptitude Training Room',
      capacity: 65,
      type: 'Training Room',
      status: 'Available',
      subjects: ['Aptitude Training'],
      schedule: 'Friday, 2:30 PM - 4:10 PM',
      instructors: 'AM(CS), BTM(CS)'
    },
    // Grooming Session Room
    {
      id: 7,
      name: 'Grooming Session Room',
      capacity: 65,
      type: 'Training Room',
      status: 'Available',
      subjects: ['Grooming Session'],
      schedule: 'Tuesday & Friday, 4:10 PM - 5:00 PM',
      instructors: 'PR(CS), PKC(CS)'
    }
  ])

  // State for search and filter functionality
  const [searchTerm, setSearchTerm] = useState('')             // Search term for filtering rooms
  const [selectedRoomType, setSelectedRoomType] = useState('All Types') // Selected room type filter

  /**
   * Filter rooms based on search term and selected room type
   */
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedRoomType === 'All Types' || room.type === selectedRoomType
    
    return matchesSearch && matchesType
  })

  /**
   * Get status color for room status badges
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800'
      case 'Occupied':
        return 'bg-red-100 text-red-800'
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  /**
   * Handle room deletion
   */
  const handleDeleteRoom = (roomId) => {
    setRooms(rooms.filter(room => room.id !== roomId))
  }

  /**
   * Handle view schedule - navigate to timetable
   */
  const handleViewSchedule = () => {
    navigate('/timetable')
  }

  /**
   * Handle edit room
   */
  const handleEditRoom = (room) => {
    setEditingRoom(room)
    setIsEditing(true)
  }

  /**
   * Handle save edited room
   */
  const handleSaveRoom = (updatedRoom) => {
    setRooms(rooms.map(room => 
      room.id === updatedRoom.id ? updatedRoom : room
    ))
    setIsEditing(false)
    setEditingRoom(null)
  }

  /**
   * Handle cancel edit
   */
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingRoom(null)
  }

  /**
   * Handle add room modal
   */
  const handleAddRoom = () => {
    setIsAddingRoom(true)
    setNewRoom({
      name: '',
      capacity: 65,
      type: 'Lecture Hall',
      status: 'Available',
      subjects: [],
      schedule: '',
      instructors: ''
    })
  }

  /**
   * Handle save new room
   */
  const handleSaveNewRoom = () => {
    if (newRoom.name.trim()) {
      const roomToAdd = {
        ...newRoom,
        id: Math.max(...rooms.map(r => r.id)) + 1,
        subjects: newRoom.subjects.filter(subject => subject.trim())
      }
      setRooms([...rooms, roomToAdd])
      setIsAddingRoom(false)
      setNewRoom({
        name: '',
        capacity: 65,
        type: 'Lecture Hall',
        status: 'Available',
        subjects: [],
        schedule: '',
        instructors: ''
      })
    }
  }

  /**
   * Handle cancel add room
   */
  const handleCancelAddRoom = () => {
    setIsAddingRoom(false)
    setNewRoom({
      name: '',
      capacity: 65,
      type: 'Lecture Hall',
      status: 'Available',
      subjects: [],
      schedule: '',
      instructors: ''
    })
  }

  /**
   * Handle add subject to new room
   */
  const handleAddSubject = () => {
    const subjectInput = document.getElementById('subjectInput')
    if (subjectInput && subjectInput.value.trim()) {
      setNewRoom({
        ...newRoom,
        subjects: [...newRoom.subjects, subjectInput.value.trim()]
      })
      subjectInput.value = ''
    }
  }

  /**
   * Handle remove subject from new room
   */
  const handleRemoveSubject = (index) => {
    setNewRoom({
      ...newRoom,
      subjects: newRoom.subjects.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Rooms</h1>
            <p className="text-gray-600">
              Manage classroom facilities and track room availability.
            </p>
          </div>
          <button 
            onClick={handleAddRoom}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
            <Building className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Rooms</h3>
          <div className="text-2xl font-bold text-gray-900">{rooms.length}</div>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Capacity</h3>
          <div className="text-2xl font-bold text-gray-900">65</div>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-lg mb-4">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Available</h3>
          <div className="text-2xl font-bold text-gray-900">
            {rooms.filter(room => room.status === 'Available').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-lg mb-4">
            <Building className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Occupied</h3>
          <div className="text-2xl font-bold text-gray-900">
            {rooms.filter(room => room.status === 'Occupied').length}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms, buildings, or types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select 
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
            >
              <option>All Types</option>
              <option>Lecture Hall</option>
              <option>Computer Lab</option>
              <option>Library</option>
              <option>Training Room</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            {/* Room Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{room.name}</h3>
                <p className="text-sm text-gray-600">{room.type}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                {room.status}
              </span>
            </div>

            {/* Room Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>Capacity: {room.capacity} students</span>
              </div>
              {room.subjects && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Subjects:</span>
                  <div className="mt-1">
                    {room.subjects.map((subject, index) => (
                      <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {room.schedule && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Schedule:</span> {room.schedule}
                </div>
              )}
              {room.instructors && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Instructors:</span> {room.instructors}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <button 
                onClick={handleViewSchedule}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View Schedule
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditRoom(room)}
                  className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteRoom(room.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first room.'}
          </p>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>
      )}

      {/* Edit Room Modal */}
      {isEditing && editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Room</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                <input
                  type="text"
                  value={editingRoom.name}
                  onChange={(e) => setEditingRoom({...editingRoom, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="number"
                  value={editingRoom.capacity}
                  onChange={(e) => setEditingRoom({...editingRoom, capacity: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={editingRoom.type}
                  onChange={(e) => setEditingRoom({...editingRoom, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                >
                  <option>Lecture Hall</option>
                  <option>Computer Lab</option>
                  <option>Library</option>
                  <option>Training Room</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingRoom.status}
                  onChange={(e) => setEditingRoom({...editingRoom, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                >
                  <option>Available</option>
                  <option>Occupied</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveRoom(editingRoom)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {isAddingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Room</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Name *</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter room name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value) || 65})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newRoom.type}
                  onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                >
                  <option>Lecture Hall</option>
                  <option>Computer Lab</option>
                  <option>Library</option>
                  <option>Training Room</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newRoom.status}
                  onChange={(e) => setNewRoom({...newRoom, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                >
                  <option>Available</option>
                  <option>Occupied</option>
                  <option>Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <input
                  type="text"
                  value={newRoom.schedule}
                  onChange={(e) => setNewRoom({...newRoom, schedule: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Monday to Friday, 9:00 AM - 5:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructors</label>
                <input
                  type="text"
                  value={newRoom.instructors}
                  onChange={(e) => setNewRoom({...newRoom, instructors: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., John Doe, Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    id="subjectInput"
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter subject name"
                  />
                  <button
                    onClick={handleAddSubject}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {newRoom.subjects.map((subject, index) => (
                    <span key={index} className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {subject}
                      <button
                        onClick={() => handleRemoveSubject(index)}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelAddRoom}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewRoom}
                disabled={!newRoom.name.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rooms