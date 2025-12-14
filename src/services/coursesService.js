import { supabase } from '../lib/supabaseClient'

const TABLE_NAME = 'courses'

/**
 * Load all courses for a specific user
 * @param {string} ownerId - The user's ID from Clerk
 * @returns {Promise<Array>} - Array of course objects
 */
export async function loadUserCourses(ownerId) {
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
 * Save a new course to the database
 * @param {string} ownerId - The user's ID from Clerk
 * @param {Object} courseData - Course data object
 * @returns {Promise<Object>} - The saved course object
 */
export async function createCourse(ownerId, courseData) {
	if (!ownerId) throw new Error('ownerId is required')
	const record = {
		owner_id: ownerId,
		name: courseData.name || '',
		code: courseData.code || '',
		department: courseData.department || '',
		instructor: courseData.instructor || '',
		credits: courseData.credits || 3,
		duration: courseData.duration || '',
		students: courseData.students || 0,
		semester: courseData.semester || '',
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString()
	}

	console.log('Creating course in Supabase:', { table: TABLE_NAME, record })
	const { data, error } = await supabase
		.from(TABLE_NAME)
		.insert(record)
		.select()
		.single()

	if (error) {
		console.error('Supabase error creating course:', {
			message: error.message,
			code: error.code,
			details: error.details,
			hint: error.hint
		})
		throw error
	}
	console.log('Course created successfully:', data)
	return data
}

/**
 * Update an existing course
 * @param {string} ownerId - The user's ID from Clerk
 * @param {string} courseId - The course's ID
 * @param {Object} courseData - Updated course data
 * @returns {Promise<Object>} - The updated course object
 */
export async function updateCourse(ownerId, courseId, courseData) {
	if (!ownerId) throw new Error('ownerId is required')
	if (!courseId) throw new Error('courseId is required')
	
	const record = {
		name: courseData.name,
		code: courseData.code,
		department: courseData.department,
		instructor: courseData.instructor,
		credits: courseData.credits,
		duration: courseData.duration,
		students: courseData.students,
		semester: courseData.semester,
		updated_at: new Date().toISOString()
	}

	const { data, error } = await supabase
		.from(TABLE_NAME)
		.update(record)
		.eq('id', courseId)
		.eq('owner_id', ownerId)
		.select()
		.single()

	if (error) throw error
	return data
}

/**
 * Delete a course from the database
 * @param {string} ownerId - The user's ID from Clerk
 * @param {string} courseId - The course's ID
 * @returns {Promise<void>}
 */
export async function deleteCourse(ownerId, courseId) {
	if (!ownerId) throw new Error('ownerId is required')
	if (!courseId) throw new Error('courseId is required')

	const { error } = await supabase
		.from(TABLE_NAME)
		.delete()
		.eq('id', courseId)
		.eq('owner_id', ownerId)

	if (error) throw error
}

