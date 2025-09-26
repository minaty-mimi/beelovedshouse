import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Download } from 'lucide-react';
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
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  originalPrice,
  image,
  category,
  type
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(id, 1);
    trackAddToCart({ id, title, category, price }, 1);
  };

  const handleViewDetails = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'text-pink-500 fill-pink-500' : 'text-gray-600'
            }`} 
          />
        </button>

        {/* Hover Actions */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-all duration-300">
            <button
              onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-3 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors"
            >
              {type === 'digital' ? (
                <Download className="w-5 h-5" />
              ) : (
                <ShoppingBag className="w-5 h-5" />
              )}
            </button>
          </div>
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
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {originalPrice && (
            <div className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold">
              Save ${(originalPrice - price).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;