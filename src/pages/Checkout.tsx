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
import { paymentService } from '../lib/paystack';const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, user } = useAppContext();
  const navigate = useNavigate();
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'NG'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate guest checkout selection
    if (!user && !isGuestCheckout) {
      alert('Please sign in or select guest checkout to continue.');
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

      // Use guest email as identifier for guest orders
      const orderUserId = user ? user.id : `guest_${formData.email}_${Date.now()}`;

      // Create the order (works for both authenticated and guest users)
      const order = await orderOperations.createOrder(
        orderUserId,
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
                  paymentReference: reference,
                  isGuestOrder: !user
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
              <CardTitle className="text-gray-800">Checkout Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!user && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="guestCheckout"
                      checked={isGuestCheckout}
                      onChange={(e) => setIsGuestCheckout(e.target.checked)}
                      className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="guestCheckout" className="text-sm font-medium text-gray-700">
                      Checkout as Guest
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    You can checkout without creating an account. Your order details will be sent to your email.
                  </p>
                </div>
              )}

              {user && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-800">
                    ✓ Signed in as {user.email}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Your order will be saved to your account.
                  </p>
                </div>
              )}

              {!user && !isGuestCheckout && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-800 mb-2">
                    Have an account?
                  </p>
                  <Button
                    onClick={() => navigate('/login')}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Sign In to Your Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Information Form */}
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