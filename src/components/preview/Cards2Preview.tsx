import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Chart Shell Component
function ChartShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Charts Section
function ChartCardBarLine() {
  const data = [
    { name: "Jan", revenue: 4000, visits: 2400 },
    { name: "Feb", revenue: 3000, visits: 1398 },
    { name: "Mar", revenue: 5000, visits: 2000 },
    { name: "Apr", revenue: 4500, visits: 2780 },
  ];

  return (
    <ChartShell
      title="Bar + Line Chart"
      description="Monthly revenue vs visits"
    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Bar dataKey="revenue" fill="var(--color-chart-1)" />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

function ChartCardLineOnly() {
  const data = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 500 },
    { name: "Thu", value: 200 },
    { name: "Fri", value: 600 },
    { name: "Sat", value: 450 },
    { name: "Sun", value: 350 },
  ];

  return (
    <ChartShell title="Line Chart" description="Traffic trend (7 days)">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-chart-3)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

function ChartCardDoughnut() {
  const data = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 200 },
    { name: "Category D", value: 100 },
  ];
  const COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
  ];

  return (
    <ChartShell title="Doughnut Chart" description="Category share">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

// Monthly Calendar Section
function MonthlyCalendarCard() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Monthly Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground font-medium">
            {weekDays.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div
                key={day}
                className={`
                  aspect-square flex items-center justify-center text-xs rounded-md
                  ${
                    day === 15
                      ? "bg-primary text-primary-foreground font-medium"
                      : ""
                  }
                  ${
                    day > 31
                      ? "text-muted-foreground/30"
                      : "hover:bg-muted cursor-pointer"
                  }
                `}
              >
                {day <= 31 ? day : ""}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MonthlyScheduleSummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Schedule Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Selected Date</p>
          <p className="text-sm font-semibold text-foreground">
            January 15, 2025
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-2">This Week</p>
          <div className="space-y-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">
                    Event {i}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {i === 1 ? "10:00 AM" : i === 2 ? "2:00 PM" : "6:00 PM"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Auth & My Page Section
function LoginCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="h-9 text-xs"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="h-9 text-xs"
          />
        </div>
        <Button className="w-full h-9 text-xs">Login</Button>
        <div className="flex items-center justify-between text-xs">
          <button className="text-muted-foreground hover:text-foreground">
            비밀번호 찾기
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            회원가입
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function MyPageOverviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">My Page Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-sm">JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">포인트</p>
            <p className="text-base font-bold text-foreground">12,345</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">쿠폰</p>
            <p className="text-base font-bold text-foreground">5</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">최근 주문</p>
            <p className="text-base font-bold text-foreground">23</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">저장한 콘텐츠</p>
            <p className="text-base font-bold text-foreground">8</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Newsletter Section
function NewsletterSignupCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Newsletter Signup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Stay updated with our latest news
          </p>
          <p className="text-xs text-muted-foreground">
            Get weekly updates delivered to your inbox
          </p>
        </div>
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-9 text-xs"
          />
          <Button className="w-full h-9 text-xs">Subscribe</Button>
        </div>
        <p className="text-[10px] text-muted-foreground">
          개인정보 수집 및 이용에 동의합니다.
        </p>
      </CardContent>
    </Card>
  );
}

function NewsletterArchiveCard() {
  const newsletters = [
    { title: "Weekly Update #42", date: "Jan 10, 2025", category: "News" },
    { title: "Product Launch", date: "Jan 3, 2025", category: "Product" },
    { title: "Year in Review", date: "Dec 27, 2024", category: "Company" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Newsletter Archive
          </CardTitle>
          <button className="text-xs text-muted-foreground hover:text-foreground">
            모두 보기
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {newsletters.map((item, i) => (
          <div
            key={i}
            className="p-2 rounded-md border border-border hover:bg-muted/50 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">
                    {item.date}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                  >
                    {item.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Content Section
function ContentTableWithPaginationCard() {
  const rows = [
    { id: 1, title: "Content Item 1", author: "Author A", date: "2025-01-15" },
    { id: 2, title: "Content Item 2", author: "Author B", date: "2025-01-14" },
    { id: 3, title: "Content Item 3", author: "Author C", date: "2025-01-13" },
    { id: 4, title: "Content Item 4", author: "Author A", date: "2025-01-12" },
    { id: 5, title: "Content Item 5", author: "Author B", date: "2025-01-11" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Content Table</CardTitle>
          <Input placeholder="Search..." className="h-7 w-32 text-xs" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_100px_100px] gap-2 text-xs font-medium text-muted-foreground pb-2 border-b border-border">
            <div>Title</div>
            <div>Author</div>
            <div>Date</div>
          </div>
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1fr_100px_100px] gap-2 text-xs py-2 border-b border-border/50 hover:bg-muted/30"
            >
              <div className="text-foreground truncate">{row.title}</div>
              <div className="text-muted-foreground">{row.author}</div>
              <div className="text-muted-foreground">{row.date}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button variant="outline" size="sm" className="h-7 text-xs">
            Prev
          </Button>
          <Button size="sm" className="h-7 text-xs">
            1
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ContentMagazineCard() {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <span className="text-xs text-muted-foreground">Magazine Image</span>
      </div>
      <CardContent className="p-4 space-y-2">
        <Badge variant="secondary" className="text-[10px]">
          Magazine
        </Badge>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2">
          Magazine Title: Design Trends 2025
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          Exploring the latest design trends and innovations in modern UI/UX
        </p>
        <div className="flex items-center gap-2 pt-2 text-[10px] text-muted-foreground">
          <span>Jan 15, 2025</span>
          <span>·</span>
          <span>5 min read</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ContentBlogCard() {
  const blogs = [
    {
      title: "Getting Started with Design Systems",
      excerpt: "Learn how to build and maintain a scalable design system...",
      author: "Jane Smith",
      date: "Jan 12, 2025",
    },
    {
      title: "Best Practices for Component Libraries",
      excerpt:
        "Discover the key principles for creating reusable components...",
      author: "John Doe",
      date: "Jan 10, 2025",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {blogs.map((blog, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-16 h-16 bg-muted rounded-md shrink-0 flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground">Img</span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="text-xs font-semibold text-foreground line-clamp-1">
                {blog.title}
              </h4>
              <p className="text-[10px] text-muted-foreground line-clamp-2">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{blog.author}</span>
                <span>·</span>
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Product Grid Section
function ProductGridCard() {
  const products = [
    { id: 1, name: "Product A", price: "$29.99", badge: "NEW" },
    { id: 2, name: "Product B", price: "$49.99", badge: "SALE" },
    { id: 3, name: "Product C", price: "$39.99", badge: null },
    { id: 4, name: "Product D", price: "$59.99", badge: "HOT" },
    { id: 5, name: "Product E", price: "$34.99", badge: null },
    { id: 6, name: "Product F", price: "$44.99", badge: "NEW" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Product Grid</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-border rounded-md overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-24 bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Image</span>
              </div>
              <div className="p-2 space-y-1">
                {product.badge && (
                  <Badge
                    variant={
                      product.badge === "SALE" ? "destructive" : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {product.badge}
                  </Badge>
                )}
                <p className="text-xs font-medium text-foreground line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs font-bold text-foreground">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Search & Error Section
function SearchBarCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Search Bar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input placeholder="Search..." className="flex-1 h-9 text-xs" />
          <Button size="sm" className="h-9 text-xs">
            Filter
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-[10px] cursor-pointer">
            Category: All ×
          </Badge>
          <Badge variant="secondary" className="text-[10px] cursor-pointer">
            Tag: Design ×
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function Page404Card() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-foreground">Page Not Found</p>
          <p className="text-xs text-muted-foreground">
            The page you are looking for does not exist.
          </p>
        </div>
        <Button className="mt-4">홈으로 이동</Button>
      </CardContent>
    </Card>
  );
}

// Main Component
export function Cards2Preview() {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto">
      {/* 1. Login & My Page Overview */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Auth & My Page
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <LoginCard />
          <MyPageOverviewCard />
        </div>
      </section>

      {/* 2. Newsletter */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Newsletter
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <NewsletterSignupCard />
          <NewsletterArchiveCard />
        </div>
      </section>

      {/* 3. Monthly Calendar */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Monthly Calendar
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <MonthlyCalendarCard />
          <MonthlyScheduleSummaryCard />
        </div>
      </section>

      {/* 4. Content Table + Magazine + Blog */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Content
        </h2>
        <div className="grid gap-4 xl:grid-cols-[2fr,1fr,1fr]">
          <ContentTableWithPaginationCard />
          <ContentMagazineCard />
          <ContentBlogCard />
        </div>
      </section>

      {/* 5. Product Grid */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Product Grid
        </h2>
        <div className="grid gap-4">
          <ProductGridCard />
        </div>
      </section>

      {/* 6. Search Bar + 404 Page */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Search & Error
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <SearchBarCard />
          <Page404Card />
        </div>
      </section>

      {/* 7. Charts */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Charts
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <ChartCardBarLine />
          <ChartCardLineOnly />
          <ChartCardDoughnut />
        </div>
      </section>
    </div>
  );
}
