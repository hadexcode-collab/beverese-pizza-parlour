export interface PizzaSize {
  code: "R" | "M" | "L";
  name: string;
  displayName: string;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  category?: "veg" | "non-veg";
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  prices: {
    R: number;
    M: number;
    L: number;
  };
  defaultToppings: string[];
  availableToppings: Topping[];
  image: string;
  isVeg: boolean;
  rating?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  price: number;
  savings?: number;
  applicableCategories: string[];
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  items: (Pizza | MenuItem)[];
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: "R" | "M" | "L";
  customizations?: {
    toppings?: string[];
    halfAndHalf?: {
      left: string[];
      right: string[];
    };
    crust?: string;
    instructions?: string;
  };
  image: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  gst: number;
  deliveryFee: number;
  total: number;
  promoCode?: string;
  discount?: number;
}

export const PIZZA_SIZES: PizzaSize[] = [
  { code: "R", name: "Regular", displayName: "7 inch" },
  { code: "M", name: "Medium", displayName: "9 inch" },
  { code: "L", name: "Large", displayName: "12 inch" },
];

export const GST_RATE = 0.05; // 5% GST for demonstration
export const DELIVERY_FEE = 49; // ₹49 delivery fee
export const FREE_DELIVERY_THRESHOLD = 299; // Free delivery above ₹299
