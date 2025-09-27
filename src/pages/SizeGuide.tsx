import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Ruler, ArrowLeft, HelpCircle, Shirt, ShoppingBag, Zap } from 'lucide-react';

const SizeGuide: React.FC = () => {
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
          <div className="max-w-6xl mx-auto">
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
                Size Guide
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Find your perfect fit with our detailed sizing information for clothing and accessories
              </p>
            </div>

            <div className="space-y-8">
              {/* Tote Bag Sizes */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <ShoppingBag className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Tote Bag Sizes
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-amber-100 to-orange-100">
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Size</th>
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Width (inches)</th>
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Height (inches)</th>
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Handle Length (inches)</th>
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-amber-50">
                        <td className="border border-amber-200 px-4 py-3 font-medium text-gray-800">Small</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">13</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">13</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">24</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">Light shopping, books, kids</td>
                      </tr>
                      <tr className="hover:bg-amber-50">
                        <td className="border border-amber-200 px-4 py-3 font-medium text-gray-800">Medium</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">16</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">16</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">24</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">Groceries, work items, daily essentials</td>
                      </tr>
                      <tr className="hover:bg-amber-50">
                        <td className="border border-amber-200 px-4 py-3 font-medium text-gray-800">Large</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">18</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">18</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">30</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">Bulk shopping, heavy loads</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* How to Measure Totes */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Ruler className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  How to Measure Tote Bags
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">W</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Width</h3>
                    <p className="text-sm text-gray-600">
                      Measure across the bottom of the bag from side seam to side seam
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">H</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Height</h3>
                    <p className="text-sm text-gray-600">
                      Measure from the bottom of the bag to the top edge
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">L</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Handle Length</h3>
                    <p className="text-sm text-gray-600">
                      Measure from the top of the bag to the end of the handle
                    </p>
                  </div>
                </div>
              </div>

              {/* Clothing Size Charts */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Shirt className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Women's Clothing Size Chart
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-amber-100 to-orange-100">
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Size</th>
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Bust (in)</th>
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Waist (in)</th>
                        <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-800">Hips (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-amber-50">
                        <td className="border border-amber-200 px-4 py-3 font-medium text-gray-800">XS</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">32-33</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">24-25</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">34-35</td>
                      </tr>
                      <tr className="hover:bg-amber-50">
                        <td className="border border-amber-200 px-4 py-3 font-medium text-gray-800">S</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">34-35</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">26-27</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">36-37</td>
                      </tr>
                      <tr className="hover:bg-amber-50">
                        <td className="border border-amber-200 px-4 py-3 font-medium text-gray-800">M</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">36-37</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">28-29</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">38-39</td>
                      </tr>
                      <tr className="hover:bg-amber-50">
                        <td className="border border-amber-200 px-4 py-3 font-medium text-gray-800">L</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">38-40</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">30-32</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">40-42</td>
                      </tr>
                      <tr className="hover:bg-amber-50">
                        <td className="border border-amber-200 px-4 py-3 font-medium text-gray-800">XL</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">41-43</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">33-35</td>
                        <td className="border border-amber-200 px-4 py-3 text-gray-600">43-45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fit Tips */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  <Zap className="w-8 h-8 inline-block mr-3 text-amber-600" />
                  Fit Tips & Advice
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      If Between Sizes
                    </h3>
                    <p className="text-green-700">
                      For a more fitted look, size down. For comfort, size up. Our fabrics have some stretch.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">i</span>
                      </div>
                      Fabric Care
                    </h3>
                    <p className="text-blue-700">
                      Check care labels. Most items can be machine washed cold and tumble dried low.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">?</span>
                      </div>
                      Still Unsure?
                    </h3>
                    <p className="text-purple-700">
                      Contact our support team for personalized sizing advice. Include your measurements!
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">↻</span>
                      </div>
                      Easy Returns
                    </h3>
                    <p className="text-yellow-700">
                      Not the right fit? Our 30-day return policy makes it easy to find your perfect size.
                    </p>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
                <div className="text-center">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Still Need Help?
                  </h2>
                  <p className="text-lg mb-6 opacity-90">
                    Our sizing experts are here to help you find the perfect fit.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => navigate('/contact-us')}
                      className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8"
                    >
                      Get Sizing Help
                    </Button>
                    <Button
                      onClick={() => navigate('/returns')}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-amber-600 px-8"
                    >
                      Return Policy
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

export default SizeGuide;