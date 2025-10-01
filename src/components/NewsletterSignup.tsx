import React, { useState } from 'react';
import { Mail, Gift, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { toast } from './ui/use-toast';

interface NewsletterSignupProps {
  isPopup?: boolean;
  onClose?: () => void;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ isPopup = false, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      if (!supabase) {
        toast({
          title: "Error",
          description: "Newsletter service not available",
          variant: "destructive"
        });
        return;
      }

      // Check if email already exists
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        toast({
          title: "Already subscribed",
          description: "This email is already on our list!",
        });
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
          if (onClose) onClose();
        }, 2000);
        return;
      }

      // Insert new subscriber
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email,
          user_id: user?.uid || null,
          source: 'website',
          is_active: true,
          subscribed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Newsletter signup error:', error);
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Success!
      toast({
        title: "Welcome to the family! 💝",
        description: "Check your email for your free wallpapers!",
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <div className={`${isPopup ? 'bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4' : 'bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-3xl'} p-8 text-center relative overflow-hidden`}>
      {isPopup && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Floating Hearts - Removed animations to eliminate any loading appearance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-8 w-3 h-3 bg-pink-300 rounded-full opacity-60"></div>
        <div className="absolute top-12 right-12 w-2 h-2 bg-purple-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-8 left-6 w-4 h-4 bg-blue-300 rounded-full opacity-60"></div>
      </div>

      <div className="relative z-10">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Gift className="w-8 h-8 text-white" />
        </div>

        <h3 
          className="text-3xl font-bold text-gray-800 mb-4"
          style={{fontFamily: 'Amatic SC, cursive'}}
        >
          Get Free Wallpapers!
        </h3>
        
        <p className="text-gray-600 mb-6">
          Join our newsletter and receive 5 exclusive "My Shepherd and I" wallpapers instantly, 
          plus early access to new releases and special discounts!
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors text-center"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Subscribing...' : 'Get My Free Wallpapers ✨'}
            </button>
          </form>
        ) : (
          <div className="py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-green-600 mb-2">Welcome to the family!</h4>
            <p className="text-gray-600">Check your email for your free wallpapers 💝</p>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4">
          No spam, unsubscribe anytime. We respect your privacy 💕
        </p>
      </div>
    </div>
  );

  if (isPopup) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        {content}
      </div>
    );
  }

  return (
    <section id="freebies" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};

export default NewsletterSignup;