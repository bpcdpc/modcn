import { useDraftStore } from "@/store/useDraftStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { listPresets } from "@/lib/storage";
import { useState, useEffect } from "react";
import { Preset } from "@/lib/types";

export function Header() {
  const {
    workingDraft,
    setPreviewMode,
    toggleSidebar,
    applyPreset,
    saveAsNewPreset,
    saveToCurrentPreset,
    resetWorkingDraft,
  } = useDraftStore();
  
  const previewMode = workingDraft.ui.previewMode;
  const [presets, setPresets] = useState<Preset[]>([]);
  const currentPresetName = workingDraft.sourcePresetId
    ? presets.find((p) => p.id === workingDraft.sourcePresetId)?.name || "Untitled"
    : "Untitled";

  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  useEffect(() => {
    setPresets(listPresets());
  }, []);

  // Refresh preset list after saves or when the linked preset changes
  useEffect(() => {
    // When a save completes (dirty becomes false) or sourcePresetId changes, reload presets
    setPresets(listPresets());
  }, [workingDraft.sourcePresetId, workingDraft.dirty]);

  const handlePresetChange = (presetId: string) => {
    applyPreset(presetId);
    // Preset 변경 후 목록 갱신
    setPresets(listPresets());
  };

  const handleCreateNew = () => {
    const defaultName =
      workingDraft.sourcePresetId && currentPresetName
        ? `${currentPresetName} copy`
        : "New preset";

    const name = window.prompt("Preset name", defaultName);
    if (!name) {
      return;
    }

    // 1) 현재 workingDraft를 새 preset으로 저장
    saveAsNewPreset(name);

    // 2) dropdown 목록 갱신 (localStorage에서 다시 읽기)
    setPresets(listPresets());
  };

  return (
    <header className="h-[56px] border-b border-border bg-background flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        {/* 햄버거 메뉴 (모바일) */}
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
        <h1 className="text-lg font-bold text-foreground tracking-tight">
          modcn
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* 1) Light/Dark Toggle (modes 선택버튼) */}
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

        {/* 2) Reset 버튼 (UI Shell 컨벤션) */}
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setResetDialogOpen(true)}
            className="h-8 rounded-none"
          >
            Reset
          </Button>
        </div>

        {/* 3) Preset Dropdown */}
        <div className="flex items-center gap-2 pl-2 md:pl-3">
          <span className="hidden md:inline text-xs text-muted-foreground">
            Preset:
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 min-w-[80px] md:min-w-[100px] text-xs justify-between rounded-none"
              >
                {currentPresetName}
                <span className="ml-1 text-[10px]">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={0}
              className="rounded-none p-0 text-xs w-(--radix-dropdown-menu-trigger-width)"
            >
              {presets.map((preset) => (
                <DropdownMenuItem
                  key={preset.id}
                  onClick={() => handlePresetChange(preset.id)}
                  className="rounded-none border-b border-border m-0 text-xs"
                >
                  {preset.name}
                </DropdownMenuItem>
              ))}
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

      {/* Reset Modal */}
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
                연결된 Preset이 있으면 그 Preset의 최신 버전으로, 없으면 기본 토큰 세트로 복원합니다.
                Preset과 버전 기록은 삭제되지 않습니다.
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
    </header>
  );
}
