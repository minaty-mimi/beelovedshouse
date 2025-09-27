import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get Paystack secret key from environment
    const paystackSecret = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!paystackSecret) {
      throw new Error('Paystack secret key not configured')
    }

    // Parse the webhook payload
    const payload = await req.json()
    const { event, data } = payload

    console.log('Received Paystack webhook:', event, data)

    // Verify webhook signature
    const signature = req.headers.get('x-paystack-signature')
    if (signature) {
      const crypto = await import("https://deno.land/std@0.168.0/crypto/mod.ts")
      const encoder = new TextEncoder()
      const key = await crypto.importKey(
        "raw",
        encoder.encode(paystackSecret),
        { name: "HMAC", hash: "SHA-512" },
        false,
        ["sign"]
      )
      const expectedSignature = await crypto.sign(
        "HMAC",
        key,
        encoder.encode(JSON.stringify(payload))
      )
      const expectedHex = Array.from(new Uint8Array(expectedSignature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')

      if (signature !== expectedHex) {
        throw new Error('Invalid webhook signature')
      }
    }

    // Handle different webhook events
    switch (event) {
      case 'charge.success':
        await handleSuccessfulPayment(supabaseClient, data)
        break

      case 'charge.failed':
        await handleFailedPayment(supabaseClient, data)
        break

      case 'transfer.success':
        await handleSuccessfulTransfer(supabaseClient, data)
        break

      case 'transfer.failed':
        await handleFailedTransfer(supabaseClient, data)
        break

      default:
        console.log('Unhandled webhook event:', event)
    }

    return new Response(JSON.stringify({ status: 'success' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

async function handleSuccessfulPayment(supabaseClient: any, data: any) {
  const { reference, amount, customer, metadata } = data

  try {
    // Update order status to 'paid'
    const { error: orderError } = await supabaseClient
      .from('orders')
      .update({
        status: 'processing',
        payment_reference: reference,
        payment_status: 'paid',
        updated_at: new Date().toISOString()
      })
      .eq('id', metadata?.order_id)

    if (orderError) {
      console.error('Error updating order:', orderError)
      throw orderError
    }

    // Update order items with payment confirmation
    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .update({
        payment_status: 'paid',
        updated_at: new Date().toISOString()
      })
      .eq('order_id', metadata?.order_id)

    if (itemsError) {
      console.error('Error updating order items:', itemsError)
    }

    // Update inventory for physical products
    if (metadata?.order_id) {
      const { data: orderItems, error: fetchError } = await supabaseClient
        .from('order_items')
        .select('products(*), quantity')
        .eq('order_id', metadata.order_id)

      if (!fetchError && orderItems) {
        for (const item of orderItems) {
          if (item.products.type === 'physical' && item.products.inventory !== null) {
            const newInventory = Math.max(0, item.products.inventory - item.quantity)
            await supabaseClient
              .from('products')
              .update({
                inventory: newInventory,
                updated_at: new Date().toISOString()
              })
              .eq('id', item.products.id)
          }
        }
      }
    }

    console.log('Successfully processed payment for order:', metadata?.order_id)

  } catch (error) {
    console.error('Error handling successful payment:', error)
    throw error
  }
}

async function handleFailedPayment(supabaseClient: any, data: any) {
  const { reference, metadata } = data

  try {
    // Update order status to 'failed'
    const { error } = await supabaseClient
      .from('orders')
      .update({
        status: 'cancelled',
        payment_reference: reference,
        payment_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', metadata?.order_id)

    if (error) {
      console.error('Error updating failed order:', error)
      throw error
    }

    console.log('Marked order as failed:', metadata?.order_id)

  } catch (error) {
    console.error('Error handling failed payment:', error)
    throw error
  }
}

async function handleSuccessfulTransfer(supabaseClient: any, data: any) {
  // Handle transfer/payout success if needed
  console.log('Transfer successful:', data)
}

async function handleFailedTransfer(supabaseClient: any, data: any) {
  // Handle transfer/payout failure if needed
  console.log('Transfer failed:', data)
}