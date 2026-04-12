export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  type: 'maison' | 'appartement' | 'terrain' | 'villa';
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
}

export type View = 'home' | 'properties' | 'detail' | 'about' | 'services' | 'contact';
