import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield } from 'lucide-react';
import { orderOperations } from '../lib/database';
import { paymentService } from '../lib/paystack';

// Initialize Stripe (replace with your publishable key)
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, user } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please sign in to place an order');
      navigate('/auth');
      return;
    }

    try {
      // Create shipping address object
      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country
      };

      // Create the order first (without payment)
      const order = await orderOperations.createOrder(
        user.id,
        cart,
        shippingAddress,
        cartTotal
      );

      // Prepare payment data for Paystack
      const paymentData = {
        amount: paymentService.convertToKobo(cartTotal, 'NGN'), // Convert to kobo
        currency: 'NGN',
        orderId: order.id,
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        shippingAddress,
        lineItems: cart.map(item => ({
          name: item.product.title,
          quantity: item.quantity,
          amount: paymentService.convertToKobo(item.product.price, 'NGN')
        }))
      };

      // Initialize Paystack payment
      await paymentService.initializePayment(
        paymentData,
        // Success callback
        async (reference: string) => {
          try {
            // Verify payment (in real implementation)
            const verification = await paymentService.processPayment(reference);

            if (verification.success) {
              // Clear cart after successful payment
              await clearCart();

              // Navigate to success page with order details
              navigate('/checkout/success', {
                state: {
                  orderId: order.id,
                  orderTotal: cartTotal,
                  shippingAddress,
                  paymentReference: reference
                }
              });
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        // Close callback
        () => {
          console.log('Payment modal closed by user');
          // Optionally show a message or handle incomplete payment
        }
      );

    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    }
  };  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 text-center">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl inline-block">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{fontFamily: 'Amatic SC, cursive'}}
        >
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.product.title}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-900">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-4 shadow-xl">
                <Truck className="mx-auto mb-2 text-amber-600" size={24} />
                <p className="text-sm font-medium text-gray-800">Free Shipping</p>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-4 shadow-xl">
                <Shield className="mx-auto mb-2 text-amber-600" size={24} />
                <p className="text-sm font-medium text-gray-800">Secure Payment</p>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-4 shadow-xl">
                <CreditCard className="mx-auto mb-2 text-amber-600" size={24} />
                <p className="text-sm font-medium text-gray-800">Easy Returns</p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <Card className="bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-800">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700 font-semibold">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700 font-semibold">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/70 border-amber-200 focus:border-amber-400"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-700 font-semibold">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="bg-white/70 border-amber-200 focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-700 font-semibold">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-gray-700 font-semibold">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="bg-white/70 border-amber-200 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country" className="text-gray-700 font-semibold">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="bg-white/70 border-amber-200 focus:border-amber-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3"
                >
                  Pay ₦{cartTotal.toLocaleString()}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;