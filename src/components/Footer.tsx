import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { workingDraft, saveAsNewPreset, saveToCurrentPreset } =
    useDraftStore();
  const dirty = workingDraft.dirty;
  const currentPresetName = workingDraft.sourcePresetId || "Untitled";
  const canSave = workingDraft.dirty === true;

  const handleSave = () => {
    // nothing changed → no-op
    if (!workingDraft.dirty) return;

    // Case 1: no current preset → create a new preset + first version
    if (!workingDraft.sourcePresetId) {
      const defaultName = "New preset";
      const name = window.prompt("Preset name", defaultName);
      if (!name) return;

      saveAsNewPreset(name);
      return;
    }

    // Case 2: save into existing preset (append new PresetVersion)
    saveToCurrentPreset();
  };

  const handleExport = () => {
    // TODO: Export / ExportJob 기능 구현
    console.log("Export functionality - TODO");
    alert("Export functionality - TODO");
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
        <span className="text-muted-foreground">{currentPresetName}</span>
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
            type="button"
            variant="ghost"
            size="sm"
            disabled={!canSave}
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
