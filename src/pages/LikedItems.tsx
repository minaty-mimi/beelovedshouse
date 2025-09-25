import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart } from 'lucide-react';

const LikedItems: React.FC = () => {
  const { products, wishlist, removeFromWishlist } = useAppContext();

  const likedProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3"
              style={{fontFamily: 'Amatic SC, cursive'}}
            >
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
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
            <div className="text-center py-16">
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">No liked items yet</h2>
              <p className="text-gray-500 mb-8">Browse our products and click the heart icon to add items to your wishlist.</p>
              <a
                href="#shop"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block"
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {likedProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LikedItems;