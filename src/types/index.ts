
export interface User {
  id: string;
  name: string;
  password: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'food' | 'drink';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'drink';
  image: string;
}
