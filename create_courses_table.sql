-- Create courses table for Supabase
-- This table stores course information linked to users via owner_id

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id TEXT NOT NULL,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    department TEXT,
    instructor TEXT,
    credits INTEGER DEFAULT 3,
    duration TEXT,
    students INTEGER DEFAULT 0,
    semester TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on owner_id for faster queries
CREATE INDEX IF NOT EXISTS idx_courses_owner_id ON courses(owner_id);

-- Create index on code for faster course code lookups
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own courses
CREATE POLICY "Users can view their own courses"
    ON courses
    FOR SELECT
    USING (auth.uid()::text = owner_id);

-- Create policy: Users can insert their own courses
CREATE POLICY "Users can insert their own courses"
    ON courses
    FOR INSERT
    WITH CHECK (auth.uid()::text = owner_id);

-- Create policy: Users can update their own courses
CREATE POLICY "Users can update their own courses"
    ON courses
    FOR UPDATE
    USING (auth.uid()::text = owner_id)
    WITH CHECK (auth.uid()::text = owner_id);

-- Create policy: Users can delete their own courses
CREATE POLICY "Users can delete their own courses"
    ON courses
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
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

