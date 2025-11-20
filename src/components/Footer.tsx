import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CodeBlock } from "@/components/ui/code-block";
import { generateShadcnThemeCss } from "@/lib/theme-css";
import { listPresets } from "@/lib/storage";
import type { Preset } from "@/lib/types";

export function Footer() {
  const { workingDraft, saveAsNewPreset, saveToCurrentPreset } =
    useDraftStore();
  const dirty = workingDraft.dirty;
  const [presets, setPresets] = useState<Preset[]>([]);
  const currentPreset = workingDraft.sourcePresetId
    ? presets.find((p) => p.id === workingDraft.sourcePresetId) || null
    : null;
  const currentPresetName = currentPreset?.name || "Untitled";
  const currentPresetVersion = currentPreset
    ? currentPreset.versions.length > 0
      ? currentPreset.versions[currentPreset.versions.length - 1].name
      : null
    : null;
  const lastSavedDate = currentPreset
    ? currentPreset.versions.length > 0
      ? currentPreset.versions[currentPreset.versions.length - 1].createdAt
      : currentPreset.updatedAt
    : null;

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const canSave = workingDraft.dirty === true;

  useEffect(() => {
    setPresets(listPresets());
  }, []);

  useEffect(() => {
    setPresets(listPresets());
  }, [workingDraft.sourcePresetId, workingDraft.dirty]);

  // Save dialog state
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveMode, setSaveMode] = useState<"current" | "new">("current");
  const [presetName, setPresetName] = useState("");

  // Codes dialog state
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const cssCode = useMemo(
    () => generateShadcnThemeCss(workingDraft.tokens),
    [workingDraft.tokens]
  );

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
        {currentPresetVersion && (
          <>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-muted-foreground">
              {currentPresetVersion}
            </span>
          </>
        )}
        <span className="text-muted-foreground/50">·</span>

        {lastSavedDate && (
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-muted-foreground">Last saved:</span>
            <span className="text-muted-foreground">
              {formatDateTime(lastSavedDate)}
            </span>
          </div>
        )}
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
          {/* Export 자리 → Codes 버튼 */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setCopied(false);
              setCodeDialogOpen(true);
            }}
            className="h-7 text-[10px] md:text-[11px] px-2 md:px-3 rounded-none border-none bg-transparent hover:bg-muted/40"
          >
            Codes
          </Button>
        </div>
      </div>

      {/* Save Modal */}
      {saveDialogOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSaveDialogOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-background text-foreground border border-border w-full max-w-md shadow-xl">
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold">Save changes</h3>
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
                    <Input
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      placeholder="Preset name"
                    />
                  </div>
                )}
              </div>

              <div className="px-4 py-3 flex justify-end gap-2">
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

      {/* Codes Modal */}
      {codeDialogOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setCodeDialogOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-background text-foreground border border-border w-full max-w-3xl shadow-xl">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Theme Variables</h3>
                  <span className="text-[10px] text-muted-foreground">
                    index.css
                  </span>
                </div>
              </div>
              <div className="p-4">
                <CodeBlock code={cssCode} language="css" />
              </div>
              <div className="px-4 py-3 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="default"
                  onClick={() => {
                    const text = cssCode;
                    if (navigator.clipboard && window.isSecureContext) {
                      navigator.clipboard
                        .writeText(text)
                        .then(() => setCopied(true));
                    } else {
                      const textarea = document.createElement("textarea");
                      textarea.value = text;
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textarea);
                      setCopied(true);
                    }
                  }}
                  className="h-7 text-[11px] px-2 md:px-3 gap-1"
                >
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCodeDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
