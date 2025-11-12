import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
} from "recharts";

export function Preview() {
  const {
    previewTab,
    setPreviewTab,
    previewMode,
    layoutStyle,
    setLayoutStyle,
  } = useDraftStore();

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Preview Tabs */}
      <div className="border-b border-border bg-white flex items-center">
        <button
          onClick={() => setPreviewTab("Components")}
          className={cn(
            "px-6 py-2.5 text-xs font-medium transition-colors border-b cursor-pointer",
            previewTab === "Components"
              ? "text-foreground border-foreground"
              : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50"
          )}
        >
          Components
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setPreviewTab("Layouts")}
              className={cn(
                "px-6 py-2.5 text-xs font-medium transition-colors border-b cursor-pointer flex items-center gap-1",
                "focus:outline-none focus-visible:outline-none focus-visible:ring-0",
                previewTab === "Layouts"
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50"
              )}
            >
              Layouts - {layoutStyle}
              <span className="text-[10px]">▼</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={0}
            className="rounded-none p-0 text-xs w-[var(--radix-dropdown-menu-trigger-width)]"
          >
            <DropdownMenuItem
              onClick={() => {
                setPreviewTab("Layouts");
                setLayoutStyle("Brand");
              }}
              className="text-xs rounded-none border-b border-border m-0"
            >
              Brand
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPreviewTab("Layouts");
                setLayoutStyle("Commerce");
              }}
              className="text-xs rounded-none border-b border-border m-0"
            >
              Commerce
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPreviewTab("Layouts");
                setLayoutStyle("Blog");
              }}
              className="text-xs rounded-none border-b border-border m-0"
            >
              Blog
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPreviewTab("Layouts");
                setLayoutStyle("Dashboard");
              }}
              className="text-xs rounded-none m-0"
            >
              Dashboard
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Preview Content */}
      <div
        className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8",
          previewMode === "dark" ? "dark bg-background" : "bg-white"
        )}
      >
        {previewTab === "Components" && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="default" className="w-full h-9 text-xs">
                    Default
                  </Button>
                  <Button variant="outline" className="w-full h-9 text-xs">
                    Outline
                  </Button>
                  <Button variant="secondary" className="w-full h-9 text-xs">
                    Secondary
                  </Button>
                </CardContent>
              </Card>

              {/* Form Inputs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Form Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <Input placeholder="Email" className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Message</Label>
                    <Textarea
                      placeholder="Message"
                      className="text-xs min-h-[60px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Checkboxes & Radio */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Selection Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check1" />
                    <Label htmlFor="check1" className="text-xs font-normal">
                      Accept terms
                    </Label>
                  </div>
                  <RadioGroup defaultValue="option-1" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-1" id="r1" />
                      <Label htmlFor="r1" className="text-xs font-normal">
                        Option 1
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-2" id="r2" />
                      <Label htmlFor="r2" className="text-xs font-normal">
                        Option 2
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="flex items-center space-x-2">
                    <Switch id="switch1" />
                    <Label htmlFor="switch1" className="text-xs font-normal">
                      Enable
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Badges</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert>
                    <AlertTitle className="text-xs">Info</AlertTitle>
                    <AlertDescription className="text-xs">
                      This is an information alert.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertTitle className="text-xs">Error</AlertTitle>
                    <AlertDescription className="text-xs">
                      Something went wrong.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Progress & Avatars */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Progress & Avatar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Progress value={33} />
                    <Progress value={66} />
                  </div>
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback className="text-xs">AB</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">CD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        EF
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>

              {/* Popover */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Popover</CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full h-9 text-xs">
                        Open Popover
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-foreground">
                          Popover Title
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          This is a popover component with some content inside.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Tabs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="tab1" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-8">
                      <TabsTrigger value="tab1" className="text-xs">
                        Tab 1
                      </TabsTrigger>
                      <TabsTrigger value="tab2" className="text-xs">
                        Tab 2
                      </TabsTrigger>
                      <TabsTrigger value="tab3" className="text-xs">
                        Tab 3
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="mt-3">
                      <div className="text-xs text-muted-foreground">
                        Content for tab 1
                      </div>
                    </TabsContent>
                    <TabsContent value="tab2" className="mt-3">
                      <div className="text-xs text-muted-foreground">
                        Content for tab 2
                      </div>
                    </TabsContent>
                    <TabsContent value="tab3" className="mt-3">
                      <div className="text-xs text-muted-foreground">
                        Content for tab 3
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Separator */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Separator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-foreground">
                      Section Title
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Section description
                    </p>
                  </div>
                  <Separator />
                  <div className="flex h-4 items-center space-x-2 text-xs text-foreground">
                    <div>Item 1</div>
                    <Separator orientation="vertical" />
                    <div>Item 2</div>
                    <Separator orientation="vertical" />
                    <div>Item 3</div>
                  </div>
                </CardContent>
              </Card>

              {/* Skeleton */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Skeleton Loading</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-4/5" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dialog Sample */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Dialog Sample</CardTitle>
                </CardHeader>
                <CardContent>
                  <Card className="shadow-sm">
                    <CardHeader className="pb-3">
                      <h4 className="text-xs font-medium text-foreground">
                        Confirmation
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Are you sure you want to proceed?
                      </p>
                    </CardHeader>
                    <CardContent className="flex justify-end gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                      >
                        Cancel
                      </Button>
                      <Button size="sm" className="h-7 text-xs">
                        Confirm
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Sample Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Sample Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-1.5">
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-2 w-5/6" />
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Bar Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                      data={[
                        { name: "Jan", a: 400, b: 240, c: 320 },
                        { name: "Feb", a: 300, b: 380, c: 280 },
                        { name: "Mar", a: 600, b: 300, c: 450 },
                        { name: "Apr", a: 800, b: 400, c: 520 },
                        { name: "May", a: 500, b: 480, c: 390 },
                      ]}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                      />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="a" fill="var(--color-chart-1)" />
                      <Bar dataKey="b" fill="var(--color-chart-2)" />
                      <Bar dataKey="c" fill="var(--color-chart-3)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Line Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Line Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart
                      data={[
                        { name: "Jan", x: 400, y: 240, z: 180 },
                        { name: "Feb", x: 300, y: 380, z: 220 },
                        { name: "Mar", x: 600, y: 300, z: 350 },
                        { name: "Apr", x: 800, y: 400, z: 480 },
                        { name: "May", x: 500, y: 480, z: 420 },
                      ]}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                      />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="x"
                        stroke="var(--color-chart-4)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="y"
                        stroke="var(--color-chart-5)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="z"
                        stroke="var(--color-chart-1)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {previewTab === "Layouts" && (
          <div className="space-y-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {layoutStyle} Layouts
              </h2>
              <p className="text-muted-foreground">
                {layoutStyle} 레이아웃 예시가 여기에 표시됩니다
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
