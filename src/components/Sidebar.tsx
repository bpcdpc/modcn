import { useDraftStore } from "@/store/useDraftStore";
import { SidebarTab } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getFontsByCategory,
  loadGoogleFont,
  extractFontName,
  findFontOption,
} from "@/lib/fonts";

export function Sidebar() {
  const {
    sidebarTab,
    setSidebarTab,
    workingDraft,
    setWorkingDraft,
    previewMode,
  } = useDraftStore();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );
  const [editingColorValues, setEditingColorValues] = useState<
    Record<string, string>
  >({});

  // 초기 로드 시 설정된 폰트 로드
  useEffect(() => {
    Object.entries(workingDraft.shared.typography).forEach(([key, value]) => {
      if (key.startsWith("font-")) {
        const fontName = extractFontName(value);
        const fontOption = findFontOption(fontName);
        if (fontOption && fontOption.weights) {
          loadGoogleFont(fontName, fontOption.weights);
        }
      }
    });
  }, []);

  const handleColorChange = (key: string, value: string) => {
    // Normalize hex value (add # if missing)
    let normalizedValue = value.trim();
    if (normalizedValue && !normalizedValue.startsWith("#")) {
      normalizedValue = `#${normalizedValue}`;
    }
    setWorkingDraft({
      ...workingDraft,
      modes: {
        ...workingDraft.modes,
        [previewMode]: {
          colors: {
            ...workingDraft.modes[previewMode].colors,
            [key]: normalizedValue,
          },
        },
      },
    });
  };

  const handleColorInputChange = (key: string, value: string) => {
    setEditingColorValues({
      ...editingColorValues,
      [key]: value,
    });
  };

  const handleColorInputBlur = (key: string) => {
    const editedValue = editingColorValues[key];
    if (editedValue !== undefined) {
      const trimmedValue = editedValue.trim();
      // Validate hex color (with or without #)
      if (/^#?[0-9A-Fa-f]{6}$/.test(trimmedValue)) {
        const normalizedValue = trimmedValue.startsWith("#")
          ? trimmedValue
          : `#${trimmedValue}`;

        // Handle shadow color separately
        if (key === "shadow-shadow-color") {
          handleShadowChange("shadow-color", normalizedValue);
        } else {
          handleColorChange(key, normalizedValue);
        }
      }
      // Clear editing state
      const newEditing = { ...editingColorValues };
      delete newEditing[key];
      setEditingColorValues(newEditing);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  // Parse value with unit (e.g., "0.5rem" -> { value: 0.5, unit: "rem" })
  const parseValueWithUnit = (str: string): { value: number; unit: string } => {
    const match = str.match(/^([-\d.]+)(.*)$/);
    if (match) {
      return {
        value: parseFloat(match[1]) || 0,
        unit: match[2] || "",
      };
    }
    return { value: 0, unit: "" };
  };

  const handleTypographyChange = (key: string, value: string) => {
    // font-* 토큰 변경 시 Google Font 로드
    if (key.startsWith("font-")) {
      const fontName = extractFontName(value);
      const fontOption = findFontOption(fontName);
      if (fontOption && fontOption.weights) {
        loadGoogleFont(fontName, fontOption.weights);
      }
    }

    setWorkingDraft({
      ...workingDraft,
      shared: {
        ...workingDraft.shared,
        typography: {
          ...workingDraft.shared.typography,
          [key]: value,
        },
      },
    });
  };

  const handleOthersChange = (key: string, value: any) => {
    setWorkingDraft({
      ...workingDraft,
      shared: {
        ...workingDraft.shared,
        others: {
          ...workingDraft.shared.others,
          [key]: value,
        },
      },
    });
  };

  const handleShadowChange = (key: string, value: any) => {
    setWorkingDraft({
      ...workingDraft,
      shared: {
        ...workingDraft.shared,
        others: {
          ...workingDraft.shared.others,
          shadow: {
            ...(workingDraft.shared.others.shadow || {}),
            [key]: value,
          },
        },
      },
    });
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !(prev[groupName] ?? true),
    }));
  };

  const tabs: SidebarTab[] = ["Colors", "Typography", "Others"];

  return (
    <aside className="w-[280px] border-r border-border bg-muted flex flex-col">
      {/* Tabs */}
      <div className="border-b border-border flex bg-background">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSidebarTab(tab)}
            className={cn(
              "flex-1 px-3 py-2.5 text-xs font-medium transition-colors border-b cursor-pointer",
              sidebarTab === tab
                ? "text-foreground border-foreground"
                : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted">
        {sidebarTab === "Colors" && (
          <div className="space-y-5">
            {(() => {
              // Group colors by prefix
              const groups: Record<string, [string, string][]> = {};

              Object.entries(workingDraft.modes[previewMode].colors).forEach(
                ([key, value]) => {
                  let groupName = "";

                  // Special case for background and foreground
                  if (key === "background" || key === "foreground") {
                    groupName = "Base Colors";
                  } else if (
                    key === "border" ||
                    key === "input" ||
                    key === "ring"
                  ) {
                    // Group border, input, ring together
                    groupName = "Border & Input Colors";
                  } else {
                    // Extract first word as group name
                    const firstWord = key.split("-")[0];
                    // Convert to Pascal Case with spaces
                    groupName = firstWord
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ");
                    // Add "Colors" suffix
                    groupName += " Colors";
                  }

                  if (!groups[groupName]) {
                    groups[groupName] = [];
                  }
                  groups[groupName].push([key, value]);
                }
              );

              // Sort groups to put Base Colors first
              const sortedGroups = Object.entries(groups).sort(([a], [b]) => {
                if (a === "Base Colors") return -1;
                if (b === "Base Colors") return 1;
                return 0;
              });

              return sortedGroups.map(([groupName, tokens]) => {
                const isExpanded = expandedGroups[groupName] ?? true;
                return (
                  <div key={groupName} className="space-y-2">
                    <button
                      onClick={() => toggleGroup(groupName)}
                      className="w-full flex items-center justify-between py-1 px-1 -mx-1 rounded text-xs font-semibold text-foreground/80 tracking-wide hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <span>{groupName}</span>
                      <svg
                        className={cn(
                          "w-3 h-3 transition-transform",
                          isExpanded ? "rotate-90" : ""
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="bg-background rounded-md p-2.5 border border-border/50">
                        <div className="space-y-2">
                          {tokens.map(([key, value]) => (
                            <div key={key}>
                              <label className="text-[10px] text-muted-foreground mb-1.5 block">
                                {key}
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={value}
                                  onChange={(e) =>
                                    handleColorChange(key, e.target.value)
                                  }
                                  className="w-5 h-5 rounded border border-border/20 shrink-0 cursor-pointer overflow-hidden"
                                  style={{ padding: 0 }}
                                />
                                <input
                                  type="text"
                                  value={editingColorValues[key] ?? value}
                                  onChange={(e) =>
                                    handleColorInputChange(key, e.target.value)
                                  }
                                  onBlur={() => handleColorInputBlur(key)}
                                  onKeyDown={handleKeyDown}
                                  className="flex-1 text-[10px] px-2 py-1 bg-muted border border-border/30 rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        )}

        {sidebarTab === "Typography" && (
          <div className="space-y-5">
            {(() => {
              // Group typography into Font and Line Height
              const fontGroup: [string, string][] = [];
              const lineHeightGroup: [string, string][] = [];

              Object.entries(workingDraft.shared.typography).forEach(
                ([key, value]) => {
                  if (key.startsWith("font-")) {
                    fontGroup.push([key, value]);
                  } else {
                    lineHeightGroup.push([key, value]);
                  }
                }
              );

              const groups = [
                { name: "Font", items: fontGroup },
                { name: "Line Height", items: lineHeightGroup },
              ];

              return groups.map((group) => {
                if (group.items.length === 0) return null;
                const isExpanded = expandedGroups[group.name] ?? true;

                return (
                  <div key={group.name} className="space-y-2">
                    <button
                      onClick={() => toggleGroup(group.name)}
                      className="w-full flex items-center justify-between py-1 px-1 -mx-1 rounded text-xs font-semibold text-foreground/80 tracking-wide hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <span>{group.name}</span>
                      <svg
                        className={cn(
                          "w-3 h-3 transition-transform",
                          isExpanded ? "rotate-90" : ""
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="bg-background rounded-md p-2.5 border border-border/50">
                        <div className="space-y-2">
                          {group.items.map(([key, value]) => {
                            // Check if this is a tracking token (numeric with unit)
                            const isTracking = key.startsWith("tracking-");

                            if (isTracking) {
                              const parsed = parseValueWithUnit(value);
                              const numValue = parsed.value;
                              const unit = parsed.unit || "em";

                              return (
                                <div key={key}>
                                  <label className="text-[10px] text-muted-foreground mb-1.5 block">
                                    {key}
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <Slider
                                      value={[numValue]}
                                      onValueChange={([val]) =>
                                        handleTypographyChange(
                                          key,
                                          `${val.toFixed(3)}${unit}`
                                        )
                                      }
                                      min={-0.1}
                                      max={0.3}
                                      step={0.005}
                                      className="flex-1"
                                    />
                                    <div className="flex items-center gap-1">
                                      <input
                                        type="number"
                                        value={numValue}
                                        onChange={(e) =>
                                          handleTypographyChange(
                                            key,
                                            `${e.target.value}${unit}`
                                          )
                                        }
                                        onBlur={(e) => {
                                          const val = parseFloat(
                                            e.target.value
                                          );
                                          const clamped = Math.max(
                                            -0.1,
                                            Math.min(0.3, val)
                                          );
                                          if (val !== clamped || isNaN(val)) {
                                            handleTypographyChange(
                                              key,
                                              `${clamped.toFixed(3)}${unit}`
                                            );
                                          }
                                        }}
                                        onKeyDown={handleKeyDown}
                                        min={-0.1}
                                        max={0.3}
                                        step={0.005}
                                        className="w-[60px] text-[10px] px-1.5 py-1 bg-muted border border-border/30 rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
                                      />
                                      <span className="text-[10px] text-muted-foreground">
                                        {unit}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }

                            // Font tokens use dropdown
                            const isFont = key.startsWith("font-");

                            if (isFont) {
                              // Determine category from key
                              let category:
                                | "sans-serif"
                                | "serif"
                                | "monospace" = "sans-serif";
                              if (key === "font-serif") category = "serif";
                              else if (key === "font-mono")
                                category = "monospace";

                              const fonts = getFontsByCategory(category);
                              const currentFontName = extractFontName(value);

                              return (
                                <div key={key}>
                                  <label className="text-[10px] text-muted-foreground mb-1.5 block">
                                    {key}
                                  </label>
                                  <Select
                                    value={value}
                                    onValueChange={(newValue) =>
                                      handleTypographyChange(key, newValue)
                                    }
                                  >
                                    <SelectTrigger className="w-full h-8 text-[10px] bg-muted">
                                      <SelectValue>
                                        {currentFontName}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fonts.map((font) => (
                                        <SelectItem
                                          key={font.name}
                                          value={font.value}
                                          className="text-[10px]"
                                        >
                                          {font.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              );
                            }

                            return (
                              <div key={key}>
                                <label className="text-[10px] text-muted-foreground mb-1.5 block">
                                  {key}
                                </label>
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) =>
                                    handleTypographyChange(key, e.target.value)
                                  }
                                  onKeyDown={handleKeyDown}
                                  className="w-full text-[10px] px-2 py-1 bg-muted border border-border/30 rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        )}

        {sidebarTab === "Others" && (
          <div className="space-y-5">
            {/* Radius Group */}
            {(() => {
              const isExpanded = expandedGroups["Radius"] ?? true;
              return (
                <div className="space-y-2">
                  <button
                    onClick={() => toggleGroup("Radius")}
                    className="w-full flex items-center justify-between py-1 px-1 -mx-1 rounded text-xs font-semibold text-foreground/80 tracking-wide hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <span>Radius</span>
                    <svg
                      className={cn(
                        "w-3 h-3 transition-transform",
                        isExpanded ? "rotate-90" : ""
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="p-2.5 bg-background rounded-md border border-border/50">
                      <label className="text-[10px] text-muted-foreground mb-1.5 block">
                        radius
                      </label>
                      {(() => {
                        const parsed = parseValueWithUnit(
                          workingDraft.shared.others.radius || "0rem"
                        );
                        const numValue = parsed.value;
                        const unit = parsed.unit || "rem";

                        return (
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[numValue]}
                              onValueChange={([val]) =>
                                handleOthersChange(
                                  "radius",
                                  `${val.toFixed(4)}${unit}`
                                )
                              }
                              min={0}
                              max={2}
                              step={0.0625}
                              className="flex-1"
                            />
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={numValue}
                                onChange={(e) =>
                                  handleOthersChange(
                                    "radius",
                                    `${e.target.value}${unit}`
                                  )
                                }
                                onBlur={(e) => {
                                  const val = parseFloat(e.target.value);
                                  const clamped = Math.max(0, Math.min(2, val));
                                  if (val !== clamped || isNaN(val)) {
                                    handleOthersChange(
                                      "radius",
                                      `${clamped.toFixed(4)}${unit}`
                                    );
                                  }
                                }}
                                onKeyDown={handleKeyDown}
                                min={0}
                                max={2}
                                step={0.0625}
                                className="w-[60px] text-[10px] px-1.5 py-1 bg-muted border border-border/30 rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
                              />
                              <span className="text-[10px] text-muted-foreground">
                                {unit}
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Spacing Group */}
            {(() => {
              const isExpanded = expandedGroups["Spacing"] ?? true;
              return (
                <div className="space-y-2">
                  <button
                    onClick={() => toggleGroup("Spacing")}
                    className="w-full flex items-center justify-between py-1 px-1 -mx-1 rounded text-xs font-semibold text-foreground/80 tracking-wide hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <span>Spacing</span>
                    <svg
                      className={cn(
                        "w-3 h-3 transition-transform",
                        isExpanded ? "rotate-90" : ""
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="p-2.5 bg-background rounded-md border border-border/50">
                      <label className="text-[10px] text-muted-foreground mb-1.5 block">
                        spacing
                      </label>
                      {(() => {
                        const parsed = parseValueWithUnit(
                          workingDraft.shared.others.spacing || "0rem"
                        );
                        const numValue = parsed.value;
                        const unit = parsed.unit || "rem";

                        return (
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[numValue]}
                              onValueChange={([val]) =>
                                handleOthersChange(
                                  "spacing",
                                  `${val.toFixed(4)}${unit}`
                                )
                              }
                              min={0}
                              max={1}
                              step={0.0625}
                              className="flex-1"
                            />
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={numValue}
                                onChange={(e) =>
                                  handleOthersChange(
                                    "spacing",
                                    `${e.target.value}${unit}`
                                  )
                                }
                                onBlur={(e) => {
                                  const val = parseFloat(e.target.value);
                                  const clamped = Math.max(0, Math.min(1, val));
                                  if (val !== clamped || isNaN(val)) {
                                    handleOthersChange(
                                      "spacing",
                                      `${clamped.toFixed(4)}${unit}`
                                    );
                                  }
                                }}
                                onKeyDown={handleKeyDown}
                                min={0}
                                max={1}
                                step={0.0625}
                                className="w-[60px] text-[10px] px-1.5 py-1 bg-muted border border-border/30 rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
                              />
                              <span className="text-[10px] text-muted-foreground">
                                {unit}
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Shadow Group */}
            {(() => {
              const isExpanded = expandedGroups["Shadow"] ?? true;
              return (
                <div className="space-y-2">
                  <button
                    onClick={() => toggleGroup("Shadow")}
                    className="w-full flex items-center justify-between py-1 px-1 -mx-1 rounded text-xs font-semibold text-foreground/80 tracking-wide hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <span>Shadow</span>
                    <svg
                      className={cn(
                        "w-3 h-3 transition-transform",
                        isExpanded ? "rotate-90" : ""
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="p-2.5 bg-background rounded-md border border-border/50">
                      <div className="space-y-2">
                        {workingDraft.shared.others.shadow &&
                          Object.entries(workingDraft.shared.others.shadow).map(
                            ([key, value]) =>
                              key === "shadow-color" ? (
                                <div key={key}>
                                  <label className="text-[9px] text-muted-foreground mb-1 block">
                                    {key}
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="color"
                                      value={String(value)}
                                      onChange={(e) =>
                                        handleShadowChange(key, e.target.value)
                                      }
                                      className="w-5 h-5 rounded border border-border/20 shrink-0 cursor-pointer overflow-hidden"
                                      style={{ padding: 0 }}
                                    />
                                    <input
                                      type="text"
                                      value={
                                        editingColorValues[`shadow-${key}`] ??
                                        String(value)
                                      }
                                      onChange={(e) =>
                                        handleColorInputChange(
                                          `shadow-${key}`,
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        handleColorInputBlur(`shadow-${key}`)
                                      }
                                      onKeyDown={handleKeyDown}
                                      className="flex-1 text-[9px] px-1.5 py-0.5 bg-muted border border-border/30 rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
                                    />
                                  </div>
                                </div>
                              ) : (
                                (() => {
                                  // Handle numeric values with slider
                                  const isOpacity = key === "shadow-opacity";
                                  let numValue: number;

                                  if (isOpacity) {
                                    numValue =
                                      typeof value === "number"
                                        ? value
                                        : parseFloat(String(value)) || 0;
                                  } else {
                                    const parsed = parseValueWithUnit(
                                      String(value)
                                    );
                                    numValue = parsed.value;
                                  }

                                  let min = 0;
                                  let max = 100;
                                  let step = 1;
                                  let unit = "px";

                                  if (isOpacity) {
                                    min = 0;
                                    max = 1;
                                    step = 0.01;
                                    unit = "";
                                  } else if (
                                    key === "shadow-x" ||
                                    key === "shadow-y"
                                  ) {
                                    min = -50;
                                    max = 50;
                                  } else if (key === "shadow-spread") {
                                    min = -20;
                                    max = 20;
                                  } else if (key === "shadow-blur") {
                                    min = 0;
                                    max = 80;
                                  }

                                  return (
                                    <div key={key}>
                                      <label className="text-[9px] text-muted-foreground mb-1 block">
                                        {key}
                                      </label>
                                      <div className="flex items-center gap-2">
                                        <Slider
                                          value={[numValue]}
                                          onValueChange={([val]) => {
                                            if (isOpacity) {
                                              handleShadowChange(
                                                key,
                                                parseFloat(val.toFixed(2))
                                              );
                                            } else {
                                              handleShadowChange(
                                                key,
                                                `${Math.round(val)}${unit}`
                                              );
                                            }
                                          }}
                                          min={min}
                                          max={max}
                                          step={step}
                                          className="flex-1"
                                        />
                                        <div className="flex items-center gap-1">
                                          <input
                                            type="number"
                                            value={numValue}
                                            onChange={(e) => {
                                              const val =
                                                parseFloat(e.target.value) || 0;
                                              if (isOpacity) {
                                                handleShadowChange(key, val);
                                              } else {
                                                handleShadowChange(
                                                  key,
                                                  `${e.target.value}${unit}`
                                                );
                                              }
                                            }}
                                            onBlur={(e) => {
                                              const val = parseFloat(
                                                e.target.value
                                              );
                                              const clamped = Math.max(
                                                min,
                                                Math.min(max, val)
                                              );
                                              if (
                                                val !== clamped ||
                                                isNaN(val)
                                              ) {
                                                if (isOpacity) {
                                                  handleShadowChange(
                                                    key,
                                                    parseFloat(
                                                      clamped.toFixed(2)
                                                    )
                                                  );
                                                } else {
                                                  handleShadowChange(
                                                    key,
                                                    `${Math.round(
                                                      clamped
                                                    )}${unit}`
                                                  );
                                                }
                                              }
                                            }}
                                            onKeyDown={handleKeyDown}
                                            min={min}
                                            max={max}
                                            step={step}
                                            className="w-[60px] text-[9px] px-1.5 py-0.5 bg-muted border border-border/30 rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
                                          />
                                          {unit && (
                                            <span className="text-[9px] text-muted-foreground">
                                              {unit}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()
                              )
                          )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </aside>
  );
}
