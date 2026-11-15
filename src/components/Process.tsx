import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  num: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  description: string;
  detail: string;
}

export const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      num: "01",
      name: "INQUIRE",
      tagline: "Tell us about your car",
      icon: <Search className="w-5 h-5 text-primary" />,
      description: "Tell us about your vehicle, its current paint condition, and what detailing or protection services you're interested in.",
      detail: "Free quote & consultation"
    },
    {
      num: "02",
      name: "INSPECT",
      tagline: "Paint condition check",
      icon: <Compass className="w-5 h-5 text-primary" />,
      description: "We check your car's clear coat thickness with digital depth gauges under studio lighting to recommend the safest package.",
      detail: "Transparent estimate & plan"
    },
    {
      num: "03",
      name: "DETAIL",
      tagline: "Careful studio craftsmanship",
      icon: <Wrench className="w-5 h-5 text-primary" />,
      description: "Your vehicle receives thorough wash decontamination, machine polish swirl removal, ceramic coating, or PPF installation.",
      detail: "Clean bay & progress updates"
    },
    {
      num: "04",
      name: "DELIVER",
      tagline: "Walkaround & care guide",
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      description: "We perform a walkaround inspection with you under studio lights, register your warranty, and provide easy care instructions.",
      detail: "Warranty registration & tips"
    }
  ];

  return (
    <section id="process" className="relative py-20 sm:py-28 bg-neutral/50 dark:bg-obsidian-pure text-on-surface dark:text-pearl overflow-hidden border-t border-brand-border dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="chip-redline mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Our 4-Step Process</span>
          </div>

          <h2 className="headline-lg text-on-surface dark:text-white">
            Simple, Transparent &amp; <br />
            <span className="text-primary">Stress-Free.</span>
          </h2>

          <p className="body-md text-muted dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
            From initial booking to final inspection, here is how we care for your car every step of the way.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl p-6 bg-white dark:bg-obsidian-surface border border-brand-border dark:border-white/10 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-bold text-on-surface dark:text-white">
                    {step.name}
                  </h3>
                  <p className="text-xs font-mono text-primary font-semibold">
                    {step.tagline}
                  </p>
                </div>

                <p className="text-xs text-muted dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border dark:border-white/10 flex items-center gap-2 text-[11px] font-mono text-muted dark:text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{step.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
