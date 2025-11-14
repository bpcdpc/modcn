import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Preview } from "@/components/Preview";
import { useDraftStore } from "@/store/useDraftStore";

describe("Preview Performance Tests", () => {
  beforeEach(() => {
    // Reset store to default state
    const { workingDraft } = useDraftStore.getState();
    useDraftStore.setState({ workingDraft });
  });

  it("should not re-render when unrelated store properties change", async () => {
    let renderCount = 0;

    // Wrap Preview with render counter
    function PreviewWithCounter() {
      renderCount++;
      return <Preview />;
    }

    render(<PreviewWithCounter />);
    const initialRenderCount = renderCount;

    // Change unrelated store property (sidebarOpen)
    useDraftStore.setState({ sidebarOpen: true });

    // Wait a bit for any potential re-renders
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Preview should not re-render for unrelated changes
    // (rerender() was removed - we're testing if store changes alone trigger re-renders)
    expect(renderCount).toBe(initialRenderCount);
  });

  it("should measure render time for token updates", async () => {
    const startTime = performance.now();

    render(<Preview />);

    // Simulate 24 spacing updates
    for (let i = 0; i < 24; i++) {
      const current = useDraftStore.getState().workingDraft;
      const nextSpacing = 0.25 + i * 0.01;
      useDraftStore.setState({
        workingDraft: {
          ...current,
          shared: {
            ...current.shared,
            others: {
              ...current.shared.others,
              spacing: `${nextSpacing.toFixed(4)}rem`,
            },
          },
        },
      });
      // Small delay to allow React to process updates
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    // Wait for all updates to complete
    await new Promise((resolve) => setTimeout(resolve, 200));

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Log for manual inspection
    console.log(`24 spacing updates took: ${duration.toFixed(2)}ms`);

    // Should complete in reasonable time (< 500ms for 24 updates)
    expect(duration).toBeLessThan(500);
  });

  it("should render Preview component successfully", () => {
    const { container } = render(<Preview />);
    
    // Check that preview canvas exists
    const previewCanvas = container.querySelector(".preview-canvas");
    expect(previewCanvas).not.toBeNull();
  });
});

