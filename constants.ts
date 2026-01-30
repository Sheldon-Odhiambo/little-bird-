
import { ServiceItem } from './types';

export const SERVICES: ServiceItem[] = [
  { 
    id: 'wash_fold', 
    name: 'Wash & Fold', 
    price: 80, 
    unit: 'kg', 
    category: 'washing',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'wash_iron_fold', 
    name: 'Wash, Iron & Fold', 
    price: 130, 
    unit: 'kg', 
    category: 'washing',
    image: 'https://images.unsplash.com/photo-1495556650867-99590cea3657?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'curtains', 
    name: 'Curtains', 
    price: 150, 
    unit: 'kg', 
    category: 'household',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'towels_robes', 
    name: 'Towels & Robes', 
    price: 100, 
    unit: 'unit', 
    category: 'household',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'duvet_4x6', 
    name: 'Duvet (4x6)', 
    price: 400, 
    unit: 'unit', 
    category: 'household',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'duvet_5x6', 
    name: 'Duvet (5x6)', 
    price: 450, 
    unit: 'unit', 
    category: 'household',
    image: 'https://images.unsplash.com/photo-1505693333238-da6303866f3e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'duvet_6x6', 
    name: 'Duvet (6x6)', 
    price: 500, 
    unit: 'unit', 
    category: 'household',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'blankets', 
    name: 'Blankets', 
    price: 300, 
    unit: 'unit', 
    category: 'household',
    image: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'grad_gown', 
    name: 'Graduation Gown', 
    price: 500, 
    unit: 'unit', 
    category: 'special',
    image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=800'
  },
];

export const BUSINESS_INFO = {
  phone: '0788545164',
  whatsapp: '254788545164',
  hours: {
    weekdays: '8am - 5pm',
    saturday: '8am - 2pm',
    sunday: 'Closed'
  },
  tagline: 'Convenient • Affordable • Fresh',
  name: 'Little Bird Laundry'
};
