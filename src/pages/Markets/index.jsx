import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Target,
  Users,
  DollarSign,
  Globe,
  Rocket,
  TrendingUp,
  Leaf,
  Package,
  Heart,
  Network,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

// Market Sector Card
const MarketSectorCard = ({ sector, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div
        className="h-full p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:border-primary/50"
        style={{
          background: 'var(--gradient-card)',
          borderColor: 'var(--color-border-primary)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'var(--gradient-primary-soft)',
              color: 'var(--color-primary-600)',
            }}
          >
            <sector.icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="text-xl font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {sector.title}
              </h3>
              {sector.badge && (
                <Badge
                  variant="secondary"
                  className="text-xs"
                  style={{
                    background: 'var(--color-primary-bg)',
                    color: 'var(--color-primary-700)',
                    borderColor: 'var(--color-primary-200)',
                  }}
                >
                  {sector.badge}
                </Badge>
              )}
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {sector.description}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--color-text-muted)' }}>
              Projected Impact
            </span>
            <span
              className="font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {sector.impact}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--color-text-muted)' }}>
              Launch Timeline
            </span>
            <span
              className="font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {sector.timeline}
            </span>
          </div>
        </div>

        <div>
          <h4
            className="text-sm font-medium mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Key Features
          </h4>
          <div className="space-y-1">
            {sector.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle
                  className="w-3 h-3 flex-shrink-0"
                  style={{ color: 'var(--color-primary-500)' }}
                />
                <span
                  className="text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center p-6 rounded-lg border"
      style={{
        background: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <stat.icon
        className="w-8 h-8 mx-auto mb-3"
        style={{ color: 'var(--color-primary-500)' }}
      />
      <div
        className="text-2xl font-bold mb-1"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {stat.value}
      </div>
      <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {stat.label}
      </div>
    </motion.div>
  );
};

// Milestone Component
const MilestoneItem = ({ milestone, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm"
          style={{
            background: 'var(--gradient-primary)',
            color: 'var(--color-primary-foreground)',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          {milestone.year}
        </div>
        {!isLast && (
          <div
            className="w-0.5 h-8 mt-2 flex-1"
            style={{ background: 'var(--color-border-primary)' }}
          />
        )}
      </div>
      <div className="flex-1 pb-8">
        <h4
          className="text-lg font-semibold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {milestone.title}
        </h4>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function MarketsPage() {
  // Market sectors
  const marketSectors = [
    {
      id: 'smart-agriculture',
      title: 'Smart Agriculture',
      description:
        'AI-powered precision farming solutions for increased yield and efficiency.',
      icon: Network,
      impact: '40% Yield Increase',
      timeline: '2024-2025',
      badge: 'Active',
      features: [
        'AI crop monitoring',
        'Precision irrigation',
        'Automated pest detection',
        'Yield optimization',
      ],
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain',
      description:
        'Blockchain-enabled transparent and efficient agricultural supply chains.',
      icon: Package,
      impact: '60% Waste Reduction',
      timeline: '2025-2026',
      badge: 'Development',
      features: [
        'Blockchain traceability',
        'Logistics optimization',
        'Quality automation',
        'Waste reduction systems',
      ],
    },
    {
      id: 'sustainability',
      title: 'Sustainable Solutions',
      description:
        'Eco-friendly technologies for environmental stewardship and resource conservation.',
      icon: Leaf,
      impact: '50% Water Savings',
      timeline: '2026-2027',
      badge: 'Planning',
      features: [
        'Carbon tracking',
        'Water conservation',
        'Renewable energy',
        'Soil health monitoring',
      ],
    },
    {
      id: 'farmer-empower',
      title: 'Farmer Empower',
      description:
        'Tools and platforms connecting farmers directly to global markets.',
      icon: Heart,
      impact: '3x Income Growth',
      timeline: '2024-2025',
      badge: 'Active',
      features: [
        'Direct market access',
        'Real-time pricing',
        'Mobile platforms',
        'Community networks',
      ],
    },
  ];

  // Statistics data
  const statistics = [
    { icon: Target, value: '100%', label: 'Accuracy Rate' },
    { icon: Users, value: '2,500+', label: 'Farmers Served' },
    { icon: Globe, value: '40+', label: 'Countries' },
    { icon: TrendingUp, value: '300%', label: 'Revenue Growth' },
  ];

  // Milestones data
  const milestones = [
    {
      year: '2024',
      title: 'Product Launch & Seed Funding',
      description:
        'Initial platform deployment and strategic partnerships with early adopters.',
    },
    {
      year: '2025',
      title: 'Market Expansion & Series A',
      description:
        'Scale operations across key regions and secure growth funding.',
    },
    {
      year: '2026',
      title: 'Global Technology Partnerships',
      description:
        'Establish international distribution and platform integration networks.',
    },
    {
      year: '2027',
      title: 'Industry Leadership',
      description:
        'Become the recognized standard in agricultural technology solutions.',
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Hero Section */}
      <section
        className="relative py-20 lg:py-32 px-6"
        style={{
          background: 'var(--gradient-hero)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-800">
              <Rocket className="w-4 h-4 mr-2" />
              Agriculture Technology
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Transforming Agriculture
            <span className="block bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-transparent">
              Through Innovation & Technology
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Building the future of sustainable farming with cutting-edge
            technology solutions that empower farmers and transform global food
            systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="gap-2 group"
              style={{
                background: 'var(--gradient-primary)',
                color: 'var(--color-primary-foreground)',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              <Link to="/contact">
                Start Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-border text-foreground hover:scale-105 hover:bg-primary/8 hover:border-primary transition-all duration-300"
            >
              <Link to="/about">About us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        className="py-16 px-6"
        style={{
          background: 'var(--color-bg-secondary)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Proven Results
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Delivering measurable impact through innovative agricultural
              technology solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {statistics.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Market Sectors Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Our Innovation Sectors
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Strategic focus areas driving the future of sustainable
              agriculture through technology and innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketSectors.map((sector, index) => (
              <MarketSectorCard key={sector.id} sector={sector} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Growth Timeline Section */}
      <section
        className="py-20 px-6"
        style={{
          background: 'var(--color-bg-secondary)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Strategic Roadmap
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Our journey from innovative startup to industry leader in
              agricultural technology.
            </p>
          </motion.div>

          <div className="space-y-1">
            {milestones.map((milestone, index) => (
              <MilestoneItem
                key={index}
                milestone={milestone}
                index={index}
                isLast={index === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center rounded-2xl p-12 border"
            style={{
              background: 'var(--gradient-primary-bold)',
              borderColor: 'var(--color-primary-700)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <DollarSign
              className="w-12 h-12 mx-auto mb-6"
              style={{ color: 'var(--color-primary-foreground)' }}
            />
            <Badge
              className="mb-4"
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'var(--color-primary-foreground)',
                borderColor: 'rgba(255,255,255,0.3)',
              }}
            >
              Investment Opportunity
            </Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: 'var(--color-primary-foreground)' }}
            >
              Join the Agricultural Revolution
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-90"
              style={{ color: 'var(--color-primary-foreground)' }}
            >
              Invest in sustainable technology that addresses global food
              security challenges while delivering substantial financial returns
              and positive environmental impact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="text-center p-4">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
                  EGP 2.5M
                </div>
                <div
                  className="text-sm opacity-80"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
                  Seed Round
                </div>
              </div>
              <div className="text-center p-4">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
                  3.2x
                </div>
                <div
                  className="text-sm opacity-80"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
                  Projected ROI
                </div>
              </div>
              <div className="text-center p-4">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
                  85%
                </div>
                <div
                  className="text-sm opacity-80"
                  style={{ color: 'var(--color-primary-foreground)' }}
                >
                  Market Readiness
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="gap-2 group"
                style={{
                  background: 'var(--color-primary-foreground)',
                  color: 'var(--color-primary-700)',
                  boxShadow: 'var(--shadow-glow-strong)',
                }}
              >
                <Link to="/quote">
                  Request Investor Deck
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </Button>
              <Button
                asChild
                className="group"
                variant="outline"
                size="lg"
                style={{
                  borderColor: 'var(--color-primary-foreground)',
                  color: 'var(--color-primary-foreground)',
                }}
              >
                <Link to="/contact">
                  <Calendar className="w-4 h-4 group-hover:scale-110 transition" />
                  Schedule Meeting
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
