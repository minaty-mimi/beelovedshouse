import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';

const Company: React.FC = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Creative Director',
      bio: 'Passionate about creating magical experiences for children through art and storytelling.',
      image: '👩‍🎨'
    },
    {
      name: 'Mike Chen',
      role: 'Operations Manager',
      bio: 'Ensures every order brings joy while maintaining our commitment to quality and sustainability.',
      image: '👨‍💼'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Digital Artist',
      bio: 'Brings our whimsical designs to life with creativity and attention to detail.',
      image: '👩‍🎨'
    }
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Made with Love',
      description: 'Every product is crafted with care and passion for creating joyful experiences.'
    },
    {
      icon: '🌱',
      title: 'Sustainable',
      description: 'We prioritize eco-friendly materials and practices for a better tomorrow.'
    },
    {
      icon: '🎨',
      title: 'Creative',
      description: 'We believe in fostering imagination and creativity in every child.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Building a supportive community of parents, educators, and creatives.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Bee Loved\'s House founded with first storybook collection' },
    { year: '2021', event: 'Expanded to digital wallpapers and coloring books' },
    { year: '2022', event: 'Launched wholesale program for schools and educators' },
    { year: '2023', event: 'Reached 10,000+ happy customers worldwide' },
    { year: '2024', event: 'Introduced eco-friendly product line' },
    { year: '2025', event: 'Continuing to grow and spread creativity!' }
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-5xl font-bold text-gray-800 mb-4"
              style={{fontFamily: 'Amatic SC, cursive'}}
            >
              About Our Company
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about Bee Loved's House, our mission, values, and the team behind the magic.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{fontFamily: 'Amatic SC, cursive'}}>
                Our Mission
              </h2>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
                <p className="text-xl text-gray-700 leading-relaxed mb-4">
                  "To create a world where every child feels loved, valued, and empowered through creativity.
                  We believe that imagination is the foundation of innovation, and every child deserves tools
                  that help them dream big and achieve their goals."
                </p>
                <p className="text-amber-600 font-semibold italic">
                  - The Bee Loved's House Team
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
              Our Story
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl mb-6 text-center">🐝</div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bee Loved's House was born from a simple belief: every child deserves to feel loved,
                  cherished, and inspired. What started as a small collection of handmade storybooks
                  has grown into a magical world of creativity, where imagination knows no bounds.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We create products that spark joy, encourage creativity, and create lasting memories.
                  From whimsical storybooks to beautiful digital wallpapers, every item in our collection
                  is designed with love and crafted with care.
                </p>
              </div>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {milestone.year.slice(-2)}
                    </div>
                    <div>
                      <div className="text-sm text-amber-600 font-semibold">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" style={{fontFamily: 'Amatic SC, cursive'}}>
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                <p className="text-gray-600">Based in the heart of creativity<br />Serving customers worldwide</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-400 to-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">hello@beelovedshouse.com</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600">(555) 123-BEES</p>
              </div>
            </div>
          </div>

          {/* Join Us */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 shadow-xl text-center text-white">
            <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Amatic SC, cursive'}}>
              Join Our Family
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Become part of our community of parents, educators, and creatives who share our passion
              for nurturing young minds through creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/contact-us')}
                className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3"
              >
                Contact Us
              </Button>
              <Button
                onClick={() => navigate('/affiliate-program')}
                className="bg-white/20 text-white border-2 border-white hover:bg-white/30 px-8 py-3"
              >
                Join Affiliate Program
              </Button>
            </div>
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

export default Company;