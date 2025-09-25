import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Products: React.FC = () => {
  const { products } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Update URL when search term changes
  useEffect(() => {
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'digital', label: 'Digital' },
    { id: 'physical', label: 'Physical' },
    { id: 'wallpapers', label: 'Wallpapers' },
    { id: 'books', label: 'Books' },
    { id: 'tote bags', label: 'Tote Bags' },
    { id: 'stickers', label: 'Stickers' },
    { id: 'card games', label: 'Card Games' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesFilter = activeFilter === 'all' ||
                         (activeFilter === 'digital' || activeFilter === 'physical') && product.type === activeFilter ||
                         product.category.toLowerCase().includes(activeFilter);
    const matchesSearch = !searchTerm ||
                         product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              style={{fontFamily: 'Amatic SC, cursive'}}
            >
              All Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Discover our complete collection of digital wallpapers, heartwarming books, and adorable accessories
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map(filter => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={activeFilter === filter.id ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No products found in this category.</p>
            </div>
          )}

          {/* Stats */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Beelovedshouse?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-semibold mb-2">Original Artwork</h3>
                <p className="text-gray-600 text-sm">Every piece is lovingly crafted with heartwarming pastoral themes</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">Instant Digital Downloads</h3>
                <p className="text-gray-600 text-sm">Get your wallpapers immediately after purchase</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💝</div>
                <h3 className="font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-600 text-sm">Premium materials and careful packaging for physical items</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;