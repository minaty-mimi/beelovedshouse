import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qajofxshayexbhsbvozo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFham9meHNoYXlleGJoc2J2b3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5Njc1MjksImV4cCI6MjA3NDU0MzUyOX0.rtx5svtBApkys1zbKIJSzZew_M9smOBLp_92ptAySx0'
);

async function createUserProfilesTable() {
  try {
    console.log('Creating user_profiles table...');

    // Try to create the table using raw SQL via REST API
    const response = await fetch('https://qajofxshayexbhsbvozo.supabase.co/rest/v1/rpc/exec_sql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFham9meHNoYXlleGJoc2J2b3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5Njc1MjksImV4cCI6MjA3NDU0MzUyOX0.rtx5svtBApkys1zbKIJSzZew_M9smOBLp_92ptAySx0',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFham9meHNoYXlleGJoc2J2b3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5Njc1MjksImV4cCI6MjA3NDU0MzUyOX0.rtx5svtBApkys1zbKIJSzZew_M9smOBLp_92ptAySx0'
      },
      body: JSON.stringify({
        sql: `CREATE TABLE IF NOT EXISTS user_profiles (
          id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
          email TEXT NOT NULL,
          display_name TEXT,
          role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          last_login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Users can view own profile" ON user_profiles
          FOR SELECT USING (auth.uid() = id);

        CREATE POLICY "Users can update own profile" ON user_profiles
          FOR UPDATE USING (auth.uid() = id);

        CREATE POLICY "Users can insert own profile" ON user_profiles
          FOR INSERT WITH CHECK (auth.uid() = id);`
      })
    });

    if (response.ok) {
      console.log('Table created successfully!');
    } else {
      console.error('Failed to create table:', await response.text());
    }

  } catch (err) {
    console.error('Error:', err.message);
  }
}

createUserProfilesTable();