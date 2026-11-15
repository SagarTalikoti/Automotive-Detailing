import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'about', 'services', 'our-work', 'packages', 'why-us', 'process', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Packages', href: '#packages' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <nav
        aria-label="Main Navigation"
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-obsidian-surface/95 backdrop-blur-md border-b border-brand-border dark:border-white/10 shadow-subtle py-3'
            : 'bg-white/90 dark:bg-obsidian-pure/90 backdrop-blur-sm border-b border-brand-border/70 dark:border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo with Bespoke HD Graphics Emblem */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 transition-transform hover:scale-[1.02]"
            aria-label="Obsidian Auto Studio Home"
          >
            {/* High-Resolution HD Brand Logo (Dynamic Dark/Light Mode) */}
            <img
              src="/assets/obsidian-logo-light.png"
              alt="Obsidian Auto Studio"
              className="h-9 sm:h-11 w-auto object-contain block dark:hidden filter drop-shadow-sm transition-all"
              width={160}
              height={44}
            />
            <img
              src="/assets/obsidian-logo-dark.png"
              alt="Obsidian Auto Studio"
              className="h-9 sm:h-11 w-auto object-contain hidden dark:block filter drop-shadow-sm transition-all"
              width={160}
              height={44}
            />
          </a>

          {/* Desktop Navigation Links (nav-sm: Poppins 15px, 500) */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`nav-sm transition-colors relative py-1 ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-on-surface/80 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Header Actions: Theme Switcher & Book Appointment */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-full border border-brand-border dark:border-white/15 text-on-surface dark:text-white bg-white dark:bg-obsidian-surface hover:bg-neutral dark:hover:bg-neutral-dark/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-on-surface" />
              )}
            </button>

            {/* Book Appointment CTA (button-primary pill) */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="button-primary hidden sm:inline-flex !min-h-[44px] !py-2.5 !px-5 text-sm"
            >
              <span>Book Service</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-on-surface dark:text-white hover:bg-neutral dark:hover:bg-white/10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white dark:bg-obsidian-surface border-t border-brand-border dark:border-white/10 px-6 pt-4 pb-6 space-y-4 mt-3 shadow-elevated">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-brand-border dark:border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-2.5 px-3 text-xs tracking-wider uppercase text-on-surface dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-neutral dark:hover:bg-neutral-dark/20 rounded-full transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted dark:text-gray-400 font-mono">
                Theme: <strong className="text-on-surface dark:text-white uppercase">{theme}</strong>
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-border dark:border-white/10 text-xs font-mono text-on-surface dark:text-white"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-on-surface" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="button-primary w-full text-sm"
              >
                <span>Book Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/18006274342?text=Hello%20Obsidian%20Auto%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20detailing%20my%20car."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20BD5A] transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="text-center text-[11px] text-graphite-muted dark:text-graphite-dim font-mono pt-1">
              {BUSINESS_CONFIG.businessPhone} • {BUSINESS_CONFIG.businessCityStateZip}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
