export interface BusinessConfig {
  businessName: string;
  tagline: string;
  businessAddress: string;
  businessCityStateZip: string;
  businessPhone: string;
  businessPhoneRaw: string;
  businessEmail: string;
  businessLatitude: number;
  businessLongitude: number;
  googleMapsDirectionsUrl: string;
  googleMapsPlaceUrl: string;
  instagramUrl: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  businessName: "OBSIDIAN AUTO STUDIO",
  tagline: "Every Detail. A Higher Standard.",
  businessAddress: "700 Apex Velocity Way, Suite 100",
  businessCityStateZip: "Scottsdale, AZ 85255",
  businessPhone: "+1 (800) 627-4342",
  businessPhoneRaw: "+18006274342",
  businessEmail: "concierge@obsidianauto.com",
  businessLatitude: 33.6267,
  businessLongitude: -111.8988,
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=700+Apex+Velocity+Way+Scottsdale+AZ+85255",
  googleMapsPlaceUrl: "https://www.google.com/maps/search/?api=1&query=700+Apex+Velocity+Way+Scottsdale+AZ+85255",
  instagramUrl: "https://instagram.com/obsidianautostudio",
  businessHours: {
    weekdays: "Monday – Friday: 8:00 AM – 6:00 PM",
    saturday: "Saturday: 9:00 AM – 4:00 PM",
    sunday: "Sunday: Private Concierge By Appointment"
  }
};

/**
 * Returns navigation directions URL from the user's current location to the studio
 */
export function getDirectionsUrl(userLat?: number, userLng?: number): string {
  const dest = encodeURIComponent(`${BUSINESS_CONFIG.businessAddress}, ${BUSINESS_CONFIG.businessCityStateZip}`);
  if (userLat !== undefined && userLng !== undefined) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${dest}&travelmode=driving`;
  }
  return `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${dest}&travelmode=driving`;
}

/**
 * Returns the active Google Maps Embed URL.
 */
export function getGoogleMapsEmbedUrl(): string {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY;
  const fullAddress = `${BUSINESS_CONFIG.businessAddress}, ${BUSINESS_CONFIG.businessCityStateZip}`;
  const encodedAddress = encodeURIComponent(fullAddress);

  if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;
  }

  // Real interactive Google Maps embed fallback (works out of the box globally)
  return `https://maps.google.com/maps?q=${encodedAddress}&t=m&z=15&ie=UTF8&iwloc=&output=embed`;
}
