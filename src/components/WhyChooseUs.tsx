import React from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Shield,
  Sliders,
  Eye,
  HeartHandshake,
  Sparkles
} from 'lucide-react';

interface PillarItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export const WhyChooseUs: React.FC = () => {
  const pillars: PillarItem[] = [
    {
      number: "01",
      title: "Careful Paint Inspection",
      subtitle: "Digital depth measurement",
      description: "We measure clear coat thickness across every panel with digital depth gauges before machine polishing to guarantee safe, lasting paint protection.",
      icon: <Wrench className="w-5 h-5 text-primary" />
    },
    {
      number: "02",
      title: "Trusted Premium Products",
      subtitle: "Professional ceramic & PPF",
      description: "We use only tested, industry-leading 9H ceramic coatings, self-healing paint protection films, and professional polishing compounds.",
      icon: <Shield className="w-5 h-5 text-primary" />
    },
    {
      number: "03",
      title: "Customized for Every Car",
      subtitle: "Matched to your paint type",
      description: "Different vehicle makes use different clear coat hardness. We carefully match our polishing pads, compounds, and speeds to your car's specific finish.",
      icon: <Sliders className="w-5 h-5 text-primary" />
    },
    {
      number: "04",
      title: "Meticulous Attention to Detail",
      subtitle: "Every crevice and seam",
      description: "No area is overlooked. From wheel barrels and door jambs to badges and exhaust tips, every detail receives dedicated hand craftsmanship.",
      icon: <Eye className="w-5 h-5 text-primary" />
    },
    {
      number: "05",
      title: "Transparent & Honest Service",
      subtitle: "Clear updates and guarantees",
      description: "Upfront pricing, realistic expectations, progress photo updates, and a documented warranty on all our ceramic and PPF services.",
      icon: <HeartHandshake className="w-5 h-5 text-primary" />
    }
  ];

  return (
    <section id="why-us" className="relative py-20 sm:py-28 bg-white dark:bg-obsidian-surface text-on-surface dark:text-pearl overflow-hidden border-t border-b border-brand-border dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="chip-redline">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="headline-lg text-on-surface dark:text-white">
            The Studio Difference. <br />
            <span className="text-primary">Standards You Can Trust.</span>
          </h2>

          <p className="body-md text-muted dark:text-gray-300 leading-relaxed font-normal">
            We focus on quality over quantity. Every vehicle receives dedicated bay time, clean tools, and master detailing technique.
          </p>
        </div>

        {/* 5 Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl p-6 sm:p-7 border border-brand-border dark:border-white/10 bg-neutral/40 dark:bg-obsidian-pure shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-primary">
                    {pillar.number}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading text-lg font-bold text-on-surface dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-primary font-semibold">
                    {pillar.subtitle}
                  </p>
                </div>

                <p className="text-sm text-muted dark:text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
