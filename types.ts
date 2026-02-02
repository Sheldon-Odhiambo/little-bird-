
export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  description?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface BusinessInfo {
  phone: string;
  whatsapp: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  tagline: string;
  name: string;
}
