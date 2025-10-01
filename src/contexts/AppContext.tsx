import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '../lib/supabase';
import { cartOperations, sessionManager } from '../lib/database';
import { useAuth } from './AuthContext';

export interface Product {
  id: number;
  title: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  type: 'digital' | 'physical';
  download_url?: string;
  description: string; // Made required
  inventory: number; // Stock quantity (legacy)
  low_stock_threshold: number; // Alert when stock drops below this (legacy)
  stock_quantity?: number; // New stock field
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'unlimited';
  average_rating?: number;
  review_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartDataItem {
  id: string;
  quantity: number;
  product_id: number;
  products: Product | null;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  products: Product[];
  productsLoading: boolean;
  cartLoading: boolean;
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  cart: CartItem[];
  addToCart: (id: number, quantity?: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateCartQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartItemCount: number;
  user: User | null;
  signOut: () => Promise<void>;
  // Inventory management
  updateInventory: (id: number, newInventory: number) => void;
  isLowStock: (id: number) => boolean;
  getLowStockProducts: () => Product[];
  // Product management
  refreshProducts: () => Promise<void>;
  deleteProduct: (id: number) => Promise<boolean>;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateProduct: (id: number, updates: Partial<Product>) => Promise<boolean>;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  products: [],
  productsLoading: true,
  cartLoading: true,
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateCartQuantity: async () => {},
  clearCart: async () => {},
  cartTotal: 0,
  cartItemCount: 0,
  user: null,
  signOut: async () => {},
  updateInventory: () => {},
  isLowStock: () => false,
  getLowStockProducts: () => [],
  refreshProducts: async () => {},
  deleteProduct: async () => false,
  addProduct: async () => false,
  updateProduct: async () => false,
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: firebaseUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');

  // Convert Firebase User to AppContext User format
  const user: User | null = useMemo(() => firebaseUser ? {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || undefined,
    created_at: firebaseUser.metadata.creationTime || undefined
  } : null, [firebaseUser]);

  // Debug user state changes
  useEffect(() => {
    console.log('AppContext: User state changed:', user, 'firebaseUser:', firebaseUser);
  }, [user]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Load products from Supabase
  const loadProducts = useCallback(async () => {
    try {
      setProductsLoading(true);

      if (supabase) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading products:', error);
          // Fall back to sample data
          loadSampleProducts();
          return;
        }

        if (data && data.length > 0) {
          setProducts(data);
          setProductsLoading(false);
          return;
        }
      }

      // Fall back to sample data if no Supabase or no data
      loadSampleProducts();
    } catch (error) {
      console.error('Error loading products:', error);
      loadSampleProducts();
    }
  }, []);

  // Load sample products for fallback
  const loadSampleProducts = () => {
    const sampleProducts: Product[] = [
      {
        id: 1,
        title: 'Digital Wallpaper - Love Theme',
        price: 1500,
        original_price: 2000,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
        category: 'Digital Products',
        type: 'digital',
        inventory: 100,
        low_stock_threshold: 10,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        description: 'Beautiful digital wallpaper featuring pastoral love themes from "My Shepherd and I". Perfect for phone and desktop backgrounds.'
      },
      {
        id: 2,
        title: 'Storybook - The Shepherd\'s Love',
        price: 15000,
        original_price: 18000,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        category: 'Books',
        type: 'physical',
        inventory: 50,
        low_stock_threshold: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        description: 'Heartwarming storybook about love and faith, beautifully illustrated for children and families.'
      },
      {
        id: 3,
        title: 'Coloring Book - Faith & Love',
        price: 10000,
        original_price: 12000,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
        category: 'Books',
        type: 'physical',
        inventory: 75,
        low_stock_threshold: 8,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        description: 'Interactive coloring book with faith-based themes and pastoral illustrations.'
      },
      {
        id: 4,
        title: 'Custom Sticker Pack',
        price: 8000,
        original_price: 10000,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        category: 'Accessories',
        type: 'physical',
        inventory: 200,
        low_stock_threshold: 20,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        description: 'Pack of 10 custom stickers with love and faith messages, perfect for laptops and water bottles.'
      },
      {
        id: 5,
        title: 'Tote Bag - Love & Faith',
        price: 25000,
        original_price: 30000,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        category: 'Accessories',
        type: 'physical',
        inventory: 30,
        low_stock_threshold: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        description: 'High-quality canvas tote bag with custom love and faith design. Eco-friendly and durable.'
      },
      {
        id: 6,
        title: 'Card Game - Faith Family Fun',
        price: 20000,
        original_price: 25000,
        image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
        category: 'Games',
        type: 'physical',
        inventory: 40,
        low_stock_threshold: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        description: 'Family-friendly card game promoting faith, love, and family values through interactive play.'
      }
    ];

    setProducts(sampleProducts);
    setProductsLoading(false);
  };

  // Load cart from database or localStorage
  const loadCart = useCallback(async () => {
    try {
      setCartLoading(true);
      const currentSessionId = sessionManager.getSessionId();
      const cartData = await cartOperations.loadCartItems(user?.id || null, currentSessionId);

      const formattedCart: CartItem[] = cartData.map((item: CartDataItem) => {
        // If item has products data (from Supabase), use it
        if (item.products) {
          return {
            id: item.product_id,
            product: item.products,
            quantity: item.quantity
          };
        }
        // Otherwise, find product from local products array (localStorage fallback)
        const product = products.find(p => p.id === item.product_id);
        return {
          id: item.product_id,
          product: product || {
            id: item.product_id,
            title: 'Unknown Product',
            price: 0,
            image: '',
            category: 'Unknown',
            type: 'physical' as const
          },
          quantity: item.quantity
        };
      });

      setCart(formattedCart);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setCartLoading(false);
    }
  }, [user?.id, products]);

  // Set up real-time subscriptions
  const setupRealtimeSubscriptions = useCallback(() => {
    if (!supabase) return;

    let productsChannel: ReturnType<typeof supabase.channel> | null = null;
    let ordersChannel: ReturnType<typeof supabase.channel> | null = null;
    let cartChannel: ReturnType<typeof supabase.channel> | null = null;
    let wishlistChannel: ReturnType<typeof supabase.channel> | null = null;

    try {
      // Subscribe to products table changes
      productsChannel = supabase
        .channel('products_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'products'
          },
          (payload) => {
            console.log('Products real-time update:', payload);
            // Debounce product reloads to prevent excessive calls
            setTimeout(() => {
              loadProducts();
            }, 100);
          }
        )
        .subscribe((status) => {
          console.log('Products subscription status:', status);
        });

      // Subscribe to orders table changes (for admin dashboard)
      ordersChannel = supabase
        .channel('orders_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders'
          },
          (payload) => {
            console.log('Orders real-time update:', payload);
            // Orders will be handled by individual components that need them
          }
        )
        .subscribe((status) => {
          console.log('Orders subscription status:', status);
        });

      // Subscribe to cart_items table changes (for cart synchronization)
      cartChannel = supabase
        .channel('cart_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'cart_items'
          },
          (payload) => {
            console.log('Cart real-time update:', payload);
            // Only reload cart if the change is relevant to current user/session
            const currentSessionId = sessionManager.getSessionId();
            const payloadData = payload.new as { user_id?: string; session_id?: string } | null;
            if (payloadData?.user_id === user?.id || payloadData?.session_id === currentSessionId) {
              setTimeout(() => {
                loadCart();
              }, 100);
            }
          }
        )
        .subscribe((status) => {
          console.log('Cart subscription status:', status);
        });

      // Subscribe to wishlist table changes
      wishlistChannel = supabase
        .channel('wishlist_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'wishlist'
          },
          (payload) => {
            console.log('Wishlist real-time update:', payload);
            // Only reload wishlist if the change is relevant to current user
            const payloadData = payload.new as { user_id?: string } | null;
            if (payloadData?.user_id === user?.id) {
              setTimeout(() => {
                loadWishlist();
              }, 100);
            }
          }
        )
        .subscribe((status) => {
          console.log('Wishlist subscription status:', status);
        });

    } catch (error) {
      console.error('Error setting up real-time subscriptions:', error);
    }

    // Return cleanup function
    return () => {
      if (supabase) {
        try {
          if (productsChannel) supabase.removeChannel(productsChannel);
          if (ordersChannel) supabase.removeChannel(ordersChannel);
          if (cartChannel) supabase.removeChannel(cartChannel);
          if (wishlistChannel) supabase.removeChannel(wishlistChannel);
          console.log('Real-time subscriptions cleaned up');
        } catch (error) {
          console.error('Error cleaning up subscriptions:', error);
        }
      }
    };
  }, [user?.id, loadProducts, loadCart]);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Initialize session and load cart
  useEffect(() => {
    const initSession = async () => {
      const newSessionId = sessionManager.getSessionId();
      setSessionId(newSessionId);
      await loadCart();
    };
    initSession();
  }, [loadCart]);

  // Set up real-time subscriptions after functions are defined
  useEffect(() => {
    const cleanup = setupRealtimeSubscriptions();
    return cleanup; // Cleanup subscriptions on unmount
  }, [setupRealtimeSubscriptions]);

  // Transfer cart when user signs in
  useEffect(() => {
    const transferCart = async () => {
      if (user && sessionId) {
        try {
          await cartOperations.transferCartToUser(sessionId, user.id);
          // Reload cart after transfer
          await loadCart();
        } catch (error) {
          console.error('Error transferring cart:', error);
        }
      }
    };
    transferCart();
  }, [firebaseUser?.uid, user, sessionId, loadCart]); // Only run when user ID changes

  const addToWishlist = async (id: number) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (supabase) {
        const { error } = await supabase
          .from('wishlist')
          .insert({
            user_id: user.id,
            product_id: id,
            created_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error adding to wishlist:', error);
          toast({
            title: "Error",
            description: "Failed to add to wishlist",
            variant: "destructive"
          });
          return;
        }
      }

      setWishlist(prev => {
        if (prev.includes(id)) return prev;
        toast({
          title: "Added to wishlist",
          description: "Product has been added to your wishlist.",
        });
        return [...prev, id];
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add to wishlist",
        variant: "destructive"
      });
    }
  };

  const removeFromWishlist = async (id: number) => {
    try {
      if (supabase && user) {
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', id);

        if (error) {
          console.error('Error removing from wishlist:', error);
        }
      }

      setWishlist(prev => {
        toast({
          title: "Removed from wishlist",
          description: "Product has been removed from your wishlist.",
        });
        return prev.filter(itemId => itemId !== id);
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (id: number) => wishlist.includes(id);

  // Load wishlist from Supabase
  const loadWishlist = useCallback(async () => {
    if (!user || !supabase) return;

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading wishlist:', error);
        return;
      }

      if (data) {
        setWishlist(data.map(item => item.product_id));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  }, [user]);

  // Load wishlist when user signs in
  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user, loadWishlist]);

  const addToCart = async (id: number, quantity: number = 1) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    try {
      // Save to database first
      await cartOperations.saveCartItem(user?.id || null, sessionId, id, quantity);

      // Update local state
      setCart(prev => {
        const existingItem = prev.find(item => item.id === id);
        if (existingItem) {
          return prev.map(item =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          toast({
            title: "Added to cart",
            description: `${product.title} has been added to your cart.`,
          });
          return [...prev, { id, product, quantity }];
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      // Remove from database first
      await cartOperations.removeCartItem(user?.id || null, sessionId, id);

      // Update local state
      setCart(prev => {
        const item = prev.find(item => item.id === id);
        if (item) {
          toast({
            title: "Removed from cart",
            description: `${item.product.title} has been removed from your cart.`,
          });
        }
        return prev.filter(item => item.id !== id);
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateCartQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    try {
      // Update database first
      await cartOperations.updateCartQuantity(user?.id || null, sessionId, id, quantity);

      // Update local state
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const clearCart = async () => {
    try {
      // Clear from database first
      await cartOperations.clearCart(user?.id || null, sessionId);

      // Update local state
      setCart([]);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Inventory management
  const updateInventory = (id: number, newInventory: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, inventory: Math.max(0, newInventory) }
          : product
      )
    );
    toast({
      title: "Inventory updated",
      description: `Product inventory has been updated.`,
    });
  };

  const isLowStock = (id: number) => {
    const product = products.find(p => p.id === id);
    return product ? product.inventory <= product.low_stock_threshold : false;
  };

  const getLowStockProducts = () => {
    return products.filter(product => product.inventory <= product.low_stock_threshold);
  };

  // Product management
  const refreshProducts = async () => {
    await loadProducts();
  };

  // Delete product
  const deleteProduct = async (id: number): Promise<boolean> => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Database not configured",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Error",
          description: "Failed to delete product: " + error.message,
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      // Reload products to reflect changes
      await loadProducts();
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
      return false;
    }
  };

  // Add product
  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Database not configured",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('products')
        .insert({
          title: product.title,
          price: product.price,
          original_price: product.original_price,
          image: product.image,
          category: product.category,
          type: product.type,
          inventory: product.inventory,
          low_stock_threshold: product.low_stock_threshold,
          description: product.description,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error adding product:', error);
        toast({
          title: "Error",
          description: "Failed to add product: " + error.message,
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      // Reload products to reflect changes
      await loadProducts();
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive"
      });
      return false;
    }
  };

  // Update product
  const updateProduct = async (id: number, updates: Partial<Product>): Promise<boolean> => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Database not configured",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('products')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "Error",
          description: "Failed to update product: " + error.message,
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Product updated successfully",
      });

      // Reload products to reflect changes
      await loadProducts();
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        products,
        productsLoading,
        cartLoading,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        user,
        signOut: logout,
        updateInventory,
        isLowStock,
        getLowStockProducts,
        refreshProducts,
        deleteProduct,
        addProduct,
        updateProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
