import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client only if valid URLs are provided
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock auth functions when Supabase is not configured
const mockAuth = {
  signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
  signIn: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
  signOut: async () => ({ error: { message: 'Supabase not configured' } }),
  getUser: async () => null,
  onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
};

// Auth helper functions
export const auth = supabase ? {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
} : mockAuth;