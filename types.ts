
export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: 'kg' | 'unit';
  category: 'washing' | 'special' | 'household';
  image: string;
  description?: string;
}

export interface CalculatorState {
  kgServices: { [id: string]: number };
  unitServices: { [id: string]: number };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
