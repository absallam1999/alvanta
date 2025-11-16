import { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import {
  Search,
  ArrowRight,
  ChevronRight,
  Leaf,
  Wheat,
  MapPin,
  Shield,
  Globe,
  Users,
  Mail,
  Package,
  Apple,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useAllCategories } from '../../hooks/useProducts';
import { productUtils } from '../../utils/productUtils';

// Tilt Card
const AgricultureCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
      }}
      className={`w-full ${className}`}
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Product Card
const ProductCard = ({ product, category }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  // Category-based icons
  const categoryIcons = {
    Vegetables: Leaf,
    Fruits: Apple,
    Crops: Wheat,
  };

  const IconComponent = categoryIcons[category] || Leaf;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <AgricultureCard>
        <Card
          className="p-6 border border-border/50 h-full flex flex-col overflow-hidden relative"
          style={{
            background: 'var(--color-bg-primary)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 via-green-500/15 to-emerald-500/10 opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Animated Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-transparent"
            animate={{
              boxShadow: isHovered
                ? '0 0 0 1px rgba(16, 185, 129, 0.2), 0 0 20px rgba(16, 185, 129, 0.1)'
                : '0 0 0 0px rgba(16, 185, 129, 0)',
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Product Image */}
          <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 aspect-square group/image">
            {product.image ? (
              <div className="absolute inset-0">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    rotate: isHovered ? 0.5 : 0,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-green-200 dark:from-emerald-800 dark:to-green-800"
                animate={{
                  background: isHovered
                    ? 'linear-gradient(135deg, var(--color-emerald-300), var(--color-green-300))'
                    : 'linear-gradient(135deg, var(--color-emerald-200), var(--color-green-200))',
                }}
                transition={{ duration: 0.4 }}
              />
            )}

            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
              animate={{ opacity: isHovered ? 0.2 : 0.6 }}
              transition={{ duration: 0.4 }}
            />

            {/* Animated Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: isHovered ? ['0%', '100%'] : '0%',
                opacity: isHovered ? [0, 0.4, 0] : 0,
              }}
              transition={{
                x: { duration: 1, ease: 'easeInOut' },
                opacity: { duration: 1, ease: 'easeInOut' },
              }}
            />

            {/* Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-2xl"
                animate={{
                  opacity: isHovered ? 0 : 1,
                  backgroundColor: isHovered
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(255, 255, 255, 0.2)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    background: isHovered
                      ? 'linear-gradient(135deg, var(--color-emerald-600), var(--color-green-700))'
                      : 'linear-gradient(135deg, var(--color-emerald-500), var(--color-green-600))',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div>
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Status Badges */}
            <div className="absolute top-3 left-3">
              <motion.div
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Badge className="bg-white/90 backdrop-blur-sm text-emerald-700 dark:bg-black/50 dark:text-emerald-300 border-0 text-xs font-medium shadow-lg">
                  {category}
                </Badge>
              </motion.div>
            </div>

            {/* Season Indicator */}
            <div className="absolute top-3 right-3">
              <motion.div
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Badge
                  className={`${
                    productUtils.isProductAvailable(product)
                      ? 'bg-green-500/90 text-white'
                      : 'bg-amber-500/90 text-white'
                  } backdrop-blur-sm border-0 text-xs font-medium shadow-lg`}
                >
                  {productUtils.isProductAvailable(product)
                    ? 'In Season'
                    : 'Out of Season'}
                </Badge>
              </motion.div>
            </div>

            {/* Quick Action Overlay */}
            <motion.div
              className="absolute bottom-3 left-3 right-3"
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Badge className="bg-black/70 text-white backdrop-blur-sm border-0 text-xs w-full justify-center py-2">
                <Link to={`/products/${category.toLowerCase()}/${product.id}`}>
                  Click for Details
                </Link>
              </Badge>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="flex-grow relative z-10">
            <motion.div
              animate={{ y: isHovered ? -3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="font-bold text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 line-clamp-1"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {product.name}
                </h3>
              </div>

              <motion.p
                className="text-sm mb-3 line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300"
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                style={{ color: 'var(--color-text-muted)' }}
              >
                {product.description}
              </motion.p>
            </motion.div>

            {/* Variety */}
            {product.variety && (
              <motion.p
                className="text-xs text-emerald-600 dark:text-emerald-400 mb-3 line-clamp-1 font-medium"
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                Variety: {product.variety}
              </motion.p>
            )}

            {/* Specifications Summary */}
            <motion.div
              className="flex items-center justify-between text-xs mb-4"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              style={{ color: 'var(--color-text-muted)' }}
            >
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{product.origin?.split(',')[0] || 'Global'}</span>
              </div>
              {product.specifications?.packaging && (
                <div className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  <span className="max-w-[80px] truncate">
                    {Array.isArray(product.specifications.packaging)
                      ? product.specifications.packaging[0]
                      : product.specifications.packaging}
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Action Button */}
          <motion.div
            animate={{ y: isHovered ? -3 : 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Button
              asChild
              variant="outline"
              className="w-full group/btn relative z-10 backdrop-blur-sm transition-all duration-300"
              style={{
                background: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              <Link to={`/products/${category.toLowerCase()}/${product.id}`}>
                <motion.span
                  animate={{ x: isHovered ? 2 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  View Details
                </motion.span>
                <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </Card>
      </AgricultureCard>
    </motion.div>
  );
};

// Search Bar
const SearchBar = ({ onSearch, searchQuery, searchResults, onResultClick }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleResultClick = (product, category) => {
    onResultClick?.(product, category);
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10 transition-colors duration-200"
          style={{
            color: isFocused
              ? 'var(--color-primary-600)'
              : 'var(--color-primary-500)',
          }}
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for products, varieties..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="transition-all duration-200 focus:ring-2 focus:ring-primary-200"
          style={{
            padding: '1rem 3.5rem 1rem 3rem',
            borderColor: isFocused
              ? 'var(--color-primary-300)'
              : 'var(--color-border-primary)',
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            borderRadius: '12px',
            fontSize: '0.95rem',
            boxShadow: isFocused ? '0 0 0 3px var(--color-primary-50)' : 'none',
          }}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
          <Badge
            variant="secondary"
            className={`text-xs py-1 px-2 transition-all duration-200 ${
              searchQuery
                ? 'bg-green-50 border-green-200 text-green-600 animate-pulse'
                : isFocused
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'opacity-0'
            }`}
          >
            {searchQuery ? 'Searching...' : 'Ready'}
          </Badge>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isFocused && searchQuery && searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-2 rounded-xl shadow-2xl backdrop-blur-sm"
          style={{
            background: 'var(--color-bg-primary)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          {/* Scrollable Results Container */}
          <div
            className="max-h-80 overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--color-primary) var(--color-bg-secondary)',
            }}
          >
            <div className="p-2">
              {searchResults.map(({ product, category }, index) => (
                <motion.div
                  key={`${product.id}-${category}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleResultClick(product, category)}
                    className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 group border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                    style={{
                      background: 'transparent',
                      borderColor: 'var(--color-border-primary)',
                    }}
                  >
                    {/* Product Image with Fallback */}
                    <div
                      className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 flex items-center justify-center flex-shrink-0 overflow-hidden"
                      style={{ borderColor: 'var(--color-border-primary)' }}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to icon
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {/* Fallback Icon */}
                      <div
                        className={`w-full h-full flex items-center justify-center ${product.image ? 'hidden' : 'flex'}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                          <Leaf className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-medium truncate transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {product.name}
                      </div>
                      <div className="text-sm flex items-center gap-2 mt-1">
                        <span className="truncate bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs">
                          {category}
                        </span>
                        {product.variety && (
                          <>
                            <span style={{ color: 'var(--color-text-muted)' }}>
                              •
                            </span>
                            <span
                              className="truncate"
                              style={{ color: 'var(--color-text-muted)' }}
                            >
                              {product.variety}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <ChevronRight
                      className="w-4 h-4 flex-shrink-0 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                      style={{ color: 'var(--color-text-muted)' }}
                    />
                  </button>

                  {/* Separator */}
                  {index < searchResults.length - 1 && (
                    <div
                      className="mx-3 my-1 border-b"
                      style={{ borderColor: 'var(--color-border-primary)' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer with search info */}
          <div
            className="border-t px-4 py-2 rounded-b-xl"
            style={{
              borderColor: 'var(--color-border-primary)',
              background: 'var(--color-bg-secondary)',
            }}
          >
            <div
              className="text-xs text-center"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Found {searchResults.length} product
              {searchResults.length !== 1 ? 's' : ''}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Category Section
const CategorySection = ({ categoryData, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Get products
  const displayProducts = useMemo(() => {
    if (!categoryData.products) return [];

    const featuredProducts = productUtils.getFeaturedProducts(categoryData);
    const nonFeaturedProducts = categoryData.products.filter(
      (product) =>
        !featuredProducts.some((featured) => featured.id === product.id)
    );

    const selectedFeatured = featuredProducts.slice(0, 2);
    const selectedNonFeatured = nonFeaturedProducts.slice(0, 2);

    return [...selectedFeatured, ...selectedNonFeatured].slice(0, 4);
  }, [categoryData]);

  // Unique icons
  const categoryIcons = {
    Vegetables: Leaf,
    Fruits: Apple,
    Crops: Wheat,
  };

  const IconComponent = categoryIcons[categoryData.category] || Leaf;

  return (
    <section
      ref={ref}
      className={`py-16 lg:py-24 ${index % 2 === 0 ? '' : ''}`}
      style={{
        background:
          index % 2 === 0
            ? 'var(--color-bg-primary)'
            : 'var(--color-bg-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
              style={{ background: 'var(--color-primary-50)' }}
            >
              <IconComponent
                className="w-6 h-6"
                style={{ color: 'var(--color-primary)' }}
              />
            </motion.div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {categoryData.category}
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {categoryData.description}
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-8"
        >
          {displayProducts.map((product, productIndex) => (
            <ProductCard
              key={product.id}
              product={product}
              category={categoryData.category}
              index={productIndex}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group backdrop-blur-sm transition-all duration-300"
            style={{
              background: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <Link to={`/products/${categoryData.category.toLowerCase()}`}>
              View All {categoryData.category}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default function ProductsPage() {
  useEffect(() => {
    document.title = 'Products - Alvanta';
  }, []);

  const { scrollYProgress } = useScroll();
  const { data, loading, error } = useAllCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // search with results
  const filteredData = useMemo(() => {
    if (!data || !searchQuery) {
      setSearchResults([]);
      return data;
    }

    const filtered = { ...data };
    const allResults = [];

    Object.keys(filtered).forEach((category) => {
      const categoryData = filtered[category];
      if (categoryData.products) {
        const categoryResults = productUtils.searchProducts(
          categoryData.products,
          searchQuery
        );
        filtered[category] = {
          ...categoryData,
          products: categoryResults,
          featured: productUtils.searchProducts(
            categoryData.featured || [],
            searchQuery
          ),
        };

        // Add to global search results
        categoryResults.forEach((product) => {
          allResults.push({ product, category });
        });
      }
    });

    setSearchResults(allResults.slice(0, 10)); // Limit to 10 results
    return filtered;
  }, [data, searchQuery]);

  const handleSearchResultClick = (product, category) => {
    const productUrl = `/products/${category.toLowerCase()}/${product.id}`;
    window.location.href = productUrl;
  };

  const stats = [
    { number: '20+', label: 'Product Varieties', icon: Leaf },
    { number: '12+', label: 'Countries Served', icon: Globe },
    { number: '2000+', label: 'Partner Farms', icon: Users },
    { number: '100%', label: 'Quality Guarantee', icon: Shield },
  ];

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Error Loading Products
          </h2>
          <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
            {error}
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 z-50 bg-gradient-to-r from-emerald-500 to-green-500"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
        }}
      />

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden p-12"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge
              className="mt-6 px-4 py-2"
              style={{
                background: 'var(--color-primary-50)',
                color: 'var(--color-primary-700)',
                borderColor: 'var(--color-primary-200)',
              }}
            >
              <Package className="w-4 h-4 mr-2" />
              Premium Agricultural Products
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Discover Our
            <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-transparent">
              Agricultural Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Explore our comprehensive range of premium vegetables, fruits, and
            specialty crops sourced from sustainable farms worldwide.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <SearchBar
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
              searchResults={searchResults}
              onResultClick={handleSearchResultClick}
            />
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300"
                style={{
                  background: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <div className="text-emerald-600 dark:text-emerald-400 mb-2 flex justify-center">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  {stat.number}
                </div>
                <div
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <div>
        {filteredData &&
          Object.values(filteredData).map((categoryData, index) => (
            <CategorySection
              key={categoryData.category}
              categoryData={categoryData}
              index={index}
            />
          ))}
      </div>

      {/* SEARCH RESULTS EMPTY STATE */}
      {searchQuery &&
        filteredData &&
        Object.values(filteredData).every(
          (category) =>
            category.products.length === 0 &&
            (!category.featured || category.featured.length === 0)
        ) && (
          <section
            className="py-20"
            style={{ background: 'var(--color-bg-secondary)' }}
          >
            <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-bg-muted)' }}
                >
                  <Search
                    className="w-10 h-10"
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  No products found
                </h3>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  We couldn't find any products matching "{searchQuery}". Try
                  searching with different terms.
                </p>
                <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
              </motion.div>
            </div>
          </section>
        )}

      {/* CTA SECTION */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Source Premium Products?
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join hundreds of satisfied partners who trust Alvanta for consistent
            quality, reliable supply, and sustainable agricultural products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 border-0 group"
            >
              <Link to="/quote">
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 group"
            >
              <Link to="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Our Team
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          >
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-emerald-100 text-sm">Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">48h</div>
              <div className="text-emerald-100 text-sm">Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-emerald-100 text-sm">Quality Guarantee</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Global</div>
              <div className="text-emerald-100 text-sm">Delivery</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
