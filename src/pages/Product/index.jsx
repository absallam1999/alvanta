import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Clock,
  MapPin,
  Package,
  Calendar,
  Leaf,
  AlertCircle,
  Loader2,
  Star,
  Truck,
  Shield,
  CheckCircle,
  Users,
  Globe,
  X,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Apple,
  Wheat,
  MessageCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { productUtils } from '../../utils/productUtils';
import { useProductById, useRelatedProducts } from '../../hooks/useProducts';

// Modern Skeleton Loader
const ProductSkeleton = () => (
  <div
    className="min-h-screen"
    style={{ background: 'var(--color-bg-primary)' }}
  >
    {/* Header Skeleton */}
    <div
      className="border-b sticky top-0 z-40"
      style={{
        borderColor: 'var(--color-border-primary)',
        background: 'var(--color-bg-primary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div
          className="h-8 w-32 rounded-lg animate-pulse"
          style={{ background: 'var(--color-bg-muted)' }}
        />
      </div>
    </div>

    {/* Main Content Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Section Skeleton */}
        <div className="space-y-6">
          <div
            className="aspect-square rounded-2xl animate-pulse"
            style={{ background: 'var(--color-bg-muted)' }}
          />
        </div>

        {/* Content Section Skeleton */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div
              className="h-6 w-24 rounded animate-pulse"
              style={{ background: 'var(--color-bg-muted)' }}
            />
            <div
              className="h-12 w-3/4 rounded animate-pulse"
              style={{ background: 'var(--color-bg-muted)' }}
            />
            <div
              className="h-6 w-1/2 rounded animate-pulse"
              style={{ background: 'var(--color-bg-muted)' }}
            />
          </div>

          <div
            className="h-20 rounded-xl animate-pulse"
            style={{ background: 'var(--color-bg-muted)' }}
          />

          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-xl animate-pulse"
                style={{ background: 'var(--color-bg-muted)' }}
              />
            ))}
          </div>

          <div
            className="h-32 rounded-2xl animate-pulse"
            style={{ background: 'var(--color-bg-muted)' }}
          />
        </div>
      </div>
    </div>
  </div>
);

// Error Display Component
const ErrorDisplay = ({ error, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <Card
        className="max-w-md w-full p-8 text-center"
        style={{
          borderColor: 'var(--color-border-primary)',
          background: 'var(--color-bg-primary)',
        }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle
            className="w-16 h-16 mx-auto mb-6"
            style={{ color: 'var(--color-error)' }}
          />
        </motion.div>
        <h2
          className="text-2xl lg:text-3xl font-bold mb-3"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Product Not Found
        </h2>
        <p
          className="mb-4 max-w-sm mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          We couldn't find the product you're looking for.
        </p>
        {error && (
          <details
            className="mb-6 p-3 rounded-lg text-sm"
            style={{
              background: 'var(--color-bg-muted)',
              color: 'var(--color-text-muted)',
            }}
          >
            <summary className="cursor-pointer">Error Details</summary>
            <pre
              className="mt-2 p-2 rounded text-xs overflow-auto font-mono"
              style={{
                background: 'var(--color-bg-primary)',
                color: 'var(--color-error)',
              }}
            >
              {error.toString()}
            </pre>
          </details>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="text-white"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            style={{
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-text-primary)',
              background: 'var(--color-bg-primary)',
            }}
          >
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Try Again
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

// Related Products Component
const RelatedProducts = ({ currentProduct, category }) => {
  const { relatedProducts, loading, error } = useRelatedProducts(
    currentProduct.id,
    category
  );

  if (loading) {
    return (
      <section className="mt-16 lg:mt-24">
        <div className="text-center mb-12">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Related Products
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Loading related products...
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card
              key={i}
              className="p-4 animate-pulse"
              style={{ borderColor: 'var(--color-border-primary)' }}
            >
              <div
                className="aspect-square rounded-lg mb-4"
                style={{ background: 'var(--color-bg-muted)' }}
              />
              <div
                className="h-4 rounded mb-2"
                style={{ background: 'var(--color-bg-muted)' }}
              />
              <div
                className="h-3 rounded w-3/4"
                style={{ background: 'var(--color-bg-muted)' }}
              />
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error in RelatedProducts:', error);
    return (
      <section className="mt-16 lg:mt-24">
        <div
          className="text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <p>Unable to load related products</p>
        </div>
      </section>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 lg:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2
          className="text-3xl lg:text-4xl font-bold mb-4"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Related Products
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Discover more premium {category.toLowerCase()} from our collection
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card
              className="overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{
                background: 'var(--color-gray-100)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              <Link
                to={`/products/${category.toLowerCase()}/${product.id}`}
                className="block"
              >
                {/* Product Image */}
                <div
                  className="aspect-square relative overflow-hidden"
                  style={{ background: 'var(--gradient-primary-subtle)' }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Leaf
                        className="w-12 h-12"
                        style={{ color: 'var(--color-primary)' }}
                      />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      className="backdrop-blur-sm text-xs"
                      style={{
                        background: 'var(--color-success-bg)',
                        color: 'var(--color-success)',
                        borderColor: 'var(--color-border-success)',
                      }}
                    >
                      In Stock
                    </Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="font-semibold text-lg leading-tight transition-colors group-hover:text-emerald-600"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {product.name}
                    </h3>
                  </div>

                  {product.variety && (
                    <p
                      className="font-medium text-sm mb-3"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {product.variety}
                    </p>
                  )}

                  <p
                    className="text-sm line-clamp-2 mb-4"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {product.description}
                  </p>

                  {/* Features */}
                  <div
                    className="flex items-center gap-4 text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {product.origin && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{product.origin.split(',')[0]}</span>
                      </div>
                    )}
                    {product.seasons?.available && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{product.seasons.available}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="relative overflow-hidden group/btn hover:border-emerald-500 transition-all duration-300"
          style={{
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)',
            background: 'var(--color-bg-primary)',
          }}
        >
          <Link to={`/products/${category.toLowerCase()}`}>
            {/* Gradient Overlay on Hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              initial={false}
            />

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"
              initial={false}
            />

            <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
              View All {category}
            </span>
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180 relative z-10 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
};

// Share Modal Component
const ShareModal = ({ isOpen, onClose, product, productUrl }) => {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      platform: 'Copy Link',
      icon: Copy,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-500/10',
      hoverColor: 'hover:bg-gray-500/20',
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(productUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          const textArea = document.createElement('textarea');
          textArea.value = productUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      },
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-600/10',
      hoverColor: 'hover:bg-blue-600/20',
      onClick: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          productUrl
        )}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
    },
    {
      platform: 'Twitter',
      icon: Twitter,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-500/10',
      hoverColor: 'hover:bg-sky-500/20',
      onClick: () => {
        const text = `Check out ${product.name} on Alvanta!`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(productUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
    },
    {
      platform: 'LinkedIn',
      icon: Linkedin,
      color: 'from-blue-700 to-blue-800',
      bgColor: 'bg-blue-700/10',
      hoverColor: 'hover:bg-blue-700/20',
      onClick: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          productUrl
        )}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
    },
    {
      platform: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-600/10',
      hoverColor: 'hover:bg-green-600/20',
      onClick: () => {
        const text = `Check out ${product.name} on Alvanta: ${productUrl}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
    },
    {
      platform: 'Email',
      icon: Mail,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      hoverColor: 'hover:bg-red-500/20',
      onClick: () => {
        const subject = `Check out ${product.name}`;
        const body = `I found this amazing product and thought you might be interested:\n\n${product.name}\n${productUrl}\n\n${product.description}`;
        const url = `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
      },
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center p-3"
        style={{ zIndex: 'var(--z-max)' }}
        onClick={onClose}
      >
        {/* Fullscreen Blur + Primary Tint */}
        <div
          className="absolute inset-0"
          style={{ background: 'var(--color-primary-600)/15' }}
        />

        {/* Floating Glow Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl"
            style={{ background: 'var(--color-primary-600)/10' }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl"
            style={{ background: 'var(--color-primary-600)/10' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 400,
            duration: 0.6,
          }}
          className="relative backdrop-blur-2xl border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          style={{
            background: 'var(--color-bg-primary)',
            borderColor: 'var(--color-border-primary)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="relative border-b p-4"
            style={{
              background: 'var(--gradient-primary-subtle)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Share2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Share Product
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Spread the word about this product
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-xl hover:scale-110 transition-all duration-300"
                style={{
                  color: 'var(--color-text-muted)',
                  background: 'var(--color-bg-primary)',
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-5">
            {/* Product Preview */}
            <div
              className="flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm"
              style={{
                background: 'var(--color-bg-muted)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className="font-semibold text-base mb-1 truncate"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {product.name}
                </h4>
                <p
                  className="text-xs line-clamp-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {product.description}
                </p>
              </div>
            </div>

            {/* Share Grid */}
            <div className="space-y-3">
              <h4
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Share Via
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {shareOptions.map((option, index) => (
                  <motion.button
                    key={option.platform}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { type: 'spring', stiffness: 400 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 border ${option.bgColor} ${option.hoverColor}`}
                    style={{ borderColor: 'var(--color-border-primary)' }}
                    onClick={option.onClick}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center shadow-md`}
                    >
                      <option.icon className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className="text-xs font-medium text-center leading-tight"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {option.platform}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Copy Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Or copy direct link
                </span>
                {copied && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: 'var(--color-success)' }}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Copied!
                  </motion.div>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={productUrl}
                  readOnly
                  className="flex-1 px-3 py-2 text-xs border rounded-lg truncate focus:outline-none focus:ring-2"
                  style={{
                    background: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-text-primary)',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareOptions[0].onClick}
                  className={`px-3 py-2 rounded-lg font-medium text-xs flex items-center gap-1 transition-all duration-300 ${
                    copied ? 'shadow-md' : 'shadow-sm'
                  }`}
                  style={{
                    background: copied
                      ? 'var(--color-success)'
                      : 'var(--color-primary)',
                    color: 'white',
                  }}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-4 py-3 border-t"
            style={{
              background: 'var(--color-bg-muted)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <p
              className="text-[10px] text-center"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Share the excellence of Alvanta's products
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Single Product Image
const ProductImage = ({ product }) => {
  const seasonDetails = productUtils.getSeasonDetails(product);

  // Get badge styling based on season status
  const getBadgeStyle = () => {
    switch (seasonDetails.type) {
      case 'best-month':
        return {
          background: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          borderColor: 'var(--color-border-success)',
          text: '🌟 Peak Season',
        };
      case 'peak-season':
        return {
          background: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          borderColor: 'var(--color-border-success)',
          text: 'In Season',
        };
      case 'year-round':
        return {
          background: 'var(--color-info-bg)',
          color: 'var(--color-info)',
          borderColor: 'var(--color-border-info)',
          text: 'Year-Round',
        };
      case 'available-range':
        return {
          background: 'var(--color-info-bg)',
          color: 'var(--color-info)',
          borderColor: 'var(--color-border-info)',
          text: 'Available',
        };
      case 'out-of-season':
        return {
          background: 'var(--color-warning-bg)',
          color: 'var(--color-warning)',
          borderColor: 'var(--color-border-warning)',
          text: 'Out of Season',
        };
      default:
        return {
          background: 'var(--color-bg-muted)',
          color: 'var(--color-text-muted)',
          borderColor: 'var(--color-border-primary)',
          text: 'Check Availability',
        };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="aspect-square rounded-2xl border overflow-hidden relative group"
      style={{
        background: 'var(--gradient-primary-subtle)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      {/* Real Product Image */}
      {product.image ? (
        <div className="absolute inset-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : (
        /* Fallback background if no image */
        <div
          className="absolute inset-0"
          style={{ background: 'var(--gradient-primary)' }}
        />
      )}

      {/* Status Badges */}
      <div className="absolute top-4 left-4">
        <Badge
          className="backdrop-blur-sm font-medium"
          style={{
            background: badgeStyle.background,
            color: badgeStyle.color,
            borderColor: badgeStyle.borderColor,
          }}
        >
          {badgeStyle.text}
        </Badge>
      </div>

      {/* Premium Badge */}
      <div className="absolute top-4 right-4">
        <Badge
          className="backdrop-blur-sm font-medium"
          style={{
            background: 'var(--color-primary-50)',
            color: 'var(--color-primary)',
            borderColor: 'var(--color-primary-200)',
          }}
        >
          Premium
        </Badge>
      </div>

      {/* Season Information Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 right-4"
      >
        <div
          className="p-3 rounded-lg backdrop-blur-sm border"
          style={{
            background: seasonDetails.inSeason
              ? 'var(--color-success-bg)'
              : 'var(--color-warning-bg)',
            borderColor: seasonDetails.inSeason
              ? 'var(--color-border-success)'
              : 'var(--color-border-warning)',
            color: seasonDetails.inSeason
              ? 'var(--color-success)'
              : 'var(--color-warning)',
          }}
        >
          <div className="text-center">
            <p className="text-sm font-semibold mb-1">
              {seasonDetails.description}
            </p>
            {seasonDetails.harvestMonths && (
              <p className="text-xs opacity-90">
                Harvest: {seasonDetails.harvestMonths.join(', ')}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Additional Quality Indicators */}
      {seasonDetails.type === 'best-month' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-16 left-4"
        >
          <Badge
            className="backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary-200)',
            }}
          >
            Best Quality
          </Badge>
        </motion.div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

// Product Info Component
const ProductInfo = ({ product, category }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Get current product URL
  const productUrl = `${window.location.origin}/products/${product.id}`;

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Get existing favorites
    const existingFavorites = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );

    if (newFavoriteState) {
      // Add to favorites if not there
      if (!existingFavorites.includes(product.id)) {
        const updatedFavorites = [...existingFavorites, product.id];
        localStorage.setItem(
          'favoriteProducts',
          JSON.stringify(updatedFavorites)
        );
      }
    } else {
      // Remove from favorites
      const updatedFavorites = existingFavorites.filter(
        (id) => id !== product.id
      );
      localStorage.setItem(
        'favoriteProducts',
        JSON.stringify(updatedFavorites)
      );
    }
  };

  // Check if product is favorited
  useState(() => {
    const existingFavorites = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    setIsFavorite(existingFavorites.includes(product.id));
  });

  // Category-based icons
  const categoryIcons = {
    Vegetables: Leaf,
    Fruits: Apple,
    Crops: Wheat,
  };

  const IconComponent = categoryIcons[category] || Leaf;

  const getPackagingValue = () => {
    const packaging = product.specifications?.packaging;
    if (Array.isArray(packaging)) {
      return packaging[0] || 'Custom Options';
    }
    return packaging || 'Custom Options';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Badge
          style={{
            background: 'var(--color-primary-50)',
            color: 'var(--color-primary)',
            borderColor: 'var(--color-primary-200)',
          }}
        >
          <motion.div className="mr-2">
            <IconComponent className="w-3 h-3" />
          </motion.div>
          {category}
        </Badge>

        <h1
          className="text-4xl lg:text-5xl font-bold leading-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {product.name}
        </h1>

        {product.variety && (
          <p
            className="text-xl font-semibold"
            style={{ color: 'var(--color-primary)' }}
          >
            {product.variety}
          </p>
        )}
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {product.description}
      </motion.p>

      {/* Key Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: Package, label: 'Packaging', value: getPackagingValue() },
          {
            icon: MapPin,
            label: 'Origin',
            value: product.origin?.split(',')[0] || 'Global Sources',
          },
          {
            icon: Clock,
            label: 'Shelf Life',
            value: product.specifications?.shelfLife || 'Contact for Details',
          },
          {
            icon: Calendar,
            label: 'Season',
            value: product.seasons?.available || 'Year-Round',
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition-all duration-300 group"
            style={{
              background: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: 'var(--color-primary-50)' }}
            >
              <item.icon
                className="w-6 h-6"
                style={{ color: 'var(--color-primary)' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {item.label}
              </div>
              <div
                className="text-base font-semibold truncate"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {item.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border rounded-2xl p-6 space-y-6"
        style={{
          background: 'var(--gradient-primary-subtle)',
          borderColor: 'var(--color-primary-200)',
        }}
      >
        <div className="text-center">
          <div
            className="text-2xl lg:text-3xl font-bold mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            Competitive Wholesale Pricing
          </div>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Volume discounts available • Custom quotes for bulk orders
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            asChild
            size="lg"
            className="h-14 font-semibold group relative overflow-hidden hover:shadow-xl transition-all duration-300"
            style={{ background: 'var(--gradient-primary)', color: 'white' }}
          >
            <Link
              to="/quote"
              className="flex items-center justify-center gap-3 relative z-10"
            >
              <ShoppingCart className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
              Request Quote
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-14 group"
              onClick={handleFavoriteToggle}
              style={{
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
                background: 'var(--color-bg-primary)',
              }}
            >
              <Heart
                className={`w-5 h-5 group-hover:scale-110 transition-all duration-300 ${
                  isFavorite ? 'fill-current scale-110' : ''
                }`}
                style={{
                  color: isFavorite
                    ? 'var(--color-error)'
                    : 'var(--color-text-primary)',
                }}
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-14 group"
              onClick={() => setShowShareModal(true)}
              style={{
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
                background: 'var(--color-bg-primary)',
              }}
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        product={product}
        productUrl={productUrl}
      />
    </div>
  );
};

// Product Details Tabs
const ProductDetails = ({ product }) => {
  // safely handle packaging data
  const getPackagingOptions = () => {
    const packaging = product.specifications?.packaging;
    if (Array.isArray(packaging)) {
      return packaging;
    }
    return packaging ? [packaging] : ['Custom packaging available'];
  };

  return (
    <div className="w-full space-y-8">
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList
          className="w-full grid grid-cols-3 p-1 backdrop-blur-sm gap-1"
          style={{ background: 'var(--color-bg-primary)' }}
        >
          <TabsTrigger
            value="specifications"
            className="relative px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-2 group"
            style={{
              background: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)',
            }}
          >
            <Package className="w-4 h-4 transition-all duration-300 group-data-[state=active]:text-[var(--color-primary)] group-data-[state=active]:drop-shadow-[0_2px_4px_rgba(34,197,94,0.3)]" />
            <span className="truncate">Specifications</span>
          </TabsTrigger>

          <TabsTrigger
            value="nutrition"
            className="relative px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-2 group"
            style={{
              background: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)',
            }}
          >
            <Star className="w-4 h-4 transition-all duration-300 group-data-[state=active]:text-[var(--color-primary)] group-data-[state=active]:drop-shadow-[0_2px_4px_rgba(34,197,94,0.3)]" />
            <span className="truncate">Nutrition</span>
          </TabsTrigger>

          <TabsTrigger
            value="shipping"
            className="relative px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-2 group"
            style={{
              background: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)',
            }}
          >
            <Truck className="w-4 h-4 transition-all duration-300 group-data-[state=active]:text-[var(--color-primary)] group-data-[state=active]:drop-shadow-[0_2px_4px_rgba(34,197,94,0.3)]" />
            <span className="truncate">Shipping</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="specifications" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              className="p-8 shadow-sm"
              style={{
                borderColor: 'var(--color-border-primary)',
                background: 'var(--color-bg-primary)',
              }}
            >
              <h3
                className="font-semibold text-xl mb-6 flex items-center gap-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <Package
                  className="w-6 h-6"
                  style={{ color: 'var(--color-primary)' }}
                />
                Product Specifications
              </h3>
              <div className="space-y-5">
                {Object.entries(product.specifications || {}).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-3 border-b last:border-b-0"
                      style={{ borderColor: 'var(--color-border-primary)' }}
                    >
                      <span
                        className="text-base font-medium capitalize"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span
                        className="text-base font-semibold text-right"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </Card>

            <Card
              className="p-8 shadow-sm"
              style={{
                borderColor: 'var(--color-border-primary)',
                background: 'var(--color-bg-primary)',
              }}
            >
              <h3
                className="font-semibold text-xl mb-6 flex items-center gap-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <Calendar
                  className="w-6 h-6"
                  style={{ color: 'var(--color-primary)' }}
                />
                Seasonal Information
              </h3>
              <div className="space-y-5">
                {Object.entries(product.seasons || {}).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-3 border-b last:border-b-0"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <span
                      className="text-base font-medium capitalize"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span
                      className="text-base font-semibold text-right"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="mt-8">
          <Card
            className="p-8 shadow-sm"
            style={{
              borderColor: 'var(--color-border-primary)',
              background: 'var(--color-bg-primary)',
            }}
          >
            <h3
              className="font-semibold text-xl mb-6 flex items-center gap-3"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <Star
                className="w-6 h-6"
                style={{ color: 'var(--color-primary)' }}
              />
              Nutritional Information
            </h3>
            {product.nutrition ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4
                    className="font-medium text-lg"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Vitamins
                  </h4>
                  <div className="space-y-3">
                    {product.nutrition.vitamins?.map((vitamin, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle
                          className="w-5 h-5"
                          style={{ color: 'var(--color-primary)' }}
                        />
                        <span
                          className="text-base"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          Vitamin {vitamin}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4
                    className="font-medium text-lg"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Minerals
                  </h4>
                  <div className="space-y-3">
                    {product.nutrition.minerals?.map((mineral, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle
                          className="w-5 h-5"
                          style={{ color: 'var(--color-primary)' }}
                        />
                        <span
                          className="text-base"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {mineral}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4
                    className="font-medium text-lg"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Nutrition Facts
                  </h4>
                  <div className="space-y-3 text-base">
                    <div
                      className="flex justify-between"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <span>Calories</span>
                      <span className="font-medium">
                        {product.nutrition.calories || 'N/A'}
                      </span>
                    </div>
                    {product.nutrition.fiber && (
                      <div
                        className="flex justify-between"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        <span>Fiber</span>
                        <span className="font-medium">
                          {product.nutrition.fiber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p
                className="text-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Nutritional information available upon request.
              </p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-8">
          <Card
            className="p-8 shadow-sm"
            style={{
              borderColor: 'var(--color-border-primary)',
              background: 'var(--color-bg-primary)',
            }}
          >
            <h3
              className="font-semibold text-xl mb-6 flex items-center gap-3"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <Truck
                className="w-6 h-6"
                style={{ color: 'var(--color-primary)' }}
              />
              Shipping & Logistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <h4
                  className="font-medium text-lg"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Delivery Information
                </h4>
                <div className="space-y-4 text-base">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      Processing Time
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      1-2 business days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      Shipping Time
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      3-7 business days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      Temperature Control
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Refrigerated
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <h4
                  className="font-medium text-lg"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Packaging Options
                </h4>
                <div className="space-y-3">
                  {getPackagingOptions().map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle
                        className="w-5 h-5"
                        style={{ color: 'var(--color-primary)' }}
                      />
                      <span
                        className="text-base"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Main Product Display Component
const ProductDisplay = ({ product, category }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    const fromProducts =
      document.referrer.includes('/products') || window.history.state?.idx > 0;

    if (fromProducts && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/products');
    }
  };

  const features = [
    {
      icon: Shield,
      label: 'Quality Certified',
      value: 'GlobalGAP & ISO 22000',
    },
    { icon: Truck, label: 'Fast Shipping', value: '22-30 Business Days' },
    { icon: Users, label: 'Farm Partners', value: '2000+ Sustainable Farms' },
    { icon: Globe, label: 'Global Reach', value: '12+ Countries' },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-2 lg:mb-4"
            style={{ marginTop: '1.5rem' }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="group hover:border transition-all duration-300 mt-2 mb-2"
              style={{
                borderColor: 'var(--color-primary-200)',
                background: 'var(--color-bg-primary)',
              }}
              onClick={handleBackClick}
            >
              <span className="flex items-center gap-2 transition-colors group-hover:text-emerald-600">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span style={{ color: 'var(--color-text-muted)' }}>Back</span>
              </span>
            </Button>
          </motion.div>

          {/* MOBILE VIEW: Product Info FIRST, then Image */}
          <div className="lg:hidden space-y-8">
            {/* Product Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductInfo product={product} category={category} />
            </motion.section>

            {/* Product Image */}
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <ProductImage product={product} category={category} />

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-4 text-center">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                      style={{ background: 'var(--color-primary-50)' }}
                    >
                      <feature.icon
                        className="w-6 h-6"
                        style={{ color: 'var(--color-primary)' }}
                      />
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {feature.label}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {feature.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* DESKTOP VIEW: Original Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Product Image */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <ProductImage product={product} category={category} />

              {/* Trust Features */}
              <div className="grid grid-cols-4 gap-4 text-center">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                      style={{ background: 'var(--color-primary-50)' }}
                    >
                      <feature.icon
                        className="w-6 h-6"
                        style={{ color: 'var(--color-primary)' }}
                      />
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {feature.label}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {feature.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Right Column - Product Information */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ProductInfo product={product} category={category} />
            </motion.section>
          </div>

          {/* Product Details */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 lg:mt-24"
          >
            <ProductDetails product={product} />
          </motion.section>

          {/* Related Products */}
          <RelatedProducts currentProduct={product} category={category} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Component
export default function ProductPage() {
  const { id } = useParams();
  const { product, category, loading, error } = useProductById(id);

  useEffect(() => {
    if (product && product.name) {
      document.title = `${product.name} - Alvanta`;
    }
  }, [product]);

  // Show skeleton during loading
  if (loading) {
    return <ProductSkeleton />;
  }

  // Show error if product not found
  if (error || !product) {
    return <ErrorDisplay error={error} id={id} />;
  }

  return <ProductDisplay product={product} category={category} />;
}
