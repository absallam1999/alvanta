import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import submitForm from '../../utils/submitForm';

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  ArrowRight,
} from 'lucide-react';
import { config } from '../../config/env';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submittedEmails, setSubmittedEmails] = useState(new Set());

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (isLoading || isSubscribed || !email) return;

    // Check if email was already submitted
    if (submittedEmails.has(email.toLowerCase())) {
      alert('This email has already been subscribed!');
      return;
    }

    setIsLoading(true);

    try {
      submitForm(email, 'newsletter');
      setIsSubscribed(true);

      // Add email to submitted set
      setSubmittedEmails((prev) => new Set([...prev, email.toLowerCase()]));

      setEmail('');

      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, [resolvedTheme]);

  const companyLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Our Markets', href: '/markets' },
    { name: 'Get Quote', href: '/quote' },
    { name: 'Contact', href: '/contact' },
  ];

  const productsLinks = [
    { name: 'Fresh Vegetables', href: '/products/vegetables' },
    { name: 'Seasonal Fruits', href: '/products/fruits' },
    { name: 'Specialty Crops', href: '/products/crops' },
    { name: 'All Products', href: '/products' },
    { name: 'Our Process', href: '/process' },
  ];

  const legalLinks = [
    { name: 'Resources', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR Compliance', href: '/gdpr' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://www.linkedin.com/company/alvanta-llc', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://www.linkedin.com/company/alvanta-llc', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.linkedin.com/company/alvanta-llc', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/company/alvanta-llc', label: 'LinkedIn' },
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-4 h-4" />,
      text: '+20 100 118 8044',
      href: 'tel:+201001188044',
    },
    {
      icon: <Mail className="w-4 h-4" />,
      text: 'contact@alvantaexport.com',
      href: 'mailto:contact@alvantaexport.com',
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      text: 'Al-Mahmoudiah, Al-Behira, Egypt',
      href: 'https://www.google.com/maps/place/Al-Mahmoudiah,+Al-Behira,+Egypt',
    },
  ];

  return (
    <footer
      className="transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-secondary)',
        borderTop: '1px solid var(--color-border-primary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0 relative z-10"
                style={{ marginBottom: '1rem' }}
              >
                <a href="/" className="flex items-center space-x-3 group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="relative w-12 h-12 sm:w-14 sm:h-14"
                  >
                    {/* Logo Container */}
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm border shadow-sm transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-muted)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <img
                        src="/icons/icon-192x180.png"
                        alt="Alvanta"
                        className="relative z-10 w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        style={{
                          filter: 'var(--logo-brightness)',
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Brand Text */}
                  <div className="space-y-0.5">
                    <motion.h1
                      className="text-4xl leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary"
                      style={{
                        letterSpacing: '-2px',
                        fontWeight: '900',
                        color: 'var(--color-text-primary)',
                      }}
                      whileHover={{ x: 1 }}
                    >
                      {config.AppName}
                    </motion.h1>
                  </div>
                </a>
              </motion.div>

              {/* Description */}
              <p
                className="mb-6 leading-relaxed transition-colors duration-300"
                style={{
                  color: 'var(--color-text-tertiary)',
                }}
              >
                Leading agricultural export company delivering premium quality
                produce to global markets with excellence and reliability.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 text-sm transition-colors duration-200 group"
                    style={{
                      color: 'var(--color-text-tertiary)',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm border"
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-primary)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      className="transition-colors duration-200 group-hover:text-primary"
                      style={{
                        color: 'var(--color-text-tertiary)',
                      }}
                    >
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Company */}
                <div>
                  <h3
                    className="font-semibold mb-4 text-sm uppercase tracking-wider transition-colors duration-300"
                    style={{
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Company
                  </h3>

                  <ul className="space-y-3">
                    {companyLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-sm transition-colors duration-200 flex items-center gap-1 group"
                          style={{
                            color: 'var(--color-text-tertiary)',
                          }}
                        >
                          <ArrowRight
                            className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                            style={{
                              color: 'var(--color-primary)',
                            }}
                          />
                          <span
                            className="transition-colors duration-200 group-hover:text-primary"
                            style={{
                              color: 'var(--color-text-tertiary)',
                            }}
                          >
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Products */}
                <div>
                  <h3
                    className="font-semibold mb-4 text-sm uppercase tracking-wider transition-colors duration-300"
                    style={{
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Products
                  </h3>
                  <ul className="space-y-3">
                    {productsLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-sm transition-colors duration-200 flex items-center gap-1 group"
                          style={{
                            color: 'var(--color-text-tertiary)',
                          }}
                        >
                          <ArrowRight
                            className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                            style={{
                              color: 'var(--color-primary)',
                            }}
                          />
                          <span
                            className="transition-colors duration-200 group-hover:text-primary"
                            style={{
                              color: 'var(--color-text-tertiary)',
                            }}
                          >
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Logistics */}
                <div>
                  <h3
                    className="font-semibold mb-4 text-sm uppercase tracking-wider transition-colors duration-300"
                    style={{
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Logistics
                  </h3>
                  <ul className="space-y-3">
                    {legalLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-sm transition-colors duration-200 flex items-center gap-1 group"
                          style={{
                            color: 'var(--color-text-tertiary)',
                          }}
                        >
                          <ArrowRight
                            className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                            style={{
                              color: 'var(--color-primary)',
                            }}
                          />
                          <span
                            className="transition-colors duration-200 group-hover:text-primary"
                            style={{
                              color: 'var(--color-text-tertiary)',
                            }}
                          >
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h3
                  className="font-semibold mb-3 flex items-center gap-2 transition-colors duration-300"
                  style={{
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <Mail
                    className="w-4 h-4"
                    style={{
                      color: 'var(--color-primary)',
                    }}
                  />
                  Stay Updated
                </h3>
                <p
                  className="text-sm mb-4 transition-colors duration-300"
                  style={{
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  Get the latest updates on products and export opportunities.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading || isSubscribed}
                      className="w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderColor: 'var(--color-border-primary)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || isSubscribed}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 group shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
                    style={{
                      background: isSubscribed
                        ? 'var(--color-success)'
                        : 'var(--gradient-primary)',
                      boxShadow: 'var(--shadow)',
                    }}
                  >
                    {isSubscribed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send
                          className={`w-4 h-4 ${isLoading ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`}
                        />
                        <span>
                          {isLoading ? 'Subscribing...' : 'Subscribe'}
                        </span>
                      </>
                    )}
                  </button>
                </form>

                {/* Social Links */}
                <div
                  className="mt-6 pt-6 border-t transition-colors duration-300"
                  style={{
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  <p
                    className="text-sm mb-3 transition-colors duration-300"
                    style={{
                      color: 'var(--color-text-tertiary)',
                    }}
                  >
                    Follow us
                  </p>
                  <div className="flex items-center gap-2">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm border group relative overflow-hidden"
                        style={{
                          backgroundColor: 'var(--color-bg-tertiary)',
                          borderColor: 'var(--color-border-muted)',
                          color: 'var(--color-text-tertiary)',
                          boxShadow: 'var(--shadow-xs)',
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{
                            background: 'var(--gradient-primary)',
                          }}
                        />

                        <style jsx>{`
                          .group:hover {
                            border-color: transparent !important;
                          }
                        `}</style>

                        <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                          {social.icon}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t py-8 transition-colors duration-300"
          style={{
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div
              className="text-sm order-2 md:order-1 transition-colors duration-300"
              style={{
                color: 'var(--color-text-tertiary)',
              }}
            >
              <p>
                © {currentYear}{' '}
                <span
                  className="font-semibold transition-colors duration-300"
                  style={{
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {config.AppName}
                </span>
                . All rights reserved.
              </p>
            </div>
          </div>

          {/* WhatsApp Floating Button */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              zIndex: 50,
            }}
            className="group/whatsapp"
          >
            <motion.a
              href="https://wa.me/201001188044"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '3.5rem',
                height: '3.5rem',
                background: 'var(--gradient-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-base)',
                boxShadow: 'var(--shadow-lg)',
              }}
              className="hover:shadow-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 pointer-events-auto block"
              aria-label="Chat on WhatsApp"
            >
              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  opacity: 0.3,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <MessageCircle
                style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  color: 'var(--color-primary-foreground)',
                }}
              />

              {/* Tooltip */}
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                style={{
                  position: 'absolute',
                  right: '4rem',
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border-primary)',
                  boxShadow: 'var(--shadow-md)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
                className="opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-300"
              >
                Chat with us
                <span
                  style={{
                    position: 'absolute',
                    right: '-0.25rem',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(45deg)',
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: 'var(--color-bg-primary)',
                    borderRight: '1px solid var(--color-border-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                  }}
                />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
