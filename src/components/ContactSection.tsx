import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Printer,
  RotateCcw,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { SERVICES, DETAILING_PACKAGES } from '../data/studioData';
import { BUSINESS_CONFIG, getGoogleMapsEmbedUrl } from '../data/businessConfig';
import type { QuoteFormData } from '../types';

interface ContactSectionProps {
  initialService?: string;
  initialVehicleType?: 'coupe' | 'suv' | 'exotic';
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialVehicleType = 'coupe'
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: new Date().getFullYear().toString(),
    vehicleType: initialVehicleType,
    selectedService: initialService || 'Ceramic Coating',
    preferredDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    timestamp: string;
    data: QuoteFormData;
  } | null>(null);

  // Update formData when props change
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, selectedService: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialVehicleType) {
      setFormData((prev) => ({ ...prev, vehicleType: initialVehicleType }));
    }
  }, [initialVehicleType]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for consultation confirmation';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please provide a valid phone number';
    }

    if (!formData.vehicleMake.trim()) {
      newErrors.vehicleMake = 'Vehicle make is required (e.g. Porsche)';
    }

    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = 'Vehicle model is required (e.g. 911 GT3)';
    }

    if (!formData.selectedService) {
      newErrors.selectedService = 'Please select a service or package';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const referenceId = `OBS-${Math.floor(100000 + Math.random() * 900000)}`;
      const submissionRecord = {
        referenceId,
        timestamp: new Date().toLocaleString(),
        data: { ...formData }
      };

      try {
        const history = JSON.parse(localStorage.getItem('obsidian_quote_submissions') || '[]');
        history.push(submissionRecord);
        localStorage.setItem('obsidian_quote_submissions', JSON.stringify(history));
      } catch (err) {
        console.warn('LocalStorage unavailable for quote caching', err);
      }

      setIsSubmitting(false);
      setSubmittedData(submissionRecord);
    }, 700);
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: new Date().getFullYear().toString(),
      vehicleType: 'coupe',
      selectedService: 'Ceramic Coating',
      preferredDate: '',
      notes: ''
    });
    setErrors({});
  };

  const generateWhatsAppUrl = () => {
    if (!submittedData) return 'https://wa.me/18006274342';
    const text = encodeURIComponent(
      `Hello Obsidian Auto Studio, I have requested a consultation (#${submittedData.referenceId}) for my ${submittedData.data.vehicleYear} ${submittedData.data.vehicleMake} ${submittedData.data.vehicleModel}. Service: ${submittedData.data.selectedService}. Name: ${submittedData.data.fullName}.`
    );
    return `https://wa.me/18006274342?text=${text}`;
  };

  const handleOpenStoreMap = () => {
    window.open(BUSINESS_CONFIG.googleMapsPlaceUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-white dark:bg-obsidian-pure text-on-surface dark:text-pearl overflow-hidden border-t border-brand-border dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="chip-redline mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Book an Appointment</span>
          </div>

          <h2 className="headline-lg text-on-surface dark:text-white">
            Let's Give Your Car <br />
            <span className="text-primary">the finish it deserves.</span>
          </h2>

          <p className="body-md text-muted dark:text-gray-300 leading-relaxed font-normal">
            Book your appointment or request an estimate. We'll inspect your vehicle's paint and recommend the right detailing and protection package.
          </p>
        </div>

        {/* Harmonious 2-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (5 Cols): Studio Location & Live Navigation Hub */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Main Studio Access Card */}
            <div className="bg-white dark:bg-obsidian-surface border border-brand-border dark:border-white/10 p-6 sm:p-7 rounded-2xl shadow-subtle flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="border-b border-brand-border dark:border-white/10 pb-3">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-primary block mb-0.5 font-semibold">
                    STUDIO LOCATION
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-on-surface dark:text-white">
                    Scottsdale Studio
                  </h3>
                </div>

                {/* Address & Contact Details List */}
                <div className="space-y-3 text-xs">
                  {/* Address */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral/40 dark:bg-obsidian-surface2 border border-brand-border dark:border-white/10">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-muted dark:text-gray-400 uppercase font-sans font-semibold block">Studio Address</span>
                      <strong className="text-on-surface dark:text-white font-medium block text-xs">{BUSINESS_CONFIG.businessAddress}</strong>
                      <span className="text-muted dark:text-gray-400 text-xs">{BUSINESS_CONFIG.businessCityStateZip}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <a
                    href={`tel:${BUSINESS_CONFIG.businessPhoneRaw}`}
                    className="flex items-start gap-3 p-3 rounded-xl bg-neutral/40 dark:bg-obsidian-surface2 hover:bg-neutral/70 dark:hover:bg-white/5 border border-brand-border dark:border-white/10 transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-[10px] text-muted dark:text-gray-400 uppercase font-sans font-semibold block">Phone</span>
                      <strong className="text-on-surface dark:text-white text-xs font-heading font-medium">{BUSINESS_CONFIG.businessPhone}</strong>
                    </div>
                  </a>

                  {/* WhatsApp Direct */}
                  <a
                    href="https://wa.me/18006274342?text=Hello%20Obsidian%20Auto%20Studio%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20detailing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 transition-colors group"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-800 dark:text-emerald-300 uppercase font-sans font-semibold block">WhatsApp Direct</span>
                      <strong className="text-emerald-950 dark:text-emerald-100 text-xs font-heading font-medium">Chat with Detailer</strong>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${BUSINESS_CONFIG.businessEmail}`}
                    className="flex items-start gap-3 p-3 rounded-xl bg-neutral/40 dark:bg-obsidian-surface2 hover:bg-neutral/70 dark:hover:bg-white/5 border border-brand-border dark:border-white/10 transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-[10px] text-muted dark:text-gray-400 uppercase font-sans font-semibold block">Email</span>
                      <strong className="text-on-surface dark:text-white text-xs font-heading font-medium">{BUSINESS_CONFIG.businessEmail}</strong>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral/40 dark:bg-obsidian-surface2 border border-brand-border dark:border-white/10">
                    <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-xs">
                      <span className="text-[10px] text-muted dark:text-gray-400 uppercase font-sans font-semibold block">Studio Hours</span>
                      <div className="text-on-surface dark:text-white font-medium">{BUSINESS_CONFIG.businessHours.weekdays}</div>
                      <div className="text-muted dark:text-gray-400">{BUSINESS_CONFIG.businessHours.saturday}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio Store Location Map (Single Store Map) */}
              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden border border-brand-border dark:border-white/10 bg-neutral-100 dark:bg-obsidian-pure shadow-subtle group">
                  <div className="h-60 sm:h-72 w-full cursor-pointer" onClick={handleOpenStoreMap}>
                    <iframe
                      title="Obsidian Auto Studio Store Location"
                      src={getGoogleMapsEmbedUrl()}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full pointer-events-auto"
                    />
                  </div>

                  {/* Open in Google Maps footer bar */}
                  <div className="p-3 bg-white/95 dark:bg-obsidian-surface/95 border-t border-brand-border dark:border-white/10 flex items-center justify-between gap-2">
                    <span className="text-xs text-muted dark:text-gray-300 font-sans flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{BUSINESS_CONFIG.businessAddress}, {BUSINESS_CONFIG.businessCityStateZip}</span>
                    </span>

                    <button
                      type="button"
                      onClick={handleOpenStoreMap}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm shrink-0"
                    >
                      <span>Open Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (7 Cols): Appointment Booking Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-white dark:bg-obsidian-surface border border-brand-border dark:border-white/10 p-7 sm:p-9 rounded-2xl shadow-subtle flex-1">
              
              <AnimatePresence mode="wait">
                {!submittedData ? (
                  // Active Inquiry Form
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="border-b border-brand-border dark:border-white/10 pb-4">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-primary block mb-1 font-semibold">
                        GET A QUOTE
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-on-surface dark:text-white">
                        Request a Free Quote
                      </h3>
                      <p className="text-xs sm:text-sm text-muted dark:text-gray-300 mt-1 font-normal font-sans">
                        Fill in your car details below. We'll get back to you within 4 hours with an estimate.
                      </p>
                    </div>

                    {/* Personal Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                          Full Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Christian Horner"
                          className={`w-full px-5 py-3 bg-white dark:bg-obsidian-surface2 border text-sm text-on-surface dark:text-white rounded-full focus:outline-none transition-colors ${
                            errors.fullName ? 'border-primary focus:border-primary' : 'border-brand-border dark:border-white/15 focus:border-primary'
                          }`}
                        />
                        {errors.fullName && (
                          <span className="text-[11px] text-primary mt-1 block flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3 h-3" /> {errors.fullName}
                          </span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@domain.com"
                          className={`w-full px-5 py-3 bg-white dark:bg-obsidian-surface2 border text-sm text-on-surface dark:text-white rounded-full focus:outline-none transition-colors ${
                            errors.email ? 'border-primary focus:border-primary' : 'border-brand-border dark:border-white/15 focus:border-primary'
                          }`}
                        />
                        {errors.email && (
                          <span className="text-[11px] text-primary mt-1 block flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Phone & Booking Window */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full px-5 py-3 bg-white dark:bg-obsidian-surface2 border text-sm text-on-surface dark:text-white rounded-full focus:outline-none transition-colors ${
                            errors.phone ? 'border-primary focus:border-primary' : 'border-brand-border dark:border-white/15 focus:border-primary'
                          }`}
                        />
                        {errors.phone && (
                          <span className="text-[11px] text-primary mt-1 block flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="preferredDate" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                          Target Booking Window
                        </label>
                        <input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-5 py-3 bg-white dark:bg-obsidian-surface2 border border-brand-border dark:border-white/15 focus:border-primary text-sm text-on-surface dark:text-white rounded-full focus:outline-none transition-colors font-mono"
                        />
                      </div>
                    </div>

                    {/* Vehicle Specification */}
                    <div className="pt-2 border-t border-brand-border dark:border-white/10">
                      <span className="text-[11px] font-mono tracking-widest uppercase text-primary block mb-3 font-semibold">
                        VEHICLE SPECIFICATION
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Make */}
                        <div>
                          <label htmlFor="vehicleMake" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                            Make <span className="text-primary">*</span>
                          </label>
                          <input
                            id="vehicleMake"
                            type="text"
                            value={formData.vehicleMake}
                            onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                            placeholder="e.g. Porsche"
                            className={`w-full px-5 py-3 bg-white dark:bg-obsidian-surface2 border text-sm text-on-surface dark:text-white rounded-full focus:outline-none transition-colors ${
                              errors.vehicleMake ? 'border-primary focus:border-primary' : 'border-brand-border dark:border-white/15 focus:border-primary'
                            }`}
                          />
                          {errors.vehicleMake && (
                            <span className="text-[11px] text-primary mt-1 block font-mono">
                              {errors.vehicleMake}
                            </span>
                          )}
                        </div>

                        {/* Model */}
                        <div>
                          <label htmlFor="vehicleModel" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                            Model <span className="text-primary">*</span>
                          </label>
                          <input
                            id="vehicleModel"
                            type="text"
                            value={formData.vehicleModel}
                            onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                            placeholder="e.g. 911 GT3 RS"
                            className={`w-full px-5 py-3 bg-white dark:bg-obsidian-surface2 border text-sm text-on-surface dark:text-white rounded-full focus:outline-none transition-colors ${
                              errors.vehicleModel ? 'border-primary focus:border-primary' : 'border-brand-border dark:border-white/15 focus:border-primary'
                            }`}
                          />
                          {errors.vehicleModel && (
                            <span className="text-[11px] text-primary mt-1 block font-mono">
                              {errors.vehicleModel}
                            </span>
                          )}
                        </div>

                        {/* Year */}
                        <div>
                          <label htmlFor="vehicleYear" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                            Year
                          </label>
                          <input
                            id="vehicleYear"
                            type="number"
                            min="1950"
                            max="2027"
                            value={formData.vehicleYear}
                            onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                            className="w-full px-5 py-3 bg-white dark:bg-obsidian-surface2 border border-brand-border dark:border-white/15 focus:border-primary text-sm text-on-surface dark:text-white rounded-full focus:outline-none transition-colors font-mono"
                          />
                        </div>
                      </div>

                      {/* Vehicle Class Radio Buttons */}
                      <div className="mt-4">
                        <label className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-2">
                          Vehicle Profile Classification
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: 'coupe', label: 'Coupe / Sedan' },
                            { id: 'suv', label: 'SUV / Mid-Size' },
                            { id: 'exotic', label: 'Exotic / Supercar' }
                          ].map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, vehicleType: cat.id as any })}
                              className={`py-2 px-3 rounded-full text-xs font-medium border text-center transition-all ${
                                formData.vehicleType === cat.id
                                  ? 'bg-primary text-white border-primary font-semibold shadow-sm'
                                  : 'bg-white dark:bg-obsidian-surface2 border-brand-border dark:border-white/15 text-on-surface dark:text-gray-300 hover:border-primary'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label htmlFor="serviceSelect" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                        Selected Detailing Protocol or Package <span className="text-primary">*</span>
                      </label>
                      <select
                        id="serviceSelect"
                        value={formData.selectedService}
                        onChange={(e) => setFormData({ ...formData, selectedService: e.target.value })}
                        className="w-full px-5 py-3 bg-white dark:bg-obsidian-surface2 border border-brand-border dark:border-white/15 focus:border-primary text-sm text-on-surface dark:text-white rounded-full focus:outline-none transition-colors"
                      >
                        <optgroup label="Core Detailing Disciplines">
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name} ({s.tagline})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Complete Tier Packages">
                          {DETAILING_PACKAGES.map((p) => (
                            <option key={p.id} value={p.name}>
                              Package: {p.name}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Notes / Special Requests */}
                    <div>
                      <label htmlFor="notes" className="block text-xs font-mono uppercase tracking-wider text-on-surface dark:text-gray-300 mb-1.5">
                        Specific Paint Notes / Concerns (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Detail any clear coat defects, prior ceramic history, track day stone chip concerns, or delivery preferences..."
                        className="w-full px-5 py-3.5 bg-white dark:bg-obsidian-surface2 border border-brand-border dark:border-white/15 focus:border-primary text-sm text-on-surface dark:text-white rounded-xl focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="button-primary w-full text-base font-semibold !min-h-[49px] shadow-red-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>TRANSMITTING INQUIRY...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-white" />
                            <span>Submit Private Quote Request</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-muted dark:text-gray-400 mt-3">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Encrypted & Confidential
                        </span>
                        <span>•</span>
                        <span>Zero Obligation Consultation</span>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  // Confirmed Consultation Result Card
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-6"
                  >
                    {/* Top Status Banner */}
                    <div className="flex items-center gap-3.5 p-4 rounded-xl bg-teal/10 dark:bg-teal/20 border border-teal/30 text-teal dark:text-teal-glow">
                      <CheckCircle2 className="w-6 h-6 shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-sm tracking-wide text-petrol dark:text-white">
                          Consultation Request Registered
                        </h4>
                        <p className="text-xs text-graphite-muted dark:text-graphite-dim mt-0.5">
                          Reference ID: <strong className="font-mono text-petrol dark:text-white font-bold">{submittedData.referenceId}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Consultation Summary Breakdown */}
                    <div className="bg-pearl dark:bg-obsidian-surface2 border border-softgrey dark:border-white/10 p-6 rounded-xl space-y-3.5 text-xs font-mono text-graphite dark:text-pearl">
                      <div className="flex justify-between pb-2.5 border-b border-softgrey dark:border-white/10">
                        <span className="text-graphite-muted dark:text-graphite-dim uppercase">Registered:</span>
                        <span className="text-petrol dark:text-white font-medium">{submittedData.timestamp}</span>
                      </div>
                      <div className="flex justify-between pb-2.5 border-b border-softgrey dark:border-white/10">
                        <span className="text-graphite-muted dark:text-graphite-dim uppercase">Client Name:</span>
                        <span className="text-petrol dark:text-white font-medium">{submittedData.data.fullName}</span>
                      </div>
                      <div className="flex justify-between pb-2.5 border-b border-softgrey dark:border-white/10">
                        <span className="text-graphite-muted dark:text-graphite-dim uppercase">Contact:</span>
                        <span className="text-petrol dark:text-white">{submittedData.data.email} | {submittedData.data.phone}</span>
                      </div>
                      <div className="flex justify-between pb-2.5 border-b border-softgrey dark:border-white/10">
                        <span className="text-graphite-muted dark:text-graphite-dim uppercase">Vehicle:</span>
                        <span className="text-copper dark:text-copper-glow font-bold">
                          {submittedData.data.vehicleYear} {submittedData.data.vehicleMake} {submittedData.data.vehicleModel}
                        </span>
                      </div>
                      <div className="flex justify-between pb-2.5 border-b border-softgrey dark:border-white/10">
                        <span className="text-graphite-muted dark:text-graphite-dim uppercase">Requested Service:</span>
                        <span className="text-petrol dark:text-white font-medium">{submittedData.data.selectedService}</span>
                      </div>
                      {submittedData.data.preferredDate && (
                        <div className="flex justify-between pb-2.5 border-b border-softgrey dark:border-white/10">
                          <span className="text-graphite-muted dark:text-graphite-dim uppercase">Target Window:</span>
                          <span className="text-petrol dark:text-white">{submittedData.data.preferredDate}</span>
                        </div>
                      )}
                      {submittedData.data.notes && (
                        <div className="pt-2">
                          <span className="text-graphite-muted dark:text-graphite-dim uppercase block mb-1">Notes:</span>
                          <span className="text-graphite dark:text-pearl font-sans">{submittedData.data.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Instant Actions */}
                    <div className="space-y-3 pt-2">
                      <a
                        href={generateWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-primary w-full text-xs font-semibold"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Summary Directly on WhatsApp</span>
                      </a>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="button-secondary text-xs"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Summary</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="button-secondary text-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>New Inquiry</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-graphite-muted dark:text-graphite-dim text-center font-mono">
                      * Inquiry securely preserved in local session. Our concierge team has been alerted.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
