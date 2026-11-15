import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock, Shield, Sparkles, ArrowRight } from 'lucide-react';
import type { ServiceItem } from '../types';
import { ResponsiveImage } from './ResponsiveImage';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-petrol-dark/80 dark:bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white dark:bg-obsidian-surface border border-softgrey dark:border-white/15 rounded-2xl shadow-float overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-softgrey dark:border-white/10 bg-pearl dark:bg-obsidian-surface2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal dark:bg-teal-glow"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-petrol dark:text-white font-semibold">
                Treatment Specification
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-graphite-muted dark:text-graphite-dim hover:text-petrol dark:hover:text-white hover:bg-softgrey dark:hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 bg-white dark:bg-obsidian-surface">
            
            {/* Header Hero Area */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <span className="text-xs font-mono tracking-wider text-teal dark:text-teal-glow uppercase font-semibold">
                  {service.tagline}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-petrol dark:text-white tracking-tight">
                  {service.name}
                </h3>
                <p className="text-graphite-light dark:text-graphite-dim text-sm leading-relaxed">
                  {service.fullDescription}
                </p>
                
                {/* Meta Badges */}
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-graphite-muted dark:text-graphite-dim">
                    <Clock className="w-3.5 h-3.5 text-copper dark:text-copper-glow" />
                    <span>Duration: <strong className="text-petrol dark:text-white">{service.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-graphite-muted dark:text-graphite-dim">
                    <Shield className="w-3.5 h-3.5 text-teal dark:text-teal-glow" />
                    <span>Guarantee: <strong className="text-petrol dark:text-white">{service.warranty}</strong></span>
                  </div>
                </div>
              </div>

              {/* Service Thumbnail */}
              <div className="md:col-span-5 h-52 sm:h-60 rounded-xl overflow-hidden border border-softgrey dark:border-white/10 bg-pearl-dark dark:bg-obsidian-pure">
                <ResponsiveImage
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full block"
                  imgClassName="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>

            {/* Two-Column Details: Features & Multi-Step Protocol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-softgrey dark:border-white/10">
              
              {/* Left: Key Technical Highlights */}
              <div className="space-y-4">
                <h4 className="font-heading text-base font-semibold text-petrol dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal dark:text-teal-glow" />
                  <span>Engineered Advantages</span>
                </h4>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite-muted dark:text-graphite-dim leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-teal/10 dark:bg-teal/20 text-teal dark:text-teal-glow flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Step-by-Step Clean Bay Protocol */}
              <div className="space-y-4">
                <h4 className="font-heading text-base font-semibold text-petrol dark:text-white">
                  Studio Execution Protocol
                </h4>
                <div className="space-y-3">
                  {service.processSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-graphite-muted dark:text-graphite-dim leading-relaxed">
                      <span className="font-mono text-xs text-copper dark:text-copper-glow font-bold shrink-0 mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recommended Vehicle Profiles */}
            <div className="p-4 rounded-xl bg-pearl dark:bg-obsidian-surface2 border border-softgrey dark:border-white/10 text-xs font-mono">
              <span className="text-petrol dark:text-white font-semibold uppercase block mb-1">
                Recommended Applications:
              </span>
              <span className="text-graphite-muted dark:text-graphite-dim font-sans">{service.recommendedFor}</span>
            </div>

          </div>

          {/* Modal Footer / Action CTA */}
          <div className="px-6 py-4 bg-pearl-light dark:bg-obsidian-surface2 border-t border-softgrey dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-graphite-muted dark:text-graphite-dim font-mono">
              * Includes comprehensive ultrasonic paint thickness profiling.
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="button-secondary !min-h-[42px] !py-2 !px-5 text-xs font-semibold w-1/2 sm:w-auto"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookService(service.name);
                }}
                className="button-primary !min-h-[42px] !py-2 !px-5 text-xs font-semibold w-1/2 sm:w-auto"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
