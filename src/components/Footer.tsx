import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Before & After', href: '#our-work' },
    { name: 'Packages', href: '#packages' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white dark:bg-obsidian-surface border-t border-brand-border dark:border-white/10 text-muted dark:text-gray-400 text-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Simple, Clean 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-brand-border dark:border-white/10">
          
          {/* Column 1: Brand & Contact Info (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-2">
              <a href="#hero" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 transition-transform hover:scale-[1.02]">
                <img
                  src="/assets/obsidian-logo-light.png"
                  alt="Obsidian Auto Studio"
                  className="h-10 sm:h-12 w-auto object-contain block dark:hidden"
                  width={175}
                  height={48}
                />
                <img
                  src="/assets/obsidian-logo-dark.png"
                  alt="Obsidian Auto Studio"
                  className="h-10 sm:h-12 w-auto object-contain hidden dark:block"
                  width={175}
                  height={48}
                />
              </a>
              <span className="text-xs text-primary font-medium block">
                Precision Car Detailing &amp; Paint Protection
              </span>
            </div>

            <p className="text-muted dark:text-gray-300 text-sm leading-relaxed max-w-md font-sans">
              Scottsdale's dedicated studio for paint correction, ceramic quartz coatings, and self-healing paint protection film.
            </p>

            <div className="pt-2 space-y-2 text-xs text-muted dark:text-gray-300 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{BUSINESS_CONFIG.businessAddress}, {BUSINESS_CONFIG.businessCityStateZip}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.businessPhoneRaw}`} className="hover:text-primary transition-colors font-medium">
                  {BUSINESS_CONFIG.businessPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.businessEmail}`} className="hover:text-primary transition-colors">
                  {BUSINESS_CONFIG.businessEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-semibold text-on-surface dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours & Direct WhatsApp (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-sm font-semibold text-on-surface dark:text-white uppercase tracking-wider">
              Studio Hours
            </h4>
            
            <div className="space-y-1.5 text-xs text-muted dark:text-gray-300 font-sans">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{BUSINESS_CONFIG.businessHours.weekdays}</span>
              </div>
              <div className="pl-5.5 text-muted/80 dark:text-gray-400">
                {BUSINESS_CONFIG.businessHours.saturday}
              </div>
              <div className="pl-5.5 text-muted/80 dark:text-gray-400">
                {BUSINESS_CONFIG.businessHours.sunday}
              </div>
            </div>

            {/* Direct WhatsApp Chat CTA */}
            <div className="pt-2">
              <a
                href="https://wa.me/18006274342?text=Hello%20Obsidian%20Auto%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20detailing%20my%20car."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold shadow-sm transition-all"
              >
                {/* Official WhatsApp SVG Icon */}
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Simple & Clean */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-muted/80 dark:text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.businessName} LLC. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-primary transition-colors focus:outline-none"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
