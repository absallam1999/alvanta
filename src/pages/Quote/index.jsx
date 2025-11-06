import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import submitForm from '../../utils/submitForm';

import {
  ArrowLeft,
  Clock,
  Home,
  MapPin,
  Phone,
  User,
  Mail,
  Building2,
  Leaf,
  Apple,
  Wheat,
  MessageSquare,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowRight,
  Calculator,
  AlertCircle,
} from 'lucide-react';

const ContactInfo = ({ icon, label, value }) => (
  <div
    className="flex items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden border"
    style={{
      background: 'var(--color-bg-primary)',
      borderColor: 'var(--color-border-primary)',
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
      style={{
        background: 'var(--gradient-primary-subtle)',
      }}
    />
    <div
      className="p-2 rounded-full relative z-10"
      style={{
        background: 'var(--color-primary-50)',
      }}
    >
      {React.cloneElement(icon, {
        className: 'w-5 h-5 group-hover:scale-110 transition-transform',
        style: { color: 'var(--color-primary)' },
      })}
    </div>
    <div className="relative z-10">
      <p
        className="text-sm font-medium"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </p>
      <p
        className="text-base font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {value}
      </p>
    </div>
  </div>
);

export default function QuotePage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cropsData, setCropsData] = useState(null);
  const [fruitsData, setFruitsData] = useState(null);
  const [vegetablesData, setVegetablesData] = useState(null);

  const [formData, setFormData] = useState({
    serviceType: '',
    productType: '',
    quantity: '',
    deliveryTimeline: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    deliveryAddress: '',
    specialRequirements: '',
  });

  const [animations, setAnimations] = useState({
    nextStep: false,
    prevStep: false,
    submit: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fruitsRes, vegetablesRes, cropsRes] = await Promise.all([
          fetch('/data/fruits.json'),
          fetch('/data/vegetables.json'),
          fetch('/data/crops.json'),
        ]);

        setFruitsData(await fruitsRes.json());
        setVegetablesData(await vegetablesRes.json());
        setCropsData(await cropsRes.json());
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
    setAnimate(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const animateStepTransition = (direction) => {
    setAnimations((prev) => ({ ...prev, [direction]: true }));
    setTimeout(() => {
      setAnimations((prev) => ({ ...prev, [direction]: false }));
      if (direction === 'nextStep') setStep((prev) => prev + 1);
      else if (direction === 'prevStep') setStep((prev) => prev - 1);
    }, 500);
  };

  const nextStep = () => {
    if (step === 2) {
      if (
        !formData.productType ||
        !formData.quantity ||
        !formData.deliveryTimeline
      ) {
        setError('Please fill in all product details before continuing.');
        return;
      }
    }
    setError('');
    animateStepTransition('nextStep');
  };

  const prevStep = () => {
    setError('');
    animateStepTransition('prevStep');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitForm(formData, 'quote');

      // Show success step
      setAnimations((prev) => ({ ...prev, submit: true }));
      setTimeout(() => {
        setAnimations((prev) => ({ ...prev, submit: false }));
        setStep(4);
      }, 1000);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError(
        'Failed to submit your quote request. Please try again or contact us directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Service selection handler
  const handleServiceSelect = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: serviceId,
      productType: '',
    }));
    setTimeout(nextStep, 500);
  };

  const serviceOptions = [
    {
      id: 'vegetables',
      label: 'Vegetables',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500',
    },
    {
      id: 'fruits',
      label: 'Fruits',
      icon: Apple,
      color: 'from-red-500 to-pink-500',
      borderColor: 'border-red-500',
    },
    {
      id: 'specialty-crops',
      label: 'Specialty Crops',
      icon: Wheat,
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-500',
    },
    {
      id: 'consultation',
      label: 'Consultation',
      icon: MessageSquare,
      color: 'from-purple-500 to-indigo-500',
      borderColor: 'border-purple-500',
    },
  ];

  // Get product options based on selected service type
  const getProductOptions = () => {
    switch (formData.serviceType) {
      case 'vegetables':
        return vegetablesData.products.map((product) => product.name);
      case 'fruits':
        return fruitsData.products.map((product) => product.name);
      case 'specialty-crops':
        return cropsData.products.map((product) => product.name);
      case 'consultation':
        return [
          'Farm Planning & Strategy',
          'Crop Selection & Rotation',
          'Soil Analysis & Improvement',
          'Irrigation System Design',
          'Pest & Disease Management',
          'Sustainable Farming Practices',
          'Market Access & Export Strategy',
          'Quality Control & Certification',
          'Supply Chain Optimization',
          'Custom Agricultural Solutions',
        ];
      default:
        return [];
    }
  };

  // Form field configurations
  const step2Fields = [
    {
      label: 'Product Type',
      name: 'productType',
      type: 'select',
      options: formData.serviceType ? ['', ...getProductOptions()] : [''],
      icon: Leaf,
    },
    {
      label: 'Estimated Quantity',
      name: 'quantity',
      type: 'select',
      options: [
        '',
        '20-25 tons (1 container)',
        '2-5 containers',
        '5-10 containers',
        '10+ containers',
        'Full truckload (10-25 tons)',
        'Less than truckload (LTL)',
        'Bulk vessel shipment',
      ],
      icon: Calculator,
    },
    {
      label: 'Delivery Timeline',
      name: 'deliveryTimeline',
      type: 'select',
      options: [
        '',
        'ASAP (Immediate)',
        '1-2 Weeks',
        '2-4 Weeks',
        '1-2 Months',
        '2-3 Months',
        '3+ Months',
        'Regular Supply (Contract)',
      ],
      icon: Clock,
    },
  ];

  const step3Fields = [
    {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      icon: User,
      required: true,
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      icon: User,
      required: true,
    },
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      icon: Mail,
      required: true,
    },
    {
      label: 'Phone Number',
      name: 'phone',
      type: 'tel',
      icon: Phone,
      required: true,
    },
    {
      label: 'Company/Organization',
      name: 'company',
      type: 'text',
      icon: Building2,
    },
    {
      label: 'Delivery Address',
      name: 'deliveryAddress',
      type: 'text',
      icon: MapPin,
      fullWidth: true,
      required: true,
    },
    {
      label: 'Special Requirements',
      name: 'specialRequirements',
      type: 'textarea',
      placeholder:
        'Any specific quality standards, certifications, packaging requirements, or special handling instructions...',
      fullWidth: true,
    },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-48 h-48 rounded-full opacity-10 blur-3xl"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animation: `float 8s ease-in-out ${i * 1.5}s infinite`,
              background: 'var(--gradient-primary-subtle)',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`mb-8 transition-all duration-500 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-semibold px-4 py-3 mb-4 transition-all duration-300 hover:gap-3 active:scale-95 group"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-2 mb-2">
            <h1
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Get Quote
            </h1>
            <Sparkles
              className="w-6 h-6"
              style={{ color: 'var(--color-primary)' }}
            />
          </div>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Request a customized quote for premium agricultural products. Tell
            us about your needs and we'll provide competitive pricing.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 transition-all duration-500 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              background: 'var(--color-error-bg)',
              borderColor: 'var(--color-border-error)',
              color: 'var(--color-error)',
            }}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div
          className={`mb-8 transition-all duration-500 delay-100 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Step {step} of 4
            </span>
            <span
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {step * 25}% Complete
            </span>
          </div>
          <div
            className="w-full rounded-full h-2 overflow-hidden"
            style={{ background: 'var(--color-bg-muted)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${step * 25}%`,
                background: 'var(--gradient-primary)',
              }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div
          className={`rounded-2xl shadow-xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-500 delay-200 ${
            animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          } ${animations.nextStep ? 'animate-slide-out-left' : ''} ${
            animations.prevStep ? 'animate-slide-out-right' : ''
          } ${!animations.nextStep && !animations.prevStep ? 'animate-slide-in-right' : ''}`}
          style={{
            background: 'var(--color-bg-primary)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          {step < 4 ? (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Type */}
              {step === 1 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h2
                      className="text-2xl font-semibold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      What are you looking for?
                    </h2>
                  </div>
                  <p
                    className="mb-6"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Select the category of agricultural products or services you
                    need.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {serviceOptions.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <div
                          key={service.id}
                          className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 active:scale-95 ${
                            formData.serviceType === service.id
                              ? `bg-gradient-to-r ${service.color} text-white border-transparent`
                              : ''
                          }`}
                          style={{
                            transitionDelay: `${index * 100}ms`,
                            animationDelay: `${index * 100}ms`,
                            borderColor:
                              formData.serviceType !== service.id
                                ? 'var(--color-border-primary)'
                                : 'transparent',
                            background:
                              formData.serviceType !== service.id
                                ? 'var(--color-bg-primary)'
                                : '',
                            color:
                              formData.serviceType !== service.id
                                ? 'var(--color-text-primary)'
                                : '',
                          }}
                          onClick={() => handleServiceSelect(service.id)}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ${
                              formData.serviceType === service.id
                                ? 'opacity-100'
                                : ''
                            }`}
                          />
                          <div className="relative z-10">
                            <IconComponent
                              className={`w-8 h-8 mx-auto mb-3 transition-colors duration-300 ${
                                formData.serviceType === service.id
                                  ? 'text-white'
                                  : 'group-hover:text-white'
                              }`}
                              style={{
                                color:
                                  formData.serviceType !== service.id
                                    ? 'var(--color-primary)'
                                    : 'white',
                              }}
                            />
                            <span
                              className={`block text-center font-medium transition-colors duration-300 ${
                                formData.serviceType === service.id
                                  ? 'text-white'
                                  : 'group-hover:text-white'
                              }`}
                              style={{
                                color:
                                  formData.serviceType !== service.id
                                    ? 'var(--color-text-primary)'
                                    : 'white',
                              }}
                            >
                              {service.label}
                            </span>
                            {formData.serviceType === service.id && (
                              <div className="mt-3 flex justify-end">
                                <ArrowRight className="w-4 h-4 text-white animate-bounce" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Product Details */}
              {step === 2 && (
                <div className="mb-8">
                  <h2
                    className="text-2xl font-semibold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Product Details
                  </h2>
                  <p
                    className="mb-6 text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Tell us more about your specific requirements for{' '}
                    {formData.serviceType === 'vegetables'
                      ? 'vegetables'
                      : formData.serviceType === 'fruits'
                        ? 'fruits'
                        : formData.serviceType === 'specialty-crops'
                          ? 'specialty crops'
                          : 'consultation services'}
                    .
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {step2Fields.map((field, index) => {
                      const IconComponent = field.icon;
                      return (
                        <div
                          key={field.name}
                          className={`${field.fullWidth ? 'sm:col-span-2' : ''} transition-all duration-500 ${
                            animate
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4'
                          }`}
                          style={{ transitionDelay: `${index * 80}ms` }}
                        >
                          <label
                            className="flex items-center gap-2 text-sm font-medium mb-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            <IconComponent
                              className="w-4 h-4"
                              style={{ color: 'var(--color-primary)' }}
                            />
                            {field.label}
                          </label>
                          {field.type === 'select' ? (
                            <select
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 hover:shadow-md active:scale-95"
                              style={{
                                background: 'var(--color-bg-primary)',
                                borderColor: 'var(--color-border-primary)',
                                color: 'var(--color-text-primary)',
                              }}
                            >
                              {field.options.map((option, idx) => (
                                <option
                                  key={option || idx}
                                  value={option === '' ? '' : option}
                                  disabled={option === ''}
                                  style={{
                                    background: 'var(--color-bg-primary)',
                                    color: 'var(--color-text-primary)',
                                  }}
                                >
                                  {option ||
                                    `Select ${field.label.toLowerCase()}`}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              placeholder={field.placeholder || ''}
                              required
                              className="w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 hover:shadow-md active:scale-95"
                              style={{
                                background: 'var(--color-bg-primary)',
                                borderColor: 'var(--color-border-primary)',
                                color: 'var(--color-text-primary)',
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 font-semibold px-6 py-3 transition-all duration-300 hover:gap-3 active:scale-95 group"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={
                        !formData.productType ||
                        !formData.quantity ||
                        !formData.deliveryTimeline
                      }
                      onClick={nextStep}
                      className="text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                      style={{
                        background: 'var(--gradient-primary)',
                      }}
                    >
                      Continue
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <div className="mb-8">
                  <h2
                    className="text-2xl font-semibold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Your Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {step3Fields.map((field, index) => {
                      const IconComponent = field.icon;
                      return (
                        <div
                          key={field.name}
                          className={`${field.fullWidth ? 'sm:col-span-2' : ''} transition-all duration-500 ${
                            animate
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4'
                          }`}
                          style={{ transitionDelay: `${index * 80}ms` }}
                        >
                          <label
                            className="flex items-center gap-2 text-sm font-medium mb-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {IconComponent && (
                              <IconComponent
                                className="w-4 h-4"
                                style={{ color: 'var(--color-primary)' }}
                              />
                            )}
                            {field.label}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              rows={4}
                              placeholder={field.placeholder}
                              required={field.required}
                              className="w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 hover:shadow-md active:scale-95 resize-none"
                              style={{
                                background: 'var(--color-bg-primary)',
                                borderColor: 'var(--color-border-primary)',
                                color: 'var(--color-text-primary)',
                              }}
                            />
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              required={field.required}
                              className="w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 hover:shadow-md active:scale-95"
                              style={{
                                background: 'var(--color-bg-primary)',
                                borderColor: 'var(--color-border-primary)',
                                color: 'var(--color-text-primary)',
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 font-semibold px-6 py-3 transition-all duration-300 hover:gap-3 active:scale-95 group"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                      style={{
                        background: 'var(--gradient-primary)',
                      }}
                    >
                      {loading ? 'Submitting...' : 'Get Quote'}
                      {!loading && (
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div
              className={`text-center py-8 transition-all duration-500 delay-300 ${
                animate
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 animate-scale-in"
                style={{
                  background: 'var(--color-primary-50)',
                }}
              >
                <CheckCircle
                  className="w-10 h-10 animate-tick"
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Quote Request Submitted!
              </h2>
              <p
                className="mb-8 max-w-md mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Thank you for your interest in Alvanta Global Agriculture. We've
                received your quote request and will contact you within 24 hours
                with competitive pricing and availability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-95 group"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  Return to Home
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="font-semibold px-6 py-3 rounded-xl bg-transparent transition-all duration-300 hover:shadow-lg active:scale-95"
                  style={{
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-text-primary)',
                    background: 'var(--color-bg-primary)',
                  }}
                >
                  Browse Products
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Support Info */}
        {step < 4 && (
          <div
            className={`rounded-2xl shadow-lg border p-6 mt-8 transition-all duration-500 delay-400 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              background: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Need immediate assistance?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactInfo
                icon={<Phone />}
                label="Call us at"
                value="+20 100 118 8044"
              />
              <ContactInfo
                icon={<Mail />}
                label="Email us at"
                value="contact@alvantaexport.com"
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes tick {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes slide-in-right {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-out-left {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes slide-out-right {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-tick {
          animation: tick 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }

        .animate-slide-out-left {
          animation: slide-out-left 0.5s ease-out;
        }

        .animate-slide-out-right {
          animation: slide-out-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
