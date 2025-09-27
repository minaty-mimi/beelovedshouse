import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { ArrowLeft, DollarSign, Package, Truck, Palette, Store, ShoppingCart, Mail, Phone, MessageCircle } from 'lucide-react';

const Wholesale: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
    monthlyOrders: '',
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
    alert('Thank you for your interest! We will contact you within 2-3 business days.');
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      businessType: '',
      monthlyOrders: '',
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
                Wholesale Program
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Partner with us to bring Bee Loved's House products to your customers
              </p>
              <p className="text-sm text-gray-500">Join our growing network of wholesale partners</p>
            </div>

            {/* Why Partner With Us */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                <DollarSign className="w-8 h-8 inline-block mr-3 text-amber-600" />
                Why Partner With Us?
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-3">Competitive Pricing</h3>
                  <p className="text-green-700 text-sm">
                    Attractive wholesale discounts starting at 40% off retail prices
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-3">Flexible Ordering</h3>
                  <p className="text-blue-700 text-sm">
                    Minimum orders starting at ₦500,000. Mix and match products.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-3">Fast Shipping</h3>
                  <p className="text-purple-700 text-sm">
                    Quick processing and shipping within 2-3 business days
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-amber-800 mb-3">Unique Products</h3>
                  <p className="text-amber-700 text-sm">
                    Exclusive designs that stand out in the children's market
                  </p>
                </div>
              </div>
            </div>

            {/* Who Can Apply */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                <Store className="w-8 h-8 inline-block mr-3 text-amber-600" />
                Who Can Apply?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200">
                  <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                    <Store className="w-5 h-5 mr-2" />
                    Retail Stores
                  </h3>
                  <p className="text-teal-700">
                    Boutiques, toy stores, gift shops, and specialty retailers
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                  <h3 className="font-semibold text-indigo-800 mb-3 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Online Sellers
                  </h3>
                  <p className="text-indigo-700">
                    E-commerce stores, marketplaces, and online retailers
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200">
                  <h3 className="font-semibold text-pink-800 mb-3 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Educational Institutions
                  </h3>
                  <p className="text-pink-700">
                    Schools, preschools, daycares, and learning centers
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                    <Store className="w-5 h-5 mr-2" />
                    Other Businesses
                  </h3>
                  <p className="text-yellow-700">
                    Libraries, pediatric offices, play centers, and family-oriented businesses
                  </p>
                </div>
              </div>
            </div>

            {/* Wholesale Application Form */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-amber-200 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
                <MessageCircle className="w-8 h-8 inline-block mr-3 text-amber-600" />
                Wholesale Application
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-gray-700 font-medium">
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="border-amber-200 focus:border-amber-400"
                      placeholder="Your business name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-gray-700 font-medium">
                      Contact Name *
                    </Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      type="text"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="border-amber-200 focus:border-amber-400"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-amber-200 focus:border-amber-400"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-700 font-medium">
                      Website (if applicable)
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
                    <Label htmlFor="businessType" className="text-gray-700 font-medium">
                      Business Type *
                    </Label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    >
                      <option value="">Select business type</option>
                      <option value="retail">Retail Store</option>
                      <option value="online">Online Store</option>
                      <option value="educational">Educational Institution</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyOrders" className="text-gray-700 font-medium">
                    Estimated Monthly Orders
                  </Label>
                  <select
                    id="monthlyOrders"
                    name="monthlyOrders"
                    value={formData.monthlyOrders}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  >
                    <option value="">Select estimated volume</option>
                    <option value="500-1000">₦500,000 - ₦1,000,000</option>
                    <option value="1000-2500">₦1,000,000 - ₦2,500,000</option>
                    <option value="2500-5000">₦2,500,000 - ₦5,000,000</option>
                    <option value="5000+">₦5,000,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Tell us about your business and why you'd like to carry our products
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="border-amber-200 focus:border-amber-400 resize-none"
                    placeholder="Tell us about your business, target customers, and why Bee Loved's House products would be a great fit..."
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
                  Questions About Wholesale?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Have questions about our wholesale program? We'd love to hear from you!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <Mail className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold">Email</p>
                    <p className="text-sm opacity-90">wholesale@beelovedshouse.com</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <Phone className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm opacity-90">[Your Wholesale Phone]</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold">Response Time</p>
                    <p className="text-sm opacity-90">Within 1-2 business days</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/contact-us')}
                    className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8"
                  >
                    Contact Support
                  </Button>
                  <Button
                    onClick={() => navigate('/products')}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-amber-600 px-8"
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

export default Wholesale;