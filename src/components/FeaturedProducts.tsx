import React, { useState } from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const products = [
    {
      id: 1,
      title: "My Shepherd Dreams Wallpaper Pack",
      price: 4.99,
      originalPrice: 7.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204871871_6f7f2a46.webp",
      category: "Wallpapers",
      type: "digital" as const
    },
    {
      id: 2,
      title: "Adventures with My Shepherd - Storybook",
      price: 12.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204880705_c66dab7a.webp",
      category: "Books",
      type: "physical" as const
    },
    {
      id: 3,
      title: "Shepherd's Journey Tote Bag",
      price: 18.99,
      originalPrice: 24.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204888876_25a39d61.webp",
      category: "Tote Bags",
      type: "physical" as const
    },
    {
      id: 4,
      title: "Cute Shepherd Sticker Set",
      price: 6.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204894049_1eb729fd.webp",
      category: "Stickers",
      type: "physical" as const
    },
    {
      id: 5,
      title: "Peaceful Pastures Wallpaper",
      price: 2.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204874325_9dcbc450.webp",
      category: "Wallpapers",
      type: "digital" as const
    },
    {
      id: 6,
      title: "My Shepherd Card Game",
      price: 15.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204899458_c7f4d3e6.webp",
      category: "Card Games",
      type: "physical" as const
    },
    {
      id: 7,
      title: "Shepherd's Coloring Adventure",
      price: 8.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204904519_125d5d7b.webp",
      category: "Books",
      type: "physical" as const
    },
    {
      id: 8,
      title: "Heavenly Fields Wallpaper Set",
      price: 3.99,
      image: "https://d64gsuwffb70l.cloudfront.net/68cc139a3d7e93f6381346d9_1758204876206_b3ab168d.webp",
      category: "Wallpapers",
      type: "digital" as const
    }
  ];

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'digital', label: 'Digital' },
    { id: 'physical', label: 'Physical' },
    { id: 'wallpapers', label: 'Wallpapers' },
    { id: 'books', label: 'Books' }
  ];

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'digital' || activeFilter === 'physical') {
      return product.type === activeFilter;
    }
    return product.category.toLowerCase().includes(activeFilter);
  });

  return (
    <section id="shop" className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            style={{fontFamily: 'Amatic SC, cursive'}}
          >
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most beloved digital wallpapers, heartwarming books, and adorable accessories
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 shadow-md'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;