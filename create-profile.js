import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qajofxshayexbhsbvozo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFham9meHNoYXlleGJoc2J2b3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5Njc1MjksImV4cCI6MjA3NDU0MzUyOX0.rtx5svtBApkys1zbKIJSzZew_M9smOBLp_92ptAySx0'
);

async function createAdminProfile() {
  try {
    console.log('Creating admin profile for existing user...');

    // Create user profile for the existing admin user
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: '4aa27295-88c6-419a-b646-74509d1f9d55', // The user ID we got earlier
        email: 'admin@beelovedshouse.com',
        display_name: 'Bee Loved\'s House Admin',
        role: 'admin',
        created_at: new Date().toISOString(),
        last_login_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Error creating profile:', profileError.message);
      console.error('This might be because the user_profiles table doesn\'t exist yet.');
      console.error('Please run the SQL schema in your Supabase dashboard first.');
    } else {
      console.log('Admin profile created successfully!');
      console.log('Admin credentials:');
      console.log('Email: admin@beelovedshouse.com');
      console.log('Password: Beeloved@1#');
      console.log('Role: admin');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

createAdminProfile();