import { supabase } from '../lib/supabaseClient'

const TABLE_NAME = 'timetables'

export async function loadUserTimetable(ownerId) {
	if (!ownerId) throw new Error('ownerId is required')
	const { data, error } = await supabase
		.from(TABLE_NAME)
		.select('id, owner_id, section, data, updated_at')
		.eq('owner_id', ownerId)
		.single()

	if (error && error.code !== 'PGRST116') {
		throw error
	}

	return data || null
}

export async function upsertUserTimetable(ownerId, payload) {
	if (!ownerId) throw new Error('ownerId is required')
	const record = {
		owner_id: ownerId,
		section: payload.section || 'CSE B',
		data: payload.data || {},
		updated_at: new Date().toISOString()
	}

	const { data, error } = await supabase
		.from(TABLE_NAME)
		.upsert(record, { onConflict: 'owner_id' })
		.select()
		.single()

	if (error) throw error
	return data
}
