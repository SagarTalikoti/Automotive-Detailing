import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/studioData';
import { BeforeAfter } from './BeforeAfter';
import { ResponsiveImage } from './ResponsiveImage';

export const TransformationGallery: React.FC = () => {
  const [selectedMarque, setSelectedMarque] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const marques = ['All', 'Porsche', 'Mercedes-Benz', 'BMW', 'Range Rover', 'Audi'];

  const filteredItems = selectedMarque === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.marque === selectedMarque);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <section id="our-work" className="py-20 sm:py-24 bg-white dark:bg-obsidian border-b border-brand-border dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="chip-redline">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Real Detailing Results</span>
          </div>

          <h2 className="headline-lg text-on-surface dark:text-white">
            Before &amp; After <br />
            <span className="text-primary">Transformation.</span>
          </h2>

          <p className="body-md text-muted dark:text-gray-300 leading-relaxed font-normal">
            See the actual difference our detailing makes. Drag the slider below to compare the dirty Porsche 911 covered in mud and road grime with its finished showroom shine.
          </p>
        </div>

        {/* 1. Single Pristine Before/After Slider (No extra tabs, no errors) */}
        <div>
          <BeforeAfter
            beforeImage="/assets/porsche-dirty-before.jpg"
            afterImage="/assets/porsche-clean-after.jpg"
            beforeLabel="Before"
            afterLabel="After"
          />
        </div>

        {/* 2. Recent Client Vehicle Gallery */}
        <div className="space-y-8 pt-8 border-t border-brand-border dark:border-white/10">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl font-bold text-on-surface dark:text-white">
                Recent Projects
              </h3>
              <p className="text-xs text-muted dark:text-gray-400 font-mono mt-1">
                Explore our recent detailing, ceramic coating, and PPF projects
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral/50 dark:bg-obsidian-surface rounded-full border border-brand-border dark:border-white/10">
              {marques.map((marque) => (
                <button
                  key={marque}
                  onClick={() => setSelectedMarque(marque)}
                  className={`px-3.5 py-1 text-xs font-mono tracking-wider uppercase rounded-full transition-all ${
                    selectedMarque === marque
                      ? 'bg-primary text-white font-semibold shadow-sm'
                      : 'text-muted dark:text-gray-400 hover:text-primary dark:hover:text-white'
                  }`}
                >
                  {marque}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative h-80 rounded-xl overflow-hidden bg-neutral dark:bg-obsidian-surface border border-brand-border dark:border-white/10 hover:shadow-elevated cursor-pointer transition-all duration-300"
              >
                {/* Image */}
                <ResponsiveImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full block"
                  imgClassName="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 dark:from-obsidian-pure/90 via-black/20 dark:via-obsidian-pure/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Marque Tag */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/95 dark:bg-obsidian-surface/95 backdrop-blur-sm border border-brand-border dark:border-white/15 text-[10px] font-mono tracking-wider uppercase text-on-surface dark:text-white font-semibold">
                  {item.marque}
                </div>

                {/* Center Maximize Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-red-sm transform scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Details Card */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-primary font-semibold block mb-1">
                    {item.model}
                  </span>
                  <h4 className="font-heading text-base font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-1 font-normal">
                    {item.service}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image & Details */}
            <div
              className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider block">
                  {filteredItems[lightboxIndex].marque} • {filteredItems[lightboxIndex].model}
                </span>
                <h3 className="font-heading text-lg font-bold text-white mt-1">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  {filteredItems[lightboxIndex].service}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
