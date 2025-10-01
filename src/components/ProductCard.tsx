import React from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { trackAddToCart, trackEvent } from '@/utils/analytics';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  type: 'digital' | 'physical';
  description?: string;
  stock_quantity?: number;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'unlimited';
  average_rating?: number;
  review_count?: number;
  onQuickView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  originalPrice,
  image,
  category,
  type,
  onQuickView
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();

  const wishlisted = isInWishlist(id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(id);
      trackEvent('remove_from_wishlist', 'engagement', title);
    } else {
      addToWishlist(id);
      trackEvent('add_to_wishlist', 'engagement', title);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart(id, 1);
      trackAddToCart({ id, title, category, price }, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart(id, 1);
      trackEvent('buy_now_click', 'conversion', title);
      // Navigate directly to checkout
      navigate('/checkout');
    } catch (error) {
      console.error('Failed to buy now:', error);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    // Only navigate on left click (button 0), allow right-click context menu
    if (e.button === 0) {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
          type === 'digital' 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {type === 'digital' ? 'Digital' : 'Physical'}
        </div>

        {/* Wishlist Button - More Prominent */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 ${
            wishlisted 
              ? 'bg-pink-500 text-white hover:bg-pink-600' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-pink-500'
          }`}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 ${
              wishlisted ? 'fill-white' : ''
            }`} 
          />
        </button>

        {/* Quick View Button - Appears on Hover */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 hover:bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold shadow-lg text-sm"
          >
            Quick View
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {category}
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₦{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {originalPrice && (
            <div className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold">
              Save ₦{(originalPrice - price).toLocaleString()}
            </div>
          )}
        </div>

        {/* Action Buttons - Add to Cart + Buy Now */}
        <div className="mt-3 flex gap-2">
          {type === 'physical' ? (
            <>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-100 text-amber-700 hover:bg-amber-200 py-2 px-4 rounded-lg font-semibold transition-all duration-200"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Buy Now
              </button>
            </>
          ) : (
            <button
              onClick={handleBuyNow}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Download Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;