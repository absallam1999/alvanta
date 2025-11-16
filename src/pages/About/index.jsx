import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Leaf,
  Globe,
  Trees,
  BarChart2,
  Award,
  Users,
  Target,
  HeartHandshake,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Sprout,
  Sun,
  Droplets,
  Wind,
  Mountain,
  Shield,
  Factory,
  Ship,
  Warehouse,
  Clock,
} from 'lucide-react';
import { Button } from './../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [expandedValues, setExpandedValues] = useState([]);
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  const sectionRefs = {
    hero: useRef(null),
    stats: useRef(null),
    mission: useRef(null),
    values: useRef(null),
    process: useRef(null),
    impact: useRef(null),
    certifications: useRef(null),
  };

  useEffect(() => {
    const observers = {};

    Object.keys(sectionRefs).forEach((key) => {
      if (!sectionRefs[key].current) return;
      observers[key] = new IntersectionObserver(
        ([entry]) => {
          setIsVisible((prev) => ({
            ...prev,
            [key]: entry.isIntersecting,
          }));
        },
        { threshold: 0.15 }
      );
      observers[key].observe(sectionRefs[key].current);
    });

    return () => {
      Object.values(observers).forEach((obs) => obs.disconnect());
    };
  }, []);

  // Stats
  const stats = [
    {
      icon: Award,
      number: 5,
      label: 'Years of Excellence',
      description: 'Trusted agricultural expertise',
    },
    {
      icon: Users,
      number: 2000,
      label: 'Partner Farms',
      description: 'Smallholder farmers empowered',
    },
    {
      icon: Globe,
      number: 12,
      label: 'Countries Served',
      description: 'Global export network',
    },
    {
      icon: BarChart2,
      number: 100,
      label: 'Client Satisfying',
      suffix: '%',
      description: 'Client-verified satisfying',
    },
  ];

  // Core values
  const values = [
    {
      icon: HeartHandshake,
      title: 'Farmer Empowerment',
      shortDescription:
        'Fair trade partnerships with 2,000+ smallholder farmers',
      fullDescription:
        'We eliminate middlemen and ensure 85%+ of revenue returns directly to farmers. Our comprehensive training programs in regenerative agriculture and direct market access create sustainable livelihoods.',
      benefits: [
        'Fair pricing',
        'Training programs',
        'Direct market access',
        'Community development',
      ],
    },
    {
      icon: Trees,
      title: 'Environmental Stewardship',
      shortDescription: 'Carbon-neutral operations and biodiversity protection',
      fullDescription:
        'Every shipment is carbon-offset through verified programs. We restore degraded land and implement water conservation technologies for sustainable farming practices.',
      benefits: [
        'Carbon offset',
        'Land restoration',
        'Water conservation',
        'Biodiversity protection',
      ],
    },
    {
      icon: Target,
      title: 'Quality Excellence',
      shortDescription: 'Global certifications and blockchain traceability',
      fullDescription:
        'Real-time tracking via blockchain technology from seed to shelf. Third-party audited for food safety, freshness, and sustainability standards across all markets.',
      benefits: [
        'GlobalGAP certified',
        'ISO 22000',
        'Blockchain tracking',
        'Premium quality',
      ],
    },
    {
      icon: Globe,
      title: 'Global Integration',
      shortDescription: 'Serving 12+ countries with optimized logistics',
      fullDescription:
        'We navigate complex international regulations and optimize cold-chain logistics for maximum freshness while maintaining the highest quality standards globally.',
      benefits: [
        '12+ countries',
        'Cold-chain logistics',
        'Regulatory compliance',
        'Fast delivery',
      ],
    },
  ];

  // Supply Chain Process
  const processSteps = [
    {
      step: '01',
      title: 'Farm Selection & Training',
      description:
        'Partnering with certified smallholder farms and providing comprehensive training in sustainable agriculture practices.',
      icon: Users,
      duration: 'Ongoing',
    },
    {
      step: '02',
      title: 'Sustainable Cultivation',
      description:
        'Implementation of regenerative farming techniques and organic practices to ensure premium quality.',
      icon: Leaf,
      duration: 'Growth Cycle',
    },
    {
      step: '03',
      title: 'Quality Harvesting',
      description:
        'Precision harvesting at optimal maturity with immediate quality assessment and blockchain documentation.',
      icon: Award,
      duration: 'Harvest Season',
    },
    {
      step: '04',
      title: 'Processing & Packaging',
      description:
        'State-of-the-art processing facilities with temperature control and eco-friendly packaging solutions.',
      icon: Factory,
      duration: '24-48 hours',
    },
    {
      step: '05',
      title: 'Global Logistics',
      description:
        'Optimized cold-chain transportation with carbon-neutral shipping options and real-time tracking.',
      icon: Ship,
      duration: '2-7 days',
    },
    {
      step: '06',
      title: 'Market Delivery',
      description:
        'Final quality checks and delivery with complete documentation and blockchain-verified provenance.',
      icon: Warehouse,
      duration: '24 hours',
    },
  ];

  // Environmental Impact Data
  const impactData = [
    {
      icon: Sun,
      label: 'Renewable Energy',
      value: '100%',
      description: 'Solar-powered facilities',
    },
    {
      icon: Droplets,
      label: 'Water Saved',
      value: '2.3M',
      suffix: 'L',
      description: 'Annual water conservation',
    },
    {
      icon: Wind,
      label: 'Emissions Reduced',
      value: '85%',
      description: 'Carbon footprint reduction',
    },
    {
      icon: Mountain,
      label: 'Land Restored',
      value: '1,200',
      suffix: 'Ha',
      description: 'Regenerated ecosystems',
    },
  ];

  // Certifications
  const certifications = [
    {
      name: 'GlobalGAP Certified',
      icon: CheckCircle,
      description: 'International standard for good agricultural practices',
    },
    {
      name: 'ISO 22000 Food Safety',
      icon: Shield,
      description: 'Comprehensive food safety management system',
    },
    {
      name: 'Fair Trade International',
      icon: HeartHandshake,
      description: 'Ethical trade and farmer empowerment',
    },
    {
      name: 'Carbon Neutral Certified',
      icon: Trees,
      description: 'Verified carbon offset and reduction',
    },
  ];

  const toggleValue = (index) => {
    setExpandedValues((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const AnimatedCounter = ({
    value,
    label,
    suffix = '',
    icon: Icon,
    description,
  }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const end = parseInt(value);
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => ref.current && observer.unobserve(ref.current);
    }, [value, hasAnimated]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
        className="rounded-xl p-6 border text-center hover:shadow-md transition-all duration-300"
        style={{
          background: 'var(--color-bg-primary)',
          borderColor: 'var(--color-border-primary)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          className="w-12 h-12 mx-auto mb-3 rounded-full p-3 flex items-center justify-center"
          style={{
            background: 'var(--color-primary-50)',
          }}
        >
          <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
        </div>
        <div
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {count}
          {suffix}
        </div>
        <div
          className="text-sm font-semibold mb-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {label}
        </div>
        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {description}
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* HERO */}
      <section ref={sectionRefs.hero} className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge
                className="mt-6 px-4 py-2"
                style={{
                  background: 'var(--color-primary-50)',
                  color: 'var(--color-primary-700)',
                  borderColor: 'var(--color-primary-200)',
                }}
              >
                <Sprout className="w-4 h-4 mr-2" />
                Premium Agricultural Products
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Cultivating
              <span
                className="block"
                style={{
                  background: 'var(--gradient-primary)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Global Connections
              </span>
              Through Agriculture
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Alvanta bridges Egyptian agricultural excellence with
              international markets through transparent supply chains, fair
              trade partnerships, and sustainable practices.
            </motion.p>
          </div>

          {/* Inner Sections */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-6 border dark:backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700"
              style={{
                background: 'var(--color-primary-50)',
                borderColor: 'var(--color-primary-200)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center dark:shadow-lg dark:shadow-emerald-500/20"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h2
                  className="text-xl font-bold dark:text-white"
                  style={{ color: '#0f172a' }}
                >
                  Our Story
                </h2>
              </div>
              <p
                className="mb-4 dark:text-gray-200"
                style={{ color: '#0f172a' }}
              >
                Founded in 2020, Alvanta began with a mission to connect Egypt's
                rich agricultural heritage with the global marketplace while
                ensuring fairness for farmers and sustainability for our planet.
              </p>
              <p
                className="text-sm dark:text-gray-400"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Today, we've grown into a trusted partner for 2,000+ farmers
                across Egypt, delivering premium agricultural products to 12+
                countries worldwide.
              </p>
            </motion.div>

            {/* Right Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl p-6 border"
              style={{
                background: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Why Choose Us
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  'Product traceability from farm to table',
                  'Carbon-neutral supply chain operations',
                  'GlobalGAP & ISO 22000 certified',
                  '85%+ revenue returned to farmers',
                  '48-hour fresh delivery guarantee',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <CheckCircle
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: 'var(--color-primary)' }}
                    />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Button
              size="lg"
              className="font-semibold group"
              style={{
                background: 'var(--gradient-primary)',
                color: 'var(--color-primary-foreground)',
              }}
              onClick={() => navigate('/contact')}
            >
              Start Partnership
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold transition-all duration-300 hover:scale-105"
              style={{
                color: 'var(--color-primary)',
              }}
              onClick={() => navigate('/products')}
            >
              View Products
            </Button>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        ref={sectionRefs.stats}
        className="py-16 px-6"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.stats ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Trusted by Global Partners
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Delivering excellence in agricultural exports with measurable
              impact and transparent operations.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimatedCounter
                key={i}
                value={stat.number}
                label={stat.label}
                suffix={stat.suffix}
                icon={stat.icon}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section
        ref={sectionRefs.mission}
        className="py-16 px-6"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.mission ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Our Mission & Vision
            </h2>
            <p
              className="max-w-3xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Driving sustainable agricultural transformation through innovation
              and global partnership.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Our Mission',
                icon: Target,
                content: (
                  <>
                    <p
                      className="text-lg font-semibold mb-4"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      "To empower Egyptian farmers with global market access
                      through sustainable practices and fair trade
                      partnerships."
                    </p>
                    <div
                      className="space-y-3"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <p>
                        We invest in farmer training programs, implement
                        blockchain traceability, and ensure fair compensation
                        while maintaining the highest quality standards.
                      </p>
                    </div>
                  </>
                ),
              },
              {
                title: 'Our Vision',
                icon: Award,
                content: (
                  <>
                    <p
                      className="text-lg font-semibold mb-4"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      "To become the global benchmark for sustainable
                      agricultural exports while restoring ecosystems and
                      empowering farming communities."
                    </p>
                    <div
                      className="space-y-3"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      <p>
                        By 2030, we aim to achieve net-positive environmental
                        impact and set new standards for regenerative
                        agricultural trade worldwide.
                      </p>
                    </div>
                  </>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.mission ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-xl p-6 border hover:shadow-md transition-all duration-300"
                style={{
                  background: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {item.title}
                </h3>
                <div className="space-y-4">{item.content}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section
        ref={sectionRefs.values}
        className="py-16 px-6"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Our Core Values
            </h2>
            <p
              className="max-w-3xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              The principles that guide every decision and partnership at
              Alvanta Export.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => {
              const Icon = value.icon;
              const isExpanded = expandedValues.includes(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl p-6 border cursor-pointer hover:shadow-md transition-all duration-300"
                  style={{
                    background: 'var(--color-bg-primary)',
                    borderColor: isExpanded
                      ? 'var(--color-primary)'
                      : 'var(--color-border-primary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  onClick={() => toggleValue(i)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'var(--gradient-primary)',
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {value.title}
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {isExpanded
                          ? value.fullDescription
                          : value.shortDescription}
                      </p>

                      {isExpanded && (
                        <div className="mt-4">
                          <div className="grid grid-cols-2 gap-2">
                            {value.benefits.map((benefit, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-xs"
                                style={{ color: 'var(--color-text-muted)' }}
                              >
                                <CheckCircle
                                  className="w-3 h-3"
                                  style={{ color: 'var(--color-primary)' }}
                                />
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        className="text-sm font-medium flex items-center gap-1 mt-2"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPLY CHAIN PROCESS */}
      <section
        ref={sectionRefs.process}
        className="py-16 px-6"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.process ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Our Supply Chain
            </h2>
            <p
              className="max-w-3xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              End-to-end transparency and quality control from Egyptian farms to
              global markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.process ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl p-6 border hover:shadow-md transition-all duration-300"
                  style={{
                    background: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-primary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'var(--gradient-primary)',
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {step.step}
                    </div>
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {step.description}
                  </p>
                  <div
                    className="flex items-center gap-2 text-xs font-medium"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <Clock className="w-3 h-3" />
                    {step.duration}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section
        ref={sectionRefs.impact}
        className="py-16 px-6"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.impact ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Environmental Leadership
            </h2>
            <p
              className="max-w-3xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Measurable sustainability achievements and our commitment to
              planetary stewardship.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {impactData.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.impact ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl p-6 border text-center hover:shadow-md transition-all duration-300"
                  style={{
                    background: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-primary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-full p-3 flex items-center justify-center"
                    style={{
                      background: 'var(--color-primary-50)',
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </div>
                  <div
                    className="text-xl font-bold mb-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.value}
                    {item.suffix}
                  </div>
                  <div
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {item.description}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.impact ? { opacity: 1, y: 0 } : {}}
            className="rounded-xl p-6 text-center max-w-3xl mx-auto"
            style={{
              background: 'var(--gradient-primary)',
              color: 'var(--color-primary-foreground)',
            }}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Net-Positive Environmental Impact by 2030
            </h3>
            <p
              className="opacity-90"
              style={{ color: 'var(--color-gray-700)' }}
            >
              Our commitment: For every 100 tons exported, we restore land,
              conserve water, and offset emissions through verified programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section
        ref={sectionRefs.certifications}
        className="py-16 px-6"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.certifications ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Certified Excellence
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Third-party verified standards that ensure quality, safety, and
              sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.certifications ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl p-6 border text-center hover:shadow-md transition-all duration-300"
                  style={{
                    background: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-primary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-lg p-3 flex items-center justify-center"
                    style={{
                      background: 'var(--gradient-primary)',
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p
                    className="text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {cert.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {cert.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 dark:from-gray-950 dark:via-emerald-950 dark:to-gray-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Join Our Sustainable Agriculture Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--color-gray-400)' }}
            className="text-lg opacity-90 mb-8"
          >
            Partner with Alvanta Export for premium Egyptian agricultural
            products backed by transparency and sustainability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              variant="secondary"
              className="group font-semibold"
              onClick={() => navigate('/contact')}
            >
              Start Partnership
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20 font-semibold"
              onClick={() => navigate('/products')}
            >
              Explore Our Products
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
