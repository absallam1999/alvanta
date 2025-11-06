import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Settings,
  Sun,
  Moon,
  Monitor,
  Check,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Leaf,
  Apple,
  Wheat,
  Package,
  Search,
  Home,
  Store,
  Users,
  Phone,
} from 'lucide-react';
import { config } from '../../config/env';
import SearchOverlay from '../../components/Search';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('system');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsHovered, setIsSettingsHovered] = useState(false);
  const navRef = useRef(null);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'var(--color-bg-primary)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'var(--color-border-primary)']
  );

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    {
      name: 'Products',
      href: '/products',
      featured: true,
      dropdown: [
        {
          name: 'Fresh Vegetables',
          href: '/products/vegetables',
          description: 'Premium quality produce',
          icon: Leaf,
          badge: 'Popular',
        },
        {
          name: 'Seasonal Fruits',
          href: '/products/fruits',
          description: 'Naturally sweet selections',
          icon: Apple,
          badge: 'New',
        },
        {
          name: 'Specialty Crops',
          href: '/products/crops',
          description: 'Unique agricultural products',
          icon: Wheat,
        },
        {
          name: 'Browse All Products',
          href: '/products',
          description: 'Complete catalog',
          icon: Package,
          featured: true,
        },
      ],
    },
    { name: 'Markets', href: '/markets', icon: Store },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const themes = [
    { name: 'Light', value: 'light', icon: Sun, desc: 'Bright & Clear' },
    { name: 'Dark', value: 'dark', icon: Moon, desc: 'Easy on Eyes' },
    { name: 'System', value: 'system', icon: Monitor, desc: 'Auto Adapt' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setIsThemeOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    const saved = localStorage.getItem('theme') || 'system';
    setCurrentTheme(saved);
    applyTheme(saved);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Disable scrolling when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categoriesData = await productService.fetchAllCategories();
        const allProducts = extractAllProducts(categoriesData);
        setAllProducts(allProducts);
      } catch (error) {
        console.error('Error loading products for search:', error);
      }
    };

    loadProducts();
  }, []);

  const extractAllProducts = (categoriesData) => {
    const allProducts = [];
    if (!categoriesData) return allProducts;

    Object.entries(categoriesData).forEach(([categoryKey, category]) => {
      if (category && typeof category === 'object') {
        if (Array.isArray(category.featured)) {
          category.featured.forEach((product) => {
            allProducts.push({
              ...product,
              category: category.category || categoryKey,
              categoryType: 'featured',
            });
          });
        }
        if (Array.isArray(category.products)) {
          category.products.forEach((product) => {
            allProducts.push({
              ...product,
              category: category.category || categoryKey,
              categoryType: 'regular',
            });
          });
        }
      }
    });

    return allProducts;
  };

  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
      root.classList.toggle('dark', theme === 'dark');
    }
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    setIsThemeOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/') return window.location.pathname === '/';
    return window.location.pathname.startsWith(path);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleProductsClick = (e) => {
    if (!window.location.pathname.startsWith('/products')) {
      e.preventDefault();
      navigate('/products');
    }
  };

  const getLinkColorClass = (isActive) => {
    if (isActive) {
      return 'text-primary dark:text-primary-400';
    }

    return 'text-gray-700 dark:text-gray-300';
  };

  const getBackgroundStyle = () => {
    return isScrolled
      ? { background: 'var(--gradient-glass)' }
      : { background: 'rgba(255, 255, 255, 0)' };
  };

  const getLinkStyles = (isActive) => {
    const baseStyles = {
      color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
    };

    return baseStyles;
  };

  return (
    <motion.nav
      ref={navRef}
      style={{
        backgroundColor: navBackground,
        borderColor: navBorder,
        ...getBackgroundStyle(),
      }}
      className={`
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl backdrop-saturate-150
        border-b transition-all duration-500
        ${isScrolled ? 'shadow-lg shadow-black/5 dark:shadow-white/5' : 'border-transparent'}
      `}
    >
      {/* Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 relative z-10"
          >
            <a href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="relative"
              >
                {/* Glass Effect Container */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                  {/* Glass Background */}
                  <motion.div
                    className="absolute inset-0 rounded-xl backdrop-blur-md shadow-lg"
                    style={{
                      background: 'var(--gradient-glass)',
                    }}
                    whileHover={{
                      background: 'var(--gradient-glass-dark)',
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Logo Image */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <img
                      src="/icons/icon-192x180.png"
                      alt="Alvanta - Global Agriculture"
                      className="w-full h-full object-contain p-2 transition-all duration-500 group-hover:scale-110"
                      style={{
                        filter: 'var(--logo-brightness)',
                      }}
                    />
                  </div>

                  {/* Dynamic Shine Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'var(--gradient-glass)',
                    }}
                    whileHover={{
                      opacity: [0, 0.3, 0],
                      x: ['-100%', '100%', '100%'],
                    }}
                    transition={{
                      duration: 1.2,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Pulsing Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'var(--gradient-glass)',
                    }}
                    whileHover={{
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                </div>

                {/* Shadow Effects */}
                <motion.div
                  className="absolute inset-0 rounded-xl shadow-lg group-hover:shadow-xl"
                  style={{
                    boxShadow: 'var(--shadow-lg)',
                  }}
                  whileHover={{
                    boxShadow: 'var(--shadow-xl)',
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Brand Text*/}
              <div className="hidden sm:block space-y-0.5">
                <motion.h1
                  className="text-2xl leading-tight tracking-tight transition-colors duration-300"
                  style={{
                    letterSpacing: '-2px',
                    fontWeight: '900',
                    color: 'var(--color-text-primary)',
                  }}
                  whileHover={{ x: 1 }}
                >
                  {config.AppName}
                </motion.h1>
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => {
              const isDropdownActive = item.dropdown?.some(
                (subItem) =>
                  subItem.name !== 'Browse All Products' &&
                  isActivePath(subItem.href)
              );
              const isItemActive = isActivePath(item.href) || isDropdownActive;

              return (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="group/nav"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ y: 0 }}
                        onClick={
                          item.name === 'Products'
                            ? handleProductsClick
                            : undefined
                        }
                        className={`
                relative flex items-center space-x-2 px-4 py-2.5 rounded-xl
                text-sm font-semibold tracking-wide
                transition-all duration-300 overflow-hidden group/btn
                ${getLinkColorClass(isItemActive)}
              `}
                        style={getLinkStyles(isItemActive)}
                      >
                        {/* Hover Gradient Background */}
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-all duration-300"
                          style={{
                            background: 'var(--gradient-primary)',
                          }}
                          initial={false}
                        />

                        {/* Subtle shine effect on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                          }}
                          initial={false}
                        />

                        {/* Active Indicator */}
                        {isItemActive && (
                          <motion.div
                            className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                            style={{
                              background: 'var(--gradient-primary)',
                              boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
                            }}
                            layoutId="activeIndicator"
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 35,
                            }}
                          />
                        )}

                        <span className="relative z-10 transition-all duration-300 group-hover/btn:text-white group-hover/btn:font-semibold drop-shadow-sm">
                          {item.name}
                        </span>

                        {item.featured && (
                          <motion.div
                            className="relative z-10"
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            <Sparkles
                              className="w-3.5 h-3.5 group-hover/btn:text-white"
                              style={{ color: 'var(--color-primary-700)' }}
                            />
                          </motion.div>
                        )}

                        <motion.div
                          className="relative z-10"
                          animate={{
                            rotate: activeDropdown === index ? 180 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <ChevronDown className="w-4 h-4 transition-all duration-300 group-hover/btn:text-white group-hover/btn:scale-110" />
                        </motion.div>
                      </motion.button>

                      {/* Premium Dropdown */}
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute top-full left-0 mt-2 w-96 backdrop-blur-2xl rounded-2xl shadow-2xl border overflow-hidden z-50"
                            style={{
                              backgroundColor: 'var(--color-bg-primary)',
                              borderColor: 'var(--color-border-primary)',
                              boxShadow:
                                '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            {/* Gradient Header */}
                            <div
                              className="p-4 border-b relative overflow-hidden"
                              style={{
                                background: 'var(--gradient-primary)',
                                borderColor: 'var(--color-border-primary)',
                              }}
                            >
                              {/* Animated background shine */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                                animate={{
                                  x: ['-100%', '200%', '-100%'],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: 'linear',
                                }}
                              />

                              <div className="flex items-center space-x-2 relative z-10">
                                <ShoppingBag className="w-4 h-4 text-white drop-shadow-sm" />
                                <h3 className="text-sm font-bold text-white drop-shadow-sm">
                                  {item.name}
                                </h3>
                              </div>
                            </div>

                            <div className="p-2 max-h-96 overflow-y-auto">
                              {item.dropdown.map((subItem, i) => {
                                const IconComponent = subItem.icon;
                                const isSubItemActive =
                                  subItem.name === 'Browse All Products'
                                    ? isActivePath(subItem.href) &&
                                      !isDropdownActive
                                    : isActivePath(subItem.href);

                                const isBrowseAll =
                                  subItem.name === 'Browse All Products';
                                const shouldUsePrimaryColors =
                                  isBrowseAll || isSubItemActive;

                                return (
                                  <motion.div
                                    key={subItem.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="group/item"
                                  >
                                    <a
                                      href={subItem.href}
                                      className={`
                              flex items-start justify-between p-3.5 rounded-xl
                              transition-all duration-200 relative overflow-hidden
                              border border-transparent
                              ${
                                isSubItemActive || subItem.featured
                                  ? 'shadow-lg'
                                  : 'hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800'
                              }
                            `}
                                      style={{
                                        backgroundColor: shouldUsePrimaryColors
                                          ? 'var(--color-primary-50)'
                                          : subItem.featured
                                            ? 'var(--color-primary-50)'
                                            : 'transparent',
                                        borderColor: shouldUsePrimaryColors
                                          ? 'var(--color-primary-200)'
                                          : subItem.featured
                                            ? 'var(--color-primary-200)'
                                            : 'transparent',
                                      }}
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      {/* Hover Gradient Background */}
                                      <motion.div
                                        className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-all duration-300"
                                        style={{
                                          background:
                                            'var(--gradient-primary-subtle)',
                                        }}
                                        initial={false}
                                      />

                                      {/* Hover Shine Effect */}
                                      <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent -skew-x-12 translate-x-[-150%] group-hover/item:translate-x-[150%] transition-transform duration-1000"
                                        initial={false}
                                      />

                                      <div className="flex items-start space-x-3 flex-1 relative z-10">
                                        <div className="flex-shrink-0 mt-0.5">
                                          <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            <IconComponent
                                              className="w-5 h-5 transition-colors duration-200"
                                              style={{
                                                color: shouldUsePrimaryColors
                                                  ? 'var(--color-primary)'
                                                  : 'var(--color-primary)',
                                              }}
                                            />
                                          </motion.div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center space-x-2 mb-1">
                                            <span
                                              className="font-semibold text-sm transition-colors duration-200 group-hover/item:text-emerald-700 dark:group-hover/item:text-emerald-300"
                                              style={{
                                                color: shouldUsePrimaryColors
                                                  ? 'var(--color-primary)'
                                                  : 'var(--color-text-primary)',
                                              }}
                                            >
                                              {subItem.name}
                                            </span>
                                            {subItem.badge && (
                                              <motion.span
                                                className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded border"
                                                style={{
                                                  backgroundColor:
                                                    'var(--color-primary-100)',
                                                  color:
                                                    'var(--color-primary-700)',
                                                  borderColor:
                                                    'var(--color-primary-200)',
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.2 }}
                                              >
                                                {subItem.badge}
                                              </motion.span>
                                            )}
                                          </div>
                                          <p
                                            className="text-xs transition-colors duration-200 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 line-clamp-1"
                                            style={{
                                              color: shouldUsePrimaryColors
                                                ? 'var(--color-primary-600)'
                                                : 'var(--color-text-tertiary)',
                                            }}
                                          >
                                            {subItem.description}
                                          </p>
                                        </div>
                                      </div>

                                      <motion.div
                                        className="relative z-10"
                                        initial={{
                                          x: -5,
                                          opacity: shouldUsePrimaryColors
                                            ? 1
                                            : 0,
                                        }}
                                        whileHover={{
                                          x: 2,
                                          opacity: 1,
                                          scale: 1.1,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                          color: 'var(--color-primary)',
                                        }}
                                      >
                                        <ArrowRight className="w-4 h-4" />
                                      </motion.div>
                                    </a>

                                    {/* Subtle separator except for last item */}
                                    {i < item.dropdown.length - 1 && (
                                      <div
                                        className="h-px mx-3 my-1 opacity-30"
                                        style={{
                                          background:
                                            'var(--color-border-primary)',
                                        }}
                                      />
                                    )}
                                  </motion.div>
                                );
                              })}
                            </div>

                            {/* Dropdown Footer */}
                            <div
                              className="p-3 border-t"
                              style={{
                                borderColor: 'var(--color-border-primary)',
                                background: 'var(--color-bg-secondary)',
                              }}
                            >
                              <p
                                className="text-xs text-center"
                                style={{ color: 'var(--color-text-muted)' }}
                              >
                                Discover our premium selection
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.a
                      href={item.href}
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                      className={`
              relative block px-4 py-2.5 rounded-xl
              text-sm font-semibold tracking-wide
              transition-all duration-300 overflow-hidden group/link
              ${getLinkColorClass(isItemActive)}
            `}
                      style={getLinkStyles(isItemActive)}
                    >
                      {/* Hover Gradient Background */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/link:opacity-100 transition-all duration-300"
                        style={{
                          background: 'var(--gradient-primary)',
                        }}
                        initial={false}
                      />

                      {/* Subtle shine effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/link:opacity-50"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 100%)',
                        }}
                        initial={false}
                      />

                      {/* Active Indicator */}
                      {isItemActive && (
                        <motion.div
                          className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                          style={{
                            background: 'var(--gradient-primary)',
                            boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
                          }}
                          layoutId="activeIndicator"
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}

                      <span className="relative z-10 transition-all duration-300 group-hover/link:text-white group-hover/link:font-semibold drop-shadow-sm">
                        {item.name}
                      </span>
                    </motion.a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearchOpen}
              className="hidden md:flex p-2.5 rounded-xl transition-all duration-300 relative group/search"
              style={{
                color: 'var(--color-text-tertiary)',
              }}
            >
              <Search className="w-5 h-5" />
              <span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: 'var(--color-primary)',
                }}
              />
            </motion.button>

            {/* Theme Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsSettingsHovered(true)}
                onHoverEnd={() => setIsSettingsHovered(false)}
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2.5 rounded-xl transition-all duration-300 relative"
                style={{
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <motion.div
                  animate={{ rotate: isSettingsHovered ? 360 : 0 }}
                  transition={{
                    duration: 0.6,
                    ease: 'linear',
                    repeat: isSettingsHovered ? Infinity : 0,
                  }}
                >
                  <Settings className="w-5 h-5" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isThemeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 mt-2 w-64 backdrop-blur-2xl rounded-2xl shadow-2xl border overflow-hidden"
                    style={{
                      backgroundColor: 'var(--color-bg-primary)',
                      borderColor: 'var(--color-border-primary)',
                      boxShadow: 'var(--shadow-2xl)',
                    }}
                  >
                    <div
                      className="p-4 border-b"
                      style={{
                        borderColor: 'var(--color-border-primary)',
                      }}
                    >
                      <h3
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        Theme Preference
                      </h3>
                    </div>
                    <div className="p-2">
                      {themes.map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <motion.button
                            key={theme.value}
                            whileHover={{ x: 2 }}
                            onClick={() => handleThemeChange(theme.value)}
                            className={`
                              flex items-center justify-between w-full p-3 rounded-xl
                              transition-all duration-200 mb-1 group/theme relative overflow-hidden
                              ${currentTheme === theme.value ? 'shadow-sm' : ''}
                            `}
                            style={{
                              backgroundColor:
                                currentTheme === theme.value
                                  ? 'var(--color-primary-50)'
                                  : 'transparent',
                              color:
                                currentTheme === theme.value
                                  ? 'var(--color-primary)'
                                  : 'var(--color-text-secondary)',
                            }}
                          >
                            <div className="flex items-center space-x-3 relative z-10">
                              <div
                                className={`
                                p-2 rounded-lg transition-colors duration-200
                              `}
                                style={{
                                  backgroundColor:
                                    currentTheme === theme.value
                                      ? 'var(--color-primary-100)'
                                      : 'var(--color-bg-tertiary)',
                                }}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-sm">
                                  {theme.name}
                                </div>
                                <div
                                  className="text-[10px]"
                                  style={{
                                    color: 'var(--color-text-muted)',
                                  }}
                                >
                                  {theme.desc}
                                </div>
                              </div>
                            </div>
                            {currentTheme === theme.value && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 25,
                                }}
                                className="relative z-10"
                                style={{
                                  color: 'var(--color-primary)',
                                }}
                              >
                                <Check className="w-5 h-5" />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-500 relative overflow-hidden group/cta"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-lg)',
              }}
              onClick={() => navigate('/quote')}
            >
              {/* Animated Shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />

              {/* Glow Effect */}
              <div
                className="absolute inset-0 blur-xl opacity-0 group-hover/cta:opacity-50 transition-opacity duration-500"
                style={{
                  background: 'var(--gradient-primary)',
                }}
              />

              <span className="relative z-10">Get Quote</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover/cta:translate-x-1 transition-transform duration-300" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl transition-all duration-300"
              style={{
                color: 'var(--color-text-secondary)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden border-t backdrop-blur-xl"
              style={{
                borderColor: 'var(--color-border-primary)',
                backgroundColor: 'var(--color-bg-primary)',
              }}
            >
              <div className="px-4 py-6 space-y-2">
                {navigation.map((item, idx) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="space-y-1">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === idx ? null : idx
                            )
                          }
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200"
                          style={{
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          <span>{item.name}</span>
                          <motion.div
                            animate={{
                              rotate: activeDropdown === idx ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </motion.button>
                        <AnimatePresence>
                          {activeDropdown === idx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-1 pl-2"
                            >
                              {item.dropdown.map((sub) => {
                                const IconComponent = sub.icon;
                                return (
                                  <a
                                    key={sub.name}
                                    href={sub.href}
                                    className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{
                                      color: 'var(--color-text-tertiary)',
                                    }}
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <IconComponent
                                      className="w-4 h-4"
                                      style={{
                                        color: 'var(--color-primary)',
                                      }}
                                    />
                                    <span>{sub.name}</span>
                                    {sub.badge && (
                                      <span
                                        className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded"
                                        style={{
                                          backgroundColor:
                                            'var(--color-primary-100)',
                                          color: 'var(--color-primary-700)',
                                        }}
                                      >
                                        {sub.badge}
                                      </span>
                                    )}
                                  </a>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200"
                        style={{
                          color: 'var(--color-text-secondary)',
                        }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon && (
                          <item.icon
                            className="w-4 h-4"
                            style={{
                              color: 'var(--color-primary)',
                            }}
                          />
                        )}
                        <span>{item.name}</span>
                      </a>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button */}
                <motion.a
                  href="/quote"
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 px-6 py-3.5 mt-4 rounded-xl font-semibold text-base text-white hover:text-white transition-all duration-300 relative overflow-hidden group/mobile-cta"
                  style={{
                    background: 'var(--gradient-primary)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Animated Shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

                  <span className="relative z-10">Get Free Quote</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/mobile-cta:translate-x-1 transition-transform duration-300" />
                </motion.a>

                {/* Mobile Theme Selector */}
                <div
                  className="pt-4 mt-4 border-t"
                  style={{
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  <h4
                    className="px-4 pb-2 text-xs font-bold uppercase tracking-wider"
                    style={{
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Theme
                  </h4>
                  <div className="space-y-1">
                    {themes.map((theme) => {
                      const Icon = theme.icon;
                      return (
                        <motion.button
                          key={theme.value}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleThemeChange(theme.value)}
                          className={`
                            flex items-center justify-between w-full px-4 py-3 rounded-xl
                            transition-all duration-200
                          `}
                          style={{
                            backgroundColor:
                              currentTheme === theme.value
                                ? 'var(--color-primary-50)'
                                : 'transparent',
                            color:
                              currentTheme === theme.value
                                ? 'var(--color-primary)'
                                : 'var(--color-text-secondary)',
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`
                              p-2 rounded-lg transition-colors duration-200
                            `}
                              style={{
                                backgroundColor:
                                  currentTheme === theme.value
                                    ? 'var(--color-primary-100)'
                                    : 'var(--color-bg-tertiary)',
                              }}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-sm">
                                {theme.name}
                              </div>
                              <div
                                className="text-xs"
                                style={{
                                  color: 'var(--color-text-muted)',
                                }}
                              >
                                {theme.desc}
                              </div>
                            </div>
                          </div>
                          {currentTheme === theme.value && (
                            <Check
                              className="w-5 h-5"
                              style={{
                                color: 'var(--color-primary)',
                              }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Overlay */}
      <SearchOverlay
        isSearchOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allProducts={allProducts}
        navigation={navigation}
      />
    </motion.nav>
  );
};

export default Navbar;
