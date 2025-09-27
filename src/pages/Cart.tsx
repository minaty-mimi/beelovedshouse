import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartTotal, cartItemCount } = useAppContext();
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateCartQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-40"></div>
        </div>

        <div className="relative z-10">
          <Header />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-xl">
              <ShoppingBag className="w-24 h-24 text-amber-400 mx-auto mb-6" />
              <h1
                className="text-4xl font-bold text-gray-800 mb-4"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Your cart is empty
              </h1>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
          <Footer />
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

      <div className="relative z-10">
        <Header />

        <main className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1
                  className="text-4xl font-bold text-gray-800 mb-2"
                  style={{fontFamily: 'Amatic SC, cursive'}}
                >
                  Shopping Cart
                </h1>
                <p className="text-gray-600">{cartItemCount} item{cartItemCount !== 1 ? 's' : ''} in your cart</p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className="overflow-hidden bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                            {item.product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{item.product.category}</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Clear Cart */}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4 bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cartItemCount} items)</span>
                        <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-semibold">
                          {cartTotal >= 25 ? 'Free' : '$4.99'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-semibold">${(cartTotal * 0.08).toFixed(2)}</span>
                      </div>
                      <hr className="my-3" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${(cartTotal + (cartTotal >= 25 ? 0 : 4.99) + (cartTotal * 0.08)).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white mb-4"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Secure checkout powered by Stripe
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Cart;