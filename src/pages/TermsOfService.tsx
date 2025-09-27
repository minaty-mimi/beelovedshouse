import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { FileText, ArrowLeft, Scale, Shield, CreditCard, Truck, RefreshCw } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Please read these terms carefully before using our website or making a purchase.
              </p>
              <p className="text-sm text-gray-500">Last updated: December 2024</p>
            </div>

            <div className="space-y-8">
              {/* Overview */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800" style={{fontFamily: 'Amatic SC, cursive'}}>
                      Agreement to Terms
                    </h2>
                    <p className="text-gray-600">By accessing our website, you agree to these terms</p>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  Welcome to Bee Loved's House! These Terms of Service ("Terms") govern your use of our website
                  and your purchase of products from us. By accessing our website or making a purchase, you agree
                  to be bound by these Terms. If you do not agree to these Terms, please do not use our website.
                </p>
              </div>

              {/* Use of Website */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Shield className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Use of Our Website
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      Permitted Use
                    </h3>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li>• Browse and purchase products</li>
                      <li>• Create an account for easier shopping</li>
                      <li>• Contact customer service</li>
                      <li>• Use our website for personal, non-commercial purposes</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">✗</span>
                      </div>
                      Prohibited Use
                    </h3>
                    <ul className="text-red-700 space-y-2 text-sm">
                      <li>• Copy or reproduce our content without permission</li>
                      <li>• Use automated tools to access our site</li>
                      <li>• Attempt to hack or compromise our systems</li>
                      <li>• Violate any applicable laws or regulations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Products & Pricing */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <CreditCard className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Products & Pricing
                </h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">Product Descriptions</h3>
                    <p className="text-blue-700">
                      We strive to be as accurate as possible in our product descriptions. However, we do not warrant
                      that product descriptions are error-free. If a product is not as described, your remedy is to return it.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-3">Pricing & Availability</h3>
                    <p className="text-purple-700">
                      All prices are subject to change without notice. We reserve the right to correct pricing errors.
                      Products are subject to availability and we reserve the right to discontinue products at any time.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-3">Digital Products</h3>
                    <p className="text-amber-700">
                      Digital downloads are not eligible for returns due to their nature. Please ensure
                      your system meets the requirements before purchasing digital products.
                    </p>
                  </div>
                </div>
              </div>

              {/* Orders & Payment */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <CreditCard className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Orders & Payment
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Order Acceptance</h4>
                        <p className="text-gray-600 text-sm">Your order is an offer to purchase. We may accept or reject orders at our discretion.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Payment Processing</h4>
                        <p className="text-gray-600 text-sm">Payment is processed securely through PCI-compliant gateways.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Order Confirmation</h4>
                        <p className="text-gray-600 text-sm">You'll receive confirmation via email once your order is processed.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Payment Methods</h4>
                        <p className="text-gray-600 text-sm">We accept major credit cards, PayPal, and other secure payment methods.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Delivery */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Truck className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Shipping & Delivery
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">Processing Time</h4>
                    <p className="text-teal-700 text-sm">1-3 business days for order processing</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">Shipping Time</h4>
                    <p className="text-teal-700 text-sm">3-7 business days depending on location</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">International</h4>
                    <p className="text-teal-700 text-sm">Additional time and customs fees may apply</p>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Shipping Costs</h4>
                  <p className="text-yellow-700">
                    Shipping costs are calculated at checkout and depend on order weight, dimensions, and destination.
                    We offer free shipping on orders over ₦50,000 within Nigeria.
                  </p>
                </div>
              </div>

              {/* Returns & Exchanges */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <RefreshCw className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Returns & Exchanges
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-3">Return Policy</h3>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li>• 30 days from delivery for returns</li>
                      <li>• Items must be in original condition</li>
                      <li>• Original tags and packaging required</li>
                      <li>• Free returns for US customers</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">Exchanges</h3>
                    <ul className="text-blue-700 space-y-2 text-sm">
                      <li>• Exchange for different size/color</li>
                      <li>• Exchange for different item</li>
                      <li>• Same value or pay difference</li>
                      <li>• Contact us to initiate exchange</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Non-Returnable Items</h4>
                  <p className="text-red-700">
                    Digital downloads, personalized items, and items damaged due to misuse cannot be returned.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Scale className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Limitation of Liability
                </h2>

                <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    To the fullest extent permitted by law, Bee Loved's House shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
                    Our total liability shall not exceed the amount paid for the product that gave rise to the claim.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Shield className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Governing Law
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of [Your State/Country],
                  without regard to its conflict of law provisions. Any disputes arising from these Terms shall be
                  resolved in the courts of [Your Jurisdiction].
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Questions About Terms?
                  </h2>
                  <p className="text-lg mb-6 opacity-90">
                    If you have any questions about these Terms of Service, please contact us.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => navigate('/contact-us')}
                      className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8"
                    >
                      Contact Support
                    </Button>
                    <Button
                      onClick={() => navigate('/privacy-policy')}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-amber-600 px-8"
                    >
                      Privacy Policy
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

export default TermsOfService;