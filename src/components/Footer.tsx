import React from 'react';
import { Heart, Instagram, Facebook, Twitter, Mail, Shield, Truck, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-green-500 p-2 rounded-full">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Secure Payments</h4>
                <p className="text-sm text-gray-400">SSL encrypted checkout</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Fast Delivery</h4>
                <p className="text-sm text-gray-400">Digital: Instant | Physical: 3-5 days</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="bg-purple-500 p-2 rounded-full">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Easy Returns</h4>
                <p className="text-sm text-gray-400">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 
                className="text-3xl font-bold text-amber-400 mb-4"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Beelovedshouse
              </h3>
              <p className="text-gray-400 mb-4">
                Bringing joy and serenity to your world through beautiful digital art and heartwarming stories.
              </p>
              <div className="flex gap-3">
                <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-sky-600 p-2 rounded-full hover:bg-sky-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-600 p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/digital-wallpapers')} className="hover:text-white transition-colors">Digital Wallpapers</button></li>
                <li><button onClick={() => navigate('/storybooks')} className="hover:text-white transition-colors">Storybooks</button></li>
                <li><button onClick={() => navigate('/coloring-books')} className="hover:text-white transition-colors">Coloring Books</button></li>
                <li><button onClick={() => navigate('/stickers')} className="hover:text-white transition-colors">Stickers</button></li>
                <li><button onClick={() => navigate('/tote-bags')} className="hover:text-white transition-colors">Tote Bags</button></li>
                <li><button onClick={() => navigate('/card-games')} className="hover:text-white transition-colors">Card Games</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/contact-us')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => navigate('/shipping-info')} className="hover:text-white transition-colors">Shipping Info</button></li>
                <li><button onClick={() => navigate('/returns')} className="hover:text-white transition-colors">Returns</button></li>
                <li><button onClick={() => navigate('/size-guide')} className="hover:text-white transition-colors">Size Guide</button></li>
                <li><button onClick={() => navigate('/digital-downloads')} className="hover:text-white transition-colors">Digital Downloads</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/about-us')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/our-story')} className="hover:text-white transition-colors">Our Story</button></li>
                <li><button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms-of-service')} className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button onClick={() => navigate('/wholesale')} className="hover:text-white transition-colors">Wholesale</button></li>
                <li><button onClick={() => navigate('/affiliate-program')} className="hover:text-white transition-colors">Affiliate Program</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Orivon Edge. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>for our beloved community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;