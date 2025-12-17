-- Create rooms table for Supabase
-- This table stores room information and occupancy status linked to users via owner_id

CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id TEXT NOT NULL,
    name TEXT NOT NULL,
    capacity INTEGER DEFAULT 65,
    type TEXT DEFAULT 'Lecture Hall',
    status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied', 'Maintenance')),
    subjects JSONB DEFAULT '[]'::jsonb,
    schedule TEXT,
    instructors TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on owner_id for faster queries
CREATE INDEX IF NOT EXISTS idx_rooms_owner_id ON rooms(owner_id);

-- Create index on status for faster occupancy queries
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);

-- Create index on name for faster room name lookups
CREATE INDEX IF NOT EXISTS idx_rooms_name ON rooms(name);

-- Enable Row Level Security (RLS)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own rooms
CREATE POLICY "Users can view their own rooms"
    ON rooms
    FOR SELECT
    USING (auth.uid()::text = owner_id);

-- Create policy: Users can insert their own rooms
CREATE POLICY "Users can insert their own rooms"
    ON rooms
    FOR INSERT
    WITH CHECK (auth.uid()::text = owner_id);

-- Create policy: Users can update their own rooms
CREATE POLICY "Users can update their own rooms"
    ON rooms
    FOR UPDATE
    USING (auth.uid()::text = owner_id)
    WITH CHECK (auth.uid()::text = owner_id);

-- Create policy: Users can delete their own rooms
CREATE POLICY "Users can delete their own rooms"
    ON rooms
    FOR DELETE
    USING (auth.uid()::text = owner_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on row update
CREATE TRIGGER update_rooms_updated_at
    BEFORE UPDATE ON rooms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

