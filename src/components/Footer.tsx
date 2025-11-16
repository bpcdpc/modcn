import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Footer() {
  const { workingDraft, saveAsNewPreset, saveToCurrentPreset } =
    useDraftStore();
  const dirty = workingDraft.dirty;
  const currentPresetName = workingDraft.sourcePresetId || "Untitled";
  const canSave = workingDraft.dirty === true;

  // Save dialog state
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveMode, setSaveMode] = useState<"current" | "new">("current");
  const [presetName, setPresetName] = useState("");

  const handleOpenSaveDialog = () => {
    if (!canSave) return;
    const hasCurrentPreset = !!workingDraft.sourcePresetId;
    setSaveMode(hasCurrentPreset ? "current" : "new");
    const defaultName =
      currentPresetName && hasCurrentPreset
        ? `${currentPresetName} copy`
        : "New preset";
    setPresetName(defaultName);
    setSaveDialogOpen(true);
  };

  const handleConfirmSave = () => {
    const hasCurrentPreset = !!workingDraft.sourcePresetId;
    if (!hasCurrentPreset || saveMode === "new") {
      const name = presetName.trim();
      if (!name) return; // keep dialog open until valid
      saveAsNewPreset(name);
    } else {
      saveToCurrentPreset();
    }
    setSaveDialogOpen(false);
  };

  // const handleExport = () => {
  //   // TODO: Export / ExportJob 기능 구현
  //   console.log("Export functionality - TODO");
  //   alert("Export functionality - TODO");
  // };

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
            onClick={handleOpenSaveDialog}
            className="h-7 text-[10px] md:text-[11px] px-2 md:px-3 rounded-none border-none bg-transparent"
          >
            Save
          </Button>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="h-7 text-[10px] md:text-[11px] px-2 md:px-3 rounded-none border-none bg-transparent"
          >
            Export
          </Button> */}
        </div>
      </div>

      {/* Save Modal */}
      {saveDialogOpen && (
        <div className="fixed inset-0 z-50">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSaveDialogOpen(false)}
          />
          {/* content */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-background text-foreground border border-border w-full max-w-md shadow-xl">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold">Save changes</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  현재 작업 중인 토큰 변경 사항을 어떻게 저장할지 선택하세요.
                </p>
              </div>

              <div className="p-4 space-y-4">
                {workingDraft.sourcePresetId ? (
                  <RadioGroup
                    value={saveMode}
                    onValueChange={(v) => setSaveMode(v as "current" | "new")}
                    className="space-y-3"
                  >
                    <div className="flex items-start gap-2">
                      <RadioGroupItem value="current" id="save-current" />
                      <Label
                        htmlFor="save-current"
                        className="flex flex-col gap-1"
                      >
                        <span className="text-sm font-medium">
                          Save to current preset
                        </span>
                        <span className="text-xs text-muted-foreground">
                          현재 선택된 Preset에 새 버전을 추가합니다.
                        </span>
                      </Label>
                    </div>

                    <div className="flex items-start gap-2">
                      <RadioGroupItem value="new" id="save-new" />
                      <div className="flex flex-col gap-2 flex-1">
                        <Label
                          htmlFor="save-new"
                          className="flex flex-col gap-1"
                        >
                          <span className="text-sm font-medium">
                            Save as new preset
                          </span>
                          <span className="text-xs text-muted-foreground">
                            새로운 Preset을 만들고 첫 번째 버전을 생성합니다.
                          </span>
                        </Label>
                        <Input
                          disabled={saveMode !== "new"}
                          value={presetName}
                          onChange={(e) => setPresetName(e.target.value)}
                          placeholder="Preset name"
                        />
                      </div>
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Save as new preset</p>
                    <p className="text-xs text-muted-foreground">
                      아직 연결된 Preset이 없으므로, 새로운 Preset으로
                      저장합니다.
                    </p>
                    <Input
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      placeholder="Preset name"
                    />
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-t border-border flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSaveDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleConfirmSave}
                  disabled={
                    !canSave ||
                    ((!workingDraft.sourcePresetId || saveMode === "new") &&
                      presetName.trim().length === 0)
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
