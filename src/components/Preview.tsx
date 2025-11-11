import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function Preview() {
  const { previewTab, setPreviewTab, previewMode } = useDraftStore();

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Preview Tabs */}
      <div className="border-b border-border bg-white flex">
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
        <button
          onClick={() => setPreviewTab("Layouts")}
          className={cn(
            "px-6 py-2.5 text-xs font-medium transition-colors border-b cursor-pointer",
            previewTab === "Layouts"
              ? "text-foreground border-foreground"
              : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50"
          )}
        >
          Layouts - Brand
        </button>
      </div>

      {/* Preview Content */}
      <div
        className={cn(
          "flex-1 overflow-y-auto p-8",
          previewMode === "dark" ? "dark bg-background" : "bg-white"
        )}
      >
        {previewTab === "Components" && (
          <div className="space-y-10 max-w-6xl">
            {/* Buttons Section */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Buttons
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default" className="h-9 text-sm">
                  Default Button
                </Button>
                <Button variant="outline" className="h-9 text-sm">
                  Outline Button
                </Button>
                <Button variant="secondary" className="h-9 text-sm">
                  Secondary Button
                </Button>
              </div>
            </section>

            {/* Cards Section */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="w-full h-2.5 bg-muted rounded mb-2" />
                    <div className="w-3/4 h-2.5 bg-muted rounded mb-3" />
                    <div className="w-full h-2 bg-muted/50 rounded" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1.5">
                      <div className="w-full h-2 bg-muted/50 rounded" />
                      <div className="w-5/6 h-2 bg-muted/50 rounded" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="w-full h-2.5 bg-muted rounded mb-2" />
                    <div className="w-3/4 h-2.5 bg-muted rounded mb-3" />
                    <div className="w-full h-2 bg-muted/50 rounded" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1.5">
                      <div className="w-full h-2 bg-muted/50 rounded" />
                      <div className="w-5/6 h-2 bg-muted/50 rounded" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="w-full h-2.5 bg-muted rounded mb-2" />
                    <div className="w-3/4 h-2.5 bg-muted rounded mb-3" />
                    <div className="w-full h-2 bg-muted/50 rounded" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1.5">
                      <div className="w-full h-2 bg-muted/50 rounded" />
                      <div className="w-5/6 h-2 bg-muted/50 rounded" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Dialog Section */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Dialog
              </h3>
              <div className="flex justify-center py-10 bg-muted/30 rounded-lg">
                <Card className="w-full max-w-md shadow-md">
                  <CardHeader className="pb-3">
                    <div className="w-28 h-3.5 bg-muted rounded mb-3" />
                    <div className="space-y-1.5">
                      <div className="w-full h-2 bg-muted/50 rounded" />
                      <div className="w-full h-2 bg-muted/50 rounded" />
                      <div className="w-3/4 h-2 bg-muted/50 rounded" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-8 text-xs"
                      >
                        Confirm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Tabs Section */}
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Tabs
              </h3>
              <Tabs defaultValue="tab1" className="w-full max-w-2xl">
                <TabsList className="h-9">
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
                  <div className="p-4 border border-border rounded-md bg-muted/30">
                    <div className="w-32 h-2 bg-muted rounded" />
                  </div>
                </TabsContent>
                <TabsContent value="tab2" className="mt-3">
                  <div className="p-4 border border-border rounded-md bg-muted/30">
                    <div className="w-32 h-2 bg-muted rounded" />
                  </div>
                </TabsContent>
                <TabsContent value="tab3" className="mt-3">
                  <div className="p-4 border border-border rounded-md bg-muted/30">
                    <div className="w-32 h-2 bg-muted rounded" />
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        )}

        {previewTab === "Layouts" && (
          <div className="space-y-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Brand Layouts
              </h2>
              <p className="text-muted-foreground">
                Layout examples will be displayed here
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="h-48 flex items-center justify-center">
                <CardContent>
                  <p className="text-muted-foreground">Layout Example 1</p>
                </CardContent>
              </Card>
              <Card className="h-48 flex items-center justify-center">
                <CardContent>
                  <p className="text-muted-foreground">Layout Example 2</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
