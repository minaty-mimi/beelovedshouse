import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-orange-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              style={{fontFamily: 'Amatic SC, cursive'}}
            >
              The Story Behind<br />
              <span className="text-amber-600">Beelovedshouse</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Welcome to our magical world! Beelovedshouse was born from a simple yet profound love for 
                storytelling and the beautiful relationship between a shepherd and their flock.
              </p>
              
              <p>
                Our beloved character "My Shepherd and I" represents the gentle guidance, unconditional love, 
                and peaceful comfort that we all seek in our daily lives. Through our carefully crafted 
                digital wallpapers, heartwarming storybooks, and adorable accessories, we aim to bring 
                joy and serenity to your world.
              </p>
              
              <p>
                Every product is designed with love, featuring soft pastel colors and whimsical illustrations 
                that speak to both children and adults who appreciate the beauty of simple, meaningful stories.
              </p>
            </div>

            {/* Mission Points */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Spread Love & Joy</h4>
                  <p className="text-gray-600 text-sm">Creating products that bring smiles and warmth to everyday moments</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Quality & Care</h4>
                  <p className="text-gray-600 text-sm">Every design is thoughtfully crafted with attention to detail and love</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Inspire Wonder</h4>
                  <p className="text-gray-600 text-sm">Encouraging imagination and peaceful moments through beautiful storytelling</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204882628_b32e6d9e.webp"
                  alt="My Shepherd Story"
                  className="rounded-2xl shadow-lg"
                />
                <img 
                  src="https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204884620_4f4bf46c.webp"
                  alt="Shepherd Character"
                  className="rounded-2xl shadow-lg"
                />
                <img 
                  src="https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204895837_917b8286.webp"
                  alt="Cute Stickers"
                  className="rounded-2xl shadow-lg"
                />
                <img 
                  src="https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204906363_e7d037c8.webp"
                  alt="Coloring Book"
                  className="rounded-2xl shadow-lg"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white p-3 rounded-full shadow-lg">
                <Heart className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-3 rounded-full shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;