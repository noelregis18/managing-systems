import { supabase } from '../lib/supabaseClient'

const TABLE_NAME = 'user_profile'

/**
 * Load user profile for a specific user
 * @param {string} ownerId - The user's ID from Clerk
 * @returns {Promise<Object|null>} - User profile object or null if not found
 */
export async function loadUserProfile(ownerId) {
	if (!ownerId) throw new Error('ownerId is required')
	const { data, error } = await supabase
		.from(TABLE_NAME)
		.select('*')
		.eq('owner_id', ownerId)
		.single()

	if (error && error.code !== 'PGRST116') {
		console.error('Supabase error loading user profile:', {
			message: error.message,
			code: error.code,
			details: error.details,
			hint: error.hint
		})
		throw error
	}

	return data || null
}

/**
 * Create or update user profile (upsert)
 * @param {string} ownerId - The user's ID from Clerk
 * @param {Object} profileData - Profile data object
 * @returns {Promise<Object>} - The saved/updated profile object
 */
export async function upsertUserProfile(ownerId, profileData) {
	if (!ownerId) throw new Error('ownerId is required')
	
	// Handle empty strings by converting them to null for database consistency
	const record = {
		owner_id: ownerId,
		name: profileData.name && profileData.name.trim() ? profileData.name.trim() : null,
		email: profileData.email && profileData.email.trim() ? profileData.email.trim() : null,
		phone_number: profileData.phone_number && profileData.phone_number.trim() ? profileData.phone_number.trim() : null,
		semester_year: profileData.semester_year && profileData.semester_year.trim() ? profileData.semester_year.trim() : null,
		section: profileData.section && profileData.section.trim() ? profileData.section.trim() : null,
		university_roll: profileData.university_roll && profileData.university_roll.trim() ? profileData.university_roll.trim() : null,
		college_roll: profileData.college_roll && profileData.college_roll.trim() ? profileData.college_roll.trim() : null,
		address: profileData.address && profileData.address.trim() ? profileData.address.trim() : null,
		updated_at: new Date().toISOString()
	}

	console.log('Upserting user profile in Supabase:', { table: TABLE_NAME, record })
	const { data, error } = await supabase
		.from(TABLE_NAME)
		.upsert(record, { onConflict: 'owner_id' })
		.select()
		.single()

	if (error) {
		console.error('Supabase error upserting user profile:', {
			message: error.message,
			code: error.code,
			details: error.details,
			hint: error.hint
		})
		throw error
	}
	console.log('User profile upserted successfully:', data)
	return data
}

/**
 * Update user profile
 * @param {string} ownerId - The user's ID from Clerk
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} - The updated profile object
 */
export async function updateUserProfile(ownerId, profileData) {
	if (!ownerId) throw new Error('ownerId is required')
	
	const record = {
		name: profileData.name || null,
		email: profileData.email || null,
		phone_number: profileData.phone_number || null,
		semester_year: profileData.semester_year || null,
		section: profileData.section || null,
		university_roll: profileData.university_roll || null,
		college_roll: profileData.college_roll || null,
		address: profileData.address || null,
		updated_at: new Date().toISOString()
	}

	const { data, error } = await supabase
		.from(TABLE_NAME)
		.update(record)
		.eq('owner_id', ownerId)
		.select()
		.single()

	if (error) {
		console.error('Supabase error updating user profile:', {
			message: error.message,
			code: error.code,
			details: error.details,
			hint: error.hint
		})
		throw error
	}
	return data
}

/**
 * Delete user profile from the database
 * @param {string} ownerId - The user's ID from Clerk
 * @returns {Promise<void>}
 */
export async function deleteUserProfile(ownerId) {
	if (!ownerId) throw new Error('ownerId is required')
	
	const { error } = await supabase
		.from(TABLE_NAME)
		.delete()
		.eq('owner_id', ownerId)

	if (error) {
		console.error('Supabase error deleting user profile:', {
			message: error.message,
			code: error.code,
			details: error.details,
			hint: error.hint
		})
		throw error
	}
}

