import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Instagram, Facebook, Twitter } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            style={{fontFamily: 'Amatic SC, cursive'}}
          >
            Let's Connect!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our products? Want to share your story? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-3 rounded-full">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Send us a message</h3>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="custom-order">Custom Order</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h4>
                <p className="text-gray-600">We'll get back to you within 24 hours 💝</p>
              </div>
            )}
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Get in touch</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                  <p className="text-gray-600">hello@beelovedshouse.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Response Time</h4>
                  <p className="text-gray-600">Within 24 hours</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                  <p className="text-gray-600">Monday - Friday, 9AM - 5PM EST</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Our Journey</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl hover:scale-105 transition-transform shadow-lg flex flex-col items-center gap-2"
                >
                  <Instagram className="w-6 h-6" />
                  <span className="text-sm font-semibold">Instagram</span>
                </a>
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl hover:scale-105 transition-transform shadow-lg flex flex-col items-center gap-2"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="text-sm font-semibold">Facebook</span>
                </a>
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-sky-400 to-blue-500 text-white p-4 rounded-2xl hover:scale-105 transition-transform shadow-lg flex flex-col items-center gap-2"
                >
                  <Twitter className="w-6 h-6" />
                  <span className="text-sm font-semibold">Twitter</span>
                </a>
              </div>

              <p className="text-gray-600 text-center mt-6">
                See our latest creations and behind-the-scenes moments! ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;