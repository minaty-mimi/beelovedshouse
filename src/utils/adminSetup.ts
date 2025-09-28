import { supabase, auth } from '../lib/supabase';

/**
 * Utility function to create an admin user
 * Run this in the browser console or create a temporary component to execute it
 */
export const createAdminUser = async (email: string, password: string, displayName: string) => {
  try {
    // Create the user account
    const { data, error } = await auth.signUp(email, password);

    if (error) {
      throw error;
    }

    if (!data?.user) {
      throw new Error('Failed to create user');
    }

    // Update user metadata with display name
    await supabase?.auth.updateUser({
      data: { display_name: displayName }
    });

    // Create the user profile with admin role
    const userProfile = {
      id: data.user.id,
      email: data.user.email!,
      display_name: displayName,
      role: 'admin',
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString()
    };

    // Save to Supabase
    const { error: profileError } = await supabase!
      .from('user_profiles')
      .insert(userProfile);

    if (profileError) {
      throw profileError;
    }

    console.log('Admin user created successfully:', userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

// Example usage (run in browser console after Supabase is configured):
// import { createAdminUser } from './src/utils/adminSetup';
// createAdminUser('admin@beelovedshouse.com', 'Beeloved@1#', 'Bee Loved\'s House Admin');

/**
 * Utility function to update an existing user's role to admin
 * Use this if the user already exists but needs admin privileges
 */
export const makeUserAdmin = async (email: string) => {
  try {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    // First, try to find the user by email in user_profiles
    const { data: existingProfile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingProfile) {
      // Update existing profile to admin
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          role: 'admin',
          last_login_at: new Date().toISOString()
        })
        .eq('id', existingProfile.id);

      if (updateError) {
        throw updateError;
      }

      console.log('User updated to admin successfully:', existingProfile);
      return existingProfile;
    } else {
      // Try to get user from auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error('User not found. Please sign in first or create the user account.');
      }

      // Create new profile with admin role
      const userProfile = {
        id: user.id,
        email: user.email!,
        display_name: user.user_metadata?.display_name || user.email!.split('@')[0],
        role: 'admin',
        created_at: new Date().toISOString(),
        last_login_at: new Date().toISOString()
      };

      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert(userProfile);

      if (profileError) {
        throw profileError;
      }

      console.log('Admin profile created successfully:', userProfile);
      return userProfile;
    }
  } catch (error) {
    console.error('Error making user admin:', error);
    throw error;
  }
};