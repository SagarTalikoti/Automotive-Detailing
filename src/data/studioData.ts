import type {
  ServiceItem,
  GalleryItem,
  DetailingPackage,
  Testimonial,
  FAQItem
} from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    tagline: "Long-Lasting Paint Protection & Gloss",
    shortDescription: "Professional ceramic coating that protects your paint against UV rays, bird droppings, road grime, and water spots while keeping an incredible deep gloss.",
    fullDescription: "Our ceramic coatings chemically bond with your clear coat to create a hard, hydrophobic shield. Your car stays cleaner longer, repels rain and dirt effortlessly, and maintains a high-gloss showroom finish without regular waxing.",
    image: "/assets/service-ceramic.jpg",
    features: [
      "Hydrophobic water beading for effortless washing",
      "Protects against bird droppings, tree sap, and road salt",
      "UV protection prevents clear coat oxidation and fading",
      "Deep mirror-like gloss that lasts for years"
    ],
    processSteps: [
      "Thorough foam wash and iron fallout decontamination",
      "Full clay bar treatment to remove embedded contaminants",
      "Machine polish to eliminate swirls and enhance gloss",
      "Hand application of ceramic base and top coats",
      "Controlled curing period in our dedicated studio bay"
    ],
    duration: "2 – 3 Days",
    warranty: "5-Year Studio Warranty",
    recommendedFor: "New cars, luxury vehicles, and daily drivers needing lasting protection."
  },
  {
    id: "ppf",
    name: "Paint Protection Film (PPF)",
    tagline: "Invisible Shield Against Rock Chips & Scratches",
    shortDescription: "Durable clear film applied to your front bumper, hood, and mirrors to protect against highway rock chips, scratches, and road debris.",
    fullDescription: "Protect your car's front end from highway damage. Our premium paint protection film is precision cut to fit your vehicle perfectly with wrapped edges. It features self-healing technology that makes light scratches disappear with warmth.",
    image: "/assets/user-ppf-install.jpg",
    features: [
      "Self-healing clear film that repairs light swirl marks",
      "Protects against rock chips, gravel, and scratches",
      "Custom computer-cut templates with clean wrapped edges",
      "Non-yellowing optical clarity with 10-year warranty"
    ],
    processSteps: [
      "Detailed wash and isopropyl alcohol panel prep",
      "Precision computer template plotting for your car model",
      "Slip solution application and squeegee alignment",
      "Edge wrapping around body seams and badges",
      "Final heat sealing and inspection"
    ],
    duration: "3 – 5 Days",
    warranty: "10-Year Manufacturer Warranty",
    recommendedFor: "Highways commuters, sports cars, and new vehicles."
  },
  {
    id: "paint-correction",
    name: "Paint Correction",
    tagline: "Swirl & Scratch Removal",
    shortDescription: "Multi-stage machine polishing to safely remove swirl marks, light scratches, buffer trails, and oxidation to bring back deep reflection.",
    fullDescription: "Over time, improper washing and environmental exposure leave swirl marks and haze on your paint. Our experienced detailers carefully measure your clear coat and use precision dual-action polishers to remove defects and bring out authentic color depth.",
    image: "/assets/user-detailer-polishing.jpg",
    features: [
      "Removes 85% to 95% of clear coat swirl marks and scratches",
      "No buffer trails, holograms, or temporary fillers",
      "Digital paint thickness measurement before polishing",
      "Restores true paint depth and deep reflections"
    ],
    processSteps: [
      "Paint thickness inspection across every panel",
      "Compounding stage to remove deeper swirl marks",
      "Polishing stage to refine surface texture",
      "Finishing jeweling polish for crystal clarity",
      "Inspection under high-output daylight lamps"
    ],
    duration: "2 – 3 Days",
    warranty: "Guaranteed permanent scratch and swirl removal",
    recommendedFor: "Vehicles with wash swirls, cloudy clear coat, or light scratches."
  },
  {
    id: "interior-detailing",
    name: "Interior Detailing",
    tagline: "Deep Cleaning & Leather Care",
    shortDescription: "Thorough vacuuming, steam sanitization of vents and carpets, stain removal, and conditioning of leather and interior trim.",
    fullDescription: "Restore your interior to like-new condition. We meticulously vacuum carpets, steam-clean seats and floor mats, clean air vents, and nourish leather to keep it soft, clean, and protected from cracking.",
    image: "/assets/service-interior.jpg",
    features: [
      "Hot steam cleaning for carpets, floor mats, and vents",
      "pH-balanced leather cleaner and matte conditioner",
      "Alcantara and fabric cleaning with gentle brushes",
      "UV protection on dashboard, console, and door panels"
    ],
    processSteps: [
      "Deep crevice vacuuming of carpets and seating",
      "Steam cleaning of air vents, cup holders, and seams",
      "Gentle hand scrubbing and conditioning of leather seats",
      "Fabric shampoo and spot extraction",
      "Streak-free interior glass and mirror cleaning"
    ],
    duration: "1 – 2 Days",
    warranty: "100% Satisfaction Guarantee",
    recommendedFor: "Cars needing deep cleaning, stain removal, or leather rejuvenation."
  },
  {
    id: "exterior-detailing",
    name: "Exterior Detailing",
    tagline: "Safe Hand Wash & Wheel Cleaning",
    shortDescription: "Scratch-free two-bucket hand wash, wheel and brake dust cleaning, tire dressing, and spray sealant for immediate gloss.",
    fullDescription: "Our signature hand wash protects your paint from scratch-causing grit. We use foam pre-wash, gentle wash mitts, mineral-free water, and dedicated wheel cleansers for a spotless, streak-free shine.",
    image: "/assets/user-wheel-wash.jpg",
    features: [
      "Mineral-free spot-free water rinse",
      "Gentle snow foam soak to loosen road dirt",
      "Dedicated wheel face, inner barrel, and tire cleaning",
      "Protective spray sealant for months of water beading"
    ],
    processSteps: [
      "Non-acid wheel and tire decontamination",
      "Foam pre-soak to safely dissolve road grime",
      "Two-bucket hand wash with grit guards",
      "Heated air drying of body crevices and badges",
      "Tire dressing and streak-free window cleaning"
    ],
    duration: "4 – 6 Hours",
    warranty: "Immediate satisfaction guarantee",
    recommendedFor: "Routine maintenance between major details and seasonal cleaning."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "porsche-gt3",
    title: "Porsche 911 GT3",
    marque: "Porsche",
    model: "911 GT3",
    service: "Full PPF + Ceramic Coating",
    image: "/assets/gallery-porsche-bright.jpg",
    aspect: "landscape",
    highlight: "Complete front-end PPF and 5-year ceramic coating"
  },
  {
    id: "range-rover-sv",
    title: "Range Rover Autobiography",
    marque: "Range Rover",
    model: "Autobiography",
    service: "2-Stage Paint Correction & Ceramic",
    image: "/assets/gallery-rangerover-bright.jpg",
    aspect: "landscape",
    highlight: "Full swirl removal and 3-year ceramic paint protection"
  },
  {
    id: "amg-gt",
    title: "Mercedes-AMG GT Coupe",
    marque: "Mercedes-Benz",
    model: "AMG GT",
    service: "Paint Correction & Interior Detail",
    image: "/assets/gallery-amg.jpg",
    aspect: "portrait",
    highlight: "Deep multi-stage polish and leather conditioning"
  },
  {
    id: "bmw-m4",
    title: "BMW M4 Competition",
    marque: "BMW",
    model: "M4 Competition",
    service: "Track Package PPF & Wheel Ceramic",
    image: "/assets/gallery-bmw.jpg",
    aspect: "square",
    highlight: "High-impact protection film and wheel ceramic coating"
  },
  {
    id: "audi-rs6",
    title: "Audi RS6 Avant",
    marque: "Audi",
    model: "RS6 Avant",
    service: "Full Studio Detail & Ceramic",
    image: "/assets/gallery-audi.jpg",
    aspect: "landscape",
    highlight: "Complete exterior ceramic protection and interior steam detail"
  },
  {
    id: "porsche-classic",
    title: "Porsche 911 Carrera",
    marque: "Porsche",
    model: "911 Carrera S",
    service: "Full Paint Correction & Detail",
    image: "/assets/gallery-porsche.jpg",
    aspect: "square",
    highlight: "Swirl removal and high-gloss ceramic finish"
  }
];

export const DETAILING_PACKAGES: DetailingPackage[] = [
  {
    id: "essential-care",
    name: "Essential Detail",
    tagline: "Complete hand wash, light machine polish, and interior refresh.",
    isFeatured: false,
    basePrices: {
      coupe: "$450",
      suv: "$550",
      exotic: "$650"
    },
    duration: "1 Day",
    inclusions: [
      "Foam hand wash & spot-free dry",
      "Light machine polish for deep shine",
      "Interior vacuum & surface wipe-down",
      "6-Month protective paint sealant"
    ],
    idealFor: "Routine upkeep and restoring shine to well-kept vehicles."
  },
  {
    id: "signature-detail",
    name: "Signature Detail",
    tagline: "Our most popular 2-stage swirl removal and ceramic coating package.",
    isFeatured: true,
    basePrices: {
      coupe: "$1,250",
      suv: "$1,450",
      exotic: "$1,750"
    },
    duration: "2 – 3 Days",
    inclusions: [
      "Everything in Essential Detail",
      "2-Stage swirl mark & scratch removal",
      "3-Year 9H ceramic paint coating",
      "Deep interior steam clean & leather care"
    ],
    idealFor: "Vehicles with swirl marks or owners seeking multi-year protection."
  },
  {
    id: "ultimate-protection",
    name: "Ultimate Protection",
    tagline: "The complete package with Paint Protection Film and 5-Year Ceramic.",
    isFeatured: false,
    basePrices: {
      coupe: "$3,400",
      suv: "$3,950",
      exotic: "$4,600"
    },
    duration: "4 – 5 Days",
    inclusions: [
      "Full Front Paint Protection Film (PPF)",
      "5-Year ceramic coating on paint & film",
      "Multi-stage mirror paint correction",
      "Ceramic coating on wheels & calipers"
    ],
    idealFor: "New luxury cars, supercars, and maximum chip protection."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Marcus Vance",
    avatarColor: "#4285F4",
    role: "Local Guide",
    vehicle: "Porsche 911 GT3",
    rating: 5,
    quote: "Brought my black 911 in for full paint correction and ceramic. Every single swirl mark is gone—the paint looks like liquid glass. Honest team and flawless craftsmanship.",
    date: "October 2026",
    timeAgo: "2 weeks ago",
    isLocalGuide: true
  },
  {
    id: "test-2",
    author: "Elena Rostova",
    avatarColor: "#EA4335",
    role: "Verified Client",
    vehicle: "Range Rover SV",
    rating: 5,
    quote: "My black Range Rover had heavy dealer wash scratches. Obsidian made it look better than showroom floor delivery. Inside smells brand new. Highly recommend!",
    date: "November 2026",
    timeAgo: "3 weeks ago",
    isLocalGuide: false
  },
  {
    id: "test-3",
    author: "David Kim",
    avatarColor: "#34A853",
    role: "Local Guide",
    vehicle: "BMW M4 Competition",
    rating: 5,
    quote: "The front PPF installation is pure art—edges are completely invisible and wrapped around seams. The 9H ceramic makes washing effortless with just a pressure rinse.",
    date: "September 2026",
    timeAgo: "1 month ago",
    isLocalGuide: true
  },
  {
    id: "test-4",
    author: "Sarah Jenkins",
    avatarColor: "#FBBC05",
    role: "Verified Client",
    vehicle: "Mercedes-AMG G63",
    rating: 5,
    quote: "They took care of my matte G-Wagon with specialized matte coating. No artificial gloss added, just pure factory satin protection. Extremely professional shop.",
    date: "October 2026",
    timeAgo: "1 month ago",
    isLocalGuide: false
  },
  {
    id: "test-5",
    author: "Michael Chang",
    avatarColor: "#9334E6",
    role: "Local Guide",
    vehicle: "Audi RS6 Avant",
    rating: 5,
    quote: "Best car detailing experience in Scottsdale. They sent photo updates throughout the 3-day detail and the steam sanitized interior is immaculate.",
    date: "November 2026",
    timeAgo: "a month ago",
    isLocalGuide: true
  },
  {
    id: "test-6",
    author: "Robert Torres",
    avatarColor: "#0097A7",
    role: "Verified Client",
    vehicle: "Tesla Model S Plaid",
    rating: 5,
    quote: "Soft Tesla paint was saved! They corrected buffer marks from another shop and sealed it with 5-year ceramic. Water literally slides off the hood.",
    date: "October 2026",
    timeAgo: "2 months ago",
    isLocalGuide: false
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What is the difference between ceramic coating and paint protection film (PPF)?",
    answer: "Ceramic coating is a liquid polymer that chemically bonds with your paint to protect against UV rays, chemical etching, bird droppings, and water spots, while adding intense gloss and hydrophobic beading. Paint Protection Film (PPF) is a thicker, clear urethane film designed specifically to absorb physical impacts from rock chips, gravel, and scratches. For the ultimate protection, many clients combine both: PPF on high-impact front panels and ceramic coating over the entire vehicle.",
    category: "Ceramic"
  },
  {
    question: "How long does a professional detailing service take?",
    answer: "An Essential Detail typically takes 1 day (6 to 8 hours). Our Signature Detail with 2-stage paint correction and ceramic coating takes 2 to 3 days to allow proper surface preparation and coating cure time. Full Paint Protection Film installations require 3 to 5 days. We never rush our work to ensure flawless results.",
    category: "Process"
  },
  {
    question: "Will paint correction remove all scratches from my vehicle?",
    answer: "Paint correction safely removes 85% to 95% of swirl marks, light scratches, water spots, and haze. Deep scratches that have penetrated completely through the clear coat cannot be removed safely without repainting, but our detailers can significantly round their edges to make them far less noticeable.",
    category: "General"
  },
  {
    question: "How do I maintain my car after ceramic coating or PPF?",
    answer: "Maintenance is easy: wash your car every 2 to 3 weeks using a pH-neutral car shampoo and the two-bucket method with a clean microfiber mitt. Avoid automated brush car washes as they cause scratches. We provide comprehensive aftercare instructions and care products with every completed service.",
    category: "General"
  },
  {
    question: "Do you offer warranties on your detailing packages?",
    answer: "Yes. Our Ceramic Coatings come with a documented 3 to 5-year studio warranty, and our Paint Protection Film carries a 10-year manufacturer warranty against yellowing, bubbling, and peeling.",
    category: "General"
  }
];
