import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, MapPin, User, Pizza } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";

export const Header = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="gradient-primary p-2 rounded-lg">
            <Pizza className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Beverese Lanza</h1>
            <p className="text-xs text-muted-foreground">Hot & Fresh Pizza</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/menu"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/menu") ? "text-primary" : "text-foreground"
            }`}
          >
            Menu
          </Link>
          <Link
            to="/deals"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/deals") ? "text-primary" : "text-foreground"
            }`}
          >
            Deals
          </Link>
          <Link
            to="/track"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/track") ? "text-primary" : "text-foreground"
            }`}
          >
            Track Order
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/store-locator">
              <MapPin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="default" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
