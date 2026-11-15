import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="w-full">
      {/* Interactive Drag Area */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-brand-border dark:border-white/10 shadow-elevated focus:outline-none focus:ring-2 focus:ring-primary bg-neutral-900"
        role="slider"
        aria-label="Before and after transformation comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Layer 1: AFTER Image (Fixed static background, never moves) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          loading="eager"
        />

        {/* AFTER Label Tag (Right) */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white shadow-elevated">
          <span>{afterLabel}</span>
        </div>

        {/* Layer 2: BEFORE Image (Fixed static layer with CSS clip-path polygon) */}
        {/* CRITICAL FIX: The image is NEVER inside a shrinking div, so it NEVER moves, shifts, or scales! */}
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
          loading="eager"
        />

        {/* BEFORE Label Tag (Left) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-white/95 dark:bg-obsidian-surface/95 backdrop-blur-md border border-brand-border dark:border-white/20 text-xs font-semibold uppercase tracking-wider text-on-surface dark:text-white shadow-elevated">
          <span>{beforeLabel}</span>
        </div>

        {/* Drag Divider Line & Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-primary z-30 pointer-events-none shadow-elevated"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Grip Disc */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-2 border-white shadow-float flex items-center justify-center text-white cursor-ew-resize">
            <div className="flex items-center">
              <ChevronLeft className="w-4 h-4 -mr-1" />
              <ChevronRight className="w-4 h-4 -ml-1" />
            </div>
          </div>
        </div>

        {/* User Drag Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs text-white shadow-subtle">
          Slide to compare
        </div>
      </div>
    </div>
  );
};
