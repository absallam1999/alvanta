import { motion } from 'framer-motion';
import { Cookie, Settings, XCircle, Check, Globe } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

// Floating Icons
const FloatingIcons = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{ y: [0, -25, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-32 left-12 opacity-10"
      style={{ color: 'var(--color-primary-500)' }}
    >
      <Cookie className="w-28 h-28" />
    </motion.div>
  </div>
);

const SectionContainer = ({ children, className = '' }) => (
  <div
    className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    style={{ padding: 'var(--container-padding)' }}
  >
    {children}
  </div>
);

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fadeInUp = {
  initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function CookiesPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <FloatingIcons />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-20">
          <SectionContainer>
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-center"
            >
              <motion.div variants={fadeInUp}>
                <Badge
                  className="mb-4 px-4 py-1.5 text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-primary-100)',
                    color: 'var(--color-primary-700)',
                  }}
                >
                  Updated: October, 2025
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{
                  background: 'var(--gradient-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Cookie Policy
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                We use cookies to enhance your experience. This policy explains
                what they are and how to manage them.
              </motion.p>
            </motion.div>
          </SectionContainer>
        </section>

        {/* Cookie Types Section */}
        <section className="py-16 lg:py-20">
          <SectionContainer>
            <div className="space-y-8">
              {/* Essential Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card
                  className="p-6 backdrop-blur-sm border transition-all duration-300 group"
                  style={{
                    background: 'var(--gradient-card)',
                    boxShadow: 'var(--shadow)',
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <Check
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      style={{ color: 'var(--color-success)' }}
                    />
                    Essential Cookies
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Required for login, cart, and basic site functionality.
                  </p>
                </Card>
              </motion.div>

              {/* Analytics Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card
                  className="p-6 backdrop-blur-sm border transition-all duration-300 group"
                  style={{
                    background: 'var(--gradient-card)',
                    boxShadow: 'var(--shadow)',
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <Settings
                      className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500"
                      style={{ color: 'var(--color-primary-600)' }}
                    />
                    Analytics Cookies
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Help us improve performance and user experience (Google
                    Analytics).
                  </p>
                </Card>
              </motion.div>

              {/* How to Disable */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card
                  className="p-6 backdrop-blur-sm border transition-all duration-300 group"
                  style={{
                    background: 'var(--gradient-card)',
                    boxShadow: 'var(--shadow)',
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <XCircle
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      style={{ color: 'var(--color-error)' }}
                    />
                    How to Disable
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Use your browser settings or our{' '}
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium underline-offset-4 hover:underline"
                      style={{
                        color: 'var(--color-primary-600)',
                      }}
                    >
                      Cookie Preferences
                    </Button>{' '}
                    tool.
                  </p>
                </Card>
              </motion.div>
            </div>
          </SectionContainer>
        </section>
      </div>
    </div>
  );
}
