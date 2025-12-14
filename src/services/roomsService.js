import { supabase } from '../lib/supabaseClient'

const TABLE_NAME = 'rooms'

/**
 * Load all rooms for a specific user
 * @param {string} ownerId - The user's ID from Clerk
 * @returns {Promise<Array>} - Array of room objects
 */
export async function loadUserRooms(ownerId) {
	if (!ownerId) throw new Error('ownerId is required')
	const { data, error } = await supabase
		.from(TABLE_NAME)
		.select('*')
		.eq('owner_id', ownerId)
		.order('created_at', { ascending: false })

	if (error) throw error
	return data || []
}

/**
 * Save a new room to the database
 * @param {string} ownerId - The user's ID from Clerk
 * @param {Object} roomData - Room data object
 * @returns {Promise<Object>} - The saved room object
 */
export async function createRoom(ownerId, roomData) {
	if (!ownerId) throw new Error('ownerId is required')
	const record = {
		owner_id: ownerId,
		name: roomData.name,
		capacity: roomData.capacity || 65,
		type: roomData.type || 'Lecture Hall',
		status: roomData.status || 'Available',
		subjects: roomData.subjects || [],
		schedule: roomData.schedule || '',
		instructors: roomData.instructors || '',
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString()
	}

	console.log('Creating room in Supabase:', { table: TABLE_NAME, record })
	const { data, error } = await supabase
		.from(TABLE_NAME)
		.insert(record)
		.select()
		.single()

	if (error) {
		console.error('Supabase error creating room:', {
			message: error.message,
			code: error.code,
			details: error.details,
			hint: error.hint
		})
		throw error
	}
	console.log('Room created successfully:', data)
	return data
}

/**
 * Update an existing room
 * @param {string} ownerId - The user's ID from Clerk
 * @param {string} roomId - The room's ID
 * @param {Object} roomData - Updated room data
 * @returns {Promise<Object>} - The updated room object
 */
export async function updateRoom(ownerId, roomId, roomData) {
	if (!ownerId) throw new Error('ownerId is required')
	if (!roomId) throw new Error('roomId is required')
	
	const record = {
		name: roomData.name,
		capacity: roomData.capacity,
		type: roomData.type,
		status: roomData.status,
		subjects: roomData.subjects || [],
		schedule: roomData.schedule || '',
		instructors: roomData.instructors || '',
		updated_at: new Date().toISOString()
	}

	const { data, error } = await supabase
		.from(TABLE_NAME)
		.update(record)
		.eq('id', roomId)
		.eq('owner_id', ownerId)
		.select()
		.single()

	if (error) throw error
	return data
}

/**
 * Delete a room from the database
 * @param {string} ownerId - The user's ID from Clerk
 * @param {string} roomId - The room's ID
 * @returns {Promise<void>}
 */
export async function deleteRoom(ownerId, roomId) {
	if (!ownerId) throw new Error('ownerId is required')
	if (!roomId) throw new Error('roomId is required')

	const { error } = await supabase
		.from(TABLE_NAME)
		.delete()
		.eq('id', roomId)
		.eq('owner_id', ownerId)

	if (error) throw error
}

