import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen,
  FileText,
  Headphones,
  Mail,
  MessageCircle,
  ArrowRight,
  Zap,
  CheckCircle,
  Globe,
  Shield,
  Clock,
  Users,
  Target,
  BarChart3,
  Award,
  Leaf,
  DollarSign,
  Truck,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

export default function HelpPage() {
  // Floating orbs
  const FloatingOrbs = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[
        {
          size: 140,
          x: '10%',
          y: '15%',
          color: 'var(--color-primary-400)',
          delay: 0,
        },
        {
          size: 100,
          x: '85%',
          y: '25%',
          color: 'var(--color-success)',
          delay: 0.3,
        },
        {
          size: 120,
          x: '70%',
          y: '60%',
          color: 'var(--color-info)',
          delay: 0.6,
        },
        {
          size: 80,
          x: '20%',
          y: '70%',
          color: 'var(--color-warning)',
          delay: 0.9,
        },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-15"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            left: orb.x,
            top: orb.y,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: orb.delay }}
        />
      ))}
    </div>
  );

  // Resources
  const resources = [
    {
      icon: BookOpen,
      title: 'Complete Export Guide',
      desc: 'Comprehensive guide covering everything from farm preparation to international delivery.',
      features: [
        'Step-by-step export process',
        'Market selection strategy',
        'Documentation requirements',
        'Quality standards',
      ],
      cta: { text: 'Request Guide', to: '/quote' },
      badge: 'Most Popular',
    },
    {
      icon: FileText,
      title: 'Export Compliance Kit',
      desc: 'All necessary templates and checklists for international compliance and customs documentation.',
      features: [
        'Customs declaration forms',
        'Phytosanitary certificates',
        'Quality inspection checklists',
        'Shipping manifests',
      ],
      cta: { text: 'Request Templates', to: '/quote' },
      badge: 'Essential',
    },
    {
      icon: Headphones,
      title: '24/7 Expert Support',
      desc: 'Direct access to our agricultural export specialists with quick response times.',
      features: [
        'Live chat support',
        'Video consultations',
        'Emergency hotline',
        'Dedicated account manager',
      ],
      cta: { text: 'Contact Now', to: '/contact' },
      badge: 'Instant Help',
    },
    {
      icon: Globe,
      title: 'Market Intelligence',
      desc: 'Real-time market data, pricing trends, and demand forecasts for international markets.',
      features: [
        'Price analytics dashboard',
        'Demand forecasting',
        'Competitor analysis',
        'Seasonal trends',
      ],
      cta: { text: 'View Markets', to: '/markets' },
      badge: 'Data-Driven',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      desc: 'Comprehensive risk assessment tools and insurance guidance for international exports.',
      features: [
        'Risk assessment calculator',
        'Insurance options',
        'Contract templates',
        'Dispute resolution',
      ],
      cta: { text: 'Assess Risk', to: '/process' },
      badge: 'Secure',
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      desc: 'Track your export performance with detailed analytics and improvement recommendations.',
      features: [
        'Export performance metrics',
        'Profitability analysis',
        'Efficiency tracking',
        'Growth opportunities',
      ],
      cta: { text: 'View Analytics', to: '/about' },
      badge: 'Insights',
    },
  ];

  // FAQ section
  const faqSections = [
    {
      title: 'Getting Started',
      icon: Target,
      questions: [
        {
          q: 'What are the basic requirements to start exporting with Alvanta?',
          a: 'You need verified farm certification, quality produce meeting international standards, and basic documentation. We handle the rest including market matching, logistics, and compliance.',
        },
        {
          q: 'How long does it take to complete my first export?',
          a: 'Typically 2-4 weeks from initial consultation to shipment. With our expedited process, some clients complete their first export in under 10 days.',
        },
        {
          q: 'What types of agricultural products can I export?',
          a: "We support fruits, vegetables, grains, spices, nuts, and specialty crops. Each product category has specific market opportunities and requirements we'll guide you through.",
        },
      ],
    },
    {
      title: 'Pricing & Payments',
      icon: DollarSign,
      questions: [
        {
          q: 'What are your service fees and commission structure?',
          a: 'We operate on a success-based commission model (5-15% depending on product and market) with no upfront fees. Detailed pricing is available in our transparent fee calculator.',
        },
        {
          q: 'How and when do I receive payments?',
          a: 'Payments are secured through escrow and released upon successful delivery. Most farmers receive payment within 7-10 days of shipment confirmation.',
        },
        {
          q: 'Are there any hidden costs or unexpected fees?',
          a: 'No hidden costs. We provide complete cost breakdowns including shipping, insurance, certifications, and our commission before you commit to any shipment.',
        },
      ],
    },
    {
      title: 'Logistics & Shipping',
      icon: Truck,
      questions: [
        {
          q: 'How do you ensure product quality during shipping?',
          a: 'We use temperature-controlled logistics, real-time monitoring, and quality checkpoints. Our partners maintain cold chain integrity from farm to destination.',
        },
        {
          q: 'What shipping methods and timelines can I expect?',
          a: 'We optimize for speed and cost - air freight (2-5 days), sea freight (15-30 days), or hybrid solutions. Each option includes full tracking and insurance.',
        },
        {
          q: 'Who handles customs clearance and import duties?',
          a: 'Our dedicated customs brokerage team handles all clearance procedures, duty calculations, and regulatory compliance in both origin and destination countries.',
        },
      ],
    },
  ];

  // Success metrics
  const successMetrics = [
    { icon: Users, value: '2,500+', label: 'Farmers Empowered' },
    { icon: Globe, value: '40+', label: 'Countries Served' },
    { icon: Award, value: '98.7%', label: 'Success Rate' },
    { icon: Clock, value: '48h', label: 'Average Quote Time' },
    { icon: Leaf, value: '10k+', label: 'Tons Exported' },
    { icon: CheckCircle, value: '4.9/5', label: 'Farmer Rating' },
  ];

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300"
        style={{
          padding: '5rem 0 3rem 0',
          background: 'var(--gradient-hero)',
        }}
      >
        <FloatingOrbs />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              className="mb-6 text-sm px-5 py-2 backdrop-blur-sm transition-colors duration-300"
              style={{
                background: 'var(--color-primary-50)',
                color: 'var(--color-primary-700)',
                borderColor: 'var(--color-primary-200)',
              }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Comprehensive Help Center
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span
              className="block"
              style={{
                background: 'var(--gradient-text)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Export Success Made Simple & Profitable
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl mb-10 max-w-4xl mx-auto leading-relaxed transition-colors duration-300"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Your complete guide to transforming local harvests into global
            revenue streams. Learn how{' '}
            <strong style={{ color: 'var(--color-primary)' }}>
              2,500+ farmers
            </strong>{' '}
            are increasing profits by 300% using our AI-powered export platform.
          </motion.p>

          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {successMetrics.map((metric, index) => (
              <div
                key={index}
                className="text-center p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <metric.icon
                  className="w-6 h-6 mx-auto mb-2 transition-colors duration-300"
                  style={{ color: 'var(--color-primary)' }}
                />
                <div
                  className="text-lg font-bold transition-colors duration-300"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {metric.value}
                </div>
                <div
                  className="text-xs transition-colors duration-300"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="text-base px-10 py-6 group transition-all duration-300"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-lg)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              <Link to="/quote">
                Get Free Assessment
                <MessageCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-10 py-6 group transition-all duration-300"
              style={{
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
                background: 'var(--color-bg-primary)',
              }}
            >
              <Link to="/contact" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Contact
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="relative bg-[var(--color-bg-primary)] overflow-visible">
        <div className="py-20 px-6 lg:px-12">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-5xl mx-auto mb-16"
          >
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Everything You Need for Export Success
            </h1>
            <p
              className="text-lg lg:text-xl leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Comprehensive resources, tools, and expert support to transform
              your agricultural business into a global export powerhouse.
            </p>
          </motion.div>

          {/* Resource Cards Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20">
            {resources.map((item, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-100px' });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div
                    className="h-full p-6 rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-xl"
                    style={{
                      background: 'var(--gradient-card)',
                      borderColor: 'var(--color-border-primary)',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    {item.badge && (
                      <Badge
                        className="mb-3 text-xs px-2 py-1"
                        variant="secondary"
                      >
                        {item.badge}
                      </Badge>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{
                          background: 'var(--gradient-primary-soft)',
                        }}
                      >
                        <item.icon
                          className="w-6 h-6"
                          style={{ color: 'var(--color-primary-600)' }}
                        />
                      </div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className="mb-4 text-base leading-relaxed"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {item.desc}
                    </p>

                    <div className="mb-4 space-y-2">
                      {item.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="w-full group/button py-4 text-sm font-semibold hover:text-white"
                      style={{
                        background: 'var(--gradient-primary)',
                        boxShadow: 'var(--shadow-glow)',
                      }}
                    >
                      <Link
                        to={item.cta.to}
                        className="flex items-center justify-center"
                      >
                        {item.cta.text}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-20"
          >
            <div className="text-center mb-12">
              <h2
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Get immediate answers to the most common questions about
                agricultural exports, logistics, and growing your business
                globally.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {faqSections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <section.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {section.questions.map((faq, faqIndex) => (
                      <div
                        key={faqIndex}
                        className="border-b border-gray-200/50 dark:border-gray-700/50 pb-4 last:border-b-0 last:pb-0"
                      >
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                          {faq.q}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Support CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-8 text-white">
              <Headphones className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Our agricultural export specialists are ready to provide
                personalized guidance for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="px-8 py-5 bg-white text-emerald-600 hover:bg-gray-100 hover:text-emerald-800 text-base font-semibold group"
                >
                  <Link to="/contact">
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Start Messaging
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-5 border-white text-white hover:bg-white hover:text-emerald-600 text-base font-semibold"
                >
                  <Link to="/quote">
                    <Mail className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
              <div className="mt-4 text-xs opacity-80">
                Average response time: <strong>2 minutes</strong> • Available
                24/7
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
