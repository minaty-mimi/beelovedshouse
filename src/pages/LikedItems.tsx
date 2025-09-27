import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LikedItems: React.FC = () => {
  const { products, wishlist, removeFromWishlist } = useAppContext();
  const navigate = useNavigate();

  const likedProducts = products.filter(product => wishlist.includes(product.id));

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

        <main className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
                My Liked Items
              </h1>
              <p className="text-lg text-gray-600">
                {likedProducts.length === 0
                  ? "You haven't liked any items yet. Start browsing and heart your favorites!"
                  : `You have ${likedProducts.length} item${likedProducts.length === 1 ? '' : 's'} in your wishlist.`
                }
              </p>
            </div>

            {likedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-xl max-w-2xl mx-auto">
                <Heart className="w-24 h-24 text-pink-300 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">No liked items yet</h2>
                <p className="text-gray-500 mb-8">Browse our products and click the heart icon to add items to your wishlist.</p>
                <Button
                  onClick={() => navigate('/products')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
                >
                  <ShoppingBag className="mr-2 w-4 h-4" />
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {likedProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}

            {/* Call to Action */}
            {likedProducts.length > 0 && (
              <div className="text-center mt-12 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Ready to Buy?
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Your wishlist items are waiting! Add them to cart and complete your purchase.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/cart')}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
                  >
                    <ShoppingBag className="mr-2 w-4 h-4" />
                    View Cart
                  </Button>
                  <Button
                    onClick={() => navigate('/products')}
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 px-8 py-3"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default LikedItems;