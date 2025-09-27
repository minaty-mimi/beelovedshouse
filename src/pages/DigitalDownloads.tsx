import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowLeft, Download, Mail, FileText, HelpCircle, CheckCircle } from 'lucide-react';

const DigitalDownloads: React.FC = () => {
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
          <div className="max-w-4xl mx-auto">
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
                Digital Downloads
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Instant access to your digital products - wallpapers, coloring pages, and more!
              </p>
            </div>

            <div className="space-y-8">
              {/* How to Access Downloads */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Download className="w-6 h-6 text-amber-600" />
                  How to Access Your Downloads
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Check Your Email</h3>
                      <p className="text-gray-600">
                        After purchase, you'll receive an email with download links within 5 minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Click Download Links</h3>
                      <p className="text-gray-600">
                        Each link is unique to your order and expires after 30 days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Save Your Files</h3>
                      <p className="text-gray-600">
                        Download and save files to your preferred location immediately
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Formats */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <FileText className="w-6 h-6 text-amber-600" />
                  File Formats & Requirements
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-gray-800 mb-3">Digital Wallpapers</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• PNG format (transparent background)</li>
                      <li>• JPG format (white background)</li>
                      <li>• High resolution (3000x2000px)</li>
                      <li>• Print-ready quality</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-gray-800 mb-3">Coloring Pages</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• PDF format (printable)</li>
                      <li>• JPG format (digital use)</li>
                      <li>• 8.5x11 inches</li>
                      <li>• High resolution</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-gray-800 mb-3">Stickers</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• PNG format (transparent)</li>
                      <li>• SVG format (vector)</li>
                      <li>• Various sizes available</li>
                      <li>• Print-ready</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <HelpCircle className="w-6 h-6 text-amber-600" />
                  Troubleshooting
                </h2>

                <div className="space-y-6">
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-2">Didn't receive the email?</h3>
                    <p className="text-red-700 text-sm">
                      Check your spam/junk folder first. If it's not there, contact us with your order number.
                    </p>
                  </div>

                  <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">Download link not working?</h3>
                    <p className="text-yellow-700 text-sm">
                      Links expire after 30 days. Contact us for a new link if needed.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">File won't open?</h3>
                    <p className="text-blue-700 text-sm">
                      Make sure you have the appropriate software (PDF reader, image viewer) installed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Mail className="w-6 h-6" />
                  Need Help?
                </h2>

                <p className="mb-6 opacity-90">
                  Our customer service team is here to help with any download issues.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Email: downloads@beelovedshouse.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Response time: Within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>24/7 support for urgent issues</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/contact')}
                  className="mt-6 bg-white text-amber-600 hover:bg-gray-100 font-semibold"
                >
                  Contact Support
                </Button>
              </div>

              {/* Call to Action */}
              <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Love Your Downloads?
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Check out our other digital products and physical items!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/products')}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
                  >
                    Browse All Products
                  </Button>
                  <Button
                    onClick={() => navigate('/liked-items')}
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 px-8 py-3"
                  >
                    View Wishlist
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

export default DigitalDownloads;