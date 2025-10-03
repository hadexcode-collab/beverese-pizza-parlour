import { Category, Pizza, MenuItem, Deal, Topping } from "@/types/menu";

// Import images
import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaPepperoni from "@/assets/pizza-pepperoni.jpg";
import pizzaVeggie from "@/assets/pizza-veggie.jpg";

// Available toppings with INR pricing
export const AVAILABLE_TOPPINGS: Topping[] = [
  { id: "pepperoni", name: "Pepperoni", price: 49, category: "non-veg" },
  { id: "mushrooms", name: "Mushrooms", price: 29, category: "veg" },
  { id: "onions", name: "Onions", price: 19, category: "veg" },
  { id: "bell-peppers", name: "Bell Peppers", price: 29, category: "veg" },
  { id: "olives", name: "Olives", price: 29, category: "veg" },
  { id: "extra-cheese", name: "Extra Cheese", price: 59, category: "veg" },
  { id: "jalapenos", name: "Jalapeños", price: 29, category: "veg" },
  { id: "tomatoes", name: "Fresh Tomatoes", price: 19, category: "veg" },
  { id: "corn", name: "Sweet Corn", price: 25, category: "veg" },
  { id: "paneer", name: "Paneer", price: 69, category: "veg" },
  { id: "chicken", name: "Chicken", price: 79, category: "non-veg" },
  { id: "basil", name: "Fresh Basil", price: 15, category: "veg" },
];

// Pizza menu
const PIZZAS: Pizza[] = [
  {
    id: "margherita",
    name: "Classic Margherita",
    description: "Tomato sauce, fresh mozzarella, basil",
    prices: { R: 149, M: 249, L: 399 },
    defaultToppings: ["extra-cheese", "basil"],
    availableToppings: AVAILABLE_TOPPINGS,
    image: pizzaMargherita,
    isVeg: true,
    rating: 4.5,
  },
  {
    id: "pepperoni",
    name: "Pepperoni Classic",
    description: "Loaded with pepperoni, mozzarella & Italian herbs",
    prices: { R: 199, M: 329, L: 499 },
    defaultToppings: ["pepperoni", "extra-cheese"],
    availableToppings: AVAILABLE_TOPPINGS,
    image: pizzaPepperoni,
    isVeg: false,
    rating: 4.7,
  },
  {
    id: "veggie-supreme",
    name: "Veggie Supreme",
    description: "Bell peppers, mushrooms, onions, olives & corn",
    prices: { R: 179, M: 299, L: 449 },
    defaultToppings: ["bell-peppers", "mushrooms", "onions", "olives", "corn"],
    availableToppings: AVAILABLE_TOPPINGS,
    image: pizzaVeggie,
    isVeg: true,
    rating: 4.6,
  },
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    description: "Spicy paneer tikka, onions, bell peppers & mint mayo",
    prices: { R: 189, M: 319, L: 479 },
    defaultToppings: ["paneer", "onions", "bell-peppers"],
    availableToppings: AVAILABLE_TOPPINGS,
    image: pizzaVeggie,
    isVeg: true,
    rating: 4.8,
  },
];

// Sides menu
const SIDES: MenuItem[] = [
  {
    id: "garlic-bread",
    name: "Garlic Breadsticks",
    description: "6 pieces with marinara dip",
    price: 129,
    image: pizzaMargherita,
    category: "sides",
    isVeg: true,
  },
  {
    id: "chicken-wings",
    name: "Chicken Wings",
    description: "8 spicy BBQ wings",
    price: 249,
    image: pizzaPepperoni,
    category: "sides",
    isVeg: false,
  },
  {
    id: "cheese-dip",
    name: "Cheese Dip",
    description: "Creamy cheese sauce",
    price: 49,
    image: pizzaMargherita,
    category: "sides",
    isVeg: true,
  },
];

// Beverages
const BEVERAGES: MenuItem[] = [
  {
    id: "coke",
    name: "Coca Cola",
    description: "750ml bottle",
    price: 60,
    image: pizzaMargherita,
    category: "beverages",
    isVeg: true,
  },
  {
    id: "sprite",
    name: "Sprite",
    description: "750ml bottle",
    price: 60,
    image: pizzaMargherita,
    category: "beverages",
    isVeg: true,
  },
];

// Deals
export const DEALS: Deal[] = [
  {
    id: "deal-two-medium",
    title: "2 Medium Pizzas + 1 Side",
    description: "Get any 2 medium pizzas and 1 side",
    price: 599,
    savings: 100,
    applicableCategories: ["pizzas", "sides"],
    image: pizzaPepperoni,
  },
  {
    id: "deal-large-combo",
    title: "Large Pizza Meal",
    description: "1 Large pizza + 2 beverages + garlic bread",
    price: 549,
    savings: 80,
    applicableCategories: ["pizzas", "sides", "beverages"],
    image: pizzaVeggie,
  },
];

// Complete menu
export const MENU: Category[] = [
  {
    id: "pizzas",
    name: "Pizzas",
    icon: "pizza",
    items: PIZZAS,
  },
  {
    id: "sides",
    name: "Sides",
    icon: "utensils",
    items: SIDES,
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "cup-soda",
    items: BEVERAGES,
  },
];

export { PIZZAS, SIDES, BEVERAGES };
