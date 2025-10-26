import { useState, useEffect } from "react";
import { Cart, CartItem, GST_RATE, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/types/menu";
import { toast } from "@/hooks/use-toast";

const CART_STORAGE_KEY = "beverese-lanza-cart";

export const useCart = () => {
  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return {
      items: [],
      subtotal: 0,
      gst: 0,
      deliveryFee: 0,
      total: 0,
    };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.itemId}-${Date.now()}`,
    };

    setCart((prev) => {
      const items = [...prev.items, newItem];
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const gst = subtotal * GST_RATE;
      const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      const discount = prev.discount || 0;
      const total = subtotal + gst + deliveryFee - discount;

      return {
        ...prev,
        items,
        subtotal,
        gst,
        deliveryFee,
        total,
      };
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const items = prev.items.filter((item) => item.id !== itemId);
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const gst = subtotal * GST_RATE;
      const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      const discount = prev.discount || 0;
      const total = subtotal + gst + deliveryFee - discount;

      return {
        ...prev,
        items,
        subtotal,
        gst,
        deliveryFee,
        total,
      };
    });

    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart((prev) => {
      const items = prev.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const gst = subtotal * GST_RATE;
      const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      const discount = prev.discount || 0;
      const total = subtotal + gst + deliveryFee - discount;

      return {
        ...prev,
        items,
        subtotal,
        gst,
        deliveryFee,
        total,
      };
    });
  };

  const applyPromoCode = (code: string) => {
    // Demo promo codes
    const promoCodes: { [key: string]: number } = {
      FIRST50: 50,
      SAVE100: 100,
      WELCOME: 75,
    };

    const discount = promoCodes[code.toUpperCase()];
    if (discount) {
      setCart((prev) => {
        const subtotal = prev.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const gst = subtotal * GST_RATE;
        const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
        const total = subtotal + gst + deliveryFee - discount;

        return {
          ...prev,
          promoCode: code,
          discount,
          subtotal,
          gst,
          deliveryFee,
          total,
        };
      });
      toast({
        title: "Promo applied!",
        description: `You saved ₹${discount}`,
      });
      return true;
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check the code and try again",
        variant: "destructive",
      });
      return false;
    }
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      gst: 0,
      deliveryFee: 0,
      total: 0,
    });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyPromoCode,
    clearCart,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};
