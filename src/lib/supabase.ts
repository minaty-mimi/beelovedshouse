import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client only if valid URLs are provided
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock auth functions with working demo authentication
const mockAuth = {
  signUp: async (email: string, password: string) => {
    // Simulate successful signup for demo purposes
    const mockUser = {
      id: 'demo-user-' + Date.now(),
      email: email,
      created_at: new Date().toISOString()
    };

    // Store in localStorage for persistence
    localStorage.setItem('demo_user', JSON.stringify(mockUser));

    return {
      data: { user: mockUser, session: { user: mockUser } },
      error: null
    };
  },

  signIn: async (email: string, password: string) => {
    // Simulate successful signin for demo purposes
    const mockUser = {
      id: 'demo-user-' + Date.now(),
      email: email,
      created_at: new Date().toISOString()
    };

    // Store in localStorage for persistence
    localStorage.setItem('demo_user', JSON.stringify(mockUser));

    return {
      data: { user: mockUser, session: { user: mockUser } },
      error: null
    };
  },

  signOut: async () => {
    localStorage.removeItem('demo_user');
    return { error: null };
  },

  getUser: async () => {
    const storedUser = localStorage.getItem('demo_user');
    return storedUser ? JSON.parse(storedUser) : null;
  },

  onAuthStateChange: (callback: (event: string, session: { user: unknown } | null) => void) => {
    // Check for stored user on init
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      setTimeout(() => callback('SIGNED_IN', { user: JSON.parse(storedUser) }), 0);
    } else {
      setTimeout(() => callback('SIGNED_OUT', null), 0);
    }

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'demo_user') {
        if (e.newValue) {
          callback('SIGNED_IN', { user: JSON.parse(e.newValue) });
        } else {
          callback('SIGNED_OUT', null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return {
      data: {
        subscription: {
          unsubscribe: () => window.removeEventListener('storage', handleStorageChange)
        }
      }
    };
  },
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

  onAuthStateChange: (callback: (event: string, session: { user: unknown } | null) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
} : mockAuth;