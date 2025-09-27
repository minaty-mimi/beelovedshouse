import React from 'react';
import Header from './Header';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import AboutSection from './AboutSection';
import NewsletterSignup from './NewsletterSignup';
import ContactSection from './ContactSection';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-40"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main>
          <Hero />
          <FeaturedProducts />
          <AboutSection />
          <NewsletterSignup />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;