import { useRef, useState } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import {
  Shield,
  Package,
  Truck,
  ArrowRight,
  CheckCircle,
  Sprout,
  Globe,
  Users,
  Clock,
  Mail,
  BarChart2,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

// Tilt Card
const AgricultureCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Process Step
const Steps = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 transition-colors duration-300"
      style={{
        background: isEven
          ? 'var(--color-bg-primary)'
          : 'var(--color-bg-tertiary)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
            !isEven ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Visual Section */}
          <div className="w-full lg:w-1/2">
            <AgricultureCard>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="relative p-8 rounded-2xl border shadow-lg transition-colors duration-300"
                style={{
                  background: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 p-3 shadow-xl mb-6 relative overflow-hidden"
                  >
                    {/* Growing Animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="absolute inset-0 bg-emerald-400/20 rounded-full"
                    />

                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative z-10">
                      <step.icon className="w-16 h-16 text-emerald-600" />
                    </div>
                  </motion.div>

                  <motion.span
                    className="text-6xl font-black text-emerald-200 absolute -bottom-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    {step.number}
                  </motion.span>
                </div>
              </motion.div>
            </AgricultureCard>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{
                  background: 'var(--color-primary-50)',
                }}
              >
                <step.icon
                  className="w-6 h-6 transition-colors duration-300"
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>
              <h3
                className="text-3xl lg:text-4xl font-bold transition-colors duration-300"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {step.title}
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg leading-relaxed transition-colors duration-300"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {step.desc}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              {step.details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 transition-colors duration-300"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <CheckCircle
                    className="w-5 h-5 flex-shrink-0 transition-colors duration-300"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  <span>{detail}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <Button
                asChild
                size="lg"
                className="group transition-all duration-300"
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'var(--color-primary-foreground)',
                }}
              >
                <Link to={step.cta.to}>
                  {step.cta.text}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ProcessPage() {
  const { scrollYProgress } = useScroll();

  const agricultureSteps = [
    {
      number: '01',
      title: 'Farm Sourcing & Selection',
      icon: Sprout,
      desc: 'We partner with certified sustainable farms across prime agricultural regions, ensuring the highest quality produce from soil to harvest.',
      details: [
        'Soil quality verification',
        'Sustainable farming practices',
        'Direct farmer partnerships',
      ],
      cta: { text: 'Explore More', to: '/about' },
    },
    {
      number: '02',
      title: 'Quality Assurance',
      icon: Shield,
      desc: 'Rigorous quality control processes guarantee that every product meets international standards for freshness and safety.',
      details: [
        'Laboratory testing',
        'Freshness verification',
        'Quality certification',
      ],
      cta: { text: 'Request Quote', to: '/quote' },
    },
    {
      number: '03',
      title: 'Smart Packaging',
      icon: Package,
      desc: 'Eco-friendly packaging solutions designed to preserve freshness and extend shelf life during global transportation.',
      details: [
        'Temperature-controlled packaging',
        'Sustainable materials',
        'Extended freshness guarantee',
      ],
      cta: { text: 'Contact us', to: '/contact' },
    },
    {
      number: '04',
      title: 'Global Logistics',
      icon: Truck,
      desc: 'Efficient cold chain logistics ensure your agricultural products arrive fresh and ready for market anywhere in the world.',
      details: [
        'Refrigerated transportation',
        'Real-time tracking',
        'Global delivery network',
      ],
      cta: { text: 'Our Privacy', to: '/privacy' },
    },
    {
      number: '05',
      title: 'Market Distribution',
      icon: Globe,
      desc: 'Strategic partnerships with distributors worldwide ensure your products reach the right markets at the right time.',
      details: [
        'Global distribution network',
        'Market analysis',
        'Strategic partnerships',
      ],
      cta: { text: 'View Markets', to: '/markets' },
    },
    {
      number: '06',
      title: 'Customer Success',
      icon: Users,
      desc: 'Dedicated support and market insights help you maximize the value of your agricultural exports.',
      details: ['Market intelligence', 'Customer support', 'Growth consulting'],
      cta: { text: 'Get Support', to: '/help' },
    },
  ];

  const stats = [
    { number: '2000+', label: 'Partner Farms', icon: Sprout },
    { number: '40+', label: 'Countries Served', icon: Globe },
    { number: '5+', label: 'Years Experience', icon: Clock },
    { number: '100%', label: 'Quality Score', icon: BarChart2 },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 z-50 bg-gradient-to-r from-emerald-500 to-green-500"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
        }}
      />

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center p-10 transition-colors duration-300"
        style={{
          background: 'var(--gradient-hero)',
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <Badge
              className="mb-6 px-4 py-2 transition-colors duration-300"
              style={{
                background: 'var(--color-primary-50)',
                color: 'var(--color-primary-700)',
                borderColor: 'var(--color-primary-200)',
              }}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Premium Agricultural Exports
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            From Farm to
            <span
              className="block"
              style={{
                background: 'var(--gradient-primary)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Global Markets
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-300"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Connecting sustainable farms with international buyers through
            premium quality agricultural products and seamless export solutions.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center p-4 rounded-lg backdrop-blur-sm border shadow-sm transition-colors duration-300 hover:scale-105"
                style={{
                  background: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <div
                  className="mb-2 flex justify-center transition-colors duration-300"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <stat.icon className="w-8 h-8" />
                </div>
                <div
                  className="text-2xl lg:text-3xl font-bold mb-1 transition-colors duration-300"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
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
              className="group transition-all duration-300"
              style={{
                background: 'var(--gradient-primary)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              <Link to="/quote">
                Start Exporting
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="transition-all duration-300"
              style={{
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
                background: 'var(--color-bg-primary)',
              }}
            >
              <Link to="/products">View Products</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <div>
        {agricultureSteps.map((step, index) => (
          <Steps key={index} step={step} index={index} />
        ))}
      </div>

      {/* CTA */}
      <section
        className="py-20 transition-colors duration-300"
        style={{
          background: 'var(--gradient-primary)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Grow Your Business?
          </motion.h2>

          <motion.p
            className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join hundreds of successful agricultural exporters who trust us to
            deliver their products to global markets with excellence and
            reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 border-0 group transition-colors duration-300"
            >
              <Link to="/quote">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:scale-105 hover:bg-white hover:border-white/80 transition-all duration-300 transform"
            >
              <Link to="/contact">
                <Mail className="w-4 h-4" />
                Contact
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          >
            {[
              { value: '24/7', label: 'Support' },
              { value: '48h', label: 'Response Time' },
              { value: '100%', label: 'Quality Guarantee' },
              { value: '5+', label: 'Years Experience' },
            ].map((item, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-white">
                  {item.value}
                </div>
                <div className="text-emerald-100 text-sm">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
