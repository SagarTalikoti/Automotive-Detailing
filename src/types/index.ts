export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  features: string[];
  processSteps: string[];
  duration: string;
  warranty: string;
  recommendedFor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  marque: 'Porsche' | 'Mercedes-Benz' | 'BMW' | 'Range Rover' | 'Audi' | 'All';
  model: string;
  service: string;
  image: string;
  aspect: 'landscape' | 'portrait' | 'square';
  highlight: string;
}

export interface DetailingPackage {
  id: string;
  name: string;
  tagline: string;
  isFeatured?: boolean;
  basePrices: {
    coupe: string;
    suv: string;
    exotic: string;
  };
  duration: string;
  inclusions: string[];
  idealFor: string;
}

export interface Testimonial {
  id: string;
  author: string;
  avatarColor?: string;
  role: string;
  vehicle: string;
  rating: number;
  quote: string;
  date: string;
  timeAgo?: string;
  isLocalGuide?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Ceramic' | 'PPF' | 'General' | 'Process';
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleType: 'coupe' | 'suv' | 'exotic';
  selectedService: string;
  preferredDate: string;
  notes: string;
}
