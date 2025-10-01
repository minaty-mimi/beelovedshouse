import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, auth } from '../lib/supabase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  const isAdmin = userProfile?.role === 'admin';

  // Create user profile in Supabase
  const createUserProfile = useCallback(async (user: User) => {
    console.log('AuthContext: Creating user profile for:', user.id, user.email);

    // If Supabase is not configured, use default profile
    if (!supabase) {
      console.log('AuthContext: Supabase not configured, using default profile');
      setUserProfile({
        uid: user.id,
        email: user.email || '',
        displayName: user.user_metadata?.display_name || user.email?.split('@')[0] || 'User',
        role: user.email === 'beelovedshouse@gmail.com' ? 'admin' : 'user',
        createdAt: new Date(),
        lastLoginAt: new Date()
      });
      return;
    }

    try {
      // First check if profile already exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (existingProfile) {
        console.log('AuthContext: Profile already exists:', existingProfile);
        setUserProfile({
          uid: existingProfile.id,
          email: existingProfile.email,
          displayName: existingProfile.display_name,
          role: existingProfile.role,
          createdAt: new Date(existingProfile.created_at),
          lastLoginAt: new Date(existingProfile.last_login_at)
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email,
          display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'User',
          role: user.email === 'beelovedshouse@gmail.com' ? 'admin' : 'user', // Set admin role for known admin
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('AuthContext: Error creating user profile:', error);
        return;
      }

      if (data) {
        console.log('AuthContext: User profile created:', data);
        setUserProfile({
          uid: data.id,
          email: data.email,
          displayName: data.display_name,
          role: data.role,
          createdAt: new Date(data.created_at),
          lastLoginAt: new Date(data.last_login_at)
        });
        console.log('AuthContext: isAdmin check for new profile:', data.role === 'admin');
      }
    } catch (error) {
      console.error('AuthContext: Exception in createUserProfile:', error);
    }
  }, []);

  // Load user profile from Supabase
  const loadUserProfile = useCallback(async (user: User) => {
    console.log('AuthContext: Loading user profile for user:', user.id, user.email);

    // If Supabase is not configured, skip database operations
    if (!supabase) {
      console.log('AuthContext: Supabase not configured, using default profile');
      setUserProfile({
        uid: user.id,
        email: user.email || '',
        displayName: user.email?.split('@')[0] || 'User',
        role: 'user', // Default to user, can be changed later
        createdAt: new Date(),
        lastLoginAt: new Date()
      });
      return;
    }

    try {
      console.log('AuthContext: Querying user_profiles table...');

      // Add timeout to the query
      const queryPromise = supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), 10000)
      );

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as { data: any; error: any };

      console.log('AuthContext: Query completed - data:', data, 'error:', error);

      if (error) {
        console.error('AuthContext: Error loading user profile:', error);
        // If there's an error, create the profile
        console.log('AuthContext: Creating profile due to error...');
        await createUserProfile(user);
        return;
      }

      if (data) {
        console.log('AuthContext: User profile loaded:', data);
        setUserProfile({
          uid: data.id,
          email: data.email,
          displayName: data.display_name,
          role: data.role,
          createdAt: new Date(data.created_at),
          lastLoginAt: new Date(data.last_login_at)
        });
        console.log('AuthContext: isAdmin check:', data.role === 'admin');
        console.log('AuthContext: Profile loading completed successfully');
      } else {
        console.log('AuthContext: No user profile found, creating one...');
        // Create profile if it doesn't exist
        await createUserProfile(user);
      }
    } catch (error) {
      console.error('AuthContext: Exception in loadUserProfile:', error);
      // Try to create profile even on exception
      try {
        await createUserProfile(user);
      } catch (createError) {
        console.error('AuthContext: Failed to create profile:', createError);
      }
    }
  }, [createUserProfile]);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await auth.signIn(email, password);
    if (error) {
      throw new Error(error.message);
    }
    // User state will be updated by the auth state listener
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await auth.signUp(email, password);
    if (error) {
      throw new Error(error.message);
    }

    if (data?.user) {
      // Update user metadata with display name if Supabase is available
      if (supabase) {
        await supabase.auth.updateUser({
          data: { display_name: displayName }
        });
      }

      // Note: Profile creation will happen in the auth state listener
      // when the user confirms their email and signs in
    }
  };

  // Sign out
  const logout = async () => {
    console.log('AuthContext: Starting logout process...');

    try {
      const { error } = await auth.signOut();
      if (error) {
        console.error('AuthContext: Error during sign out:', error);
        throw error;
      }

      console.log('AuthContext: Clearing local state...');
      setUser(null);
      setUserProfile(null);

      console.log('AuthContext: Logout completed successfully');
    } catch (error) {
      console.error('AuthContext: Exception in logout:', error);
      // Even if something fails, clear local state
      setUser(null);
      setUserProfile(null);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    if (!supabase) {
      throw new Error('Password reset requires Supabase configuration');
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw new Error(error.message);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return;

    if (!supabase) {
      // Update local state only
      setUserProfile({ ...userProfile, ...updates });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          display_name: updates.displayName,
          role: updates.role,
          last_login_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        throw new Error(error.message);
      }

      setUserProfile({ ...userProfile, ...updates });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    // Clear any demo user data on startup to ensure we use real Supabase auth
    console.log('AuthContext: Clearing demo user data on startup');
    localStorage.removeItem('demo_user');

    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      console.log('AuthContext: Auth state change detected:', event, session);
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('AuthContext: User signed in:', session.user);
        const user = session.user as User;
        setUser(user);

        // Load user profile from database for all users
        await loadUserProfile(user);
      } else if (event === 'SIGNED_OUT') {
        console.log('AuthContext: User signed out, clearing state');
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUserProfile]);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};