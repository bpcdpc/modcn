import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CardsPreview() {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto">
      {/* Brand / Hero Card */}
      <section className="grid gap-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Brand / Hero
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Hero Card */}
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  Welcome to Our Platform
                </h3>
                <p className="text-sm text-muted-foreground">
                  Build amazing experiences with our design system
                </p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex gap-2">
                <Button size="sm">Get Started</Button>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feature Highlight Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Featured Product</CardTitle>
                <Badge variant="secondary">New</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  Product Image
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Premium Design System
                </p>
                <p className="text-xs text-muted-foreground">
                  Complete UI toolkit for modern applications
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-foreground">$99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Commerce Cards */}
      <section className="grid gap-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Commerce
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <div className="h-40 bg-muted rounded-t-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  Product {i}
                </span>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    Product Name {i}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Product description goes here with some details about the
                    item.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-base font-bold text-foreground">
                    ${(i * 29).toFixed(2)}
                  </span>
                  <Button size="sm" variant="outline">
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Article / Blog Cards */}
      <section className="grid gap-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Articles
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-accent/20 to-accent/5" />
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Category</span>
                  <span>·</span>
                  <span>Jan {i + 10}, 2025</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground line-clamp-2">
                  Article Title {i}: Design System Best Practices
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Learn how to build consistent and scalable design systems for
                  your products.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px]">
                      A{i}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    Author Name
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dashboard / Stats Cards */}
      <section className="grid gap-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Dashboard
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Users", value: "12,345", change: "+12%" },
            { label: "Revenue", value: "$45,678", change: "+8%" },
            { label: "Orders", value: "1,234", change: "+5%" },
            { label: "Growth", value: "23.4%", change: "+2%" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

