import { useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useInView } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Package,
  Calendar,
  Leaf,
  Wheat,
  Home,
  Sparkles,
  Apple,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Sun,
  Snowflake,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useProducts } from '../../hooks/useProducts';
import { productUtils } from '../../utils/productUtils';

// Tilt Card with improved dark mode
const AgricultureCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Breadcrumb
const Breadcrumb = ({ category, className = '' }) => {
  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      description: 'Return to homepage',
    },
    {
      label: 'Products',
      href: '/products',
      icon: Package,
      description: 'Browse all products',
    },
    {
      label: category,
      href: '#',
      isCurrent: true,
      description: 'Current category',
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-8 ${className}`}
      aria-label="Breadcrumb"
    >
      <div
        className="flex items-center gap-2 p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300"
        style={{
          background: 'var(--color-bg-primary)',
          borderColor: 'var(--color-border-primary)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {breadcrumbItems.map((item, index) => (
          <div key={item.label} className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2"
            >
              {item.isCurrent ? (
                <span
                  className="flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg transition-all duration-300"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'var(--color-primary-foreground)',
                  }}
                  aria-current="page"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span className="font-medium capitalize text-sm">
                    {item.label}
                  </span>
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 group"
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                  title={item.description}
                >
                  {item.icon && (
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  )}
                  <span
                    className="font-medium text-sm group-hover:translate-x-0.5 transition-transform group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {item.label}
                  </span>
                </Link>
              )}
            </motion.div>

            {index < breadcrumbItems.length - 1 && (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ChevronRight
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: 'var(--color-text-muted)' }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
};

// Product Card
const ProductCard = ({ product, category, viewMode = 'grid' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isListView = viewMode === 'list';

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
      whileHover={{ y: isListView ? -2 : -8 }}
      className="group"
    >
      <AgricultureCard>
        <Card
          className={`hover:shadow-xl transition-all duration-300 flex ${
            isListView
              ? 'p-4 flex-row items-center gap-4 h-32'
              : 'p-6 flex-col h-full'
          }`}
          style={{
            background: 'var(--color-bg-primary)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Product Image */}
          <div
            className={`
            relative overflow-hidden flex items-center justify-center
            ${
              isListView
                ? 'w-24 h-24 rounded-lg flex-shrink-0'
                : 'aspect-square rounded-xl mb-4'
            }
          `}
            style={{
              background: 'var(--gradient-primary-subtle)',
            }}
          >
            {product.image ? (
              <div className="absolute inset-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div
                className={`
                rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center
                ${isListView ? 'w-12 h-12' : 'w-16 h-16'}
              `}
              >
                <IconComponent
                  className={
                    isListView ? 'w-6 h-6 text-white' : 'w-8 h-8 text-white'
                  }
                />
              </div>
            )}

            {/* Availability Badge */}
            <div
              className={`absolute ${
                isListView ? 'top-2 left-2' : 'top-3 left-3'
              }`}
            >
              <Badge
                className={`
    ${
      productUtils.isInSeason(product)
        ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
        : 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
    } ${isListView ? 'text-xs' : ''}
  `}
              >
                {productUtils.getSeasonStatus(product).status}
              </Badge>
            </div>

            {/* Featured Badge */}
            {product.featured && (
              <div
                className={`absolute ${
                  isListView ? 'top-2 right-2' : 'top-3 right-3'
                }`}
              >
                <Badge
                  className={isListView ? 'text-xs' : ''}
                  style={{
                    background: 'var(--color-primary-50)',
                    color: 'var(--color-primary-700)',
                    borderColor: 'var(--color-primary-200)',
                  }}
                >
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div
            className={`flex-grow ${
              isListView
                ? 'flex items-center justify-between flex-1 min-w-0'
                : ''
            }`}
          >
            <div className={isListView ? 'flex-1 min-w-0 pr-4' : ''}>
              <div
                className={`flex items-start justify-between ${
                  isListView ? 'mb-1' : 'mb-2'
                }`}
              >
                <h3
                  className={`
                  font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 
                  transition-colors line-clamp-1
                  ${isListView ? 'text-lg' : 'text-lg'}
                `}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {product.name}
                </h3>
              </div>

              {product.variety && (
                <p
                  className={`
                  text-emerald-600 dark:text-emerald-400
                  ${isListView ? 'text-sm mb-1' : 'text-sm mb-2'}
                `}
                >
                  {product.variety}
                </p>
              )}

              <p
                className={`
                leading-relaxed
                ${
                  isListView
                    ? 'text-sm line-clamp-2 mb-2'
                    : 'text-sm line-clamp-2 mb-4'
                }
              `}
                style={{ color: 'var(--color-text-muted)' }}
              >
                {product.description}
              </p>

              {/* Key Details */}
              <div
                className={`
                ${
                  isListView ? 'flex items-center gap-4 mb-2' : 'space-y-2 mb-4'
                }
              `}
              >
                <div
                  className={`flex items-center gap-1 text-xs ${
                    isListView ? 'flex-shrink-0' : ''
                  }`}
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{product.origin?.split(',')[0] || 'Global'}</span>
                </div>

                <div
                  className={`flex items-center gap-1 text-xs ${
                    isListView ? 'flex-shrink-0' : ''
                  }`}
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <Package className="w-3 h-3" />
                  <span>
                    {product.specifications?.packaging?.[0]?.split(' ')[0] ||
                      'Bulk'}{' '}
                    kg/cartons
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1 text-xs ${
                    isListView ? 'flex-shrink-0' : ''
                  }`}
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <Clock className="w-3 h-3" />
                  <span>{product.specifications?.shelfLife || 'Contact'}</span>
                </div>

                {!isListView && (
                  <div
                    className="flex items-center gap-1 text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>{product.seasons?.peak?.[0] || 'Year-round'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className={isListView ? 'flex-shrink-0' : ''}>
              <Button
                asChild
                variant="outline"
                className={`
                group/btn hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 ${
                  isListView ? 'w-32' : 'w-full'
                }
              `}
                style={{
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Link to={`/products/${category.toLowerCase()}/${product.id}`}>
                  View Details
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </AgricultureCard>
    </motion.div>
  );
};

// Pagination with improved dark mode
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between ${className}`}
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2"
        style={{
          borderColor: 'var(--color-border-primary)',
          color: 'var(--color-text-primary)',
        }}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all border
              ${
                currentPage === page
                  ? 'shadow-lg'
                  : 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 dark:hover:border-emerald-700'
              }
            `}
            style={{
              background:
                currentPage === page
                  ? 'var(--gradient-primary)'
                  : 'transparent',
              color:
                currentPage === page
                  ? 'var(--color-primary-foreground)'
                  : 'var(--color-text-primary)',
              borderColor:
                currentPage === page
                  ? 'var(--color-primary)'
                  : 'var(--color-border-primary)',
            }}
          >
            {page}
          </button>
        ))}

        {/* Ellipsis */}
        {totalPages > maxVisiblePages &&
          currentPage < totalPages - Math.floor(maxVisiblePages / 2) && (
            <span className="px-2" style={{ color: 'var(--color-text-muted)' }}>
              ...
            </span>
          )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2"
        style={{
          borderColor: 'var(--color-border-primary)',
          color: 'var(--color-text-primary)',
        }}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

const FilterSummary = ({ filters, onFilterChange, className = '' }) => {
  const activeFilters = [
    ...filters.season.map(
      (season) => `Season: ${season.replace('-', ' ').toUpperCase()}`
    ),
    ...filters.origin.map((origin) => `Origin: ${origin.toUpperCase()}`),
  ];

  if (activeFilters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-wrap gap-2 mb-4 ${className}`}
    >
      {activeFilters.map((filter, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => {
            const [type, value] = filter.split(': ');
            const filterType = type.toLowerCase();
            const filterValue = value.toLowerCase().replace(' ', '-');
            onFilterChange(filterType, filterValue, false);
          }}
          style={{
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-primary)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          {filter}
          <span className="ml-1 text-xs">×</span>
        </Badge>
      ))}
    </motion.div>
  );
};

// Results Info
const ResultsInfo = ({
  currentPage,
  pageSize,
  totalProducts,
  viewMode,
  className = '',
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalProducts);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center gap-4 text-sm ${className}`}
      style={{ color: 'var(--color-text-muted)' }}
    >
      <div>
        Showing{' '}
        <span style={{ color: 'var(--color-text-primary)' }}>
          {startItem}-{endItem}
        </span>{' '}
        of{' '}
        <span style={{ color: 'var(--color-text-primary)' }}>
          {totalProducts}
        </span>{' '}
        products
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            viewMode === 'grid'
              ? 'bg-emerald-500'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
        />
        <span className="text-xs">Grid View</span>

        <div
          className={`w-2 h-2 rounded-full ${
            viewMode === 'list'
              ? 'bg-emerald-500'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
        />
        <span className="text-xs">List View</span>
      </div>
    </motion.div>
  );
};

// FilterSidebar component
const FilterSidebar = ({ filters, onFilterChange, category, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    season: true,
    origin: true,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Generate season options from actual product data
  const seasonOptions = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    const seasons = {};

    products.forEach((product) => {
      if (product.seasons) {
        const { peak, available } = product.seasons;

        // Count year-round products
        if (available?.toLowerCase() === 'year-round') {
          seasons['year-round'] = (seasons['year-round'] || 0) + 1;
        }

        // Count seasonal products
        if (peak && Array.isArray(peak)) {
          peak.forEach((season) => {
            const normalizedSeason = season.toLowerCase();
            seasons[normalizedSeason] = (seasons[normalizedSeason] || 0) + 1;
          });
        }

        // Count in-season products
        if (productUtils.isInSeason(product)) {
          seasons['in-season'] = (seasons['in-season'] || 0) + 1;
        }
      }
    });

    return [
      {
        value: 'in-season',
        label: 'In Season Now',
        count: seasons['in-season'] || 0,
        description: 'Currently available products',
        icon: Sparkles,
      },
      {
        value: 'year-round',
        label: 'Year Round',
        count: seasons['year-round'] || 0,
        description: 'Available throughout the year',
        icon: Calendar,
      },
      {
        value: 'spring',
        label: 'Spring',
        count: seasons['spring'] || 0,
        description: 'March - May',
        icon: Leaf,
      },
      {
        value: 'summer',
        label: 'Summer',
        count: seasons['summer'] || 0,
        description: 'June - August',
        icon: Sun,
      },
      {
        value: 'fall',
        label: 'Fall',
        count: seasons['fall'] || 0,
        description: 'September - November',
        icon: Wheat,
      },
      {
        value: 'winter',
        label: 'Winter',
        count: seasons['winter'] || 0,
        description: 'December - February',
        icon: Snowflake,
      },
    ].filter((option) => option.count > 0);
  }, [products]);

  // Generate origin options from actual product data
  const originOptions = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    const origins = {};

    products.forEach((product) => {
      if (product.origin) {
        const originList = product.origin.split(',').map((o) => o.trim());
        originList.forEach((origin) => {
          if (origin) {
            origins[origin] = (origins[origin] || 0) + 1;
          }
        });
      }
    });

    return Object.entries(origins)
      .map(([origin, count]) => ({
        value: origin.toLowerCase(),
        label: origin,
        count,
        description: `${count} product${count !== 1 ? 's' : ''} available`,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [products]);

  // Calculate active filter counts
  const activeFilterCount = filters.season.length + filters.origin.length;

  // Clear all filters
  const handleClearAll = () => {
    onFilterChange('clear');
  };

  // Clear specific filter section
  const handleClearSection = (section) => {
    onFilterChange(section, 'clear');
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full justify-between"
          style={{
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-primary)',
            background: 'var(--color-bg-primary)',
          }}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
            {activeFilterCount > 0 && (
              <Badge className="ml-1 bg-emerald-500 text-white border-0 text-xs min-w-[20px] h-5 flex items-center justify-center">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </div>

      {/* Filter Sidebar - Fixed desktop styling */}
      <div
        className={`
        ${isOpen ? 'block' : 'hidden'} 
        lg:block
      `}
      >
        <div className="space-y-6 lg:sticky lg:top-24">
          {/* Filters Card */}
          <Card
            className="p-6"
            style={{
              background: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3
                className="font-semibold text-lg flex items-center gap-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <Filter className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
                  >
                    {activeFilterCount} active
                  </Badge>
                )}
              </h3>

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-8 px-3 text-xs hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:text-red-400"
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Season Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => toggleSection('season')}
                  className="flex items-center gap-2 group w-full text-left"
                >
                  <h4
                    className="font-medium text-sm uppercase tracking-wide flex items-center gap-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <Calendar className="w-4 h-4" />
                    Season
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                      expandedSections.season ? 'rotate-0' : '-rotate-90'
                    }`}
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                </button>

                {filters.season.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleClearSection('season')}
                    className="h-6 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>

              <div
                className={`space-y-2 ${expandedSections.season ? 'block' : 'hidden'}`}
              >
                {seasonOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = filters.season.includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className={`
                        flex items-start gap-3 cursor-pointer group p-3 rounded-lg transition-all duration-200 border
                        ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                            : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/20'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="relative mt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) =>
                              onFilterChange(
                                'season',
                                option.value,
                                e.target.checked
                              )
                            }
                            className="sr-only"
                          />
                          <div
                            className={`
                            w-4 h-4 rounded border flex items-center justify-center transition-all duration-200
                            ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-emerald-300'
                            }
                          `}
                          >
                            {isSelected && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {IconComponent && (
                              <IconComponent className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                            )}
                            <span
                              className={`text-sm font-medium transition-colors ${
                                isSelected
                                  ? 'text-emerald-700 dark:text-emerald-300'
                                  : 'text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                              }`}
                            >
                              {option.label}
                            </span>
                          </div>

                          {option.description && (
                            <p
                              className="text-xs"
                              style={{ color: 'var(--color-text-muted)' }}
                            >
                              {option.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs flex-shrink-0 px-2 py-1"
                        style={{
                          background: isSelected
                            ? 'var(--color-primary-100)'
                            : 'var(--color-bg-secondary)',
                          color: isSelected
                            ? 'var(--color-primary-700)'
                            : 'var(--color-text-muted)',
                          borderColor: isSelected
                            ? 'var(--color-primary-200)'
                            : 'var(--color-border-primary)',
                        }}
                      >
                        {option.count}
                      </Badge>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Origin Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => toggleSection('origin')}
                  className="flex items-center gap-2 group w-full text-left"
                >
                  <h4
                    className="font-medium text-sm uppercase tracking-wide flex items-center gap-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <MapPin className="w-4 h-4" />
                    Origin
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                      expandedSections.origin ? 'rotate-0' : '-rotate-90'
                    }`}
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                </button>

                {filters.origin.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleClearSection('origin')}
                    className="h-6 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>

              <div
                className={`space-y-2 ${expandedSections.origin ? 'block' : 'hidden'}`}
              >
                {originOptions.map((option) => {
                  const isSelected = filters.origin.includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className={`
                        flex items-start gap-3 cursor-pointer group p-3 rounded-lg transition-all duration-200 border
                        ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                            : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/20'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="relative mt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) =>
                              onFilterChange(
                                'origin',
                                option.value,
                                e.target.checked
                              )
                            }
                            className="sr-only"
                          />
                          <div
                            className={`
                            w-4 h-4 rounded border flex items-center justify-center transition-all duration-200
                            ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-emerald-300'
                            }
                          `}
                          >
                            {isSelected && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-sm font-medium transition-colors block mb-1 ${
                              isSelected
                                ? 'text-emerald-700 dark:text-emerald-300'
                                : 'text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                            }`}
                          >
                            {option.label}
                          </span>

                          {option.description && (
                            <p
                              className="text-xs"
                              style={{ color: 'var(--color-text-muted)' }}
                            >
                              {option.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs flex-shrink-0 px-2 py-1"
                        style={{
                          background: isSelected
                            ? 'var(--color-primary-100)'
                            : 'var(--color-bg-secondary)',
                          color: isSelected
                            ? 'var(--color-primary-700)'
                            : 'var(--color-text-muted)',
                          borderColor: isSelected
                            ? 'var(--color-primary-200)'
                            : 'var(--color-border-primary)',
                        }}
                      >
                        {option.count}
                      </Badge>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              className="w-full"
              style={{
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
                background: 'var(--color-bg-primary)',
              }}
              onClick={handleClearAll}
              disabled={activeFilterCount === 0}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset All Filters
            </Button>
          </Card>

          {/* Category Stats Card */}
          <Card
            className="p-6"
            style={{
              background: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3
              className="font-semibold text-lg mb-4 flex items-center gap-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Category Overview
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: 'Total Products',
                  value: products?.length || 0,
                  color: 'var(--color-text-primary)',
                  icon: Package,
                },
                {
                  label: 'In Season',
                  value:
                    products?.filter((p) => productUtils.isInSeason(p))
                      .length || 0,
                  color: 'var(--color-success)',
                  icon: Sparkles,
                },
                {
                  label: 'Year-Round',
                  value:
                    products?.filter(
                      (p) =>
                        p.seasons?.available?.toLowerCase() === 'year-round'
                    ).length || 0,
                  color: 'var(--color-primary)',
                  icon: Calendar,
                },
                {
                  label: 'Countries',
                  value: new Set(
                    products?.flatMap(
                      (p) => p.origin?.split(',').map((o) => o.trim()) || []
                    )
                  ).size,
                  color: 'var(--color-text-primary)',
                  icon: MapPin,
                },
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent
                        className="w-4 h-4"
                        style={{ color: stat.color }}
                      />
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-medium" style={{ color: stat.color }}>
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

// Search and Sort Bar with improved dark mode
const SearchSortBar = ({
  searchQuery,
  onSearch,
  sortBy,
  onSort,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-6">
      {/* Search */}
      <div className="relative w-full lg:w-64">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
          style={{ color: 'var(--color-text-muted)' }}
        />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-4 focus:border-emerald-500 focus:ring-emerald-500"
          style={{
            background: 'var(--color-bg-primary)',
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>

      {/* View Controls */}
      <div className="flex items-center gap-3 w-full lg:w-auto">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSort(e.target.value)}
            className="appearance-none rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            style={{
              background: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-text-primary)',
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="season">Sort by Season Availability</option>
            <option value="peak-season">Peak Season First</option>
            <option value="year-round">Year-Round First</option>
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: 'var(--color-text-muted)' }}
          />
        </div>

        {/* View Mode Toggle */}
        <div
          className="flex border rounded-lg p-1"
          style={{
            borderColor: 'var(--color-border-primary)',
            background: 'var(--color-bg-secondary)',
          }}
        >
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="h-8 w-8 p-0"
            style={
              viewMode === 'grid'
                ? {
                    background: 'var(--gradient-primary)',
                    color: 'var(--color-primary-foreground)',
                  }
                : {
                    color: 'var(--color-text-primary)',
                  }
            }
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="h-8 w-8 p-0"
            style={
              viewMode === 'list'
                ? {
                    background: 'var(--gradient-primary)',
                    color: 'var(--color-primary-foreground)',
                  }
                : {
                    color: 'var(--color-text-primary)',
                  }
            }
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CategoryPage() {
  const { scrollYProgress } = useScroll();
  const { category } = useParams();
  const { data, loading, error } = useProducts(category);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    season: [],
    origin: [],
    availability: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    let filtered = [...data.products];

    // Search filter
    if (searchQuery) {
      filtered = productUtils.searchProducts(filtered, searchQuery);
    }

    // Season filter - ENHANCED LOGIC
    if (filters.season.length > 0) {
      filtered = filtered.filter((product) => {
        return filters.season.some((seasonFilter) => {
          switch (seasonFilter) {
            case 'in-season':
              return productUtils.isInSeason(product);

            case 'year-round':
              return product.seasons?.available?.toLowerCase() === 'year-round';

            default: // spring, summer, fall, winter
              return product.seasons?.peak?.some((peakSeason) =>
                peakSeason.toLowerCase().includes(seasonFilter)
              );
          }
        });
      });
    }

    // Origin filter
    if (filters.origin.length > 0) {
      filtered = filtered.filter((product) =>
        filters.origin.some((origin) =>
          product.origin?.toLowerCase().includes(origin)
        )
      );
    }

    // Sort products with enhanced season sorting
    filtered = productUtils.sortProducts(filtered, sortBy);

    return filtered;
  }, [data, searchQuery, sortBy, filters]);
  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleFilterChange = (filterType, value, checked) => {
    if (filterType === 'clear') {
      setFilters({
        season: [],
        origin: [],
        availability: [],
      });
      setCurrentPage(1);
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter((item) => item !== value),
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category-based icons and colors
  const categoryIcons = {
    Vegetables: { icon: Leaf, color: 'from-emerald-500 to-teal-600' },
    Fruits: { icon: Apple, color: 'from-orange-500 to-red-600' },
    Crops: { icon: Wheat, color: 'from-amber-500 to-yellow-600' },
  };

  const categoryInfo =
    categoryIcons[data?.category] || categoryIcons['Vegetables'];
  const CategoryIcon = categoryInfo.icon;

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: 'var(--color-primary)' }}
          ></div>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Loading {category}...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--color-error-50)',
              border: '2px solid var(--color-error-200)',
            }}
          >
            <AlertTriangle
              className="w-10 h-10"
              style={{ color: 'var(--color-error)' }}
            />
          </div>

          <h2
            className="text-2xl font-bold mb-3 transition-colors duration-300"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Error Loading Category
          </h2>

          <p
            className="mb-6 text-lg transition-colors duration-300"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {error || 'Category not found'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="transition-all duration-300"
              style={{
                background: 'var(--gradient-primary)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              <Link to="/products" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="transition-all duration-300"
              style={{
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
                background: 'var(--color-bg-primary)',
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>

          <p
            className="mt-6 text-sm transition-colors duration-300"
            style={{ color: 'var(--color-text-muted)' }}
          >
            If the problem persists, please{' '}
            <Link
              to="/contact"
              className="hover:underline font-medium"
              style={{ color: 'var(--color-primary)' }}
            >
              contact our support team
            </Link>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 z-50"
        style={{
          background: 'var(--gradient-primary)',
          scaleX: scrollYProgress,
          transformOrigin: 'left',
        }}
      />

      {/* Header Section */}
      <section
        className="relative pt-32 pb-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: data.heroImage ? `url(${data.heroImage})` : 'none',
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-emerald-900/50 to-gray-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${categoryInfo.color} p-4 flex items-center justify-center shadow-lg backdrop-blur-sm`}
              >
                <CategoryIcon className="w-10 h-10 text-white" />
              </div>
              <div>
                <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-white/30">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="mr-2"
                  >
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                  Agricultural Products
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold capitalize text-white">
                  {data.category}
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 leading-relaxed"
            >
              {data.description}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-2xl mx-auto"
            >
              {[
                { label: 'Products', value: data.products.length },
                { label: 'Varieties', value: '20+' },
                { label: 'Countries', value: '40+' },
                { label: 'Quality Score', value: '100%' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Summary */}
      <FilterSummary
        filters={filters}
        onFilterChange={handleFilterChange}
        className="mt-4"
      />

      {/* Products Section */}
      <section
        className="py-12"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb category={data.category} />
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                category={data.category}
                products={data.products}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <SearchSortBar
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                sortBy={sortBy}
                onSort={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {/* Results Info */}
              <ResultsInfo
                currentPage={currentPage}
                pageSize={pageSize}
                totalProducts={filteredProducts.length}
                viewMode={viewMode}
                className="mb-6"
              />

              {/* Products Grid/List */}
              {paginatedProducts.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'
                      : 'space-y-4 mb-8'
                  }
                >
                  {paginatedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      category={data.category}
                      viewMode={viewMode}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <Card
                  className="p-12 text-center mb-8"
                  style={{
                    background: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--color-bg-secondary)' }}
                  >
                    <Search
                      className="w-8 h-8"
                      style={{ color: 'var(--color-text-muted)' }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    No products found
                  </h3>
                  <p
                    className="mb-6"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({ season: [], origin: [], availability: [] });
                    }}
                    style={{
                      background: 'var(--gradient-primary)',
                      color: 'var(--color-primary-foreground)',
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Card>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mt-8"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Need Bulk Quantities?
          </motion.h2>

          <motion.p
            className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get competitive wholesale pricing, volume discounts, and customized
            shipping solutions for your business needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
