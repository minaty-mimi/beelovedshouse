import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 overflow-hidden"
    >
      {/* Floating Elements - Removed animations to eliminate any loading appearance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight"
            style={{fontFamily: 'Amatic SC, cursive'}}
          >
            Welcome to<br />
            <span className="text-amber-600">Beelovedshouse</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover a magical world of digital wallpapers, heartwarming storybooks, 
            adorable stickers, and charming accessories inspired by "My Shepherd and I"
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={() => navigate('/products')}
              className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => navigate('/digital-downloads')}
              className="group bg-white text-amber-600 border-2 border-amber-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Free Wallpapers
            </button>
          </div>

          <div className="text-sm text-gray-500">
            ✨ Get exclusive freebies when you join our newsletter ✨
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;