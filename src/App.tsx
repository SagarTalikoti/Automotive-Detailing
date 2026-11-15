import { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustIntro } from './components/TrustIntro';
import { Services } from './components/Services';
import { TransformationGallery } from './components/TransformationGallery';
import { Packages } from './components/Packages';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

function AppContent() {
  const [quoteService, setQuoteService] = useState<string>('Ceramic Coating');
  const [quoteVehicleType, setQuoteVehicleType] = useState<'coupe' | 'suv' | 'exotic'>('coupe');

  const scrollToContact = (service?: string, vehicleType?: 'coupe' | 'suv' | 'exotic') => {
    if (service) setQuoteService(service);
    if (vehicleType) setQuoteVehicleType(vehicleType);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-pearl dark:bg-obsidian-pure text-graphite dark:text-pearl flex flex-col selection:bg-teal selection:text-white font-sans antialiased transition-colors duration-300">
      {/* Refined Minimal Navigation with Theme Switcher */}
      <Navbar onOpenBooking={() => scrollToContact()} />

      {/* Main Editorial Flow */}
      <main className="flex-1">
        {/* Hero Section: Animated luxury automotive stage with finish toggle */}
        <Hero onOpenBooking={() => scrollToContact()} />

        {/* About & Trust Intro: Authentic master detailer photograph, 3 core principles */}
        <TrustIntro />

        {/* Flagship Services: 5 disciplines with authentic workshop images & technical modal */}
        <Services onSelectServiceForBooking={(service: string) => scrollToContact(service)} />

        {/* Transformation Gallery: Mud & Dirt to Showroom Glass Before/After Slider */}
        <TransformationGallery />

        {/* Pricing Packages: Vehicle Profile Switcher (Coupe/Sedan, SUV, Exotic) */}
        <Packages onSelectPackage={(pkg, type) => scrollToContact(pkg, type)} />

        {/* Why Choose Us: Feature section in Deep Petrol with the 5 specific pillars */}
        <WhyChooseUs />

        {/* The Client Protocol: 4-step clear timeline */}
        <Process />

        {/* Client Reputation: Testimonials & Google Trust Mark */}
        <Testimonials />

        {/* Knowledge Base & FAQs */}
        <FAQ />

        {/* Concierge Intake & Balanced Real Google Maps Hub with Location Routing */}
        <ContactSection
          initialService={quoteService}
          initialVehicleType={quoteVehicleType}
        />
      </main>

      {/* Clean Minimal Studio Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action (Mobile & Desktop) */}
      <WhatsAppFloatingButton />

      {/* Vercel Speed Insights & Web Analytics */}
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
