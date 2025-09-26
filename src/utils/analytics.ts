import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics Measurement ID - replace with your actual GA4 ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

// Declare global gtag function
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = (): void => {
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]): void {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });

  // Make gtag available globally
  window.gtag = gtag;
};

// Track page views
export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Product interface for e-commerce tracking
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

interface OrderItem {
  id: number;
  title: string;
  category: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  id: string;
  total: number;
  shipping: number;
  tax: number;
  items: OrderItem[];
}

// E-commerce tracking functions
export const trackProductView = (product: Product): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id.toString(),
        item_name: product.title,
        category: product.category,
        price: product.price,
      }],
    });
  }
};

export const trackAddToCart = (product: Product, quantity: number = 1): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [{
        item_id: product.id.toString(),
        item_name: product.title,
        category: product.category,
        price: product.price,
        quantity: quantity,
      }],
    });
  }
};

export const trackPurchase = (orderDetails: OrderDetails): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderDetails.id,
      currency: 'USD',
      value: orderDetails.total,
      shipping: orderDetails.shipping,
      tax: orderDetails.tax,
      items: orderDetails.items.map((item) => ({
        item_id: item.id.toString(),
        item_name: item.title,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }
};