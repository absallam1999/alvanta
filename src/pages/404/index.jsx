import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Home,
  Package,
  Users,
  Mail,
  ArrowLeft,
  Leaf,
  Sprout,
  Trees,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';

const FloatingIcons = () => {
  const icons = [Leaf, Sprout, Trees, Package, Leaf, Sprout];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          initial={{ y: -200, x: Math.random() * 100 - 50, rotate: 0 }}
          animate={{
            y: [null, window.innerHeight + 200],
            x: [null, Math.random() * 300 - 150],
            rotate: [0, 360],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 3,
          }}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            color: 'var(--color-gray-400)',
            opacity: 0.06,
            fontSize: '4rem',
            filter: 'blur(1px)',
          }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
};

const quickActions = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Products', href: '/products', icon: Package },
  { title: 'About', href: '/about', icon: Users },
  { title: 'Contact', href: '/contact', icon: Mail },
];

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      <FloatingIcons />

      <div className="max-w-4xl w-full text-center relative z-10 mt-12">
        {/* 404 Number with Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative mb-8 h-32 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1, type: 'spring', stiffness: 80 }}
            className="text-8xl md:text-9xl font-bold text-[var(--color-primary-600)]"
          >
            404
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.5,
              type: 'spring',
              stiffness: 200,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <AlertTriangle className="w-16 h-16 text-[var(--color-warning)] animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[var(--color-gray-900)] mb-4"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-[var(--color-gray-900)] max-w-md mx-auto mb-8"
        >
          The page you're looking for has vanished into the fields. Let's guide
          you back to fertile ground.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          {/* Back to Home Button */}
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-700)] hover:text-white font-semibold px-8 transition-colors duration-200"
            >
              <Link
                to="/"
                className="flex items-center gap-2 text-[var(--color-primary-foreground)]"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-50)] dark:hover:bg-[var(--color-primary-950)] font-semibold px-8 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-[var(--color-bg-secondary)] rounded-2xl p-8 border border-[var(--color-border-primary)] shadow-sm"
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-xl font-bold mb-6 text-[var(--color-gray-900)]"
          >
            Quick Navigation
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={action.href}
                    className="group bg-[var(--color-bg-tertiary)] rounded-xl p-4 border border-[var(--color-border-muted)] hover:border-[var(--color-primary-300)] dark:hover:border-[var(--color-primary-600)] transition-all duration-300 block text-center hover:shadow-md"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                      {action.title}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
