import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Download, ArrowLeft, Star, Share2, Eye } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { trackProductView, trackAddToCart, trackEvent } from '@/utils/analytics';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, isInWishlist, addToWishlist, removeFromWishlist, addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === parseInt(id || '0'));

  // Track product view
  useEffect(() => {
    if (product) {
      trackProductView(product);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
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
      trackAddToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBuyNow = () => {
    // For now, just add to cart and show message
    handleAddToCart();
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant={product.type === 'digital' ? 'secondary' : 'default'} className="mb-2">
                  {product.type === 'digital' ? 'Digital Download' : 'Physical Product'}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-600 text-lg">{product.category}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="destructive">
                      Save ₦{(product.originalPrice - product.price).toLocaleString()}
                    </Badge>
                  </>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8) • 127 reviews</span>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  A beautiful {product.type} product featuring adorable artwork from "My Shepherd and I".
                  Perfect for {product.category.toLowerCase()} lovers who appreciate heartwarming, pastoral themes.
                </p>

                {product.type === 'digital' && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Digital Product Details</h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• High-resolution images</li>
                      <li>• Instant download after purchase</li>
                      <li>• Multiple formats available</li>
                      <li>• Commercial use license included</li>
                    </ul>
                  </div>
                )}

                {product.type === 'physical' && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Physical Product Details</h3>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Premium quality materials</li>
                      <li>• Carefully packaged</li>
                      <li>• Free shipping on orders over ₦50,000</li>
                      <li>• 30-day return policy</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-4">
                {product.type === 'physical' && (
                  <div className="flex items-center gap-4">
                    <label className="font-semibold">Quantity:</label>
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3"
                      >
                        -
                      </Button>
                      <span className="px-4 py-2">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                    size="lg"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlist}
                    className={isInWishlist(product.id) ? 'text-pink-500 border-pink-500' : ''}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <span className="text-gray-600">Share:</span>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t pt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <div
                    key={relatedProduct.id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-amber-600">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      ₦{relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;