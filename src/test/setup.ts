import React from 'react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock lazy-loaded components
vi.mock('../pages/Index', () => ({
  default: () => React.createElement('div', null,
    React.createElement('header', { className: 'bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'flex items-center justify-between h-16' },
          React.createElement('div', { className: 'flex items-center' },
            React.createElement('h1', { className: 'text-2xl font-bold text-amber-600', style: { fontFamily: 'Amatic SC, cursive' } }, 'Beelovedshouse')
          )
        )
      )
    ),
    React.createElement('div', null, 'Index Page Content')
  )
}))

vi.mock('../pages/Products', () => ({
  default: () => React.createElement('div', null, 'Products Page')
}))

vi.mock('../pages/ProductDetail', () => ({
  default: () => React.createElement('div', null, 'Product Detail Page')
}))

vi.mock('../pages/Cart', () => ({
  default: () => React.createElement('div', null, 'Cart Page')
}))

vi.mock('../pages/Checkout', () => ({
  default: () => React.createElement('div', null, 'Checkout Page')
}))

vi.mock('../pages/CheckoutSuccess', () => ({
  default: () => React.createElement('div', null, 'Checkout Success Page')
}))

vi.mock('../pages/LikedItems', () => ({
  default: () => React.createElement('div', null, 'Liked Items Page')
}))

vi.mock('../pages/Login', () => ({
  default: () => React.createElement('div', null, 'Login Page')
}))

vi.mock('../pages/Profile', () => ({
  default: () => React.createElement('div', null, 'Profile Page')
}))

vi.mock('../pages/NotFound', () => ({
  default: () => React.createElement('div', null, 'Not Found Page')
}))

// Mock components that might cause issues
vi.mock('../components/PWAInstallPrompt', () => ({
  default: () => null
}))

vi.mock('../utils/analytics', () => ({
  usePageTracking: () => {},
  initGA: () => {},
  trackEvent: () => {},
  trackProductView: () => {},
  trackAddToCart: () => {},
  trackPurchase: () => {}
}))

// Mock Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: {
      getUser: () => Promise.resolve({ data: { user: null } }),
      signOut: () => Promise.resolve(),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  })
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock IntersectionObserver
global.IntersectionObserver = class MockIntersectionObserver {
  root: Element | null = null;
  rootMargin = '';
  thresholds: ReadonlyArray<number> = [];

  constructor() {}

  observe(): void {
    return undefined;
  }

  disconnect(): void {
    return undefined;
  }

  unobserve(): void {
    return undefined;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// Mock ResizeObserver
global.ResizeObserver = class MockResizeObserver {
  constructor() {}

  observe(): void {
    return undefined;
  }

  disconnect(): void {
    return undefined;
  }

  unobserve(): void {
    return undefined;
  }
} as unknown as typeof ResizeObserver;