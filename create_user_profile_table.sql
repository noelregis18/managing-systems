-- Create user_profile table for Supabase (with Clerk authentication)
-- This table stores additional user profile information

CREATE TABLE IF NOT EXISTS user_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id TEXT NOT NULL UNIQUE, -- Clerk user ID
    name TEXT,
    email TEXT,
    phone_number TEXT,
    semester_year TEXT,
    section TEXT,
    university_roll TEXT,
    college_roll TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profile_owner_id ON user_profile(owner_id);
CREATE INDEX IF NOT EXISTS idx_user_profile_email ON user_profile(email);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_user_profile_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profile_updated_at 
BEFORE UPDATE ON user_profile 
FOR EACH ROW 
EXECUTE FUNCTION update_user_profile_updated_at();

-- Optional: Add comments to table and columns
COMMENT ON TABLE user_profile IS 'Stores additional user profile information linked to Clerk user IDs';
COMMENT ON COLUMN user_profile.owner_id IS 'Clerk user ID - unique identifier from authentication system';
COMMENT ON COLUMN user_profile.name IS 'Full name of the user';
COMMENT ON COLUMN user_profile.email IS 'Email address of the user';
COMMENT ON COLUMN user_profile.phone_number IS 'Contact phone number';
COMMENT ON COLUMN user_profile.semester_year IS 'Current semester and year (e.g., 5th Semester, 2025)';
COMMENT ON COLUMN user_profile.section IS 'Section assignment (e.g., CSE A, CSE B, CSE C)';
COMMENT ON COLUMN user_profile.university_roll IS 'University roll number';
COMMENT ON COLUMN user_profile.college_roll IS 'College roll number';
COMMENT ON COLUMN user_profile.address IS 'Residential address';

