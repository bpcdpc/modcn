import { Tokens } from "./types";

// Generate shadcn-like theme CSS from current tokens
export const generateShadcnThemeCss = (tokens: Tokens): string => {
  const light = tokens.modes.light as any;
  const dark = tokens.modes.dark as any;
  const shared = tokens.shared as any;
  const lc = (light?.colors || {}) as Record<string, string>;
  const dc = (dark?.colors || {}) as Record<string, string>;

  // helper to safely read color keys with fallbacks
  const get = (obj: Record<string, string>, key: string) => obj[key] ?? "";

  const fontSans = shared?.typography?.["font-sans"] ?? "";
  const fontSerif = shared?.typography?.["font-serif"] ?? "";
  const fontMono = shared?.typography?.["font-mono"] ?? "";
  const trackingNormal = shared?.typography?.["tracking-normal"] ?? "0em";

  const radius = shared?.radius ?? "";
  const spacing = shared?.spacing ?? "";

  const shadow = shared?.shadow || {};
  const shadowX = shadow["shadow-x"] ?? "0";
  const shadowY = shadow["shadow-y"] ?? "1px";
  const shadowBlur = shadow["shadow-blur"] ?? "3px";
  const shadowSpread = shadow["shadow-spread"] ?? "0px";
  const shadowOpacity = shadow["shadow-opacity"] ?? 0.1;
  const shadowColor = shadow["shadow-color"] ?? "oklch(0 0 0)";

  const stageShadows = `
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
`.trim();

  const css = `
:root {
  --background: ${get(lc, "background")};
  --foreground: ${get(lc, "foreground")};
  --card: ${get(lc, "card")};
  --card-foreground: ${get(lc, "card-foreground")};
  --popover: ${get(lc, "popover")};
  --popover-foreground: ${get(lc, "popover-foreground")};
  --primary: ${get(lc, "primary")};
  --primary-foreground: ${get(lc, "primary-foreground")};
  --secondary: ${get(lc, "secondary")};
  --secondary-foreground: ${get(lc, "secondary-foreground")};
  --muted: ${get(lc, "muted")};
  --muted-foreground: ${get(lc, "muted-foreground")};
  --accent: ${get(lc, "accent")};
  --accent-foreground: ${get(lc, "accent-foreground")};
  --destructive: ${get(lc, "destructive")};
  --destructive-foreground: ${get(lc, "destructive-foreground")};
  --border: ${get(lc, "border")};
  --input: ${get(lc, "input")};
  --ring: ${get(lc, "ring")};
  --chart-1: ${get(lc, "chart-1")};
  --chart-2: ${get(lc, "chart-2")};
  --chart-3: ${get(lc, "chart-3")};
  --chart-4: ${get(lc, "chart-4")};
  --chart-5: ${get(lc, "chart-5")};
  --sidebar: ${get(lc, "sidebar")};
  --sidebar-foreground: ${get(lc, "sidebar-foreground")};
  --sidebar-primary: ${get(lc, "sidebar-primary")};
  --sidebar-primary-foreground: ${get(lc, "sidebar-primary-foreground")};
  --sidebar-accent: ${get(lc, "sidebar-accent")};
  --sidebar-accent-foreground: ${get(lc, "sidebar-accent-foreground")};
  --sidebar-border: ${get(lc, "sidebar-border")};
  --sidebar-ring: ${get(lc, "sidebar-ring")};

  --font-sans: ${fontSans};
  --font-serif: ${fontSerif};
  --font-mono: ${fontMono};
  --radius: ${radius};
  --shadow-x: ${shadowX};
  --shadow-y: ${shadowY};
  --shadow-blur: ${shadowBlur};
  --shadow-spread: ${shadowSpread};
  --shadow-opacity: ${shadowOpacity};
  --shadow-color: ${shadowColor};
  ${stageShadows}
  --tracking-normal: ${trackingNormal};
  --spacing: ${spacing};
}

.dark {
  --background: ${get(dc, "background")};
  --foreground: ${get(dc, "foreground")};
  --card: ${get(dc, "card")};
  --card-foreground: ${get(dc, "card-foreground")};
  --popover: ${get(dc, "popover")};
  --popover-foreground: ${get(dc, "popover-foreground")};
  --primary: ${get(dc, "primary")};
  --primary-foreground: ${get(dc, "primary-foreground")};
  --secondary: ${get(dc, "secondary")};
  --secondary-foreground: ${get(dc, "secondary-foreground")};
  --muted: ${get(dc, "muted")};
  --muted-foreground: ${get(dc, "muted-foreground")};
  --accent: ${get(dc, "accent")};
  --accent-foreground: ${get(dc, "accent-foreground")};
  --destructive: ${get(dc, "destructive")};
  --destructive-foreground: ${get(dc, "destructive-foreground")};
  --border: ${get(dc, "border")};
  --input: ${get(dc, "input")};
  --ring: ${get(dc, "ring")};
  --chart-1: ${get(dc, "chart-1")};
  --chart-2: ${get(dc, "chart-2")};
  --chart-3: ${get(dc, "chart-3")};
  --chart-4: ${get(dc, "chart-4")};
  --chart-5: ${get(dc, "chart-5")};
  --sidebar: ${get(dc, "sidebar")};
  --sidebar-foreground: ${get(dc, "sidebar-foreground")};
  --sidebar-primary: ${get(dc, "sidebar-primary")};
  --sidebar-primary-foreground: ${get(dc, "sidebar-primary-foreground")};
  --sidebar-accent: ${get(dc, "sidebar-accent")};
  --sidebar-accent-foreground: ${get(dc, "sidebar-accent-foreground")};
  --sidebar-border: ${get(dc, "sidebar-border")};
  --sidebar-ring: ${get(dc, "sidebar-ring")};

  --font-sans: ${fontSans};
  --font-serif: ${fontSerif};
  --font-mono: ${fontMono};
  --radius: ${radius};
  --shadow-x: ${shadowX};
  --shadow-y: ${shadowY};
  --shadow-blur: ${shadowBlur};
  --shadow-spread: ${shadowSpread};
  --shadow-opacity: ${shadowOpacity};
  --shadow-color: ${shadowColor};
  ${stageShadows}
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);

  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);

  --spacing-1: calc(var(--spacing) * 0.5);
  --spacing-2: var(--spacing);
  --spacing-3: calc(var(--spacing) * 1.5);
  --spacing-4: calc(var(--spacing) * 2);
  --spacing-5: calc(var(--spacing) * 3);
}

body { letter-spacing: var(--tracking-normal); }
`.trim();

  return css;
};
