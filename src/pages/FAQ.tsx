import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle, Mail, MessageCircle, ArrowLeft } from 'lucide-react';

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How do I download digital products?",
      answer: "After purchase, you'll receive an email with download links. You can also access your downloads from your account dashboard."
    },
    {
      question: "What file formats are included?",
      answer: "Digital wallpapers come in multiple formats (PNG, JPG, PDF). Books are available as PDF files. All products are high-resolution."
    },
    {
      question: "Can I return physical products?",
      answer: "Yes, we accept returns within 30 days of delivery. Items must be in original condition. See our Returns page for full details."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! Shipping costs and delivery times vary by location. Check our Shipping Info page for details."
    },
    {
      question: "Are your products suitable for children?",
      answer: "Yes! Our products are designed with children in mind. Storybooks and coloring books are age-appropriate and educational."
    },
    {
      question: "How long do downloads take to arrive?",
      answer: "Digital products are delivered instantly via email. Physical products typically ship within 1-3 business days."
    },
    {
      question: "Can I get a refund for digital products?",
      answer: "Due to the nature of digital products, we don't offer refunds once downloaded. Please contact us if you have technical issues."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! We offer wholesale pricing for bulk orders. Contact us for a custom quote."
    }
  ];

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

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="mb-6 border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </Button>

              <h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                style={{fontFamily: 'Amatic SC, cursive'}}
              >
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Find answers to common questions about our products and services
              </p>
            </div>

            <div className="space-y-6">
              {/* FAQ Items */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-amber-200 overflow-hidden">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-amber-100 last:border-b-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-amber-50/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded-t-3xl"
                    >
                      <span className="text-lg font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </span>
                      {openItems.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      )}
                    </button>
                    {openItems.includes(index) && (
                      <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Help Section */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
                <div className="text-center">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                    Still have questions?
                  </h2>
                  <p className="text-lg mb-6 opacity-90">
                    Can't find what you're looking for? We're here to help!
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <Mail className="w-8 h-8 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Email Support</h3>
                      <p className="text-sm opacity-90">Get detailed help via email</p>
                      <Button
                        onClick={() => navigate('/contact')}
                        className="mt-3 bg-white text-amber-600 hover:bg-gray-100 font-semibold"
                      >
                        Contact Us
                      </Button>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <MessageCircle className="w-8 h-8 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Live Chat</h3>
                      <p className="text-sm opacity-90">Chat with our support team</p>
                      <Button
                        onClick={() => navigate('/support')}
                        className="mt-3 bg-white text-amber-600 hover:bg-gray-100 font-semibold"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => navigate('/products')}
                      className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8"
                    >
                      Browse Products
                    </Button>
                    <Button
                      onClick={() => navigate('/shipping-info')}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-amber-600 px-8"
                    >
                      Shipping Info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default FAQ;