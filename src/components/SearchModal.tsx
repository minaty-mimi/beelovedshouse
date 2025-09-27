import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products, productsLoading } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(products);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults(products.slice(0, 5)); // Show first 5 products when no search
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered.slice(0, 8)); // Limit to 8 results
    }
  }, [searchTerm, products]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    onClose();
    setSearchTerm('');
  };

  const handleViewAll = () => {
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    onClose();
    setSearchTerm('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search products, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {productsLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4">
              {results.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{product.title}</h4>
                    <p className="text-sm text-gray-500">{product.category} • {product.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}

              {searchTerm.trim() !== '' && results.length >= 8 && (
                <div className="mt-4 pt-4 border-t">
                  <Button onClick={handleViewAll} variant="outline" className="w-full">
                    View all results for "{searchTerm}"
                  </Button>
                </div>
              )}
            </div>
          ) : searchTerm.trim() !== '' ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found for "{searchTerm}"</p>
              <Button
                onClick={() => navigate('/products')}
                variant="outline"
                className="mt-4"
              >
                Browse all products
              </Button>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">Start typing to search products...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;