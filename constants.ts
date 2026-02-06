
import { ServiceItem, BusinessInfo } from './types';

export const SERVICES: ServiceItem[] = [
  { 
    id: 'wash_fold', 
    name: 'Wash & Fold', 
    price: 80, 
    unit: 'kg', 
    category: 'washing',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'wash_iron_fold', 
    name: 'Wash, Iron & Fold', 
    price: 130, 
    unit: 'kg', 
    category: 'washing',
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'curtains', 
    name: 'Curtains', 
    price: 150, 
    unit: 'kg', 
    category: 'household',
    image: '/assets/curtains.jpeg'
  },
  { 
    id: 'towels_robes', 
    name: 'Towels & Robes', 
    price: 100, 
    unit: 'unit', 
    category: 'household',
    image: '/assets/Towels.jpeg'
  },
  { 
    id: 'duvet_4x6', 
    name: 'Duvet (4x6)', 
    price: 400, 
    unit: 'unit', 
    category: 'household',
    image: '/assets/Duvet1.jpeg'
  },
  { 
    id: 'duvet_5x6', 
    name: 'Duvet (5x6)', 
    price: 450, 
    unit: 'unit', 
    category: 'household',
    image: '/assets/Duvet2.jpeg'
  },
  { 
    id: 'duvet_6x6', 
    name: 'Duvet (6x6)', 
    price: 500, 
    unit: 'unit', 
    category: 'household',
    image: '/assets/Duvet3.jpeg'
  },
  { 
    id: 'blankets', 
    name: 'Blankets', 
    price: 300, 
    unit: 'unit', 
    category: 'household',
    image: '/assets/Blankets.jpeg'
  },
  { 
    id: 'grad_gown', 
    name: 'Graduation Gown', 
    price: 500, 
    unit: 'unit', 
    category: 'special',
    image: '/assets/gown.jpeg'
  },
];

export const BUSINESS_INFO: BusinessInfo = {
  phone: '0119386607',
  whatsapp: '254119386607',
  hours: {
    weekdays: '8am - 5pm',
    saturday: '8am - 2pm',
    sunday: 'Closed'
  },
  tagline: 'Convenient • Affordable • Fresh',
  name: 'Little Bird Laundry'
};
