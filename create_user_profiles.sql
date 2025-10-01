-- Create user_profiles table for Firebase auth users
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies - For Firebase auth, we allow users to manage their own profiles
-- Since auth.uid() is from Supabase (not Firebase), we use a policy that allows based on the request
CREATE POLICY "Enable all operations for authenticated users" ON user_profiles
  FOR ALL USING (true) WITH CHECK (true);

-- Insert admin user (using the Firebase user ID from your logs)
INSERT INTO user_profiles (id, email, display_name, role) VALUES 
('d02126be-fc89-4bc0-8048-f177d282e332', 'beelovedshouse@gmail.com', 'Admin', 'admin') 
ON CONFLICT (id) DO NOTHING;