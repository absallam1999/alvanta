import { productService } from '../../services/productService';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  ArrowRight,
  Leaf,
  Globe,
  Users,
  Truck,
  Shield,
  ChevronRight,
  BarChart2,
  Award,
  Star,
  Clock,
  TrendingUp,
  Heart,
  Sprout,
  Phone,
  Mail,
  MapPin,
  Apple,
} from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Home - Alvanta';

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await productService.fetchAllCategories();

        const categoriesData = [
          {
            id: 'vegetables',
            name: 'Fresh Vegetables',
            description: data.vegetables.description,
            heroImage: data.vegetables.heroImage,
            productCount: data.vegetables.products.length,
            gradient: 'from-emerald-500 to-teal-600',
            bgGradient:
              'from-emerald-50/80 to-teal-50/60 dark:from-emerald-950/40 dark:to-teal-950/30',
            link: '/products/vegetables',
          },
          {
            id: 'fruits',
            name: 'Seasonal Fruits',
            description: data.fruits.description,
            heroImage: data.fruits.heroImage,
            productCount: data.fruits.products.length,
            gradient: 'from-orange-500 to-red-500',
            bgGradient:
              'from-orange-50/80 to-red-50/60 dark:from-orange-950/40 dark:to-red-950/30',
            link: '/products/fruits',
          },
          {
            id: 'specialty-crops',
            name: 'Specialty Crops',
            description: data.crops.description,
            heroImage: data.crops.heroImage,
            productCount: data.crops.products.length,
            gradient: 'from-indigo-500 to-purple-600',
            bgGradient:
              'from-indigo-50/80 to-purple-50/60 dark:from-indigo-950/40 dark:to-purple-950/30',
            link: '/products/crops',
          },
        ];

        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section
        className="py-16 lg:py-24"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 w-64 bg-muted rounded-full animate-pulse mx-auto mb-4" />
            <div className="h-4 w-96 bg-muted rounded-full animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-80 bg-muted rounded-3xl mb-4" />
                <div className="h-6 bg-muted rounded-full mb-2" />
                <div className="h-4 bg-muted rounded-full mb-2" />
                <div className="h-10 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="py-16 lg:py-24"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div style={{ color: 'var(--color-error)' }} className="mb-4">
            {error}
          </div>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 lg:py-24"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-emerald-600 to-teal-600 dark:from-white dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
            Premium Product Categories
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Discover our extensive range of premium agricultural products,
            carefully sourced and exported to meet the highest international
            standards.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative"
            >
              <motion.div variants={cardHoverVariants}>
                <Card
                  className="backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                  style={{
                    background: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <img
                      src={category.heroImage}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h3
                        className="text-xl font-bold mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {category.name}
                      </h3>

                      <p
                        className="text-sm mb-4 line-clamp-3 leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {category.description}
                      </p>

                      {/* Stats */}
                      <div
                        className="flex items-center justify-between text-xs mb-4"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        <span className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}
                          />
                          {category.productCount} Products
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      asChild
                      variant="outline"
                      className="group/btn w-full mt-auto transition-all duration-300"
                      style={{
                        borderColor: 'var(--color-primary-200)',
                      }}
                    >
                      <Link
                        to={category.link}
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Explore Category</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 pointer-events-none" />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="group font-semibold px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background: 'var(--gradient-primary)',
              color: 'var(--color-primary-foreground)',
            }}
          >
            <Link to="/products" className="flex items-center gap-3">
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

// Reduced Motion Hook
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
};

// Animation Variants
const createVariants = (prefersReducedMotion) => ({
  fadeInUp: {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7 },
  },
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.12 } },
  },
});

// Section Container
const SectionContainer = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

export default function HomePage() {
  const featuresSectionRef = useRef(null);

  const handleScrollClick = () => {
    if (featuresSectionRef.current) {
      featuresSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const prefersReducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const variants = createVariants(prefersReducedMotion);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'Fresh Vegetables',
      icon: Leaf,
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50/80 dark:bg-emerald-950/40',
      count: '10+ Varieties',
      desc: 'Premium vegetables sourced from regenerative farms worldwide.',
      link: '/products/vegetables',
    },
    {
      id: 2,
      name: 'Seasonal Fruits',
      icon: Apple,
      color: 'from-orange-500 to-red-600',
      bg: 'bg-orange-50/80 dark:bg-orange-950/40',
      count: '5+ Types',
      desc: 'Hand-picked fruits at peak ripeness, exported fresh.',
      link: '/products/fruits',
    },
    {
      id: 3,
      name: 'Specialty Crops',
      icon: Sprout,
      color: 'from-indigo-500 to-purple-600',
      bg: 'bg-indigo-50/80 dark:bg-indigo-950/40',
      count: '3+ Specialty',
      desc: 'Rare grains and crops with full traceability.',
      link: '/products/crops',
    },
  ];

  const stats = [
    { number: '12+', label: 'Countries Served', icon: Globe },
    { number: '25+', label: 'Global Partners', icon: Users },
    { number: '5+', label: 'Years Excellence', icon: Award },
    { number: '24/7', label: 'Support', icon: BarChart2 },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Certified Quality',
      desc: 'GlobalGAP & ISO 22000.',
    },
    {
      icon: Truck,
      title: 'Global Logistics',
      desc: '12+ countries, carbon-neutral.',
    },
    {
      icon: Users,
      title: 'Farmer-First',
      desc: '2000+ direct farm partners.',
    },
    {
      icon: Globe,
      title: 'Eco-Responsible',
      desc: 'Zero-waste & regenerative.',
    },
  ];

  const sustainabilityItems = [
    {
      icon: Heart,
      title: 'Biodiversity',
      desc: 'Protecting ecosystems on all farms.',
    },
    {
      icon: TrendingUp,
      title: 'Carbon Reduction',
      desc: '30% lower emissions via smart logistics.',
    },
    {
      icon: Clock,
      title: 'Future-Proof',
      desc: 'R&D for resilient agriculture.',
    },
  ];

  if (isLoading) {
    return (
      <div
        className="min-h-screen"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <SectionContainer className="py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-8 w-64 bg-muted rounded-full animate-pulse" />
              <div className="space-y-3">
                <div className="h-16 bg-muted rounded animate-pulse" />
                <div className="h-16 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-6 w-4/5 bg-muted rounded animate-pulse" />
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-32 bg-muted rounded-3xl animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-40 bg-muted rounded-3xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--gradient-hero)' }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <motion.div
            className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-400/15 dark:bg-teal-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-600/5 dark:to-teal-600/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px),
                         linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        <SectionContainer className="py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Content Section */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={variants.staggerContainer}
              className="space-y-8 lg:space-y-4"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge
                  className="mt-4 px-4 py-2"
                  style={{
                    background: 'var(--color-primary-50)',
                    color: 'var(--color-primary-700)',
                    borderColor: 'var(--color-primary-200)',
                  }}
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  PREMIUM GLOBAL EXPORTS
                </Badge>
              </motion.div>

              {/* Heading */}
              <motion.div variants={variants.fadeInUp} className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                  <span
                    className="block"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Cultivating
                  </span>
                  <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-300 bg-clip-text text-transparent bg-size-200 animate-gradient">
                    Global Excellence
                  </span>
                  <span
                    className="block"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    in Agriculture
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={variants.fadeInUp}
                className="text-lg sm:text-xl max-w-xl leading-relaxed font-light"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Alvanta pioneers sustainable agriculture, connecting premium
                farms with global markets through innovative technology and
                uncompromising quality standards.
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={variants.staggerContainer}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                {stats.slice(0, 2).map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={variants.fadeInUp}
                    className="group relative p-5 rounded-2xl backdrop-blur-md transition-all duration-500 hover:scale-105"
                    style={{
                      background: 'var(--color-bg-primary)',
                      borderColor: 'var(--color-border-primary)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div className="text-center space-y-3">
                      <div
                        className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ background: 'var(--gradient-primary-subtle)' }}
                      >
                        <stat.icon
                          className="w-6 h-6"
                          style={{ color: 'var(--color-primary)' }}
                        />
                      </div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {stat.number}
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={variants.fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden font-semibold px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'var(--color-primary-foreground)',
                  }}
                >
                  <Link to="/products" className="flex items-center gap-3">
                    <span>Explore Products</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group px-8 py-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: 'var(--color-primary-200)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <Link to="/quote" className="flex items-center gap-2">
                    <span>Get Quote</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Category Cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: 'easeOut',
              }}
              className="space-y-6"
              style={{ marginBottom: '5rem' }}
            >
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.15 + 0.4,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative"
                >
                  <Card
                    className="p-6 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    style={{
                      background: 'var(--color-bg-primary)',
                      borderColor: 'var(--color-border-primary)',
                    }}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-600/5 dark:via-transparent dark:to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Link to={cat.link} className="block relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Icon Container */}
                          <div className="relative">
                            <div
                              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} p-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                            >
                              <cat.icon className="w-6 h-6 text-white" />
                            </div>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 dark:bg-emerald-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Text Content */}
                          <div>
                            <h3
                              className="text-xl font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {cat.name}
                            </h3>
                            <p
                              className="text-sm mt-1"
                              style={{ color: 'var(--color-text-muted)' }}
                            >
                              {cat.count}
                            </p>
                          </div>
                        </div>

                        {/* Animated Arrow */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                          <span
                            className="text-xs font-medium group"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            Explore
                          </span>
                          <ChevronRight
                            className="w-4 h-4"
                            style={{ color: 'var(--color-primary)' }}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className="mt-3 text-sm leading-relaxed line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {cat.desc}
                      </p>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionContainer>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group z-10"
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={handleScrollClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center backdrop-blur-sm group-hover:border-emerald-400 transition-colors duration-300"
            style={{ borderColor: 'var(--color-primary-200)' }}
          >
            <motion.div
              className="w-1 h-3 rounded-full mt-2 group-hover:bg-emerald-600 transition-colors duration-300"
              style={{ background: 'var(--color-primary)' }}
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ABOUT + STATS */}
      <section
        ref={featuresSectionRef}
        className="py-16 lg:py-24"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={variants.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={variants.fadeInUp}
                className="text-4xl lg:text-5xl font-bold mb-6 text-foreground dark:text-white"
              >
                Leading the Future of{' '}
                <span className="text-emerald-600 dark:text-emerald-400">
                  Sustainable Agriculture
                </span>
              </motion.h2>
              <motion.p
                variants={variants.fadeInUp}
                className="text-lg text-muted-foreground dark:text-gray-300 mb-8"
              >
                5+ years of excellence in premium exports, trusted by global
                leaders.
              </motion.p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {values.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-start space-x-3 p-4 rounded-2xl bg-card dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground dark:text-white">
                        {value.title}
                      </h4>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                        {value.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={variants.fadeInUp}>
                <Button asChild size="lg" className="group">
                  <Link to="/about">
                    More About us
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 rounded-3xl p-1 shadow-2xl"
            >
              <div className="bg-card dark:bg-gray-800 rounded-3xl p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(2).map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all"
                    >
                      <div className="text-emerald-600 dark:text-emerald-400 mb-2 flex justify-center">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-center text-foreground dark:text-white">
                  Global Impact
                </h3>
                <p className="text-center text-muted-foreground dark:text-gray-400">
                  Premium produce, sustainably delivered.
                </p>
              </div>
            </motion.div>
          </div>
        </SectionContainer>
      </section>

      <CategoriesSection />

      {/* SUSTAINABILITY */}
      <section
        className="py-16 lg:py-24"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <SectionContainer>
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={variants.staggerContainer}
            viewport={{ once: true }}
            className="text-center max-w-6xl mx-auto"
          >
            <motion.h2
              variants={variants.fadeInUp}
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Environmental Stewardship
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-lg mb-12 max-w-3xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Every harvest supports biodiversity, reduces carbon, and builds a
              better future.
            </motion.p>

            <motion.div
              variants={variants.scaleIn}
              className="rounded-3xl p-8 shadow-2xl"
              style={{
                background: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              <div className="grid md:grid-cols-3 gap-8 text-left">
                {sustainabilityItems.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    className="p-5 rounded-2xl transition-all"
                    style={{ background: 'var(--color-bg-secondary)' }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'var(--color-primary-50)' }}
                    >
                      <item.icon
                        className="w-6 h-6"
                        style={{ color: 'var(--color-primary)' }}
                      />
                    </div>
                    <h4
                      className="text-xl font-bold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </SectionContainer>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 dark:from-gray-950 dark:via-emerald-950 dark:to-gray-950 text-white">
        <SectionContainer>
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={variants.staggerContainer}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              variants={variants.fadeInUp}
              className="text-4xl lg:text-5xl font-bold mb-6"
            >
              Transform Your Supply Chain
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-lg text-gray-300 mb-12"
            >
              Join 2,000+ partners who trust Alvanta for premium, sustainable
              produce.
            </motion.p>

            <motion.div
              variants={variants.fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="group px-8 py-6 text-lg"
              >
                <Link to="/contact">
                  Start Partnership
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg"
              >
                <Link to="/quote">
                  Get Quote
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              variants={variants.fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300 text-sm"
            >
              <a
                href="tel:+201001188044"
                className="flex items-center gap-2 hover:text-white transition-all"
              >
                <Phone className="w-4 h-4" /> +20 100 118 8044
              </a>
              <a
                href="mailto:contact@alvantaexport.com"
                className="flex items-center gap-2 hover:text-white transition-all"
              >
                <Mail className="w-4 h-4" /> contact@alvantaexport.com
              </a>
              <a
                href="https://maps.google.com/?q=Al-Mahmoudiah+Al-Behira+Egypt"
                className="flex items-center gap-2 hover:text-white transition-all"
              >
                <MapPin className="w-4 h-4" /> Global Headquarters
              </a>
            </motion.div>
          </motion.div>
        </SectionContainer>
      </section>

      {/* Global Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(1deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
