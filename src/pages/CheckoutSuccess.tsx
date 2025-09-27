import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, Home, ShoppingBag, Mail, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();

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

        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-lg border-amber-200 shadow-xl">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="text-green-500" size={64} />
              </div>
              <CardTitle
                className="text-3xl text-gray-800"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Order Confirmed!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-lg">
                Thank you for your purchase! Your order has been successfully placed.
              </p>

              <div className="bg-amber-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <span>You will receive an email confirmation shortly.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Package className="w-5 h-5 text-amber-600" />
                  <span>Order tracking information will be sent to your email.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/')}
                  className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
                  variant="outline"
                >
                  <Home className="mr-2" size={16} />
                  Back to Home
                </Button>
                <Button
                  onClick={() => navigate('/products')}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  <ShoppingBag className="mr-2" size={16} />
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Success Message */}
          <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
              What's Next?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">📧</div>
                <h3 className="font-semibold text-gray-800 mb-2">Email Confirmation</h3>
                <p className="text-gray-600 text-sm">Check your inbox for order details</p>
              </div>
              <div>
                <div className="text-4xl mb-2">📦</div>
                <h3 className="font-semibold text-gray-800 mb-2">Processing</h3>
                <p className="text-gray-600 text-sm">We'll prepare your order with care</p>
              </div>
              <div>
                <div className="text-4xl mb-2">🚚</div>
                <h3 className="font-semibold text-gray-800 mb-2">Shipping</h3>
                <p className="text-gray-600 text-sm">Track your package every step</p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default CheckoutSuccess;