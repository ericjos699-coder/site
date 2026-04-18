export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  type: 'chambre' | 'studio' | 'appartement' | 'maison' | 'villa' | 'terrain';
  status: 'vente' | 'location';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  features: string[];
  agent: {
    name: string;
    phone: string;
    image: string;
  };
  isFeatured?: boolean;
}

export type View = 'home' | 'properties' | 'detail' | 'about' | 'services' | 'contact' | 'appointment' | 'payment';
