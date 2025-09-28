// Paystack Payment Integration
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        callback_url?: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

export interface PaymentData {
  amount: number; // Amount in kobo (smallest currency unit)
  currency: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: Record<string, unknown>;
  lineItems: Array<{ id: string; name: string; amount: number; quantity: number }>;
}

export const paymentService = {
  // Initialize Paystack (load script if not already loaded)
  initializePaystack: () => {
    return new Promise<void>((resolve, reject) => {
      if (window.PaystackPop) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.head.appendChild(script);
    });
  },

  // Create checkout session
  createCheckoutSession: async (paymentData: PaymentData) => {
    // In a real implementation, this would call your backend API
    // which would initialize the Paystack transaction
    console.log('Creating Paystack checkout session with data:', paymentData);

    // Mock response - in reality this would come from your backend
    return {
      reference: 'ref_' + Date.now(),
      access_code: 'access_' + Date.now()
    };
  },

  // Initialize Paystack payment
  initializePayment: async function(paymentData: PaymentData, onSuccess: (reference: string) => void, onClose: () => void) {
    await this.initializePaystack();

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!paystackKey) {
      throw new Error('Paystack public key not configured');
    }

    const handler = window.PaystackPop.setup({
      key: paystackKey, // Replace with your public key
      email: paymentData.customerEmail,
      amount: paymentData.amount, // Amount in kobo
      currency: paymentData.currency || 'NGN',
      ref: paymentData.orderId, // Order ID as reference
      callback_url: 'https://qajofxshayexbhsbvozo.supabase.co/functions/v1/paystack-webhook',
      metadata: {
        order_id: paymentData.orderId,
        customer_name: paymentData.customerName,
        shipping_address: JSON.stringify(paymentData.shippingAddress)
      },
      callback: function(response: { reference: string }) {
        // Payment successful
        console.log('Payment successful:', response);
        onSuccess(response.reference);
      },
      onClose: function() {
        // Payment modal closed
        console.log('Payment modal closed');
        onClose();
      }
    });

    handler.openIframe();
  },

  // Process payment (for backend verification)
  processPayment: async (reference: string) => {
    // In a real implementation, this would verify the payment
    // with your backend which would call Paystack's verification API
    console.log('Processing payment verification for reference:', reference);

    // Mock success response
    return {
      success: true,
      reference: reference,
      status: 'success'
    };
  },

  // Verify payment with backend
  verifyPayment: async (reference: string) => {
    // This would typically call your backend API to verify with Paystack
    const response = await fetch(`/api/paystack/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return await response.json();
  },

  // Handle payment success
  handlePaymentSuccess: (reference: string) => {
    console.log('Payment successful:', reference);
    // Here you would typically:
    // 1. Update order status
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Trigger any post-payment actions
  },

  // Handle payment failure
  handlePaymentFailure: (error: Error | string) => {
    console.error('Payment failed:', error);
    // Handle payment failure (show error message, etc.)
  },

  // Convert amount to kobo (Paystack's smallest currency unit)
  convertToKobo: (amount: number, currency: string = 'NGN'): number => {
    // For NGN, multiply by 100 to convert to kobo
    // For other currencies, adjust accordingly
    if (currency === 'NGN') {
      return Math.round(amount * 100);
    }
    return Math.round(amount * 100); // Default conversion
  },

  // Format amount for display
  formatAmount: (amount: number, currency: string = 'NGN'): string => {
    if (currency === 'NGN') {
      return `₦${amount.toLocaleString()}`;
    }
    return `${currency} ${amount.toLocaleString()}`;
  }
};