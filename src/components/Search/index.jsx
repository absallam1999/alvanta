import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Clock,
  TrendingUp,
  ArrowRight,
  Package,
} from 'lucide-react';
import { productUtils } from '../../utils/productUtils';
import { useNavigate } from 'react-router-dom';

const SearchOverlay = ({
  isSearchOpen,
  onClose,
  allProducts = [],
  navigation = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const results = productUtils.searchHome(allProducts, searchQuery);

      setSearchResults(results.slice(0, 8));
      setSelectedIndex(-1);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allProducts]);

  // Save recent searches to localStorage
  const saveToRecentSearches = (query) => {
    if (!query.trim()) return;

    const updated = [
      query,
      ...recentSearches.filter((item) => item !== query),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Handle search with debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const results = productUtils.searchProducts(allProducts, searchQuery);
      setSearchResults(results.slice(0, 8));
      setSelectedIndex(-1);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allProducts]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const maxIndex = searchResults.length - 1;
      setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const maxIndex = searchResults.length - 1;
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(searchResults[selectedIndex]);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveToRecentSearches(searchQuery.trim());
    }
  };

  // Handle result click
  const handleResultClick = (product) => {
    saveToRecentSearches(searchQuery);
    navigate(`/products/${product.category}/${product.id}`);
    onClose();
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Quick search suggestions
  const quickSearchTerms = [
    'Strawberries',
    'Premium Mangoes',
    'Vegetables',
    'Sweet Potato',
    'Garlic Bulbs',
    'Onions',
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] backdrop-blur-lg"
          style={{
            backgroundColor: 'var(--color-bg-overlay)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute top-0 left-0 right-0 backdrop-blur-2xl border-b shadow-2xl max-h-[80vh] overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: 'var(--shadow-2xl)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto px-4 py-6">
              {/* Search Input */}
              <form onSubmit={handleSearch} className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products, markets, and more..."
                  className="w-full pl-14 pr-12 py-4 text-xl bg-transparent border-none focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400"
                  style={{
                    color: 'var(--color-text-primary)',
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 transition-colors duration-200"
                    style={{
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 transition-colors duration-200"
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </form>

              {/* Search Content */}
              <div
                ref={resultsRef}
                className="border-t mt-4 pt-4 max-h-[60vh] overflow-y-auto"
                style={{
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                {searchQuery ? (
                  // Search Results
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p
                        className="text-sm font-semibold uppercase tracking-wider"
                        style={{
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {isLoading
                          ? 'Searching...'
                          : `Search Results (${searchResults.length})`}
                      </p>
                      {searchResults.length > 0 && (
                        <span
                          className="text-xs"
                          style={{
                            color: 'var(--color-text-tertiary)',
                          }}
                        >
                          ↑↓ to navigate • Enter to select
                        </span>
                      )}
                    </div>

                    {isLoading ? (
                      // Loading State
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-3 p-3 rounded-xl animate-pulse"
                            style={{
                              backgroundColor: 'var(--color-bg-secondary)',
                            }}
                          >
                            <div
                              className="w-12 h-12 rounded-lg"
                              style={{
                                backgroundColor: 'var(--color-bg-tertiary)',
                              }}
                            />
                            <div className="flex-1 space-y-2">
                              <div
                                className="h-4 rounded"
                                style={{
                                  backgroundColor: 'var(--color-bg-tertiary)',
                                }}
                              />
                              <div
                                className="h-3 rounded w-2/3"
                                style={{
                                  backgroundColor: 'var(--color-bg-tertiary)',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : searchResults.length > 0 ? (
                      // Search Results List
                      <div className="space-y-2">
                        {searchResults.map((product, index) => (
                          <motion.button
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 text-left ${
                              selectedIndex === index
                                ? 'scale-[1.02] shadow-lg'
                                : ''
                            }`}
                            style={{
                              backgroundColor:
                                selectedIndex === index
                                  ? 'var(--color-bg-secondary)'
                                  : 'transparent',
                              border:
                                selectedIndex === index
                                  ? '1px solid var(--color-primary-200)'
                                  : '1px solid transparent',
                            }}
                            onClick={() => handleResultClick(product)}
                            onMouseEnter={() => setSelectedIndex(index)}
                          >
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: 'var(--color-primary-50)',
                              }}
                            >
                              <Package
                                className="w-6 h-6"
                                style={{
                                  color: 'var(--color-primary)',
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                className="font-semibold truncate"
                                style={{
                                  color: 'var(--color-text-primary)',
                                }}
                              >
                                {product.name}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span
                                  className="text-xs px-2 py-1 rounded-full capitalize"
                                  style={{
                                    backgroundColor: 'var(--color-primary-50)',
                                    color: 'var(--color-primary)',
                                  }}
                                >
                                  {product.category}
                                </span>
                                {product.categoryType === 'featured' && (
                                  <span
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{
                                      backgroundColor:
                                        'var(--color-warning-50)',
                                      color: 'var(--color-warning)',
                                    }}
                                  >
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p
                                className="text-sm truncate mt-1"
                                style={{
                                  color: 'var(--color-text-tertiary)',
                                }}
                              >
                                {product.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                {product.priceRange && (
                                  <span
                                    className="text-sm font-medium"
                                    style={{
                                      color: 'var(--color-primary)',
                                    }}
                                  >
                                    {productUtils.formatPrice(
                                      product.priceRange
                                    )}
                                  </span>
                                )}
                                {product.seasons && (
                                  <span
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{
                                      backgroundColor:
                                        productUtils.isProductAvailable(product)
                                          ? 'var(--color-success-50)'
                                          : 'var(--color-warning-50)',
                                      color: productUtils.isProductAvailable(
                                        product
                                      )
                                        ? 'var(--color-success)'
                                        : 'var(--color-warning)',
                                    }}
                                  >
                                    {productUtils.isProductAvailable(product)
                                      ? 'Available'
                                      : 'Seasonal'}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              style={{
                                color: 'var(--color-primary)',
                              }}
                            >
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      // No Results State
                      <div className="text-center py-8">
                        <Search
                          className="w-12 h-12 mx-auto mb-4"
                          style={{
                            color: 'var(--color-text-muted)',
                          }}
                        />
                        <p
                          className="text-lg font-medium mb-2"
                          style={{
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          No products found
                        </p>
                        <p
                          className="text-sm"
                          style={{
                            color: 'var(--color-text-tertiary)',
                          }}
                        >
                          Try different keywords or browse our categories
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Default State - Recent Searches & Quick Links
                  <div className="space-y-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p
                            className="text-sm font-semibold uppercase tracking-wider"
                            style={{
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            Recent Searches
                          </p>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs hover:underline transition-colors duration-200"
                            style={{
                              color: 'var(--color-text-tertiary)',
                            }}
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchQuery(term)}
                              className="flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 group/recent"
                              style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text-secondary)',
                              }}
                            >
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{term}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Search Suggestions */}
                    <div className="space-y-3">
                      <p
                        className="text-sm font-semibold uppercase tracking-wider"
                        style={{
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        Popular Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {quickSearchTerms.map((term, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(term)}
                            className="flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 group/popular"
                            style={{
                              backgroundColor: 'var(--color-bg-secondary)',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">{term}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                      <p
                        className="text-sm font-semibold uppercase tracking-wider"
                        style={{
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        Quick Links
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {navigation
                          .flatMap((item) =>
                            item.dropdown ? item.dropdown.slice(0, 2) : [item]
                          )
                          .slice(0, 6)
                          .map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group/suggestion"
                                style={{
                                  backgroundColor: 'transparent',
                                }}
                                onClick={onClose}
                              >
                                <IconComponent
                                  className="w-5 h-5"
                                  style={{
                                    color: 'var(--color-primary)',
                                  }}
                                />
                                <span
                                  className="text-sm font-medium transition-colors duration-200"
                                  style={{
                                    color: 'var(--color-text-secondary)',
                                  }}
                                >
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
