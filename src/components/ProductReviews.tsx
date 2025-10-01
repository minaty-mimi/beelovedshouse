import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, User, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import type { Review } from '@/types/ecommerce';

interface ProductReviewsProps {
  productId: number;
  averageRating?: number;
  reviewCount?: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  averageRating = 0,
  reviewCount = 0,
}) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId.toString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!user || !supabase) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        product_id: productId.toString(),
        user_id: user.uid,
        user_name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        user_email: user.email || '',
        rating,
        title,
        comment,
        verified_purchase: false, // TODO: Check if user has purchased this product
      });

      if (error) throw error;

      // Reload reviews
      await loadReviews();
      
      // Reset form
      setShowReviewForm(false);
      setRating(5);
      setTitle('');
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
    return { stars, count, percentage };
  });

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-semibold">{stars}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        {user && !showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Write Your Review</h3>
          
          <div className="space-y-4">
            {/* Rating Selector */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Review Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sum up your experience in a few words"
                maxLength={100}
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Review
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what you think about this product..."
                rows={5}
                maxLength={1000}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={submitReview}
                disabled={submitting || !comment.trim()}
                className="flex-1"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button
                onClick={() => setShowReviewForm(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Customer Reviews</h3>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.user_name}</span>
                      {review.verified_purchase && (
                        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              {review.title && (
                <h4 className="font-semibold text-gray-900 mb-2">
                  {review.title}
                </h4>
              )}
              {review.comment && (
                <p className="text-gray-600 mb-3">{review.comment}</p>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-1 text-gray-500 hover:text-amber-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful {review.helpful_count > 0 && `(${review.helpful_count})`}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
