import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, applyPromoCode } = useCart();
  const [promoCode, setPromoCode] = useState("");
  
  console.log("Cart component - cart state:", cart);
  console.log("Cart component - items length:", cart.items.length);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      applyPromoCode(promoCode);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some delicious items to get started!</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        {item.size && (
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size}
                          </p>
                        )}
                        {item.customizations?.toppings && item.customizations.toppings.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Extra: {item.customizations.toppings.slice(0, 3).join(", ")}
                            {item.customizations.toppings.length > 3 && "..."}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (5%)</span>
                  <span>₹{cart.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>
                    {cart.deliveryFee === 0 ? (
                      <span className="text-accent font-medium">FREE</span>
                    ) : (
                      `₹${cart.deliveryFee}`
                    )}
                  </span>
                </div>
                {cart.discount && cart.discount > 0 && (
                  <div className="flex justify-between text-sm text-accent">
                    <span>Discount</span>
                    <span>-₹{cart.discount}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span className="text-primary">₹{cart.total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <Label className="text-sm mb-2 block">Have a promo code?</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="text-sm"
                  />
                  <Button size="sm" variant="outline" onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>
                {cart.promoCode && (
                  <p className="text-xs text-accent mt-1">
                    Code "{cart.promoCode}" applied ✓
                  </p>
                )}
              </div>

              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link to="/checkout">
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
