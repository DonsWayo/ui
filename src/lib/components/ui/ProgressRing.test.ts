import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import ProgressRing from "./ProgressRing.svelte";

describe("ProgressRing — rendering", () => {
  it("renders nothing when limit === 0", () => {
    const { container } = render(ProgressRing, { props: { spent: 50, limit: 0 } });
    expect(container.querySelector("svg")).toBeNull();
    expect(container.querySelector("span")).toBeNull();
  });

  it("renders an SVG when limit > 0", () => {
    const { container } = render(ProgressRing, { props: { spent: 25, limit: 100 } });
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("renders a span wrapper when limit > 0", () => {
    const { container } = render(ProgressRing, { props: { spent: 10, limit: 100 } });
    expect(container.querySelector("span")).not.toBeNull();
  });

  it("renders two circle elements inside the SVG", () => {
    const { container } = render(ProgressRing, { props: { spent: 50, limit: 100 } });
    expect(container.querySelectorAll("circle").length).toBe(2);
  });

  it("renders nothing when both spent and limit are 0", () => {
    const { container } = render(ProgressRing, { props: { spent: 0, limit: 0 } });
    expect(container.querySelector("svg")).toBeNull();
  });

  it("renders when spent > limit (clamped to 1)", () => {
    const { container } = render(ProgressRing, { props: { spent: 200, limit: 100 } });
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("renders without crashing for fractional values", () => {
    expect(() =>
      render(ProgressRing, { props: { spent: 33.33, limit: 100 } }),
    ).not.toThrow();
  });
});

describe("ProgressRing — title attribute", () => {
  it("title contains the percentage for 25%", () => {
    const { container } = render(ProgressRing, { props: { spent: 25, limit: 100 } });
    const span = container.querySelector("span");
    expect(span?.getAttribute("title")).toContain("25%");
  });

  it("title contains the percentage for 50%", () => {
    const { container } = render(ProgressRing, { props: { spent: 50, limit: 100 } });
    const span = container.querySelector("span");
    expect(span?.getAttribute("title")).toContain("50%");
  });

  it("title contains the percentage for 80%", () => {
    const { container } = render(ProgressRing, { props: { spent: 80, limit: 100 } });
    const span = container.querySelector("span");
    expect(span?.getAttribute("title")).toContain("80%");
  });

  it("title contains the percentage for 100% when spent === limit", () => {
    const { container } = render(ProgressRing, { props: { spent: 100, limit: 100 } });
    const span = container.querySelector("span");
    expect(span?.getAttribute("title")).toContain("100%");
  });

  it("title contains the spent value formatted with 2 decimal places", () => {
    const { container } = render(ProgressRing, { props: { spent: 25, limit: 100 } });
    const span = container.querySelector("span");
    expect(span?.getAttribute("title")).toContain("25.00");
  });

  it("title contains the limit value formatted with 2 decimal places", () => {
    const { container } = render(ProgressRing, { props: { spent: 25, limit: 100 } });
    const span = container.querySelector("span");
    expect(span?.getAttribute("title")).toContain("100.00");
  });

  it("title contains '$' signs for spent and limit", () => {
    const { container } = render(ProgressRing, { props: { spent: 10, limit: 50 } });
    const span = container.querySelector("span");
    const title = span?.getAttribute("title") ?? "";
    expect(title.match(/\$/g)?.length).toBeGreaterThanOrEqual(2);
  });
});

describe("ProgressRing — color derivation", () => {
  it("uses stroke-success class when pct < 0.5 (0%)", () => {
    const { container } = render(ProgressRing, { props: { spent: 0, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasSuccess = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-success"),
    );
    expect(hasSuccess).toBe(true);
  });

  it("uses stroke-success class when pct < 0.5 (25%)", () => {
    const { container } = render(ProgressRing, { props: { spent: 25, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasSuccess = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-success"),
    );
    expect(hasSuccess).toBe(true);
  });

  it("uses stroke-warning class when pct is 0.5 (exactly 50%)", () => {
    const { container } = render(ProgressRing, { props: { spent: 50, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasWarning = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-warning"),
    );
    expect(hasWarning).toBe(true);
  });

  it("uses stroke-warning class when pct is 0.79 (79%)", () => {
    const { container } = render(ProgressRing, { props: { spent: 79, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasWarning = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-warning"),
    );
    expect(hasWarning).toBe(true);
  });

  it("uses stroke-destructive class when pct is 0.8 (exactly 80%)", () => {
    const { container } = render(ProgressRing, { props: { spent: 80, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasDestructive = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-destructive"),
    );
    expect(hasDestructive).toBe(true);
  });

  it("uses stroke-destructive class when pct is 1.0 (100%)", () => {
    const { container } = render(ProgressRing, { props: { spent: 100, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasDestructive = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-destructive"),
    );
    expect(hasDestructive).toBe(true);
  });

  it("uses stroke-destructive class when spent > limit (clamped to 100%)", () => {
    const { container } = render(ProgressRing, { props: { spent: 150, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasDestructive = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-destructive"),
    );
    expect(hasDestructive).toBe(true);
  });
});

describe("ProgressRing — bgColor derivation", () => {
  it("uses stroke-success/20 bg class when pct < 0.5", () => {
    const { container } = render(ProgressRing, { props: { spent: 10, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasBg = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-success/20"),
    );
    expect(hasBg).toBe(true);
  });

  it("uses stroke-warning/20 bg class when pct is in warning range", () => {
    const { container } = render(ProgressRing, { props: { spent: 65, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasBg = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-warning/20"),
    );
    expect(hasBg).toBe(true);
  });

  it("uses stroke-destructive/20 bg class when pct >= 0.8", () => {
    const { container } = render(ProgressRing, { props: { spent: 90, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasBg = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-destructive/20"),
    );
    expect(hasBg).toBe(true);
  });
});

describe("ProgressRing — size and SVG attributes", () => {
  it("SVG has correct width and height for default size (16)", () => {
    const { container } = render(ProgressRing, { props: { spent: 50, limit: 100 } });
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("16");
    expect(svg?.getAttribute("height")).toBe("16");
  });

  it("SVG has correct width for custom size", () => {
    const { container } = render(ProgressRing, { props: { spent: 50, limit: 100, size: 40 } });
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("40");
    expect(svg?.getAttribute("height")).toBe("40");
  });

  it("SVG has -rotate-90 class", () => {
    const { container } = render(ProgressRing, { props: { spent: 50, limit: 100 } });
    const svg = container.querySelector("svg");
    // SVG elements use SVGAnimatedString for className — use getAttribute instead
    expect(svg?.getAttribute("class")).toContain("-rotate-90");
  });

  it("applies custom class to span wrapper", () => {
    const { container } = render(ProgressRing, {
      props: { spent: 50, limit: 100, class: "my-ring-class" },
    });
    const span = container.querySelector("span");
    expect(span?.className).toContain("my-ring-class");
  });
});

describe("ProgressRing — pct calculation", () => {
  it("pct is 0 when limit === 0 (no SVG rendered)", () => {
    // The component renders nothing when limit === 0 because pct would be 0
    const { container } = render(ProgressRing, { props: { spent: 100, limit: 0 } });
    expect(container.querySelector("svg")).toBeNull();
  });

  it("pct is clamped to 1 when spent > limit", () => {
    // At 100% the destructive color should be used
    const { container } = render(ProgressRing, { props: { spent: 999, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasDestructive = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-destructive"),
    );
    expect(hasDestructive).toBe(true);
  });

  it("pct is 0 when spent === 0 (success color)", () => {
    const { container } = render(ProgressRing, { props: { spent: 0, limit: 100 } });
    const circles = container.querySelectorAll("circle");
    const hasSuccess = Array.from(circles).some((c) =>
      c.getAttribute("class")?.includes("stroke-success"),
    );
    expect(hasSuccess).toBe(true);
  });
});
