import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PresetName } from "@/lib/types";

export function Header() {
  const { previewMode, setPreviewMode, currentPreset, setCurrentPreset, toggleSidebar } =
    useDraftStore();

  const handlePresetChange = (preset: PresetName) => {
    setCurrentPreset(preset);
    console.log("Preset changed to:", preset);
  };

  const handleCreateNew = () => {
    console.log("Create new preset...");
    alert("Create new preset functionality");
  };

  return (
    <header className="h-[56px] border-b border-border bg-background flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        {/* 햄버거 메뉴 (모바일) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-accent rounded-md cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1 className="text-base font-medium text-foreground">modcn</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Preset Dropdown */}
        <div className="flex items-center gap-2 border-l border-border pl-2 md:pl-3">
          <span className="hidden md:inline text-xs text-muted-foreground">Preset:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 min-w-[80px] md:min-w-[100px] text-xs justify-between"
              >
                {currentPreset}
                <span className="ml-1 text-[10px]">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handlePresetChange("Default")}>
                Default
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePresetChange("Modern")}>
                Modern
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePresetChange("Minimal")}>
                Minimal
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCreateNew}>
                Create New...
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Light/Dark Toggle */}
        <div>
          <button
            onClick={() =>
              setPreviewMode(previewMode === "dark" ? "light" : "dark")
            }
            className="p-1.5 hover:bg-accent rounded-md transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {previewMode === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
