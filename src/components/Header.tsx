import React, { useState } from 'react';
import { Heart, ShoppingBag, Menu, X, Search, User, LogOut } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const { wishlist, cartItemCount, user, signOut } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleAuth = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-600" style={{fontFamily: 'Amatic SC, cursive'}}>
              Beelovedshouse
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors">Home</a>
            <a href="#shop" className="text-gray-700 hover:text-amber-600 transition-colors">Shop</a>
            <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors">About</a>
            <a href="#freebies" className="text-gray-700 hover:text-amber-600 transition-colors">Freebies</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Search
              className="w-5 h-5 text-gray-600 hover:text-amber-600 cursor-pointer transition-colors"
              onClick={() => setIsSearchOpen(true)}
            />
            <div className="relative">
              <Heart 
                className="w-5 h-5 text-gray-600 hover:text-pink-500 cursor-pointer transition-colors" 
                onClick={() => navigate('/liked')}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>
            <div className="relative">
              <ShoppingBag 
                className="w-5 h-5 text-gray-600 hover:text-amber-600 cursor-pointer transition-colors"
                onClick={() => navigate('/cart')}
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="relative">
              <User 
                className="w-5 h-5 text-gray-600 hover:text-amber-600 cursor-pointer transition-colors"
                onClick={handleAuth}
              />
              {user && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-2 h-2"></span>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors">Home</a>
              <a href="#shop" className="text-gray-700 hover:text-amber-600 transition-colors">Shop</a>
              <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors">About</a>
              <a href="#freebies" className="text-gray-700 hover:text-amber-600 transition-colors">Freebies</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</a>
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;