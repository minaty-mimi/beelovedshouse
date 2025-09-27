import { supabase } from './supabase';

export async function initializeDatabase() {
  if (!supabase) {
    console.warn('Supabase client not initialized. Using localStorage fallback.');
    return;
  }

  try {
    // Check if tables exist by trying to select from them
    const { error: productsError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (productsError && productsError.code === 'PGRST116') {
      console.log('Database tables not found. Please run the SQL schema from supabase-schema.sql in your Supabase dashboard.');
      return;
    }

    console.log('Database initialized successfully - no sample data will be inserted');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Call this function when the app starts
if (typeof window !== 'undefined') {
  // Browser environment
  initializeDatabase();
}