import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { RefreshCw, Clock, Package, ArrowLeft, Mail, Phone, AlertTriangle } from 'lucide-react';

const Returns: React.FC = () => {
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
                Returns & Exchanges
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Our hassle-free return policy
              </p>
            </div>

            <div className="space-y-8">
              {/* Return Policy */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <RefreshCw className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Return Policy
                </h2>

                <p className="text-gray-600 text-lg mb-6 text-center">
                  We want you to love your purchase! If you're not completely satisfied, you can return most items within 30 days of delivery for a full refund or exchange.
                </p>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                      <p className="text-yellow-700">
                        Digital downloads are not eligible for returns due to their nature. Physical items must be in original condition with tags attached.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Return */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Package className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  How to Return an Item
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Contact Us</h3>
                      <p className="text-gray-600">
                        Email us at returns@beelovedshouse.com or use our contact form with your order number
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Pack Your Item</h3>
                      <p className="text-gray-600">
                        Place the item in its original packaging with all tags and accessories
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Ship It Back</h3>
                      <p className="text-gray-600">
                        We'll provide a prepaid return label for US customers. International customers pay return shipping
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Get Refunded</h3>
                      <p className="text-gray-600">
                        Refunds are processed within 3-5 business days after we receive your return
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Clock className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Frequently Asked Questions
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-gray-800 mb-3">How long do I have to return an item?</h3>
                    <p className="text-gray-600">You have 30 days from the date of delivery to initiate a return.</p>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-gray-800 mb-3">What items cannot be returned?</h3>
                    <p className="text-gray-600">Digital downloads, personalized items, and items damaged due to misuse cannot be returned.</p>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-gray-800 mb-3">How do I get my refund?</h3>
                    <p className="text-gray-600">Refunds are issued to the original payment method within 3-5 business days after we receive your return.</p>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-gray-800 mb-3">Can I exchange for a different item?</h3>
                    <p className="text-gray-600">Yes! You can exchange for a different size, color, or item of equal or lesser value.</p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
                <div className="text-center">
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Need Help with Returns?
                  </h2>
                  <p className="text-lg mb-6 opacity-90">
                    Our customer service team is here to help with any return questions.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <Mail className="w-8 h-8 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Email Support</h3>
                      <p className="text-sm opacity-90">returns@beelovedshouse.com</p>
                      <p className="text-sm opacity-90">Response within 24 hours</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <Phone className="w-8 h-8 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Phone Support</h3>
                      <p className="text-sm opacity-90">Mon-Fri: 9AM-6PM EST</p>
                      <p className="text-sm opacity-90 font-bold">(555) 123-HELP</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => navigate('/contact-us')}
                      className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8"
                    >
                      Contact Support
                    </Button>
                    <Button
                      onClick={() => navigate('/shipping-info')}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-amber-600 px-8"
                    >
                      Shipping Info
                    </Button>
                  </div>
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

export default Returns;