import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import submitForm from '../../utils/submitForm';

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Globe,
  Truck,
  Users,
  Shield,
  Building2,
  MessageSquare,
  PhoneCall,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const ModernMap = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218352.3763120021!2d30.05946923518088!3d31.032519416406987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5d7e6d5d5d5d5%3A0x5d5d5d5d5d5d5d5d!2sEl%20Beheira%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="dark:invert dark:hue-rotate-180 dark:saturate-150 transition-all duration-500"
        title="Alvanta Export Location - El Beheira, Egypt"
      />
    </div>
  );
};

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      details: [
        'Zein Al Abdeen St. from Al-Thawra St.',
        'Al-Mahmoudiah 22718, Al-Behira',
        'Egypt',
      ],
      link: 'https://maps.google.com/?q=Al-Mahmoudiah+Al-Behira+Egypt',
      linkText: 'Get Directions',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+20 100 118 8044'],
      link: 'tel:+201001188044',
      linkText: 'Call Now',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@alvantaexport.com'],
      link: 'mailto:contact@alvantaexport.com',
      linkText: 'Send Email',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Sunday - Thursday: 9:00 - 17:00', 'Friday - Saturday: Closed'],
      linkText: 'Egypt Time (GMT+2)',
    },
  ];

  const globalPresence = [
    {
      label: 'Countries Served',
      value: '40+',
      icon: Globe,
    },
    {
      label: 'Annual Export Volume',
      value: '10K',
      suffix: ' Tons',
      icon: Truck,
    },
    {
      label: 'Partner Farms',
      value: '2000+',
      icon: Users,
    },
    {
      label: 'Clients Satisfaction',
      value: '100%',
      icon: Shield,
    },
  ];

  const inquiryTypes = [
    {
      value: 'general',
      label: 'General Inquiry',
      icon: MessageSquare,
    },
    {
      value: 'export',
      label: 'Export Services',
      icon: Globe,
    },
    {
      value: 'supply',
      label: 'Product Supply',
      icon: Truck,
    },
    {
      value: 'partnership',
      label: 'Partnership',
      icon: Users,
    },
    {
      value: 'quality',
      label: 'Quality & Standards',
      icon: Shield,
    },
    {
      value: 'other',
      label: 'Other',
      icon: Building2,
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validation
      if (!formData.name?.trim()) throw new Error('Please enter your name');
      if (!formData.email?.trim()) throw new Error('Please enter your email');
      if (!formData.subject?.trim()) throw new Error('Please enter a subject');
      if (!formData.message?.trim())
        throw new Error('Please enter your message');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      await submitForm(formData, 'contact');

      // Show success after a short delay
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: 'general',
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setError(error.message || 'Failed to send message. Please try again.');
    }
  };

  // Error state component
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300"
        style={{
          background: 'var(--color-bg-primary)',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="max-w-md w-full"
        >
          <div
            className="rounded-2xl p-8 shadow-lg text-center transition-colors duration-300"
            style={{
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-red-200)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-red-100"
            >
              <AlertCircle className="w-10 h-10 text-red-600" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4 text-red-600">
              Sending Failed
            </h2>
            <p className="mb-4 leading-relaxed text-red-700">{error}</p>
            <p className="mb-6 text-sm text-red-600">
              You can also reach us directly at contact@alvantaexport.com
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setError('')}
                size="lg"
                className="flex-1"
                variant="outline"
              >
                Try Again
              </Button>
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="flex-1"
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'var(--color-primary-foreground)',
                }}
              >
                Return Home
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300"
        style={{
          background: 'var(--color-bg-primary)',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="max-w-md w-full"
        >
          <div
            className="rounded-2xl p-8 shadow-lg text-center transition-colors duration-300"
            style={{
              background: 'var(--color-bg-primary)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--gradient-primary)',
              }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Message Sent!
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => (window.location.href = '/')}
              size="lg"
              className="w-full"
              style={{
                background: 'var(--gradient-primary)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              Return to Homepage
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        borderColor: 'red',
      }}
    >
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
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
                <PhoneCall className="w-4 h-4 mr-2" />
                We're Here to Help
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Get in
              <span
                className="block"
                style={{
                  background: 'var(--gradient-primary)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Touch
              </span>
              With Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Have questions about our agricultural products or export services?
              Our team is ready to assist you with sustainable solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information & Map */}
      <section className="pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Information Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 grid md:grid-cols-2 gap-6"
            >
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300"
                    style={{
                      background: 'var(--color-bg-primary)',
                      borderColor: 'var(--color-border-primary)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'var(--gradient-primary)',
                        }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-semibold mb-2"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {item.title}
                        </h3>
                        {item.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-sm mb-1 leading-relaxed"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {detail}
                          </p>
                        ))}
                        {item.link ? (
                          <a
                            href={item.link}
                            className="inline-flex items-center text-sm font-medium mt-3 hover:gap-2 gap-1 transition-all duration-300"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            {item.linkText}
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </a>
                        ) : (
                          <p
                            className="text-sm font-medium mt-3"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            {item.linkText}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div
                className="rounded-xl p-6 border shadow-sm"
                style={{
                  background: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <h3
                  className="text-xl font-bold mb-4 flex items-center gap-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <MapPin
                    className="w-5 h-5"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  Our Location
                </h3>
                <div
                  className="aspect-square rounded-xl overflow-hidden"
                  style={{ background: 'var(--color-bg-secondary)' }}
                >
                  <ModernMap />
                </div>
                <p
                  className="text-sm mt-4 text-center"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Al-Mahmoudiah, El Beheira, Egypt
                </p>
              </div>
            </motion.div>
          </div>

          {/* Global Presence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <div
              className="rounded-2xl p-8 text-white shadow-lg"
              style={{
                background: 'var(--gradient-primary)',
              }}
            >
              <h3 className="text-2xl text-white font-bold mb-8 flex items-center gap-3 justify-center">
                <Globe className="w-6 h-6 text-white" />
                Our Global Presence
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {globalPresence.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="flex justify-center items-center w-10 h-10 mx-auto mb-2 rounded-full bg-white/20">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div className="text-sm text-white/90">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div
              className="rounded-2xl p-8 border shadow-lg"
              style={{
                background: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              <div className="text-center mb-10">
                <h2
                  className="text-3xl font-bold mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Send us a Message
                </h2>
                <p
                  className="text-lg max-w-2xl mx-auto"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Fill out the form below and we'll respond within 24 hours
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto space-y-8"
              >
                {/* Inquiry Type Selection */}
                <div>
                  <label
                    className="block text-lg font-semibold mb-4 text-center"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {inquiryTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <label
                          key={type.value}
                          className={`
        relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group
        ${
          formData.inquiryType === type.value
            ? 'shadow-md'
            : 'hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700'
        }
      `}
                          style={{
                            background:
                              formData.inquiryType === type.value
                                ? 'var(--color-primary-50)'
                                : 'var(--color-bg-primary)',
                            borderColor:
                              formData.inquiryType === type.value
                                ? 'var(--color-primary)'
                                : 'var(--color-border-primary)',
                          }}
                        >
                          <input
                            type="radio"
                            name="inquiryType"
                            value={type.value}
                            checked={formData.inquiryType === type.value}
                            onChange={handleChange}
                            className="sr-only"
                          />

                          {/* Hover Gradient Border */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                          <div
                            className="mb-2 transition-all duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                            style={{
                              color:
                                formData.inquiryType === type.value
                                  ? 'var(--color-primary)'
                                  : 'var(--color-text-muted)',
                            }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className="text-xs font-medium text-center transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                            style={{
                              color:
                                formData.inquiryType === type.value
                                  ? 'var(--color-primary-700)'
                                  : 'var(--color-text-primary)',
                            }}
                          >
                            {type.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:border-transparent"
                      style={{
                        background: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-primary)',
                        color: 'var(--color-text-primary)',
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:border-transparent"
                      style={{
                        background: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-primary)',
                        color: 'var(--color-text-primary)',
                      }}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:border-transparent"
                      style={{
                        background: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-primary)',
                        color: 'var(--color-text-primary)',
                      }}
                      placeholder="Your Company Ltd."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:border-transparent"
                      style={{
                        background: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-primary)',
                        color: 'var(--color-text-primary)',
                      }}
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:border-transparent resize-none"
                    style={{
                      background: 'var(--color-bg-primary)',
                      borderColor: 'var(--color-border-primary)',
                      color: 'var(--color-text-primary)',
                    }}
                    placeholder="Tell us about your requirements, questions, or how we can assist you with agricultural export services..."
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex justify-center"
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto min-w-[200px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      background: 'var(--gradient-primary)',
                      color: 'var(--color-primary-foreground)',
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>

                <p
                  className="text-xs text-center"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  By submitting this form, you agree to our
                  <a
                    href="/privacy"
                    className="hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {' '}
                    privacy policy{' '}
                  </a>
                  and{' '}
                  <a
                    href="/terms"
                    className="hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    terms of service
                  </a>
                  .
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-emerald-600 dark:bg-gradient-to-br dark:from-emerald-600 dark:to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Ready to Start Your Export Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-emerald-100 mb-8 leading-relaxed"
          >
            Join hundreds of successful businesses that trust Alvanta for their
            agricultural export needs across the globe.
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
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold group"
              onClick={() => navigate('/quote')}
            >
              Schedule Consultation
              <Clock className="ml-2 w-5 h-5 group-hover:scale-110 transition" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20 font-semibold"
              onClick={() => navigate('/products')}
            >
              View Our Products
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
