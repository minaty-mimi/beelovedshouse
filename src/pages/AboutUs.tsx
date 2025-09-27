import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Heart, Sparkles, Globe, ArrowLeft, Instagram, Mail } from 'lucide-react';

const AboutUs: React.FC = () => {
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
                About Bee Loved's House
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Creating magical moments through creativity and imagination
              </p>
            </div>

            <div className="space-y-8">
              {/* Our Story */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-5xl">🐝</div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Our Story
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6 max-w-3xl mx-auto">
                  Bee Loved's House was born from a simple belief: every child deserves to feel loved, cherished, and inspired.
                  What started as a small collection of handmade storybooks has grown into a magical world of creativity,
                  where imagination knows no bounds.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto">
                  We create products that spark joy, encourage creativity, and create lasting memories.
                  From whimsical storybooks to beautiful digital wallpapers, every item in our collection
                  is designed with love and crafted with care.
                </p>
              </div>

              {/* Our Values */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Made with Love
                  </h3>
                  <p className="text-gray-600">
                    Every product is created with the utmost care and attention to detail,
                    ensuring quality that lasts.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Spark Imagination
                  </h3>
                  <p className="text-gray-600">
                    Our designs encourage creativity and help children explore their
                    imagination through play and learning.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Eco-Friendly
                  </h3>
                  <p className="text-gray-600">
                    We prioritize sustainable materials and practices to protect
                    our planet for future generations.
                  </p>
                </div>
              </div>

              {/* Our Mission */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Our Mission
                </h2>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
                  <p className="text-gray-700 leading-relaxed text-lg text-center mb-4 max-w-4xl mx-auto">
                    "To create a world where every child feels loved, valued, and empowered through creativity.
                    We believe that imagination is the foundation of innovation, and every child deserves tools
                    that help them dream big and achieve their goals."
                  </p>
                  <p className="text-gray-600 text-center font-semibold italic">
                    - The Bee Loved's House Team
                  </p>
                </div>
              </div>

              {/* Join Our Family */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Join Our Family
                </h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  Become part of our community of parents, educators, and creatives who share our passion
                  for nurturing young minds.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Button
                    onClick={() => navigate('/products')}
                    className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8"
                  >
                    Explore Our Products
                  </Button>
                  <Button
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-amber-600 px-8"
                  >
                    Get in Touch
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-amber-600 px-6"
                    variant="outline"
                  >
                    <Instagram className="mr-2 w-4 h-4" />
                    Follow on Instagram
                  </Button>
                  <Button
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-amber-600 px-6"
                    variant="outline"
                  >
                    <Mail className="mr-2 w-4 h-4" />
                    Subscribe to Newsletter
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

export default AboutUs;