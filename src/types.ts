export interface Product {
  id: number;
  name: string;
  brand: string;
  category: 'running' | 'basketball' | 'lifestyle' | 'training';
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  sizes: number[];
  colors: string[];
  image: string;
  images?: string[];
  description?: string;
  quizTags: {
    purpose: string[];
    budget: string[];
    style: string[];
    brand: string[];
  };
  matchScore?: number;
}

export interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  delivery: {
    method: string;
    address: string;
  };
  payment: string;
  date: string;
}

export interface QuizAnswers {
  purpose: string;
  budget: string;
  style: string;
  brand: string;
  name: string;
  phone: string;
}
