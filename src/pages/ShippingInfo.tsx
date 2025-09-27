import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Truck, Clock, MapPin, Package, ArrowLeft, Globe } from 'lucide-react';

const ShippingInfo: React.FC = () => {
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

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="mb-6 border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </Button>

              <h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Shipping Information
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Learn about our shipping options and delivery times
              </p>
            </div>

            <div className="space-y-8">
              {/* Shipping Options */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Truck className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Shipping Options
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Standard Shipping</h3>
                    <p className="text-gray-600 text-center mb-2">5-7 business days</p>
                    <p className="text-amber-600 font-semibold text-center">$5.99 (Free on orders over $50)</p>
                    <p className="text-gray-500 text-sm text-center mt-2">Perfect for non-urgent orders</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Express Shipping</h3>
                    <p className="text-gray-600 text-center mb-2">2-3 business days</p>
                    <p className="text-amber-600 font-semibold text-center">$12.99</p>
                    <p className="text-gray-500 text-sm text-center mt-2">For when you need it faster</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border border-purple-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Overnight Shipping</h3>
                    <p className="text-gray-600 text-center mb-2">1 business day</p>
                    <p className="text-amber-600 font-semibold text-center">$24.99</p>
                    <p className="text-gray-500 text-sm text-center mt-2">Emergency orders only</p>
                  </div>
                </div>
              </div>

              {/* International Shipping */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Globe className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  International Shipping
                </h2>

                <p className="text-gray-600 text-lg mb-6 text-center">
                  We ship worldwide! International shipping rates vary by destination and are calculated at checkout.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <h4 className="font-semibold text-gray-800 mb-2">United States</h4>
                    <p className="text-gray-600">5-10 business days</p>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Canada & Mexico</h4>
                    <p className="text-gray-600">7-14 business days</p>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Europe</h4>
                    <p className="text-gray-600">10-20 business days</p>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Asia & Australia</h4>
                    <p className="text-gray-600">15-25 business days</p>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <h4 className="font-semibold text-gray-800 mb-2">All other countries</h4>
                    <p className="text-gray-600">20-30 business days</p>
                  </div>
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 text-white">
                    <h4 className="font-semibold mb-2">⚠️ Important Note</h4>
                    <p className="text-sm opacity-90">Additional customs fees, duties, or taxes may apply for international orders.</p>
                  </div>
                </div>
              </div>

              {/* Order Processing */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Package className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Order Processing
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Order Placed</h3>
                      <p className="text-gray-600">Your order is confirmed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Processing</h3>
                      <p className="text-gray-600">We prepare your order (1-2 business days)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Shipped</h3>
                      <p className="text-gray-600">Your order is on its way!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Need Help with Shipping?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Our shipping team is here to help with any questions about your order.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/contact-us')}
                    className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8"
                  >
                    Contact Support
                  </Button>
                  <Button
                    onClick={() => navigate('/returns')}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-amber-600 px-8"
                  >
                    Returns Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ShippingInfo;