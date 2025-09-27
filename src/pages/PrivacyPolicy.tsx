import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Shield, ArrowLeft, Eye, Lock, Mail, Database, Cookie } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Your privacy is important to us. Learn how we protect and use your information.
              </p>
              <p className="text-sm text-gray-500">Last updated: December 2024</p>
            </div>

            <div className="space-y-8">
              {/* Overview */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800" style={{fontFamily: 'Amatic SC, cursive'}}>
                      Our Commitment to Privacy
                    </h2>
                    <p className="text-gray-600">We are committed to protecting your personal information</p>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  At Bee Loved's House, we respect your privacy and are committed to protecting your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
                  our website or make a purchase from us.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Database className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Information We Collect
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <Eye className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-blue-800 mb-3">Information You Provide</h3>
                    <ul className="text-blue-700 space-y-2 text-sm">
                      <li>• Name and contact information</li>
                      <li>• Shipping and billing addresses</li>
                      <li>• Payment information</li>
                      <li>• Order history and preferences</li>
                      <li>• Communications with us</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <Cookie className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-semibold text-purple-800 mb-3">Information We Collect Automatically</h3>
                    <ul className="text-purple-700 space-y-2 text-sm">
                      <li>• IP address and location data</li>
                      <li>• Browser type and version</li>
                      <li>• Device information</li>
                      <li>• Website usage patterns</li>
                      <li>• Cookies and tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Lock className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  How We Use Your Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Process Your Orders</h3>
                      <p className="text-gray-600">To fulfill and deliver your purchases, process payments, and provide customer service.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Improve Our Services</h3>
                      <p className="text-gray-600">To understand how you use our website and improve your shopping experience.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Communicate With You</h3>
                      <p className="text-gray-600">To send order confirmations, shipping updates, and respond to your inquiries.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Legal Compliance</h3>
                      <p className="text-gray-600">To comply with legal obligations and protect our rights and the rights of others.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Mail className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Information Sharing & Disclosure
                </h2>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6">
                  <h3 className="font-semibold text-green-800 mb-3">We Do NOT Sell Your Personal Information</h3>
                  <p className="text-green-700">
                    We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                  </p>
                </div>

                <p className="text-gray-600 mb-4">We may share your information in the following limited circumstances:</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Service Providers</h4>
                    <p className="text-amber-700 text-sm">With trusted partners who help us operate our business (payment processors, shipping companies, etc.)</p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Legal Requirements</h4>
                    <p className="text-amber-700 text-sm">When required by law or to protect our rights and safety</p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Shield className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Data Security
                </h2>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                  <p className="text-indigo-800 leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption for all
                    data transmission and secure storage systems.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Eye className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Your Rights & Choices
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">Access</h4>
                    <p className="text-teal-700 text-sm">Request a copy of your personal information</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">Correction</h4>
                    <p className="text-teal-700 text-sm">Update or correct your information</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">Deletion</h4>
                    <p className="text-teal-700 text-sm">Request deletion of your data</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">Portability</h4>
                    <p className="text-teal-700 text-sm">Receive your data in a portable format</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">Opt-out</h4>
                    <p className="text-teal-700 text-sm">Unsubscribe from marketing communications</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                    <h4 className="font-semibold text-teal-800 mb-2">Restriction</h4>
                    <p className="text-teal-700 text-sm">Limit how we process your information</p>
                  </div>
                </div>
              </div>

              {/* Cookies */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Cookie className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Cookies & Tracking Technologies
                </h2>

                <p className="text-gray-600 mb-6">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic,
                  and personalize content. You can control cookie preferences through your browser settings.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Essential Cookies</h4>
                    <p className="text-orange-700 text-sm">Required for website functionality</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Analytics Cookies</h4>
                    <p className="text-orange-700 text-sm">Help us understand site usage</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Marketing Cookies</h4>
                    <p className="text-orange-700 text-sm">Used for personalized advertising</p>
                  </div>
                </div>
              </div>

              {/* Contact Us */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Questions About Privacy?
                  </h2>
                  <p className="text-lg mb-6 opacity-90">
                    We're here to help with any privacy concerns or questions you may have.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => navigate('/contact-us')}
                      className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8"
                    >
                      Contact Privacy Team
                    </Button>
                    <Button
                      onClick={() => navigate('/terms-of-service')}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-amber-600 px-8"
                    >
                      Terms of Service
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

export default PrivacyPolicy;