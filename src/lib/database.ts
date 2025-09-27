import { supabase } from './supabase';

// Cart operations
export const cartOperations = {
  // Save cart item to database
  async saveCartItem(userId: string | null, sessionId: string, productId: number, quantity: number) {
    if (!supabase) throw new Error('Database not available');

    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        session_id: sessionId,
        product_id: productId,
        quantity,
        updated_at: new Date().toISOString()
      }, {
        onConflict: userId ? 'user_id,product_id' : 'session_id,product_id'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Load cart items from database
  async loadCartItems(userId: string | null, sessionId: string) {
    if (!supabase) return [];

    let query = supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        products (
          id,
          title,
          price,
          original_price,
          image,
          category,
          type,
          inventory,
          low_stock_threshold
        )
      `);

    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('session_id', sessionId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error loading cart items:', error);
      return [];
    }

    return data || [];
  },

  // Remove cart item from database
  async removeCartItem(userId: string | null, sessionId: string, productId: number) {
    if (!supabase) return;

    let query = supabase
      .from('cart_items')
      .delete();

    if (userId) {
      query = query.eq('user_id', userId).eq('product_id', productId);
    } else {
      query = query.eq('session_id', sessionId).eq('product_id', productId);
    }

    const { error } = await query;
    if (error) throw error;
  },

  // Clear cart from database
  async clearCart(userId: string | null, sessionId: string) {
    if (!supabase) return;

    let query = supabase
      .from('cart_items')
      .delete();

    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('session_id', sessionId);
    }

    const { error } = await query;
    if (error) throw error;
  },

  // Update cart item quantity
  async updateCartQuantity(userId: string | null, sessionId: string, productId: number, quantity: number) {
    if (!supabase) return;

    const updateData: any = {
      quantity,
      updated_at: new Date().toISOString()
    };

    let query = supabase
      .from('cart_items')
      .update(updateData);

    if (userId) {
      query = query.eq('user_id', userId).eq('product_id', productId);
    } else {
      query = query.eq('session_id', sessionId).eq('product_id', productId);
    }

    const { error } = await query;
    if (error) throw error;
  },

  // Transfer anonymous cart to user cart (when user signs in)
  async transferCartToUser(sessionId: string, userId: string) {
    if (!supabase) return;

    // First, get all session cart items
    const { data: sessionItems, error: fetchError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', sessionId);

    if (fetchError) throw fetchError;

    if (!sessionItems || sessionItems.length === 0) return;

    // Update each item to be associated with the user
    for (const item of sessionItems) {
      await this.saveCartItem(userId, sessionId, item.product_id, item.quantity);
    }

    // Remove the session-based cart items
    await this.clearCart(null, sessionId);
  }
};

// Order operations
export const orderOperations = {
  // Create a new order
  async createOrder(userId: string, cartItems: any[], shippingAddress: any, totalAmount: number) {
    if (!supabase) throw new Error('Database not available');

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        status: 'pending',
        shipping_address: shippingAddress
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id || item.product.id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update inventory for physical products
    for (const item of cartItems) {
      if (item.product.type === 'physical') {
        const { error: inventoryError } = await supabase
          .from('products')
          .update({
            inventory: item.product.inventory - item.quantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', item.product_id || item.product.id);

        if (inventoryError) {
          console.error('Error updating inventory:', inventoryError);
          // Don't throw here - order is already created
        }
      }
    }

    return order;
  },

  // Get user's orders
  async getUserOrders(userId: string) {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          products (
            id,
            title,
            image
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading orders:', error);
      return [];
    }

    return data || [];
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: string) {
    if (!supabase) throw new Error('Database not available');

    const { data, error } = await supabase
      .from('orders')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Session management
export const sessionManager = {
  // Generate a unique session ID
  generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Get or create session ID
  getSessionId(): string {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  }
};