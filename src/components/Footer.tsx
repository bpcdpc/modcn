import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";
import { exportDraft } from "@/lib/storage";

export function Footer() {
  const { dirty, save, workingDraft, currentPreset } = useDraftStore();

  const handleSave = () => {
    save();
    alert("Saved successfully!");
  };

  const handleExport = () => {
    exportDraft(workingDraft);
  };

  return (
    <footer className="h-[44px] border-t border-border bg-background flex items-center justify-between px-4 md:px-6">
      {/* 좌측: 타이틀 (모바일 숨김) */}
      <div className="hidden md:flex items-center gap-3 text-[11px]">
        <span className="text-muted-foreground font-medium">
          modcn UI system
        </span>
      </div>

      {/* 우측: 상태 및 버튼 */}
      <div className="flex items-center gap-2 md:gap-3 text-[11px] ml-auto">
        <span className="text-muted-foreground">{currentPreset}</span>
        <span className="text-muted-foreground">v1.2.3</span>
        <span className="text-muted-foreground/50">·</span>

        <div className="hidden md:flex items-center gap-1.5">
          <span className="text-muted-foreground">Last saved:</span>
          <span className="text-muted-foreground">Nov 6, 2025</span>
        </div>
        <span className="hidden md:inline text-muted-foreground/50">·</span>

        <div className="flex items-center gap-1.5">
          {!dirty && (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="hidden sm:inline text-green-600 font-medium">
                Saved
              </span>
            </>
          )}
          {dirty && (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span className="hidden sm:inline text-yellow-600 font-medium">
                Unsaved
              </span>
            </>
          )}
        </div>

        <span className="text-muted-foreground/50">·</span>

        <div className="flex items-center gap-1.5 md:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="h-7 text-[10px] md:text-[11px] px-2 md:px-3 rounded-none border-none bg-transparent"
          >
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="h-7 text-[10px] md:text-[11px] px-2 md:px-3 rounded-none border-none bg-transparent"
          >
            Export
          </Button>
        </div>
      </div>
    </footer>
  );
}
