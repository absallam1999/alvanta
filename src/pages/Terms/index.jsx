import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  Scale,
  Clock,
  Mail,
  AlertTriangle,
  CheckCircle,
  Globe,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const FloatingIcons = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{ y: [0, -40, 0], rotate: [0, 360] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      className="absolute top-24 left-16 opacity-10"
      style={{ color: 'var(--color-primary-500)' }}
    >
      <FileText className="w-36 h-36" />
    </motion.div>
    <motion.div
      animate={{ y: [0, 30, 0], rotate: [0, -360] }}
      transition={{ duration: 19, repeat: Infinity, ease: 'linear', delay: 3 }}
      className="absolute bottom-40 right-16 opacity-10"
      style={{ color: 'var(--color-success)' }}
    >
      <Scale className="w-32 h-32" />
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

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms - Alvanta';
  }, []);

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
                  Effective: October, 2025
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
                Terms of Service
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                By using Alvanta's services, you agree to these terms. Please
                read them carefully.
              </motion.p>
            </motion.div>
          </SectionContainer>
        </section>

        {/* Content Sections */}
        <section className="py-16 lg:py-20">
          <SectionContainer>
            <div className="space-y-16">
              {/* 1. Acceptance of Terms */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-2xl font-bold flex items-center gap-3 mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <CheckCircle
                    className="w-6 h-6"
                    style={{ color: 'var(--color-success)' }}
                  />
                  1. Acceptance of Terms
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  These Terms of Service govern your use of Alvanta's website,
                  products, and services. By accessing or using our platform,
                  you agree to be bound by these terms.
                </p>
              </motion.div>

              {/* 2. International Trade & Compliance */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-2xl font-bold flex items-center gap-3 mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <Globe
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  2. International Trade & Compliance
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  All transactions comply with international export laws,
                  phytosanitary standards, and destination country regulations.
                  You are responsible for import duties and compliance in your
                  jurisdiction.
                </p>
              </motion.div>

              {/* 3. Orders & Delivery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-2xl font-bold flex items-center gap-3 mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <Clock
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  3. Orders & Delivery
                </h2>
                <ul
                  className="space-y-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <li>• Orders are confirmed upon payment and availability</li>
                  <li>
                    • Delivery timelines depend on harvest cycles and logistics
                  </li>
                  <li>
                    • We are not liable for delays due to customs or force
                    majeure
                  </li>
                </ul>
              </motion.div>

              {/* 4. Limitation of Liability */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-2xl font-bold flex items-center gap-3 mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <AlertTriangle
                    className="w-6 h-6"
                    style={{ color: 'var(--color-warning)' }}
                  />
                  4. Limitation of Liability
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Alvanta is not liable for indirect damages, including loss of
                  crops, business interruption, or third-party claims beyond the
                  order value.
                </p>
              </motion.div>
            </div>
          </SectionContainer>
        </section>

        {/* CTA Section */}
        <section
          className="py-16"
          style={{ backgroundColor: 'var(--color-bg-muted)' }}
        >
          <SectionContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card
                className="p-8 text-center backdrop-blur-sm border"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  background: 'var(--gradient-card)',
                  boxShadow: 'var(--shadow-lg)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <FileText
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: 'var(--color-primary-600)' }}
                />
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Need Clarification?
                </h3>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-5 text-base font-semibold group"
                  style={{
                    borderColor: 'var(--color-primary-500)',
                    color: 'var(--color-primary-500)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'var(--color-bg-primary)';
                    e.currentTarget.style.color = 'var(--color-primary-600)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-primary-500)';
                  }}
                >
                  <Link to="/contact">
                    <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Contact Team
                  </Link>
                </Button>
              </Card>
            </motion.div>
          </SectionContainer>
        </section>
      </div>
    </div>
  );
}
