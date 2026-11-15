import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/studioData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-white dark:bg-obsidian-pure text-on-surface dark:text-pearl overflow-hidden border-t border-brand-border dark:border-white/10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="chip-redline mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>KNOWLEDGE BASE & GUIDANCE</span>
          </div>

          <h2 className="headline-lg text-on-surface dark:text-white">
            Frequently Asked <span className="text-primary">Questions.</span>
          </h2>

          <p className="body-md text-muted dark:text-gray-300 leading-relaxed font-normal">
            Essential insights regarding ceramic chemical bonding, self-healing urethane films, clear coat preservation, and our studio scheduling protocol.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-xl transition-all duration-300 border bg-white dark:bg-obsidian-surface ${
                  isOpen
                    ? 'border-primary shadow-elevated'
                    : 'border-brand-border dark:border-white/10 hover:border-primary/50 shadow-subtle'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-[11px] font-mono text-primary font-semibold">
                      0{index + 1}
                    </span>
                    <span className="label-lg text-on-surface dark:text-white font-semibold">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-primary text-white border-primary rotate-180 shadow-sm'
                        : 'bg-neutral dark:bg-obsidian-surface2 border-brand-border dark:border-white/10 text-muted dark:text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-brand-border dark:border-white/10 body-sm text-muted dark:text-gray-300 leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Have Questions Banner */}
        <div className="p-6 sm:p-8 rounded-xl bg-neutral dark:bg-obsidian-surface border border-brand-border dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-subtle">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="label-lg font-semibold text-on-surface dark:text-white">
              Have a specific question about your vehicle?
            </h3>
            <p className="body-sm text-muted dark:text-gray-400 font-normal">
              Our technical concierge will review your clear coat thickness and recommend the ideal protocol.
            </p>
          </div>

          <a
            href="#contact"
            className="button-primary text-xs !min-h-[42px] !py-2.5 !px-5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consult Concierge</span>
          </a>
        </div>

      </div>
    </section>
  );
};
