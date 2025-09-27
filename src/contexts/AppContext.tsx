import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '../lib/supabase';

export interface Product {
  id: number;
  title: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  type: 'digital' | 'physical';
  inventory: number; // Stock quantity
  low_stock_threshold: number; // Alert when stock drops below this
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
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
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  cart: CartItem[];
  addToCart: (id: number, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
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
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  products: [],
  productsLoading: true,
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartItemCount: 0,
  user: null,
  signOut: async () => {},
  updateInventory: () => {},
  isLowStock: () => false,
  getLowStockProducts: () => [],
  refreshProducts: async () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Get user from localStorage
  const getStoredUser = (): User | null => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState<User | null>(getStoredUser);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Load products from Supabase
  const loadProducts = async () => {
    try {
      setProductsLoading(true);

      if (!supabase) {
        console.warn('Supabase client not available');
        setProductsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading products:', error);
        return;
      }

      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  // Refresh products function
  const refreshProducts = async () => {
    await loadProducts();
  };

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const addToWishlist = (id: number) => {
    setWishlist(prev => {
      if (prev.includes(id)) return prev;
      toast({
        title: "Added to wishlist",
        description: "Product has been added to your wishlist.",
      });
      return [...prev, id];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => {
      toast({
        title: "Removed from wishlist",
        description: "Product has been removed from your wishlist.",
      });
      return prev.filter(itemId => itemId !== id);
    });
  };

  const isInWishlist = (id: number) => wishlist.includes(id);

  const addToCart = (id: number, quantity: number = 1) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

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
  };

  const removeFromCart = (id: number) => {
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
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
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

  // Local sign out function (no backend needed)
  const signOut = async () => {
    // Clear any local storage authentication
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('user');
    setUser(null);
    console.log('User signed out locally');
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        products,
        productsLoading,
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
        signOut,
        updateInventory,
        isLowStock,
        getLowStockProducts,
        refreshProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
