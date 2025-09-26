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
    <div className="min-h-screen bg-white">
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
  );
};

export default AppLayout;