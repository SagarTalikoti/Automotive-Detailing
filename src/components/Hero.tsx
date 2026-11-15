import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Calendar,
  ShieldCheck,
  Sparkles,
  Wand2,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

const TYPED_SERVICES = [
  'Flawless Finish & Protection.',
  'Ceramic Quartz Coating.',
  'Self-Healing PPF Armor.',
  'Multi-Stage Paint Correction.',
  'Deep Interior Cleaning.',
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  // Typewriter Animation State
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video immediately on mount and pause when scrolled out of viewport
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    if (!videoContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Typewriter Effect
  useEffect(() => {
    const currentPhrase = TYPED_SERVICES[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, 75);
      } else {
        // Pause at the end of the phrase before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length - 1));
        }, 35);
      } else {
        // Move to the next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPED_SERVICES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Obsidian Auto Studio Hero Section"
      className="relative w-full flex items-center bg-white dark:bg-obsidian-pure pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden border-b border-brand-border dark:border-white/10 transition-colors duration-300"
    >
      {/* Subtle Redline Ambient Energy Glow */}
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Balanced Side-by-Side Composition with Proper Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Text Column (5 cols on desktop for perfect balance) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5 sm:space-y-6"
          >
            {/* Clear Editorial Headline with Animated Typing Effect */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px] font-semibold tracking-tight text-on-surface dark:text-white leading-[1.14]">
                Precision Car Detailing. <br />
                <span className="text-primary">
                  {currentText}
                  {/* Blinking Redline Cursor at the exact end of the last word */}
                  <span
                    aria-hidden="true"
                    className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-primary ml-1 align-baseline animate-pulse shadow-[0_0_8px_#FF4646]"
                  />
                </span>
              </h1>
              {/* Screen reader friendly accessible text */}
              <span className="sr-only">
                Obsidian Auto Studio specializes in precision car detailing, ceramic quartz coating, self-healing PPF, and paint correction.
              </span>
            </div>

            {/* Direct Supporting Copy (High-contrast, fully visible) */}
            <p className="body-lg text-muted dark:text-gray-300 max-w-xl leading-relaxed text-sm sm:text-base">
              Restore your car’s showroom shine with multi-stage swirl correction, self-healing PPF, ceramic coating, and deep interior cleaning by experienced detailers.
            </p>

            {/* Dual CTAs (button-primary & button-secondary) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onOpenBooking}
                className="button-primary !px-7 !py-3.5 text-sm sm:text-base font-semibold shadow-red-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book Service Now</span>
              </button>

              <a
                href="#services"
                onClick={handleScrollToServices}
                className="button-secondary !px-7 !py-3.5 text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 text-on-surface dark:text-white" />
              </a>
            </div>

            {/* Quality Commitment Badges (100% visible on white bg, neatly organized) */}
            <div className="pt-5 border-t border-brand-border dark:border-white/10 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-muted dark:text-gray-300 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-on-surface dark:text-gray-200">Clean Studio Bays</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-on-surface dark:text-gray-200">Certified Detailers</span>
              </div>
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-on-surface dark:text-gray-200">Paint Depth Gauges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-on-surface dark:text-gray-200">10-Year Warranty</span>
              </div>
            </div>
          </motion.div>

          {/* Right Video Column (7 cols on desktop - High-End Floating Studio Display) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex items-center justify-center"
          >
            {/* Ambient Soft Redline Diffusion Glow */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent rounded-3xl blur-2xl -z-10 pointer-events-none" />

            {/* Precision Architectural Studio Frame (Clean, Sharp, Zero Cloudy Vignette Blur) */}
            <div
              ref={videoContainerRef}
              className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] lg:h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] group"
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/assets/hero-video-poster.jpg"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              >
                <source src="/assets/hero-video-desktop.mp4" type="video/mp4" media="(min-width: 769px)" />
                <source src="/assets/hero-video-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
                <source src="/assets/hero-video-1.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
