import { useState } from "react";
import { Link } from "react-router-dom";
import { Pizza as PizzaIcon, Utensils, CupSoda } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MENU, PIZZAS } from "@/data/menu";
import { useCart } from "@/hooks/useCart";
import { Pizza, MenuItem } from "@/types/menu";

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case "pizzas":
      return <PizzaIcon className="h-4 w-4" />;
    case "sides":
      return <Utensils className="h-4 w-4" />;
    case "beverages":
      return <CupSoda className="h-4 w-4" />;
    default:
      return null;
  }
};

const PizzaCard = ({ pizza }: { pizza: Pizza }) => {
  return (
    <Card className="overflow-hidden hover-lift">
      <img
        src={pizza.image}
        alt={pizza.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg">{pizza.name}</h3>
          {pizza.isVeg && (
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
              VEG
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3">{pizza.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-semibold text-primary">From ₹{pizza.prices.R}</span>
          </div>
          <Button size="sm" variant="default" asChild>
            <Link to={`/customize/${pizza.id}`}>Customize</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      itemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  };

  return (
    <Card className="overflow-hidden hover-lift">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg">{item.name}</h3>
          {item.isVeg && (
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
              VEG
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-primary text-lg">₹{item.price}</span>
          <Button size="sm" variant="default" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("pizzas");

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Our Menu</h1>
          <p className="text-muted-foreground text-lg">
            Fresh ingredients, authentic flavors, made with love
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            {MENU.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {MENU.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.id === "pizzas"
                  ? category.items.map((item) => (
                      <PizzaCard key={item.id} pizza={item as Pizza} />
                    ))
                  : category.items.map((item) => (
                      <MenuItemCard key={item.id} item={item as MenuItem} />
                    ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
