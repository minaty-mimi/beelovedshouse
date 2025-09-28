import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qajofxshayexbhsbvozo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFham9meHNoYXlleGJoc2J2b3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5Njc1MjksImV4cCI6MjA3NDU0MzUyOX0.rtx5svtBApkys1zbKIJSzZew_M9smOBLp_92ptAySx0'
);

async function setupAdmin() {
  try {
    console.log('Setting up admin user...');

    // First try to sign in (in case user already exists)
    console.log('Trying to sign in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'beelovedshouse@gmail.com',
      password: 'Beeloved@1#'
    });

    if (signInData?.user && !signInError) {
      console.log('User already exists and signed in:', signInData.user.id);

      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', signInData.user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('Creating user profile...');
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            id: signInData.user.id,
            email: signInData.user.email,
            display_name: 'Bee Loved\'s House Admin',
            role: 'admin',
            created_at: new Date().toISOString(),
            last_login_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('Error creating profile:', insertError.message);
        } else {
          console.log('Admin profile created successfully!');
        }
      } else if (profile) {
        console.log('Admin profile already exists with role:', profile.role);
        // Update role to admin if it's not already
        if (profile.role !== 'admin') {
          console.log('Updating role to admin...');
          const { error: updateError } = await supabase
            .from('user_profiles')
            .update({ role: 'admin' })
            .eq('id', signInData.user.id);

          if (updateError) {
            console.error('Error updating role:', updateError.message);
          } else {
            console.log('Role updated to admin successfully!');
          }
        }
      }

      console.log('Admin setup complete!');
      console.log('Email: beelovedshouse@gmail.com');
      console.log('Password: Beeloved@1#');

    } else {
      console.log('User doesn\'t exist, trying to sign up...');

      // Try to sign up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'beelovedshouse@gmail.com',
        password: 'Beeloved@1#'
      });

      if (signUpError) {
        console.error('Error creating user:', signUpError.message);
        return;
      }

      if (signUpData?.user) {
        console.log('User created:', signUpData.user.id);

        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: signUpData.user.id,
            email: signUpData.user.email,
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
          console.log('Email: beelovedshouse@gmail.com');
          console.log('Password: Beeloved@1#');
        }
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

setupAdmin();