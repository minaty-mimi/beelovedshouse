import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { supabase, auth } from '@/lib/supabase';

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  type: 'digital' | 'physical';
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
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  products: [],
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
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const products: Product[] = [
    {
      id: 1,
      title: "My Shepherd Dreams Wallpaper Pack",
      price: 4.99,
      originalPrice: 7.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204871871_6f7f2a46.webp",
      category: "Wallpapers",
      type: "digital"
    },
    {
      id: 2,
      title: "Adventures with My Shepherd - Storybook",
      price: 12.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204880705_c66dab7a.webp",
      category: "Books",
      type: "physical"
    },
    {
      id: 3,
      title: "Shepherd's Journey Tote Bag",
      price: 18.99,
      originalPrice: 24.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204888876_25a39d61.webp",
      category: "Tote Bags",
      type: "physical"
    },
    {
      id: 4,
      title: "Cute Shepherd Sticker Set",
      price: 6.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204894049_1eb729fd.webp",
      category: "Stickers",
      type: "physical"
    },
    {
      id: 5,
      title: "Peaceful Pastures Wallpaper",
      price: 2.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204874325_9dcbc450.webp",
      category: "Wallpapers",
      type: "digital"
    },
    {
      id: 6,
      title: "My Shepherd Card Game",
      price: 15.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204899458_c7f4d3e6.webp",
      category: "Card Games",
      type: "physical"
    },
    {
      id: 7,
      title: "Shepherd's Coloring Adventure",
      price: 8.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204904519_125d5d7b.webp",
      category: "Books",
      type: "physical"
    },
    {
      id: 8,
      title: "Heavenly Fields Wallpaper Set",
      price: 3.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204876206_b3ab168d.webp",
      category: "Wallpapers",
      type: "digital"
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

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

  // Auth functions
  const signIn = async (email: string, password: string) => {
    const { error } = await auth.signIn(email, password);
    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
    }
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await auth.signUp(email, password);
    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
      });
    }
    return { error };
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  // Listen for auth state changes
  useEffect(() => {
    const getInitialUser = async () => {
      const user = await auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getInitialUser();

    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        products,
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
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
