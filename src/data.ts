import { Property } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Studio Moderne Proche In’challah',
    description: 'Magnifique studio américain situé à Koumassi, à deux pas du terrain In’challah. Proche des transports et des commerces. Idéal pour jeune travailleur ou étudiant.',
    price: 130000,
    location: 'Koumassi Terrain In’challah',
    city: 'Abidjan',
    type: 'studio',
    status: 'location',
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Douche interne', 'Cuisine équipée', 'Balcon', 'Sécurisé'],
    agent: {
      name: 'Agent A.I.F',
      phone: '+2250708536904',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    },
    isFeatured: true
  },
  {
    id: '2',
    title: 'Chambre Autonome Étudiant',
    description: 'Chambre autonome propre située à Koumassi, zone Terrain In’challah. Calme, accès facile. Parfait pour un étudiant.',
    price: 70000,
    location: 'Koumassi Terrain In’challah',
    city: 'Abidjan',
    type: 'chambre',
    status: 'location',
    bedrooms: 1,
    bathrooms: 1,
    area: 20,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Douche interne', 'Entrée indépendante', 'Compteur CIE/SODECI'],
    agent: {
      name: 'Agent A.I.F',
      phone: '+2250505410916',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    isFeatured: true
  },
  {
    id: '3',
    title: 'Appartement 3 Pièces Standing',
    description: 'Bel appartement de 3 pièces à Koumassi Remblais. Grand salon, chambres spacieuses, cuisine moderne.',
    price: 250000,
    location: 'Koumassi Remblais',
    city: 'Abidjan',
    type: 'appartement',
    status: 'location',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Parking', 'Balcon', 'Placards', 'Zone bitumée'],
    agent: {
      name: 'Agent A.I.F',
      phone: '+2250708536904',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    },
    isFeatured: true
  },
  {
    id: '4',
    title: 'Maison Basse 4 Pièces',
    description: 'Maison basse de 4 pièces située à Koumassi Nord-Est. Cour avant et arrière, garage disponible.',
    price: 45000000,
    location: 'Koumassi Nord-Est',
    city: 'Abidjan',
    type: 'maison',
    status: 'vente',
    bedrooms: 3,
    bathrooms: 2,
    area: 250,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Garage', 'Cour', 'ACD disponible'],
    agent: {
      name: 'Agent A.I.F',
      phone: '+2250505410916',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    }
  },
  {
    id: '5',
    title: 'Terrain Constructible 500m²',
    description: 'Terrain de 500m² avec ACD à Koumassi. Emplacement stratégique pour projet immobilier.',
    price: 35000000,
    location: 'Koumassi',
    city: 'Abidjan',
    type: 'terrain',
    status: 'vente',
    area: 500,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['ACD', 'Zone viabilisée', 'Accès facile'],
    agent: {
      name: 'Agent A.I.F',
      phone: '+2250708536904',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    }
  }
];
