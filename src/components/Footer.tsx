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
    <footer className="h-[44px] border-t border-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-3 text-[11px]">
        <span className="text-muted-foreground font-medium">
          modcn UI system
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px]">
        <span className="text-muted-foreground">{currentPreset}</span>
        <span className="text-muted-foreground">v1.2.3</span>
        <span className="text-muted-foreground/50">·</span>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Last saved:</span>
          <span className="text-muted-foreground">Nov 6, 2025</span>
        </div>
        <span className="text-muted-foreground/50">·</span>
        <div className="flex items-center gap-1.5">
          {!dirty && (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-green-600 font-medium">Saved</span>
            </>
          )}
          {dirty && (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span className="text-yellow-600 font-medium">
                Unsaved changes
              </span>
            </>
          )}
        </div>
        <span className="text-muted-foreground/50">·</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className="h-7 text-[11px]"
          >
            Save
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleExport}
            className="h-7 text-[11px]"
          >
            Export
          </Button>
        </div>
      </div>
    </footer>
  );
}
