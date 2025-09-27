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

    // Insert sample products if table is empty
    const { data: existingProducts } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (!existingProducts || existingProducts.length === 0) {
      const sampleProducts = [
        {
          title: 'Custom Love Letter',
          price: 25.00,
          original_price: 30.00,
          image: '/api/placeholder/300/300',
          category: 'Digital Products',
          type: 'digital',
          inventory: 100,
          low_stock_threshold: 10
        },
        {
          title: 'Personalized Photo Book',
          price: 45.00,
          original_price: 55.00,
          image: '/api/placeholder/300/300',
          category: 'Physical Products',
          type: 'physical',
          inventory: 50,
          low_stock_threshold: 5
        },
        {
          title: 'Custom Jewelry Box',
          price: 35.00,
          original_price: 42.00,
          image: '/api/placeholder/300/300',
          category: 'Physical Products',
          type: 'physical',
          inventory: 25,
          low_stock_threshold: 3
        }
      ];

      const { error: insertError } = await supabase
        .from('products')
        .insert(sampleProducts);

      if (insertError) {
        console.error('Error inserting sample products:', insertError);
      } else {
        console.log('Sample products inserted successfully');
      }
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Call this function when the app starts
if (typeof window !== 'undefined') {
  // Browser environment
  initializeDatabase();
}