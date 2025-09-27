import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { ArrowLeft, DollarSign, Clock, Gift, BarChart3, Users, MessageCircle, Mail, Phone, BookOpen } from 'lucide-react';

const AffiliateProgram: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    socialMedia: '',
    audience: '',
    experience: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest in our affiliate program! We will review your application and contact you within 3-5 business days.');
    setFormData({
      name: '',
      email: '',
      website: '',
      socialMedia: '',
      audience: '',
      experience: '',
      message: ''
    });
  };

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
          <div className="max-w-6xl mx-auto">
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
                Affiliate Program
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Join our affiliate family and earn commissions promoting products you love
              </p>
              <p className="text-sm text-gray-500">Earn 15% commission on every sale</p>
            </div>

            {/* Earn Money Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                <DollarSign className="w-8 h-8 inline-block mr-3 text-amber-600" />
                Earn Money Sharing What You Love
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-3">15% Commission</h3>
                  <p className="text-green-700 text-sm">
                    Earn 15% on every sale generated through your unique affiliate link
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-3">Monthly Payouts</h3>
                  <p className="text-blue-700 text-sm">
                    Get paid monthly via PayPal, direct deposit, or check (minimum ₦30,000)
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-3">Free Products</h3>
                  <p className="text-purple-700 text-sm">
                    Receive free products to review and feature in your content
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-amber-800 mb-3">Real-Time Tracking</h3>
                  <p className="text-amber-700 text-sm">
                    Track your clicks, conversions, and earnings in real-time
                  </p>
                </div>
              </div>
            </div>

            {/* Who Should Apply */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                <Users className="w-8 h-8 inline-block mr-3 text-amber-600" />
                Who Should Apply?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200">
                  <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Bloggers & Content Creators
                  </h3>
                  <p className="text-teal-700">
                    Lifestyle, parenting, education, or children's product bloggers
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                  <h3 className="font-semibold text-indigo-800 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Social Media Influencers
                  </h3>
                  <p className="text-indigo-700">
                    Instagram, TikTok, YouTube, or Pinterest creators with family/parenting audiences
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200">
                  <h3 className="font-semibold text-pink-800 mb-3 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Parenting Communities
                  </h3>
                  <p className="text-pink-700">
                    Facebook groups, forums, or parenting websites and newsletters
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Educators & Childcare Providers
                  </h3>
                  <p className="text-yellow-700">
                    Teachers, daycare owners, and early childhood education professionals
                  </p>
                </div>
              </div>
            </div>

            {/* Affiliate Application Form */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                <MessageCircle className="w-8 h-8 inline-block mr-3 text-amber-600" />
                Affiliate Application
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-amber-200 focus:border-amber-400"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-amber-200 focus:border-amber-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-700 font-medium">
                      Website/Blog URL
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="border-amber-200 focus:border-amber-400"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialMedia" className="text-gray-700 font-medium">
                      Social Media Handles
                    </Label>
                    <Input
                      id="socialMedia"
                      name="socialMedia"
                      type="text"
                      value={formData.socialMedia}
                      onChange={handleChange}
                      className="border-amber-200 focus:border-amber-400"
                      placeholder="Instagram, TikTok, etc."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="audience" className="text-gray-700 font-medium">
                      Audience Size
                    </Label>
                    <select
                      id="audience"
                      name="audience"
                      value={formData.audience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    >
                      <option value="">Select audience size</option>
                      <option value="1k-5k">1K - 5K followers</option>
                      <option value="5k-10k">5K - 10K followers</option>
                      <option value="10k-50k">10K - 50K followers</option>
                      <option value="50k-100k">50K - 100K followers</option>
                      <option value="100k+">100K+ followers</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-700 font-medium">
                      Affiliate Experience
                    </Label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    >
                      <option value="">Select experience level</option>
                      <option value="none">No experience</option>
                      <option value="beginner">Beginner (less than 1 year)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="experienced">Experienced (3+ years)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Tell us about yourself and why you'd be a great affiliate partner *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="border-amber-200 focus:border-amber-400 resize-none"
                    placeholder="Tell us about your audience, content style, and why Bee Loved's House products would resonate with your followers..."
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg font-semibold"
                  >
                    Apply Now
                  </Button>
                </div>
              </form>
            </div>

            {/* Affiliate Resources */}
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl p-8 text-white shadow-xl mb-8">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Affiliate Resources
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Once approved, you'll get access to marketing materials, product images, email templates,
                  and promotional codes to help you succeed.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold">Marketing Materials</p>
                    <p className="text-sm opacity-90">Banners, product images, and social media graphics</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <Mail className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold">Email Templates</p>
                    <p className="text-sm opacity-90">Pre-written promotional emails and newsletters</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold">Support</p>
                    <p className="text-sm opacity-90">Dedicated affiliate manager and monthly webinars</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Questions About Affiliates?
                </h2>
                <p className="text-lg mb-6 text-gray-600">
                  Have questions about our affiliate program? We're here to help!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                    <Mail className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold text-blue-800">Email</p>
                    <p className="text-sm text-blue-700">affiliates@beelovedshouse.com</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <Phone className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold text-green-800">Phone</p>
                    <p className="text-sm text-green-700">[Your Affiliate Phone]</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <p className="font-semibold text-purple-800">Response Time</p>
                    <p className="text-sm text-purple-700">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/contact-us')}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8"
                  >
                    Contact Support
                  </Button>
                  <Button
                    onClick={() => navigate('/products')}
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 px-8"
                  >
                    View Products
                  </Button>
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

export default AffiliateProgram;