import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sliders, ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderPreset {
  id: string;
  label: string;
  vehicle: string;
  treatment: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
}

const PRESETS: SliderPreset[] = [
  {
    id: 'paint',
    label: 'Paint Correction',
    vehicle: 'Porsche 911 GT3 (Basalt Black)',
    treatment: 'Stage 2 Multi-Angle Jeweling & 9H Ceramic Seal',
    beforeImg: '/assets/slider-paint-before.jpg',
    afterImg: '/assets/slider-paint-after.jpg',
    beforeLabel: 'Before: Severe Wash Swirls & Oxidation',
    afterLabel: 'After: Deep Obsidian Mirror Finish'
  },
  {
    id: 'interior',
    label: 'Leather Restoration',
    vehicle: 'Mercedes-AMG GT (Nappa Interior)',
    treatment: 'Dry Vapor Steam Extraction & Natural Lanolin Matte Rejuvenation',
    beforeImg: '/assets/slider-interior-before.jpg',
    afterImg: '/assets/slider-interior-after.jpg',
    beforeLabel: 'Before: Grimy Sheen & Dry Creases',
    afterLabel: 'After: Rehydrated Factory Matte Touch'
  },
  {
    id: 'wheel',
    label: 'Forged Wheel & Caliper',
    vehicle: 'BMW M4 Competition',
    treatment: 'Wheels-Off Iron Dissolve & 1,200°F Thermal Ceramic Shield',
    beforeImg: '/assets/slider-wheel-before.jpg',
    afterImg: '/assets/slider-wheel-after.jpg',
    beforeLabel: 'Before: Baked Carbon-Metallic Dust',
    afterLabel: 'After: High-Slip Ceramic Hydrophobic Armor'
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPreset = PRESETS[activePresetIndex];

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
    <div className="w-full space-y-6">
      
      {/* Preset Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-obsidian-border">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-gold" />
          <span className="text-xs font-mono uppercase tracking-widest text-charcoal-300">
            INTERACTIVE SLIDER CASE STUDIES
          </span>
        </div>

        <div className="flex items-center gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => {
                setActivePresetIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded transition-all ${
                activePresetIndex === idx
                  ? 'bg-gold text-obsidian font-semibold shadow-gold-sm'
                  : 'bg-obsidian-surface text-charcoal-400 hover:text-white border border-white/5'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Details Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-sm bg-obsidian-surface2 border border-obsidian-border text-xs">
        <div>
          <span className="text-charcoal-400 font-mono uppercase tracking-wider">Subject Vehicle: </span>
          <strong className="text-white font-medium">{currentPreset.vehicle}</strong>
        </div>
        <div>
          <span className="text-charcoal-400 font-mono uppercase tracking-wider">Treatment: </span>
          <span className="text-gold font-medium">{currentPreset.treatment}</span>
        </div>
      </div>

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
        className="relative w-full h-[400px] sm:h-[500px] md:h-[580px] rounded-sm overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold"
        role="slider"
        aria-label="Before and after transformation comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* AFTER Image (Full background layer) */}
        <img
          src={currentPreset.afterImg}
          alt={currentPreset.afterLabel}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* AFTER Label Tag (Right) */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none px-3 py-1.5 rounded-sm bg-obsidian/85 backdrop-blur-md border border-gold/40 text-[11px] font-mono tracking-wider uppercase text-gold shadow-gold-sm">
          <span>{currentPreset.afterLabel}</span>
        </div>

        {/* BEFORE Image (Clipped layer) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden select-none pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={currentPreset.beforeImg}
            alt={currentPreset.beforeLabel}
            className="absolute inset-0 w-full h-full object-cover select-none max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%'
            }}
          />
          {/* Subtle Dim Filter on Before side */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none"></div>

          {/* BEFORE Label Tag (Left) */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none px-3 py-1.5 rounded-sm bg-obsidian/85 backdrop-blur-md border border-white/20 text-[11px] font-mono tracking-wider uppercase text-charcoal-200">
            <span>{currentPreset.beforeLabel}</span>
          </div>
        </div>

        {/* Drag Divider Line & Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-gold-light via-gold to-gold-dark z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Grip Disc */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-obsidian border-2 border-gold shadow-gold-md flex items-center justify-center text-gold cursor-ew-resize">
            <div className="flex items-center gap-0.5">
              <ChevronLeft className="w-3.5 h-3.5 -mr-1" />
              <ChevronRight className="w-3.5 h-3.5 -ml-1" />
            </div>
          </div>
        </div>

        {/* Drag Helper Tooltip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3 py-1 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-charcoal-300">
          Drag horizontally or use arrow keys
        </div>
      </div>
    </div>
  );
};
