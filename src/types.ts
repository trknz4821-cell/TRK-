export interface Car {
  id: string;
  name: string;
  arabicName: string;
  category: string;
  price: number; // in SAR
  image: string;
  speed: number; // 1-100 rating
  armor: number; // 1-100 rating
  description: string;
  arabicDescription: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  psnId?: string;
  verifiedPurchase?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  arabicName: string;
  price: number;
  quantity: number;
  type: 'submarine' | 'car';
}

export interface OrderDetails {
  psnId: string;
  submarineCount: number;
  submarinePrice: number; // 3 SAR each
  cartItems: CartItem[];
  totalPrice: number;
}
