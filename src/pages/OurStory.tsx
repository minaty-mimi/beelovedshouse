import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Heart, Lightbulb, ArrowLeft, Sparkles, Users, Palette } from 'lucide-react';

const OurStory: React.FC = () => {
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
                Our Story
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                How a simple idea became a passion for creating joy
              </p>
            </div>

            <div className="space-y-8">
              {/* The Beginning */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                      The Beginning
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      It all started in a cozy kitchen in 2018, when Sarah, a mother of two, noticed how her children
                      would light up when she created personalized storybooks for them. What began as bedtime stories
                      scribbled on notebook paper soon became a passion for creating magical worlds that could transport
                      children to places of wonder and imagination.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Spark of Inspiration */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                      The Spark of Inspiration
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Sarah realized that every child has a unique story waiting to be told. She began creating
                      custom storybooks, coloring pages, and artwork that reflected each child's personality and dreams.
                      Word spread through local parent groups, and soon Sarah was creating magical experiences for
                      children across her community.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bee Loved's House is Born */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-4xl">🐝</div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                      Bee Loved's House is Born
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      In 2020, Sarah officially launched Bee Loved's House. The name came from her children's favorite
                      story about a magical bee who created worlds of wonder. Today, we create products that help
                      children feel loved, valued, and inspired. From digital wallpapers to tote bags, every item
                      carries the same magic that started in that kitchen so many years ago.
                    </p>
                  </div>
                </div>
              </div>

              {/* Our Values */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Our Values
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl border border-pink-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-3">Love First</h3>
                    <p className="text-gray-600 text-sm">
                      Everything we create starts with love and ends with joy.
                    </p>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-3">Creativity</h3>
                    <p className="text-gray-600 text-sm">
                      We believe in nurturing imagination and creative expression.
                    </p>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border border-green-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-3">Growth</h3>
                    <p className="text-gray-600 text-sm">
                      Helping children grow through play, learning, and self-discovery.
                    </p>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl border border-purple-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-3">Community</h3>
                    <p className="text-gray-600 text-sm">
                      Building connections between families and creatives worldwide.
                    </p>
                  </div>
                </div>
              </div>

              {/* Thank You */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Thank You
                </h2>
                <p className="text-lg mb-6 opacity-90 leading-relaxed">
                  To every parent, teacher, and child who has been part of our journey - thank you for believing
                  in the magic of imagination. Together, we're creating a world where every child feels loved
                  and empowered to dream big.
                </p>
                <p className="text-xl font-semibold opacity-90 italic">
                  With love,<br />
                  The Bee Loved's House Family
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default OurStory;