import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';

const Storybooks: React.FC = () => {
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

        <div style={{
          minHeight: '100vh',
          padding: '2rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div className="text-center mb-8">
              <Button
                variant="outline"
                onClick={() => navigate('/products')}
                className="mb-6 border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Products
              </Button>

              <h1
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}
                className="text-5xl"
              >
                Storybooks
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
                Enchanting storybooks for children of all ages
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '1.5rem',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(251, 191, 36, 0.2)'
                }}>
                  <div style={{
                    height: '300px',
                    backgroundColor: '#fef3c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#92400e'
                  }}>
                    📚 Storybook {item}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.5rem'
                    }}>
                      Magical Story {item}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      marginBottom: '1rem',
                      fontSize: '0.875rem'
                    }}>
                      A heartwarming story about friendship and adventure.
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#111827'
                      }}>
                        $12.99
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-200 text-amber-700 hover:bg-amber-50"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
              <h2
                className="text-3xl font-bold text-gray-800 mb-4"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Love Our Stories?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Discover more heartwarming books and creative products!
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

        <Footer />
      </div>
    </div>
  );
};

export default Storybooks;