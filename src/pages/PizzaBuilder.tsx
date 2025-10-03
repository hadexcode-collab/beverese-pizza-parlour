import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { PIZZAS, AVAILABLE_TOPPINGS } from "@/data/menu";
import { PIZZA_SIZES } from "@/types/menu";
import { useCart } from "@/hooks/useCart";

export default function PizzaBuilder() {
  const { pizzaId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const pizza = PIZZAS.find((p) => p.id === pizzaId);

  const [selectedSize, setSelectedSize] = useState<"R" | "M" | "L">("M");
  const [selectedToppings, setSelectedToppings] = useState<string[]>(
    pizza?.defaultToppings || []
  );
  const [quantity, setQuantity] = useState(1);

  if (!pizza) {
    return (
      <div className="container py-8">
        <p>Pizza not found</p>
      </div>
    );
  }

  const basePrice = pizza.prices[selectedSize];
  const toppingsPrice = selectedToppings.reduce((sum, toppingId) => {
    const topping = AVAILABLE_TOPPINGS.find((t) => t.id === toppingId);
    return sum + (topping?.price || 0);
  }, 0);
  const totalPrice = (basePrice + toppingsPrice) * quantity;

  const handleToppingToggle = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    addToCart({
      itemId: pizza.id,
      name: pizza.name,
      price: basePrice + toppingsPrice,
      quantity,
      size: selectedSize,
      customizations: {
        toppings: selectedToppings,
      },
      image: pizza.image,
    });
    navigate("/cart");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/menu")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pizza Preview */}
          <div>
            <Card className="p-6 sticky top-24">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{pizza.name}</h2>
                  {pizza.isVeg && (
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                      VEG
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{pizza.description}</p>
                <div className="pt-4 border-t">
                  <div className="text-3xl font-bold text-primary">₹{totalPrice}</div>
                  <p className="text-sm text-muted-foreground">
                    {PIZZA_SIZES.find((s) => s.code === selectedSize)?.name} •{" "}
                    {selectedToppings.length} toppings
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            {/* Size Selection */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Choose Size</h3>
              <RadioGroup value={selectedSize} onValueChange={(value: any) => setSelectedSize(value)}>
                <div className="space-y-3">
                  {PIZZA_SIZES.map((size) => (
                    <div key={size.code} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={size.code} id={size.code} />
                        <Label htmlFor={size.code} className="cursor-pointer">
                          <div className="font-medium">{size.name}</div>
                          <div className="text-sm text-muted-foreground">{size.displayName}</div>
                        </Label>
                      </div>
                      <span className="font-semibold">₹{pizza.prices[size.code]}</span>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>

            {/* Toppings Selection */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Customize Toppings</h3>
              <div className="space-y-3">
                {AVAILABLE_TOPPINGS.map((topping) => (
                  <div
                    key={topping.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={topping.id}
                        checked={selectedToppings.includes(topping.id)}
                        onCheckedChange={() => handleToppingToggle(topping.id)}
                      />
                      <Label htmlFor={topping.id} className="cursor-pointer">
                        <div className="font-medium">{topping.name}</div>
                      </Label>
                      {topping.category && (
                        <Badge
                          variant="outline"
                          className={
                            topping.category === "veg"
                              ? "bg-accent/10 text-accent border-accent"
                              : "bg-destructive/10 text-destructive border-destructive"
                          }
                        >
                          {topping.category}
                        </Badge>
                      )}
                    </div>
                    <span className="font-semibold text-sm">+₹{topping.price}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quantity & Add to Cart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-bold">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                variant="hero"
                onClick={handleAddToCart}
              >
                Add to Cart • ₹{totalPrice}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
