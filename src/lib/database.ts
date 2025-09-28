import { supabase } from './supabase';

// Cart operations with localStorage fallback
export const cartOperations = {
  // Save cart item to database or localStorage
  async saveCartItem(userId: string | null, sessionId: string, productId: number, quantity: number) {
    if (supabase) {
      try {
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
      } catch (error) {
        console.warn('Supabase cart save failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback
    const cartKey = userId ? `cart_user_${userId}` : `cart_session_${sessionId}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.product_id === productId);

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({ 
        id: `local_${productId}_${Date.now()}`, 
        product_id: productId, 
        quantity, 
        session_id: sessionId, 
        user_id: userId 
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    return existingCart;
  },

  // Load cart items from database or localStorage
  async loadCartItems(userId: string | null, sessionId: string) {
    if (supabase) {
      try {
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
          console.warn('Supabase cart load failed, falling back to localStorage:', error);
          // Fall back to localStorage
        } else if (data) {
          return data;
        }
      } catch (error) {
        console.warn('Supabase cart load failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback
    const cartKey = userId ? `cart_user_${userId}` : `cart_session_${sessionId}`;
    const cartData = JSON.parse(localStorage.getItem(cartKey) || '[]');

    // Return in the same format as Supabase query
    return cartData.map((item: any) => ({
      id: item.id || `local_${item.product_id}_${Date.now()}`,
      quantity: item.quantity,
      product_id: item.product_id,
      // products will be joined later in AppContext
      products: null
    }));
  },

  // Remove cart item from database or localStorage
  async removeCartItem(userId: string | null, sessionId: string, productId: number) {
    if (supabase) {
      try {
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
        return;
      } catch (error) {
        console.warn('Supabase cart remove failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback
    const cartKey = userId ? `cart_user_${userId}` : `cart_session_${sessionId}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const updatedCart = existingCart.filter((item: any) => item.product_id !== productId);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  },

  // Clear cart from database or localStorage
  async clearCart(userId: string | null, sessionId: string) {
    if (supabase) {
      try {
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
        return;
      } catch (error) {
        console.warn('Supabase cart clear failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback
    const cartKey = userId ? `cart_user_${userId}` : `cart_session_${sessionId}`;
    localStorage.removeItem(cartKey);
  },

  // Update cart item quantity in database or localStorage
  async updateCartQuantity(userId: string | null, sessionId: string, productId: number, quantity: number) {
    if (supabase) {
      try {
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
        return;
      } catch (error) {
        console.warn('Supabase cart update failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback
    const cartKey = userId ? `cart_user_${userId}` : `cart_session_${sessionId}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const updatedCart = existingCart.map((item: any) =>
      item.product_id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  },

  // Transfer anonymous cart to user cart (when user signs in)
  async transferCartToUser(sessionId: string, userId: string) {
    if (supabase) {
      try {
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
        return;
      } catch (error) {
        console.warn('Supabase cart transfer failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback
    const sessionCartKey = `cart_session_${sessionId}`;
    const userCartKey = `cart_user_${userId}`;
    const sessionCart = JSON.parse(localStorage.getItem(sessionCartKey) || '[]');
    const userCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');

    // Merge session cart into user cart
    const mergedCart = [...userCart];
    sessionCart.forEach((sessionItem: any) => {
      const existingIndex = mergedCart.findIndex((item: any) => item.product_id === sessionItem.product_id);
      if (existingIndex >= 0) {
        mergedCart[existingIndex].quantity += sessionItem.quantity;
      } else {
        mergedCart.push({ ...sessionItem, user_id: userId });
      }
    });

    localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
    localStorage.removeItem(sessionCartKey);
  }
};

// Order operations with localStorage fallback
export const orderOperations = {
  // Create a new order
  async createOrder(userId: string | null, cartItems: any[], shippingAddress: any, totalAmount: number) {
    if (supabase) {
      try {
        // Create the order
        const orderData: any = {
          total_amount: totalAmount,
          status: 'pending',
          shipping_address: shippingAddress
        };

        // Only add user_id if user is authenticated
        if (userId && !userId.startsWith('guest_')) {
          orderData.user_id = userId;
        }

        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert(orderData)
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
      } catch (error) {
        console.warn('Supabase order creation failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const order = {
      id: orderId,
      user_id: userId, // Can be null for guest orders
      total_amount: totalAmount,
      status: 'pending',
      shipping_address: shippingAddress,
      created_at: new Date().toISOString(),
      is_guest_order: !userId || userId.startsWith('guest_')
    };

    // Store order in localStorage (use email-based key for guests)
    const ordersKey = userId && !userId.startsWith('guest_') ? `orders_${userId}` : `guest_orders_${shippingAddress.email}`;
    const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
    existingOrders.push(order);
    localStorage.setItem(ordersKey, JSON.stringify(existingOrders));

    // Store order items
    const orderItems = cartItems.map(item => ({
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      order_id: orderId,
      product_id: item.product_id || item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      created_at: new Date().toISOString()
    }));

    const orderItemsKey = `order_items_${orderId}`;
    localStorage.setItem(orderItemsKey, JSON.stringify(orderItems));

    return order;
  },

  // Get user's orders (supports both authenticated users and guest orders by email)
  async getUserOrders(userId: string | null, guestEmail?: string) {
    if (supabase) {
      try {
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
          .or(userId && !userId.startsWith('guest_') ? `user_id.eq.${userId}` : `shipping_address->>email.eq.${guestEmail || ''}`)
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase orders load failed, falling back to localStorage:', error);
          // Fall back to localStorage
        } else if (data) {
          return data;
        }
      } catch (error) {
        console.warn('Supabase orders load failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback
    const ordersKey = userId && !userId.startsWith('guest_') ? `orders_${userId}` : `guest_orders_${guestEmail || ''}`;
    const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');

    // Enrich orders with items
    return orders.map((order: any) => {
      const orderItemsKey = `order_items_${order.id}`;
      const items = JSON.parse(localStorage.getItem(orderItemsKey) || '[]');
      return {
        ...order,
        order_items: items
      };
    });
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: string) {
    if (supabase) {
      try {
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
      } catch (error) {
        console.warn('Supabase order update failed, falling back to localStorage:', error);
        // Fall back to localStorage
      }
    }

    // localStorage fallback - find and update order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = orders.map((order: any) =>
      order.id === orderId ? { ...order, status, updated_at: new Date().toISOString() } : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return updatedOrders.find((order: any) => order.id === orderId);
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