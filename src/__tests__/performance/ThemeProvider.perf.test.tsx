import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { useDraftStore } from "@/store/useDraftStore";

describe("ThemeProvider Performance Tests", () => {
  beforeEach(() => {
    // Clean up any existing style tags
    const existingStyle = document.getElementById("modcn-theme");
    if (existingStyle) {
      existingStyle.remove();
    }
  });

  it("should inject CSS variables on mount", async () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Test</div>
      </ThemeProvider>
    );

    // Wait for debounced CSS injection (150ms)
    await new Promise((resolve) => setTimeout(resolve, 200));

    const styleEl = document.getElementById("modcn-theme");
    expect(styleEl).toBeTruthy();
    expect(styleEl?.textContent).toContain(".preview-canvas");
  });

  it("should not re-inject CSS when unrelated store changes", async () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 200));

    const styleEl = document.getElementById("modcn-theme");
    const initialContent = styleEl?.textContent;

    // Change unrelated property
    useDraftStore.setState({ sidebarOpen: true });

    await new Promise((resolve) => setTimeout(resolve, 200));

    // CSS should not change
    expect(styleEl?.textContent).toBe(initialContent);
  });

  it("should update CSS when workingDraft changes", async () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 200));

    const styleEl = document.getElementById("modcn-theme");
    const initialContent = styleEl?.textContent;

    // Change token
    const current = useDraftStore.getState().workingDraft;
    useDraftStore.setState({
      workingDraft: {
        ...current,
        shared: {
          ...current.shared,
          others: {
            ...current.shared.others,
            radius: "1.0rem",
          },
        },
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    // CSS should update
    expect(styleEl?.textContent).not.toBe(initialContent);
    expect(styleEl?.textContent).toContain("1.0rem");
  });
});

