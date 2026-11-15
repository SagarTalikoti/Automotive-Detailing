import React from 'react';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { ResponsiveImage } from './ResponsiveImage';

export const TrustIntro: React.FC = () => {
  const principles = [
    {
      title: "Precision in every finish.",
      description: "Careful paint thickness inspection, tailored polishing stages, and daylight inspection lamps to safely eliminate scratches."
    },
    {
      title: "Protection for every journey.",
      description: "Durable ceramic coatings and self-healing clear films engineered to resist stone chips, UV rays, and road grime."
    },
    {
      title: "Excellence in every detail.",
      description: "A focused studio where your car, leather interior, and wheels receive dedicated, unhurried craftsmanship."
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-neutral/50 dark:bg-obsidian border-b border-brand-border dark:border-white/10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Detailer at Work */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="rounded-xl overflow-hidden border border-brand-border dark:border-white/10 shadow-elevated bg-white dark:bg-obsidian-surface p-3">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-lg overflow-hidden">
                <ResponsiveImage
                  src="/assets/user-detailer-polishing.jpg"
                  alt="Master detailer performing precision paint correction on Porsche with rotary machine polisher"
                  className="w-full h-full block"
                  imgClassName="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  width={500}
                  height={751}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 dark:from-obsidian-pure/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Informational Pill */}
              <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs font-mono text-muted dark:text-gray-400">
                <span className="text-on-surface dark:text-white font-medium">Dedicated Clean Bay</span>
                <span className="text-primary font-medium">Certified Detailing</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & 3 Core Principles */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <div className="chip-redline">
                <Compass className="w-3.5 h-3.5 text-primary" />
                <span>Our Detailing Philosophy</span>
              </div>

              <h2 className="headline-lg text-on-surface dark:text-white">
                Care That Goes <br />
                <span className="text-primary">Beyond Ordinary Detailing.</span>
              </h2>

              <div className="space-y-4 body-md text-muted dark:text-gray-300">
                <p>
                  At <strong className="text-on-surface dark:text-white font-semibold">{BUSINESS_CONFIG.businessName}</strong>, detailing is approached with precision and patience. Modern automotive finishes are thin and sensitive, requiring careful technique rather than aggressive friction.
                </p>
                <p>
                  We operate a focused, low-volume studio where each vehicle receives our undivided attention. Using digital paint depth gauges, proven ceramic coatings, and precision-cut protection films, we protect your vehicle's value and keep it looking showroom new.
                </p>
              </div>
            </div>

            {/* 3 Core Principles */}
            <div className="space-y-5 pt-2 border-t border-brand-border dark:border-white/10">
              {principles.map((p, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-obsidian-surface2 border border-brand-border dark:border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="label-lg text-on-surface dark:text-white">
                      {p.title}
                    </h3>
                    <p className="body-sm text-muted dark:text-gray-400">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
