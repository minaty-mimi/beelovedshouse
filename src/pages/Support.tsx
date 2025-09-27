import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Mail, Phone, HelpCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const Support: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const supportCategories = [
    {
      id: 'orders',
      title: 'Order Issues',
      description: 'Problems with orders, payments, or delivery',
      icon: '📦'
    },
    {
      id: 'products',
      title: 'Product Questions',
      description: 'Questions about our products or downloads',
      icon: '🎨'
    },
    {
      id: 'technical',
      title: 'Technical Support',
      description: 'Website issues, downloads, or account problems',
      icon: '💻'
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      description: 'Return policies, refunds, and exchanges',
      icon: '↩️'
    },
    {
      id: 'wholesale',
      title: 'Wholesale Inquiries',
      description: 'Bulk orders and business partnerships',
      icon: '🏢'
    },
    {
      id: 'other',
      title: 'Other',
      description: 'General questions and feedback',
      icon: '💬'
    }
  ];

  const quickHelp = [
    {
      question: 'How do I download digital products?',
      answer: 'After purchase, check your email for download links. You can also access downloads from your account dashboard.'
    },
    {
      question: 'When will my order ship?',
      answer: 'Orders typically ship within 1-3 business days. You\'ll receive a tracking number via email.'
    },
    {
      question: 'Can I change my order?',
      answer: 'Contact us within 2 hours of placing your order and we\'ll do our best to make changes.'
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

      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-5xl font-bold text-gray-800 mb-4"
              style={{fontFamily: 'Amatic SC, cursive'}}
            >
              Support Center
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help! Get the support you need for all your Bee Loved's House questions.
            </p>
          </div>

          {/* Quick Help Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
              Quick Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickHelp.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                  <h3 className="font-semibold text-gray-800 mb-3">{item.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Categories */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
              How can we help you today?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg'
                      : 'border-amber-200 bg-white/50 hover:border-amber-300'
                  }`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed help via email</p>
              <Button
                onClick={() => navigate('/contact-us')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                Send Email
              </Button>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center">
              <div className="bg-gradient-to-r from-green-400 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <Button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                onClick={() => alert('Live chat coming soon! Please use email support for now.')}
              >
                Start Chat
              </Button>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center">
              <div className="bg-gradient-to-r from-purple-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us for immediate help</p>
              <div className="text-sm text-gray-600">
                <p className="font-semibold">Mon-Fri: 9AM-6PM EST</p>
                <p className="text-amber-600 font-bold">(555) 123-BEES</p>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
              Check Our FAQ
            </h2>
            <p className="text-gray-600 mb-6">
              Find answers to common questions in our comprehensive FAQ section.
            </p>
            <Button
              onClick={() => navigate('/faq')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
            >
              View FAQ
            </Button>
          </div>

          {/* Back to Store */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;