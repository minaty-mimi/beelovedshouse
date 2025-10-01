// Enhanced E-commerce Types

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  rating: number; // 1-5
  title?: string;
  comment?: string;
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface PromoCode {
  id: string;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase_amount?: number;
  max_discount_amount?: number;
  usage_limit?: number;
  times_used: number;
  valid_from: string;
  valid_until?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  type: 'size' | 'color' | 'material' | 'style';
  price_adjustment: number;
  stock_quantity: number;
  sku?: string;
  created_at: string;
  updated_at: string;
}

export interface RecentlyViewed {
  id: string;
  user_id: string;
  product_id: string;
  viewed_at: string;
  product?: Product;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  type: 'digital' | 'physical';
  download_url?: string;
  created_at?: string;
  updated_at?: string;
  stock_quantity?: number;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'unlimited';
  average_rating?: number;
  review_count?: number;
  variants?: ProductVariant[];
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: number;
  quantity: number;
  variant_id?: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface PromoCodeApplication {
  code: string;
  discount_amount: number;
  discount_type: 'percentage' | 'fixed';
  promo_code?: PromoCode;
}

export interface CheckoutData {
  cart_items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  promo_code?: PromoCodeApplication;
  total: number;
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'unlimited';

export interface StockInfo {
  quantity: number;
  status: StockStatus;
  display_text: string;
  badge_color: string;
}
