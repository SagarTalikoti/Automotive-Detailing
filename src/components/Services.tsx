import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Layers, Wand2, Droplets, Car, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/studioData';
import type { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { ResponsiveImage } from './ResponsiveImage';

interface ServicesProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForBooking }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'ceramic-coating':
        return <Droplets className="w-4 h-4 text-teal dark:text-teal-glow" />;
      case 'ppf':
        return <Shield className="w-4 h-4 text-copper dark:text-copper-glow" />;
      case 'paint-correction':
        return <Wand2 className="w-4 h-4 text-teal dark:text-teal-glow" />;
      case 'interior-detailing':
        return <Layers className="w-4 h-4 text-copper dark:text-copper-glow" />;
      default:
        return <Car className="w-4 h-4 text-teal dark:text-teal-glow" />;
    }
  };

  const flagshipServices = SERVICES.slice(0, 2);
  const coreDisciplines = SERVICES.slice(2);

  return (
    <section id="services" className="py-20 sm:py-28 bg-white dark:bg-obsidian-pure border-b border-brand-border dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border dark:border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="chip-redline">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Dedicated Detailing Services</span>
            </div>
            
            <h2 className="headline-lg text-on-surface dark:text-white">
              Bespoke Services. <br />
              <span className="text-primary">Engineered for Protection.</span>
            </h2>
          </div>

          <p className="body-md text-muted dark:text-gray-300 max-w-md leading-relaxed">
            Every vehicle is handled inside our climate-stabilized studio bays using lab-tested ceramic chemistry, self-healing urethane films, and ultrasonic paint depth mapping.
          </p>
        </div>

        {/* 1. Flagship Dual Showcase (Ceramic Coating & PPF) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {flagshipServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white dark:bg-obsidian-surface border border-brand-border dark:border-white/10 rounded-xl overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group p-6 sm:p-8"
            >
              <div className="space-y-6">
                {/* Image */}
                <div className="relative h-64 sm:h-72 w-full rounded-lg overflow-hidden bg-neutral dark:bg-obsidian-pure">
                  <ResponsiveImage
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full block"
                    imgClassName="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 dark:bg-obsidian-surface/95 backdrop-blur-sm border border-brand-border dark:border-white/15 text-[11px] font-mono tracking-wider uppercase text-on-surface dark:text-white shadow-subtle">
                    {getServiceIcon(service.id)}
                    <span>{service.warranty}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-wider uppercase text-primary font-semibold block">
                    {service.tagline}
                  </span>
                  <h3 className="headline-sm text-on-surface dark:text-white">
                    {service.name}
                  </h3>
                  <p className="body-md text-muted dark:text-gray-300 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Bulleted Benefits */}
                <ul className="space-y-2 pt-2 border-t border-brand-border dark:border-white/10 text-xs text-muted dark:text-gray-400">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-brand-border dark:border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="button-link font-medium"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectServiceForBooking(service.name)}
                  className="button-primary !min-h-[38px] !py-2 !px-4 text-xs font-semibold"
                >
                  Book Service
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Specialized Core Disciplines (Paint Correction, Interior, Exterior) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {coreDisciplines.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-obsidian-surface border border-brand-border dark:border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="space-y-5">
                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-neutral dark:bg-obsidian-pure">
                  <ResponsiveImage
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full block"
                    imgClassName="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-obsidian-surface/95 text-[10px] font-mono tracking-wider text-on-surface dark:text-white font-medium border border-brand-border/60">
                    {getServiceIcon(service.id)}
                    <span>{service.duration}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-primary font-semibold block">
                    {service.tagline}
                  </span>
                  <h3 className="label-lg font-semibold text-on-surface dark:text-white">
                    {service.name}
                  </h3>
                  <p className="body-sm text-muted dark:text-gray-400 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-brand-border dark:border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="button-link text-sm font-medium"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectServiceForBooking(service.name)}
                  className="button-primary !min-h-[36px] !py-1.5 !px-3.5 text-xs font-semibold"
                >
                  Book Service
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={onSelectServiceForBooking}
      />
    </section>
  );
};
