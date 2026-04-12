import { Property } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Villa de Luxe avec Piscine',
    description: 'Une magnifique villa située dans le quartier prisé de Cocody Ambassades. Finitions haut de gamme, grand jardin et piscine à débordement.',
    price: 450000000,
    location: 'Cocody Ambassades',
    city: 'Abidjan',
    type: 'villa',
    status: 'vente',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Piscine', 'Garage', 'Sécurité 24/7', 'Jardin', 'Climatisation'],
    agent: {
      name: 'Jean-Marc Koffi',
      phone: '+2250707070707',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    }
  },
  {
    id: '2',
    title: 'Appartement Moderne Plateau',
    description: 'Appartement de standing au cœur du Plateau. Vue imprenable sur la lagune Ébrié. Idéal pour investissement ou pied-à-terre.',
    price: 1200000,
    location: 'Plateau',
    city: 'Abidjan',
    type: 'appartement',
    status: 'location',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Ascenseur', 'Balcon', 'Parking', 'Cuisine équipée'],
    agent: {
      name: 'Marie Koné',
      phone: '+2250505050505',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    }
  },
  {
    id: '3',
    title: 'Terrain Constructible Bingerville',
    description: 'Beau terrain plat de 500m² situé dans une zone en plein développement à Bingerville. ACD disponible.',
    price: 25000000,
    location: 'Bingerville',
    city: 'Abidjan',
    type: 'terrain',
    status: 'vente',
    area: 500,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['ACD', 'Zone viabilisée', 'Accès facile'],
    agent: {
      name: 'Jean-Marc Koffi',
      phone: '+2250707070707',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    }
  },
  {
    id: '4',
    title: 'Maison Basse Riviera Palmeraie',
    description: 'Charmante maison basse de 4 pièces située à la Riviera Palmeraie. Quartier calme et sécurisé.',
    price: 85000000,
    location: 'Riviera Palmeraie',
    city: 'Abidjan',
    type: 'maison',
    status: 'vente',
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Cour avant', 'Garage', 'Clôture'],
    agent: {
      name: 'Marie Koné',
      phone: '+2250505050505',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    }
  }
];
