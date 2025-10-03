import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, Truck, Shield, MapPin } from "lucide-react";
import { DEALS } from "@/data/menu";
import heroPizza from "@/assets/hero-pizza.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPizza})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Fresh, Hot Pizza
              <span className="block text-primary">Delivered Fast</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Order from our delicious menu and get your favorite pizza delivered in 30 minutes or less!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="flex gap-2 flex-1">
                <Input
                  placeholder="Enter delivery PIN code"
                  className="h-14 text-base"
                  type="text"
                  maxLength={6}
                />
                <Button variant="accent" size="icon" className="h-14 w-14">
                  <MapPin className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="hero" size="lg" className="h-14" asChild>
                <Link to="/menu">
                  Order Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover-lift">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">30 Min Delivery</h3>
              <p className="text-muted-foreground">Fast delivery to your doorstep or it's free</p>
            </Card>
            
            <Card className="p-6 text-center hover-lift">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 mb-4">
                <Truck className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Your Order</h3>
              <p className="text-muted-foreground">Real-time updates from oven to your door</p>
            </Card>
            
            <Card className="p-6 text-center hover-lift">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Safe & Hygienic</h3>
              <p className="text-muted-foreground">100% contactless delivery available</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Hot Deals 🔥</h2>
            <p className="text-muted-foreground text-lg">
              Save big with our exclusive combo offers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {DEALS.map((deal) => (
              <Card key={deal.id} className="overflow-hidden hover-lift">
                <div className="flex flex-col sm:flex-row">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full sm:w-40 h-40 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-lg mb-2">{deal.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">₹{deal.price}</span>
                        {deal.savings && (
                          <span className="ml-2 text-sm text-accent font-medium">
                            Save ₹{deal.savings}
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="secondary" asChild>
                        <Link to="/menu">Order</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container text-center text-primary-foreground">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of happy customers enjoying hot, fresh pizza every day
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/menu">
              View Full Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
