import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Globe,
  FileCheck,
  Download,
  Mail,
  CheckCircle,
  Lock,
  Eye,
  Clock,
  Users,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

// Floating Icons
const FloatingIcons = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className="absolute top-20 right-20 opacity-10"
      style={{ color: 'var(--color-primary-500)' }}
    >
      <Shield className="w-40 h-40" />
    </motion.div>
    <motion.div
      animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2,
      }}
      className="absolute bottom-32 left-16 opacity-10"
      style={{ color: 'var(--color-success)' }}
    >
      <Lock className="w-36 h-36" />
    </motion.div>
    <motion.div
      animate={{ x: [-20, 30, -20] }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1,
      }}
      className="absolute top-1/3 right-1/4 opacity-10"
      style={{ color: 'var(--color-primary-400)' }}
    >
      <Globe className="w-28 h-28" />
    </motion.div>
  </div>
);

const SectionContainer = ({ children, className = '' }) => (
  <div
    className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
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

export default function GDPRCompliance() {
  const navigate = useNavigate();

  const complianceFeatures = [
    {
      icon: Shield,
      title: 'Dedicated Data Protection Officer (DPO)',
      desc: 'Our DPO ensures full compliance with GDPR and oversees all data practices.',
      detail: 'Contact: contact@alvantaexport.com',
    },
    {
      icon: FileCheck,
      title: 'Data Processing Agreement (DPA)',
      desc: 'Legally binding DPA available for all enterprise and B2B clients.',
      detail: 'Downloadable in PDF format',
    },
    {
      icon: Download,
      title: 'Right to Data Portability',
      desc: 'Request your data in structured, machine-readable format (JSON/CSV).',
      detail: 'Processed within 30 days',
    },
    {
      icon: Globe,
      title: 'EU Data Residency',
      desc: 'All personal data stored on GDPR-compliant servers in Frankfurt, Germany.',
      detail: 'AWS EU-Central-1',
    },
  ];

  const userRights = [
    {
      icon: Eye,
      title: 'Access',
      desc: 'View all personal data we hold about you.',
    },
    {
      icon: Lock,
      title: 'Rectification',
      desc: 'Correct inaccurate or incomplete data.',
    },
    {
      icon: AlertCircle,
      title: 'Erasure',
      desc: 'Request deletion of your data ("Right to be Forgotten").',
    },
    {
      icon: Clock,
      title: 'Restriction',
      desc: 'Limit processing under certain conditions.',
    },
    {
      icon: Users,
      title: 'Objection',
      desc: 'Object to processing for marketing or profiling.',
    },
  ];

  useEffect(() => {
    document.title = 'GDPR - Alvanta';
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
        {/* HERO SECTION */}
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
                  GDPR Compliant Since 2020
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
                style={{
                  background: 'var(--gradient-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                GDPR Compliance
                <span
                  className="block text-3xl sm:text-4xl mt-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Your Data, Your Rights
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Alvanta is fully compliant with the EU General Data Protection
                Regulation (GDPR). We prioritize transparency, security, and
                your control over personal data.
              </motion.p>
            </motion.div>
          </SectionContainer>
        </section>

        {/* FEATURES GRID */}
        <section className="py-16 lg:py-20">
          <SectionContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {complianceFeatures.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  <Card
                    className="p-6 lg:p-8 h-full backdrop-blur-sm border transition-all duration-300 group"
                    style={{
                      background: 'var(--gradient-card)',
                      boxShadow: 'var(--shadow-lg)',
                      borderColor: 'var(--color-border-primary)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl p-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                        style={{
                          background: 'var(--gradient-primary)',
                        }}
                      >
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-xl font-bold mb-2"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="mb-2"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          {item.desc}
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-primary-600)' }}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* GDPR RIGHTS */}
        <section
          className="py-16 lg:py-20"
          style={{ backgroundColor: 'var(--color-bg-muted)' }}
        >
          <SectionContainer>
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={stagger}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Your GDPR Rights
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg max-w-2xl mx-auto"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Under GDPR, you have full control over your personal data.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRights.map((right, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    className="p-6 text-center h-full hover:shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--color-bg-primary)',
                      boxShadow: 'var(--shadow)',
                      borderColor: 'var(--color-border-primary)',
                    }}
                  >
                    <right.icon
                      className="w-10 h-10 mx-auto mb-3"
                      style={{ color: 'var(--color-primary-600)' }}
                    />
                    <h4
                      className="font-bold text-lg mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {right.title}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {right.desc}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* LEGAL BASIS */}
        <section className="py-16 lg:py-20">
          <SectionContainer>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-2xl font-bold mb-4 flex items-center gap-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <FileCheck
                    className="w-7 h-7"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  Legal Basis for Processing
                </h3>
                <ul
                  className="space-y-3"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--color-success)' }}
                    />
                    <span>
                      <strong>Contract:</strong> To fulfill orders and deliver
                      products.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--color-success)' }}
                    />
                    <span>
                      <strong>Consent:</strong> For marketing emails and
                      cookies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--color-success)' }}
                    />
                    <span>
                      <strong>Legal Obligation:</strong> Tax and export
                      compliance.
                    </span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-2xl font-bold mb-4 flex items-center gap-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <Clock
                    className="w-7 h-7"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                  Data Retention Policy
                </h3>
                <ul
                  className="space-y-3"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <li>
                    <strong>Customer Data:</strong> 7 years (tax law)
                  </li>
                  <li>
                    <strong>Inactive Accounts:</strong> Deleted after 3 years
                  </li>
                  <li>
                    <strong>Marketing Consent:</strong> Revocable anytime
                  </li>
                  <li>
                    <strong>Logs:</strong> 12 months max
                  </li>
                </ul>
              </motion.div>
            </div>
          </SectionContainer>
        </section>

        {/* DATA SUBJECT REQUEST */}
        <section
          className="py-16 lg:py-20"
          style={{
            background: 'var(--gradient-primary-subtle)',
          }}
        >
          <SectionContainer>
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={stagger}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp}>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Submit a Data Request
                </h2>
                <p
                  className="text-lg mb-8"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Exercise your rights under GDPR — free of charge, within 30
                  days.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="rounded-3xl p-8 lg:p-12 shadow-2xl border backdrop-blur-sm"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  boxShadow: 'var(--shadow-2xl)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  {[
                    { action: 'Access Data', icon: Eye },
                    { action: 'Delete Data', icon: AlertCircle },
                    { action: 'Export Data', icon: Download },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <item.icon
                        className="w-10 h-10 mx-auto"
                        style={{ color: 'var(--color-primary-600)' }}
                      />
                      <p
                        className="font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {item.action}
                      </p>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  size="lg"
                  className="mt-8 group w-full md:w-auto mx-auto"
                  style={{
                    background: 'var(--gradient-primary)',
                    boxShadow: 'var(--shadow-glow)',
                    color: '#fff',
                  }}
                  onClick={() => navigate('/contact?subject=GDPR Request')}
                >
                  <a href="mailto:contact@alvantaexport.com?subject=GDPR Data Request">
                    Submit Request
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* CTA */}
        <section
          className="py-20 lg:py-28 text-white"
          style={{
            background:
              'linear-gradient(135deg, var(--color-gray-900) 0%, var(--color-primary-900) 50%, var(--color-gray-900) 100%)',
          }}
        >
          <SectionContainer>
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={stagger}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto space-y-8"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              >
                Questions About Your Data?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg"
                style={{ color: 'var(--color-gray-100)' }}
              >
                Our team is here to help with any GDPR inquiry.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="group text-base px-8"
                  style={{
                    backgroundColor: 'var(--color-primary-600)',
                    color: 'white',
                  }}
                >
                  <a href="mailto:contact@alvantaexport.com">
                    Email Team
                    <Mail className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 group"
                >
                  <a href="/privacy">
                    View Privacy Policy
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-sm"
                style={{ color: 'var(--color-gray-100)' }}
              >
                Contact:{' '}
                <span className="font-medium">contact@alvantaexport.com</span>
              </motion.p>
            </motion.div>
          </SectionContainer>
        </section>
      </div>
    </div>
  );
}
