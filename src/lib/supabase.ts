import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Config - URL:', supabaseUrl, 'Key exists:', !!supabaseAnonKey);

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

console.log('Supabase client created successfully');

// Test the client connection
supabase.auth.getSession().then(({ data, error }) => {
  console.log('Supabase client test - session:', !!data.session, 'error:', error);
}).catch(err => {
  console.error('Supabase client test failed:', err);
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          title: string
          price: number
          original_price: number | null
          image: string
          category: string
          type: 'digital' | 'physical'
          inventory: number
          low_stock_threshold: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          price: number
          original_price?: number | null
          image: string
          category: string
          type: 'digital' | 'physical'
          inventory?: number
          low_stock_threshold?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          price?: number
          original_price?: number | null
          image?: string
          category?: string
          type?: 'digital' | 'physical'
          inventory?: number
          low_stock_threshold?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: Record<string, unknown>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address?: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: number
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: number
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: number
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string | null
          session_id: string
          product_id: number
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id: string
          product_id: number
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string
          product_id?: number
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Mock auth functions with working demo authentication
let authStateChangeCallback: ((event: string, session: { user: unknown } | null) => void) | null = null;

const mockAuth = {
  signUp: async (email: string, _password: string) => {
    // Simulate successful signup for demo purposes
    const mockUser = {
      id: 'demo-user-' + Date.now(),
      email: email,
      created_at: new Date().toISOString()
    };

    // Store in localStorage for persistence
    localStorage.setItem('demo_user', JSON.stringify(mockUser));

    // Trigger auth state change
    if (authStateChangeCallback) {
      authStateChangeCallback('SIGNED_IN', { user: mockUser });
    }

    return {
      data: { user: mockUser, session: { user: mockUser } },
      error: null
    };
  },

  signIn: async (email: string, _password: string) => {
    // Simulate successful signin for demo purposes
    const mockUser = {
      id: 'demo-user-' + Date.now(),
      email: email,
      created_at: new Date().toISOString()
    };

    // Store in localStorage for persistence
    localStorage.setItem('demo_user', JSON.stringify(mockUser));

    // Trigger auth state change
    if (authStateChangeCallback) {
      authStateChangeCallback('SIGNED_IN', { user: mockUser });
    }

    return {
      data: { user: mockUser, session: { user: mockUser } },
      error: null
    };
  },

  signOut: async () => {
    console.log('MockAuth: signOut called');
    try {
      localStorage.removeItem('demo_user');
      console.log('MockAuth: Removed demo_user from localStorage');

      // Trigger auth state change
      if (authStateChangeCallback) {
        console.log('MockAuth: Triggering SIGNED_OUT callback');
        authStateChangeCallback('SIGNED_OUT', null);
      } else {
        console.log('MockAuth: No authStateChangeCallback registered');
      }

      console.log('MockAuth: signOut completed successfully');
      return { error: null };
    } catch (error) {
      console.error('MockAuth: Error in signOut:', error);
      return { error: error as Error };
    }
  },

  getUser: async () => {
    const storedUser = localStorage.getItem('demo_user');
    return storedUser ? JSON.parse(storedUser) : null;
  },

  onAuthStateChange: (callback: (event: string, session: { user: unknown } | null) => void) => {
    console.log('MockAuth: onAuthStateChange registered');
    authStateChangeCallback = callback;

    // Check for stored user on init
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      console.log('MockAuth: Found stored user, triggering SIGNED_IN');
      setTimeout(() => callback('SIGNED_IN', { user: JSON.parse(storedUser) }), 0);
    } else {
      console.log('MockAuth: No stored user, triggering SIGNED_OUT');
      setTimeout(() => callback('SIGNED_OUT', null), 0);
    }

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'demo_user') {
        if (e.newValue) {
          console.log('MockAuth: Storage change - SIGNED_IN');
          callback('SIGNED_IN', { user: JSON.parse(e.newValue) });
        } else {
          console.log('MockAuth: Storage change - SIGNED_OUT');
          callback('SIGNED_OUT', null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            console.log('MockAuth: Unsubscribing from auth state changes');
            authStateChangeCallback = null;
            window.removeEventListener('storage', handleStorageChange);
          }
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