import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import AboutSection from './AboutSection';
import NewsletterSignup from './NewsletterSignup';
import ContactSection from './ContactSection';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  // Show newsletter popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletterPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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

      {/* Newsletter Popup */}
      {showNewsletterPopup && (
        <NewsletterSignup 
          isPopup={true} 
          onClose={() => setShowNewsletterPopup(false)} 
        />
      )}
    </div>
  );
};

export default AppLayout;