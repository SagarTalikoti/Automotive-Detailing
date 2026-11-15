import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Car, Sparkles } from 'lucide-react';
import { DETAILING_PACKAGES } from '../data/studioData';

interface PackagesProps {
  onSelectPackage: (packageName: string, vehicleType: 'coupe' | 'suv' | 'exotic') => void;
}

export const Packages: React.FC<PackagesProps> = ({ onSelectPackage }) => {
  const [vehicleType, setVehicleType] = useState<'coupe' | 'suv' | 'exotic'>('coupe');
  // State to track which card's outer border is active (defaults to signature-detail)
  const [selectedPackageId, setSelectedPackageId] = useState<string>('signature-detail');

  const vehicleCategories = [
    { id: 'coupe', label: 'Coupe & Sedan' },
    { id: 'suv', label: 'SUV & Mid-Size' },
    { id: 'exotic', label: 'Exotic & Supercar' },
  ];

  return (
    <section id="packages" className="py-20 sm:py-28 bg-neutral/40 dark:bg-obsidian-pure border-b border-brand-border dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="chip-redline mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>PACKAGES & PRICING</span>
          </div>

          <h2 className="headline-lg text-on-surface dark:text-white">
            Detailing & Protection <span className="text-primary">Packages.</span>
          </h2>

          <p className="body-md text-muted dark:text-gray-300 leading-relaxed font-normal">
            Choose your vehicle class and select any package below to inspect its features.
          </p>
        </div>

        {/* Thin Vehicle Category Selector (Headings Only) */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            <Car className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono uppercase tracking-wider text-muted dark:text-gray-400">
              Select Vehicle Class
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 p-1 bg-white dark:bg-obsidian-surface rounded-full border border-brand-border dark:border-white/10 shadow-sm">
            {vehicleCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setVehicleType(cat.id as any)}
                className={`py-1.5 px-3 rounded-full transition-all text-center text-xs sm:text-sm font-heading ${
                  vehicleType === cat.id
                    ? 'bg-primary text-white shadow-sm font-semibold'
                    : 'text-on-surface/80 dark:text-gray-300 hover:text-primary hover:bg-neutral dark:hover:bg-neutral-dark/20 font-medium'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Clickable Package Cards (Clicking switches the outer border without redirect) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {DETAILING_PACKAGES.map((pkg, index) => {
            const isSelected = selectedPackageId === pkg.id;
            const isDefaultPopular = pkg.id === 'signature-detail';
            const price = pkg.basePrices[vehicleType];

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPackageId(pkg.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPackageId(pkg.id);
                  }
                }}
                className={`relative rounded-2xl flex flex-col justify-between p-7 sm:p-8 cursor-pointer select-none transition-all duration-300 ${
                  isSelected
                    ? 'bg-white dark:bg-obsidian-surface border-2 border-primary ring-2 ring-primary/20 shadow-elevated lg:-translate-y-2'
                    : 'bg-white dark:bg-obsidian-surface border border-brand-border dark:border-white/10 shadow-subtle hover:border-brand-border-dark dark:hover:border-white/20'
                }`}
              >
                {/* Active Highlight Badge */}
                {isSelected && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white font-mono text-[10px] tracking-widest uppercase font-bold shadow-md">
                    {isDefaultPopular ? 'Most Popular • Selected' : 'Selected Plan'}
                  </div>
                )}
                {!isSelected && isDefaultPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neutral-200 dark:bg-obsidian-surface2 text-on-surface dark:text-gray-300 border border-brand-border dark:border-white/10 font-mono text-[10px] tracking-widest uppercase font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Card Header & Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className={`headline-sm transition-colors ${isSelected ? 'text-primary' : 'text-on-surface dark:text-white'}`}>
                      {pkg.name}
                    </h3>
                    <p className="body-sm text-muted dark:text-gray-400 mt-1 min-h-[36px] leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Clean Price */}
                  <div className="pt-4 border-t border-brand-border dark:border-white/10 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-heading text-primary tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs font-mono uppercase text-muted dark:text-gray-400">
                      Starting Price
                    </span>
                  </div>

                  {/* Clean 4 Bullet Points */}
                  <ul className="space-y-3 pt-2">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5 body-sm text-on-surface/90 dark:text-gray-200">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Button: Switch selection or Book */}
                <div className="pt-6 mt-6 border-t border-brand-border dark:border-white/10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackageId(pkg.id);
                      onSelectPackage(pkg.name, vehicleType);
                    }}
                    className={`w-full py-2.5 px-5 rounded-full font-heading font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                      isSelected
                        ? 'bg-primary text-white hover:bg-[#FF2F2F] shadow-sm'
                        : 'bg-neutral dark:bg-obsidian-surface2 text-on-surface dark:text-white hover:bg-neutral-200 dark:hover:bg-obsidian-surface border border-brand-border dark:border-white/10'
                    }`}
                  >
                    <span>{isSelected ? 'Book This Plan' : 'Select Plan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
