import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/studioData';

export const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollPosRef = useRef<number>(0);

  // Triple the reviews for seamless infinite wrap
  const infiniteReviews = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  // Silky smooth continuous slow auto-scroll ("slowly slowly")
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.75; // gentle, steady luxury glide

    // Sync accumulator with initial scroll
    scrollPosRef.current = el.scrollLeft;

    const step = () => {
      if (!isPaused && el) {
        scrollPosRef.current += speed;

        const singleSetWidth = el.scrollWidth / 3;
        if (scrollPosRef.current >= singleSetWidth * 2) {
          scrollPosRef.current -= singleSetWidth;
        }

        el.scrollLeft = scrollPosRef.current;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Keep accumulator in sync if user manually scrolls or swipes
  const handleScroll = () => {
    if (scrollRef.current && isPaused) {
      scrollPosRef.current = scrollRef.current.scrollLeft;
    }
  };

  // Manual nudge controls
  const handleNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 370, behavior: 'smooth' });
    setTimeout(() => {
      if (scrollRef.current) scrollPosRef.current = scrollRef.current.scrollLeft;
    }, 400);
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft < 370) {
      el.scrollLeft += singleSetWidth;
      scrollPosRef.current = el.scrollLeft;
    }
    el.scrollBy({ left: -370, behavior: 'smooth' });
    setTimeout(() => {
      if (scrollRef.current) scrollPosRef.current = scrollRef.current.scrollLeft;
    }, 400);
  };

  return (
    <section
      id="testimonials"
      className="py-18 sm:py-24 bg-white dark:bg-obsidian-pure text-on-surface dark:text-pearl overflow-hidden border-t border-brand-border dark:border-white/10 transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Google Reviews Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-brand-border dark:border-white/10">
          <div className="space-y-3">
            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-neutral dark:bg-obsidian-surface border border-brand-border dark:border-white/10">
              {/* Google 4-Color G Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span className="font-heading font-semibold text-xs text-on-surface dark:text-white">
                Google Rating 5.0
              </span>
              <div className="flex items-center text-[#FBBC05]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-muted dark:text-gray-400 font-sans">
                (250+ Reviews)
              </span>
            </div>

            <h2 className="headline-lg text-on-surface dark:text-white">
              Customer <span className="text-primary">Reviews.</span>
            </h2>
            <p className="body-sm text-muted dark:text-gray-300 max-w-xl">
              Real feedback from local car owners who trust Obsidian Auto Studio with their vehicles.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs font-mono text-muted dark:text-gray-400 mr-2 hidden sm:inline">
              Auto-scrolling • Hover to pause
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-brand-border dark:border-white/10 bg-white dark:bg-obsidian-surface hover:bg-neutral dark:hover:bg-neutral-dark/40 text-on-surface dark:text-white flex items-center justify-center transition-all shadow-subtle hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-brand-border dark:border-white/10 bg-white dark:bg-obsidian-surface hover:bg-neutral dark:hover:bg-neutral-dark/40 text-on-surface dark:text-white flex items-center justify-center transition-all shadow-subtle hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continuous Smooth Horizontal Auto-Scroll Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 2500)}
          className="overflow-x-auto scrollbar-none py-3 -mx-4 px-4 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-5" style={{ width: 'max-content' }}>
            {infiniteReviews.map((review, idx) => {
              const initial = review.author.charAt(0);

              return (
                <div
                  key={`${review.id}-${idx}`}
                  className="w-[290px] sm:w-[340px] md:w-[360px] shrink-0 p-6 rounded-2xl bg-white dark:bg-obsidian-surface border border-brand-border dark:border-white/10 shadow-subtle hover:border-primary/50 hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Top: Google Profile Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Authentic Google Circular Initial Avatar */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0"
                          style={{ backgroundColor: review.avatarColor || '#4285F4' }}
                        >
                          {initial}
                        </div>
                        
                        {/* Name & Local Guide badge */}
                        <div>
                          <div className="font-heading font-semibold text-sm text-on-surface dark:text-white leading-tight">
                            {review.author}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-muted dark:text-gray-400 mt-0.5">
                            {review.isLocalGuide ? (
                              <span className="flex items-center gap-1 text-primary font-medium">
                                <CheckCircle2 className="w-3 h-3" />
                                Local Guide
                              </span>
                            ) : (
                              <span>Verified Client</span>
                            )}
                            <span>•</span>
                            <span>{review.timeAgo || review.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Google G mini logo on top right of each card */}
                      <svg className="w-4 h-4 shrink-0 opacity-80" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    </div>

                    {/* Stars + Vehicle Tag */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center text-[#FBBC05]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral dark:bg-obsidian-surface2 text-on-surface/80 dark:text-gray-300 border border-brand-border dark:border-white/10 shrink-0">
                        {review.vehicle}
                      </span>
                    </div>

                    {/* Review Quote */}
                    <p className="body-sm text-on-surface/90 dark:text-gray-200 leading-relaxed font-normal pt-1">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Card Bottom: Verified Google Review check */}
                  <div className="pt-4 mt-4 border-t border-brand-border dark:border-white/10 flex items-center justify-between text-[11px] text-muted dark:text-gray-400 font-mono">
                    <span className="flex items-center gap-1 text-[#34A853]">
                      <CheckCircle2 className="w-3 h-3" />
                      Posted on Google Maps
                    </span>
                    <span>5.0 Star</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
