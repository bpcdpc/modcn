import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { listPresets } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Preset } from "@/lib/types";
import { getPresetColorPreview } from "@/lib/utils";

export function Header() {
  const {
    workingDraft,
    setPreviewMode,
    toggleSidebar,
    applyPreset,
    resetWorkingDraft,
    createNewPresetFromDefault,
    renamePreset,
    deletePreset,
  } = useDraftStore();

  const previewMode = workingDraft.ui.previewMode;
  const isDirty = workingDraft.dirty === true;
  const [presets, setPresets] = useState<Preset[]>([]);
  const currentPreset = workingDraft.sourcePresetId
    ? presets.find((p) => p.id === workingDraft.sourcePresetId) || null
    : null;
  const currentPresetName = currentPreset?.name ?? "Untitled";
  const currentPresetColors = currentPreset
    ? getPresetColorPreview(currentPreset)
    : null;

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [createNewDialogOpen, setCreateNewDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [presetToRename, setPresetToRename] = useState<Preset | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [presetToDelete, setPresetToDelete] = useState<Preset | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setPresets(listPresets());
  }, []);

  useEffect(() => {
    setPresets(listPresets());
  }, [workingDraft.sourcePresetId, workingDraft.dirty]);

  const handlePresetChange = (presetId: string) => {
    applyPreset(presetId);
    setPresets(listPresets());
  };

  const handleCreateNew = () => {
    const defaultName =
      workingDraft.sourcePresetId && currentPresetName
        ? `${currentPresetName} copy`
        : "New preset";
    setNewPresetName(defaultName);
    setCreateNewDialogOpen(true);
  };

  const handleConfirmCreateNew = () => {
    const name = newPresetName.trim();
    if (!name) {
      return;
    }
    createNewPresetFromDefault(name);
    setPresets(listPresets());
    setCreateNewDialogOpen(false);
    setNewPresetName("");
  };

  const handleConfirmRename = () => {
    const name = renameValue.trim();
    if (!name || !presetToRename) {
      return;
    }
    renamePreset(presetToRename.id, name);
    setPresets(listPresets());
    setRenameDialogOpen(false);
    setPresetToRename(null);
    setRenameValue("");
  };

  const handleConfirmDelete = () => {
    if (!presetToDelete) {
      return;
    }
    deletePreset(presetToDelete.id);
    setPresets(listPresets());
    setDeleteDialogOpen(false);
    setPresetToDelete(null);
  };

  const renderColorChips = (colors: {
    primary: string;
    secondary: string;
    accent: string;
  }) => (
    <div className="flex items-center gap-1" aria-hidden="true">
      <span
        className="h-2.5 w-2.5 rounded-full border border-black/10 shrink-0"
        style={{ backgroundColor: colors.primary }}
      />
      <span
        className="h-2.5 w-2.5 rounded-full border border-black/10 shrink-0"
        style={{ backgroundColor: colors.secondary }}
      />
      <span
        className="h-2.5 w-2.5 rounded-full border border-black/10 shrink-0"
        style={{ backgroundColor: colors.accent }}
      />
    </div>
  );

  return (
    <>
      <header className="h-[56px] border-b border-border bg-background flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-accent cursor-pointer"
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
          <h1 className="text-lg font-bold text-foreground tracking-tight">modcn</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div>
            <button
              onClick={() =>
                setPreviewMode(previewMode === "dark" ? "light" : "dark")
              }
              className="p-1.5 hover:bg-accent transition-colors cursor-pointer"
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

          <div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                if (!isDirty) return;
                setResetDialogOpen(true);
              }}
              disabled={!isDirty}
              className="h-8 rounded-none disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              aria-disabled={!isDirty}
            >
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-2 pl-2 md:pl-3">
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 min-w-[80px] md:min-w-[100px] text-xs justify-between rounded-none gap-2"
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    {currentPresetColors && renderColorChips(currentPresetColors)}
                    <span className="truncate">{currentPresetName}</span>
                  </div>
                  <span className="ml-1 text-[10px] shrink-0">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={0}
                className="rounded-none p-0 text-xs w-[280px] max-w-[320px]"
              >
                {presets.map((preset) => {
                  const colors = getPresetColorPreview(preset);
                  return (
                    <DropdownMenuItem
                      key={preset.id}
                      onClick={() => handlePresetChange(preset.id)}
                      className="rounded-none border-b border-border m-0 text-xs py-2"
                    >
                      <div className="flex flex-col w-full gap-1">
                        <div className="flex items-center gap-1.5">
                          {renderColorChips(colors)}
                          <span className="truncate flex-1">{preset.name}</span>
                        </div>
                        <div className="flex justify-end gap-2 text-[10px]">
                          <button
                            type="button"
                            className="text-muted-foreground hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setMenuOpen(false);
                              setPresetToRename(preset);
                              setRenameValue(preset.name);
                              setRenameDialogOpen(true);
                            }}
                          >
                            Rename
                          </button>
                          <button
                            type="button"
                            className="text-destructive hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setMenuOpen(false);
                              setPresetToDelete(preset);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuItem
                  onClick={handleCreateNew}
                  className="rounded-none m-0 text-xs text-muted-foreground"
                >
                  + Create New...
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {resetDialogOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setResetDialogOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-background text-foreground border border-border w-full max-w-md shadow-xl">
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold">Reset tokens</h3>
              </div>
              <div className="p-4 text-sm text-muted-foreground">
                현재 작업 중인 토큰 값을 되돌립니다.
                <br />
                연결된 Preset이 있으면 그 Preset의 최신 버전으로, 없으면 기본
                토큰 세트로 복원합니다. Preset과 버전 기록은 삭제되지 않습니다.
              </div>
              <div className="px-4 py-3 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setResetDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    resetWorkingDraft();
                    setResetDialogOpen(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {createNewDialogOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setCreateNewDialogOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-background text-foreground border border-border w-full max-w-md shadow-xl">
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold">Create new preset</h3>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  새 프리셋 이름을 입력하세요. 기본 토큰 세트로 새 프리셋이
                  생성됩니다.
                </p>
                <Input
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="Preset name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleConfirmCreateNew();
                    }
                  }}
                  autoFocus
                />
              </div>
              <div className="px-4 py-3 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCreateNewDialogOpen(false);
                    setNewPresetName("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleConfirmCreateNew}
                  disabled={newPresetName.trim().length === 0}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {renameDialogOpen && presetToRename && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setRenameDialogOpen(false);
              setPresetToRename(null);
              setRenameValue("");
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-background text-foreground border border-border w-full max-w-md shadow-xl">
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold">Rename preset</h3>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  프리셋 이름을 변경합니다.
                </p>
                <Input
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  placeholder="Preset name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && renameValue.trim().length > 0) {
                      handleConfirmRename();
                    }
                  }}
                  autoFocus
                />
              </div>
              <div className="px-4 py-3 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRenameDialogOpen(false);
                    setPresetToRename(null);
                    setRenameValue("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleConfirmRename}
                  disabled={renameValue.trim().length === 0}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteDialogOpen && presetToDelete && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setDeleteDialogOpen(false);
              setPresetToDelete(null);
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-background text-foreground border border-border w-full max-w-md shadow-xl">
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold">Delete preset</h3>
              </div>
              <div className="p-4 text-sm text-muted-foreground">
                정말로 '
                <strong className="text-foreground">
                  {presetToDelete.name}
                </strong>
                ' 프리셋을 삭제할까요?
                <br />
                이 작업은 되돌릴 수 없습니다.
                <br />
                <br />
                현재 작업 중인 토큰 값은 그대로 유지되며, 프리셋과 버전 기록만
                삭제됩니다.
              </div>
              <div className="px-4 py-3 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDeleteDialogOpen(false);
                    setPresetToDelete(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
