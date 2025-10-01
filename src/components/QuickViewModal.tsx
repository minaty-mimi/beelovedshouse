import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Zap, Star } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { trackAddToCart, trackEvent } from '@/utils/analytics';
import type { Product } from '@/types/ecommerce';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const wishlisted = isInWishlist(product.id);

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
      trackEvent('remove_from_wishlist', 'engagement', product.title);
    } else {
      addToWishlist(product.id);
      trackEvent('add_to_wishlist', 'engagement', product.title);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      trackAddToCart({ 
        id: product.id, 
        title: product.title, 
        category: product.category, 
        price: product.price 
      }, quantity);
      onClose();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(product.id, quantity);
      trackEvent('buy_now_quick_view', 'conversion', product.title);
      onClose();
      navigate('/checkout');
    } catch (error) {
      console.error('Failed to buy now:', error);
    }
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const getStockDisplay = () => {
    if (product.stock_status === 'unlimited') {
      return { text: 'In Stock', color: 'text-green-600' };
    }
    if (product.stock_status === 'out_of_stock') {
      return { text: 'Out of Stock', color: 'text-red-600' };
    }
    if (product.stock_status === 'low_stock') {
      return { text: `Only ${product.stock_quantity} left!`, color: 'text-orange-600' };
    }
    return { text: `${product.stock_quantity} in stock`, color: 'text-green-600' };
  };

  const stockInfo = getStockDisplay();
  const isOutOfStock = product.stock_status === 'out_of_stock';
  const discount = product.original_price ? 
    Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all z-10"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left: Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover rounded-xl"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.type === 'digital' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {product.type === 'digital' ? 'Digital' : 'Physical'}
              </span>
              
              {discount > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {product.title}
            </h2>

            {/* Rating */}
            {product.review_count && product.review_count > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.average_rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.average_rating?.toFixed(1)} ({product.review_count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                ₦{product.price.toLocaleString()}
              </span>
              {product.original_price && (
                <span className="text-lg text-gray-500 line-through">
                  ₦{product.original_price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className={`text-sm font-semibold mb-4 ${stockInfo.color}`}>
              {stockInfo.text}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 line-clamp-4">
              {product.description}
            </p>

            {/* Quantity Selector (only for physical products) */}
            {product.type === 'physical' && !isOutOfStock && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-4">
              {!isOutOfStock && (
                <>
                  {product.type === 'physical' ? (
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-2 bg-amber-100 text-amber-700 hover:bg-amber-200 py-3 px-6 rounded-lg font-semibold transition-all"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <button
                        onClick={handleBuyNow}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg"
                      >
                        <Zap className="w-5 h-5" />
                        Buy Now
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleBuyNow}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg"
                    >
                      <Zap className="w-5 h-5" />
                      Download Now
                    </button>
                  )}
                </>
              )}

              <button
                onClick={handleWishlist}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                  wishlisted
                    ? 'bg-pink-500 text-white hover:bg-pink-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-white' : ''}`} />
                {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* View Full Details Link */}
            <button
              onClick={handleViewFullDetails}
              className="text-amber-600 hover:text-amber-700 font-semibold text-sm underline"
            >
              View Full Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
