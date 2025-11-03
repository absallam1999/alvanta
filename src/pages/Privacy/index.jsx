import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Globe,
  Cookie,
  Eye,
  Mail,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

// Floating Icons
const FloatingIcons = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute top-20 left-10 opacity-10"
      style={{ color: 'var(--color-primary-500)' }}
    >
      <Shield className="w-32 h-32" />
    </motion.div>
    <motion.div
      animate={{ y: [0, 40, 0], rotate: [0, -180, -360] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 2 }}
      className="absolute bottom-32 right-20 opacity-10"
      style={{ color: 'var(--color-success)' }}
    >
      <Lock className="w-28 h-28" />
    </motion.div>
    <motion.div
      animate={{ x: [-20, 30, -20], y: [0, -20, 0] }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1,
      }}
      className="absolute top-1/3 left-1/4 opacity-10"
      style={{ color: 'var(--color-primary-400)' }}
    >
      <Globe className="w-24 h-24" />
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

export default function PrivacyPage() {
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
        {/* Hero */}
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
                  Last Updated: October, 2025
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
                Privacy Policy
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Your privacy is important to us. This policy explains how
                Alvanta collects, uses, and protects your personal information.
              </motion.p>
            </motion.div>
          </SectionContainer>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-20">
          <SectionContainer>
            <div className="space-y-16">
              {/* 1. Information We Collect */}
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
                  <Eye
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  1. Information We Collect
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  We collect information you provide directly, such as when you
                  fill out contact forms, request quotes, or create an account.
                  This includes:
                </p>
                <ul
                  className="mt-4 space-y-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <li>• Name, email, phone number, and company details</li>
                  <li>• Shipping and billing addresses</li>
                  <li>
                    • Payment information (processed securely via third-party
                    gateways)
                  </li>
                  <li>• Communication preferences and inquiry history</li>
                </ul>
              </motion.div>

              {/* 2. How We Use */}
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
                  <FileCheck
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  2. How We Use Your Information
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Your data helps us provide and improve our services:
                </p>
                <ul
                  className="mt-4 space-y-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <li>• Process orders and deliver agricultural products</li>
                  <li>• Respond to inquiries and provide customer support</li>
                  <li>
                    • Send updates about sustainable farming and new products
                  </li>
                  <li>• Comply with legal and export regulations</li>
                </ul>
              </motion.div>

              {/* 3. Data Sharing */}
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
                  <Globe
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  3. Data Sharing & International Transfers
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  We share data only with trusted partners:
                </p>
                <ul
                  className="mt-4 space-y-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <li>• Logistics providers for global shipping</li>
                  <li>• Payment processors (PCI-DSS compliant)</li>
                  <li>• Cloud hosting in EU and US (GDPR-compliant)</li>
                </ul>
                <p
                  className="mt-4 text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  All international data transfers comply with GDPR and Standard
                  Contractual Clauses (SCCs).
                </p>
              </motion.div>

              {/* 4. Cookies */}
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
                  <Cookie
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  4. Cookies & Tracking
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  We use essential and analytics cookies to improve user
                  experience. See our{' '}
                  <a
                    href="/cookies"
                    className="underline"
                    style={{ color: 'var(--color-primary-600)' }}
                  >
                    Cookie Policy
                  </a>{' '}
                  for details.
                </p>
              </motion.div>

              {/* 5. Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-2xl font-bold flex items-center gap-3 mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <Shield
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  5. Your Privacy Rights
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  You have the right to:
                </p>
                <ul
                  className="mt-4 space-y-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <li>• Access, correct, or delete your personal data</li>
                  <li>• Object to processing or request restriction</li>
                  <li>• Data portability</li>
                  <li>• Withdraw consent at any time</li>
                </ul>
                <p
                  className="mt-4"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Contact us at{' '}
                  <a
                    href="mailto:contact@alvantaexport.com"
                    className="underline"
                    style={{ color: 'var(--color-primary-600)' }}
                  >
                    contact@alvantaexport.com
                  </a>
                </p>
              </motion.div>

              {/* 6. Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-2xl font-bold flex items-center gap-3 mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <Lock
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  6. Data Security
                </h2>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  We use encryption (TLS), access controls, and regular audits
                  to protect your data. No method is 100% secure, but we follow
                  industry best practices.
                </p>
              </motion.div>
            </div>
          </SectionContainer>
        </section>

        {/* CTA */}
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
                <AlertCircle
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: 'var(--color-primary-600)' }}
                />
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Questions?
                </h3>
                <p
                  className="mb-6"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Our privacy team is here to help.
                </p>
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
