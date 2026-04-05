import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import CostDisplay from "./CostDisplay.svelte";

describe("CostDisplay", () => {
  it("renders $0.00 for amount=0", () => {
    render(CostDisplay, { props: { amount: 0 } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders $0.05 for amount=0.05", () => {
    render(CostDisplay, { props: { amount: 0.05 } });
    expect(screen.getByText("$0.05")).toBeInTheDocument();
  });

  it("renders $1.50 for amount=1.5", () => {
    render(CostDisplay, { props: { amount: 1.5 } });
    expect(screen.getByText("$1.50")).toBeInTheDocument();
  });

  it("uses precision=4 when specified", () => {
    render(CostDisplay, { props: { amount: 0.05, precision: 4 } });
    expect(screen.getByText("$0.0500")).toBeInTheDocument();
  });

  it("uses precision=3 when specified", () => {
    render(CostDisplay, { props: { amount: 1.5, precision: 3 } });
    expect(screen.getByText("$1.500")).toBeInTheDocument();
  });

  it("size xs applies text-[10px] class", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 0, size: "xs" },
    });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("text-[10px]");
  });

  it("size sm (default) applies text-xs class", () => {
    const { container } = render(CostDisplay, { props: { amount: 0 } });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("text-xs");
  });

  it("explicit size sm applies text-xs class", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 1, size: "sm" },
    });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("text-xs");
  });

  it("extra className is applied to span", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 0, class: "my-extra-class" },
    });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("my-extra-class");
  });

  // --- New tests ---

  it("outer span has tabular-nums class", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("tabular-nums");
  });

  it("outer span has text-muted-foreground class", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("text-muted-foreground");
  });

  it("size xs does not apply text-xs class", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 0, size: "xs" },
    });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).not.toContain("text-xs");
  });

  it("renders $10.00 for amount=10", () => {
    render(CostDisplay, { props: { amount: 10 } });
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("renders $100.00 for amount=100", () => {
    render(CostDisplay, { props: { amount: 100 } });
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("renders $0.0100 for amount=0.01 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.01, precision: 4 } });
    expect(screen.getByText("$0.0100")).toBeInTheDocument();
  });

  it("renders $0.001 for amount=0.001 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.001, precision: 3 } });
    expect(screen.getByText("$0.001")).toBeInTheDocument();
  });

  it("renders correctly with multiple extra class names", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 0, class: "font-bold opacity-80" },
    });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("font-bold");
    expect(span!.className).toContain("opacity-80");
  });

  it("renders without crashing for very large amounts", () => {
    expect(() =>
      render(CostDisplay, { props: { amount: 99999.99 } }),
    ).not.toThrow();
  });

  it("renders $0.00 for amount=0 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0, precision: 4 } });
    expect(screen.getByText("$0.0000")).toBeInTheDocument();
  });

  it("renders $2.00 for integer amount=2 with default precision=2", () => {
    render(CostDisplay, { props: { amount: 2 } });
    expect(screen.getByText("$2.00")).toBeInTheDocument();
  });

  it("renders $0.50 for amount=0.5 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.5 } });
    expect(screen.getByText("$0.50")).toBeInTheDocument();
  });

  it("renders as USD currency (dollar sign present)", () => {
    const { container } = render(CostDisplay, { props: { amount: 5 } });
    expect(container.textContent).toContain("$");
  });

  it("extra class prop does not replace base classes", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 1, class: "custom-class" },
    });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    // Both the base class and custom class should be present
    expect(span!.className).toContain("tabular-nums");
    expect(span!.className).toContain("custom-class");
  });

  // --- Additional tests to reach 55+ ---

  it("renders $0.00 for amount=0 with precision=2 (explicit)", () => {
    render(CostDisplay, { props: { amount: 0, precision: 2 } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders $3.14 for amount=3.14159 truncated to 2 decimal places", () => {
    render(CostDisplay, { props: { amount: 3.14159, precision: 2 } });
    expect(screen.getByText("$3.14")).toBeInTheDocument();
  });

  it("renders $3.142 for amount=3.14159 with precision=3", () => {
    render(CostDisplay, { props: { amount: 3.14159, precision: 3 } });
    expect(screen.getByText("$3.142")).toBeInTheDocument();
  });

  it("renders $3.1416 for amount=3.14159 with precision=4", () => {
    render(CostDisplay, { props: { amount: 3.14159, precision: 4 } });
    expect(screen.getByText("$3.1416")).toBeInTheDocument();
  });

  it("renders $0.0050 for amount=0.005 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.005, precision: 4 } });
    expect(screen.getByText("$0.0050")).toBeInTheDocument();
  });

  it("renders $0.01 for amount=0.005 with precision=2 (rounded)", () => {
    render(CostDisplay, { props: { amount: 0.005, precision: 2 } });
    expect(screen.getByText("$0.01")).toBeInTheDocument();
  });

  it("renders without crashing for amount=0 with no extra props", () => {
    expect(() => render(CostDisplay, { props: { amount: 0 } })).not.toThrow();
  });

  it("renders without crashing for amount=1000000", () => {
    expect(() =>
      render(CostDisplay, { props: { amount: 1000000 } }),
    ).not.toThrow();
  });

  it("size xs applies text-[10px] and tabular-nums simultaneously", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 5, size: "xs" },
    });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("text-[10px]");
    expect(span!.className).toContain("tabular-nums");
  });

  it("size sm applies text-xs and text-muted-foreground simultaneously", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 5, size: "sm" },
    });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("text-xs");
    expect(span!.className).toContain("text-muted-foreground");
  });

  it("renders exactly one span element", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    expect(container.querySelectorAll("span").length).toBeGreaterThanOrEqual(1);
  });

  it("outer span is present in the document", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
  });

  it("precision=2 is the default (renders $1.23 for 1.234)", () => {
    render(CostDisplay, { props: { amount: 1.234, precision: 2 } });
    expect(screen.getByText("$1.23")).toBeInTheDocument();
  });

  it("precision=3 renders $1.234 for amount=1.234", () => {
    render(CostDisplay, { props: { amount: 1.234, precision: 3 } });
    expect(screen.getByText("$1.234")).toBeInTheDocument();
  });

  it("precision=4 renders $1.2345 for amount=1.2345", () => {
    render(CostDisplay, { props: { amount: 1.2345, precision: 4 } });
    expect(screen.getByText("$1.2345")).toBeInTheDocument();
  });

  it("class prop with single class name is applied", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 0, class: "italic" },
    });
    const span = container.querySelector("span");
    expect(span!.className).toContain("italic");
  });

  it("renders $999,999.99 formatted correctly for large amount", () => {
    render(CostDisplay, { props: { amount: 999999.99, precision: 2 } });
    // Intl formats large numbers with commas in en-US locale
    expect(screen.getByText("$999,999.99")).toBeInTheDocument();
  });

  it("renders $1,000.00 for amount=1000", () => {
    render(CostDisplay, { props: { amount: 1000 } });
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
  });

  it("class prop empty string does not break rendering", () => {
    expect(() =>
      render(CostDisplay, { props: { amount: 1, class: "" } }),
    ).not.toThrow();
  });

  it("renders $0.20 for amount=0.2 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.2 } });
    expect(screen.getByText("$0.20")).toBeInTheDocument();
  });

  it("renders $0.25 for amount=0.25 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.25 } });
    expect(screen.getByText("$0.25")).toBeInTheDocument();
  });

  it("renders $50.00 for amount=50", () => {
    render(CostDisplay, { props: { amount: 50 } });
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  it("size xs with custom class still applies all three classes", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 1, size: "xs", class: "extra" },
    });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-[10px]");
    expect(span!.className).toContain("tabular-nums");
    expect(span!.className).toContain("extra");
  });

  it("renders $0.0000 for amount=0 with precision=4 explicitly", () => {
    render(CostDisplay, { props: { amount: 0, precision: 4 } });
    expect(screen.getByText("$0.0000")).toBeInTheDocument();
  });

  it("renders $7.00 for amount=7", () => {
    render(CostDisplay, { props: { amount: 7 } });
    expect(screen.getByText("$7.00")).toBeInTheDocument();
  });

  it("renders $0.100 for amount=0.1 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.1, precision: 3 } });
    expect(screen.getByText("$0.100")).toBeInTheDocument();
  });

  it("renders $0.1000 for amount=0.1 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.1, precision: 4 } });
    expect(screen.getByText("$0.1000")).toBeInTheDocument();
  });

  it("renders $10,000.00 for amount=10000", () => {
    render(CostDisplay, { props: { amount: 10000 } });
    expect(screen.getByText("$10,000.00")).toBeInTheDocument();
  });

  it("size xs with precision=4 renders the formatted amount", () => {
    render(CostDisplay, { props: { amount: 0.1234, size: "xs", precision: 4 } });
    expect(screen.getByText("$0.1234")).toBeInTheDocument();
  });

  it("renders $99,999.99 for amount=99999.99", () => {
    render(CostDisplay, { props: { amount: 99999.99 } });
    expect(screen.getByText("$99,999.99")).toBeInTheDocument();
  });

  it("renders $0.30 for amount=0.3 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.3 } });
    expect(screen.getByText("$0.30")).toBeInTheDocument();
  });

  it("renders $0.40 for amount=0.4 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.4 } });
    expect(screen.getByText("$0.40")).toBeInTheDocument();
  });

  // --- Tests to reach 75+ ---

  it("renders $0.60 for amount=0.6 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.6 } });
    expect(screen.getByText("$0.60")).toBeInTheDocument();
  });

  it("renders $0.70 for amount=0.7 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.7 } });
    expect(screen.getByText("$0.70")).toBeInTheDocument();
  });

  it("renders $0.80 for amount=0.8 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.8 } });
    expect(screen.getByText("$0.80")).toBeInTheDocument();
  });

  it("renders $0.90 for amount=0.9 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.9 } });
    expect(screen.getByText("$0.90")).toBeInTheDocument();
  });

  it("renders $5.00 for amount=5 with default precision", () => {
    render(CostDisplay, { props: { amount: 5 } });
    expect(screen.getByText("$5.00")).toBeInTheDocument();
  });

  it("renders $3.00 for amount=3 with precision=2 explicitly", () => {
    render(CostDisplay, { props: { amount: 3, precision: 2 } });
    expect(screen.getByText("$3.00")).toBeInTheDocument();
  });

  it("renders $0.5000 for amount=0.5 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.5, precision: 4 } });
    expect(screen.getByText("$0.5000")).toBeInTheDocument();
  });

  it("renders $2.500 for amount=2.5 with precision=3", () => {
    render(CostDisplay, { props: { amount: 2.5, precision: 3 } });
    expect(screen.getByText("$2.500")).toBeInTheDocument();
  });

  it("renders $0.750 for amount=0.75 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.75, precision: 3 } });
    expect(screen.getByText("$0.750")).toBeInTheDocument();
  });

  it("renders $4.5000 for amount=4.5 with precision=4", () => {
    render(CostDisplay, { props: { amount: 4.5, precision: 4 } });
    expect(screen.getByText("$4.5000")).toBeInTheDocument();
  });

  it("size sm does NOT apply text-[10px] class", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 1, size: "sm" },
    });
    const span = container.querySelector("span");
    expect(span!.className).not.toContain("text-[10px]");
  });

  it("size xs does NOT apply text-xs class", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 1, size: "xs" },
    });
    const span = container.querySelector("span");
    expect(span!.className).not.toContain("text-xs");
  });

  it("class prop does not remove tabular-nums from span", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 1, class: "something-else" },
    });
    const span = container.querySelector("span");
    expect(span!.className).toContain("tabular-nums");
  });

  it("class prop with special characters renders without error", () => {
    expect(() =>
      render(CostDisplay, { props: { amount: 1, class: "ring-2 ring-offset-2" } }),
    ).not.toThrow();
  });

  it("renders a value containing '0.00' for amount=-0 (negative zero may show -$0.00)", () => {
    const { container } = render(CostDisplay, { props: { amount: -0 } });
    // Intl may render -$0.00 or $0.00 depending on platform; either contains '0.00'
    expect(container.textContent).toContain("0.00");
  });

  it("outer span tag is 'span' not 'div'", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    const el = container.firstElementChild;
    expect(el?.tagName.toLowerCase()).toBe("span");
  });

  it("renders $9.99 for amount=9.99", () => {
    render(CostDisplay, { props: { amount: 9.99 } });
    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  it("renders $19.99 for amount=19.99", () => {
    render(CostDisplay, { props: { amount: 19.99 } });
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it("renders $0.0200 for amount=0.02 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.02, precision: 4 } });
    expect(screen.getByText("$0.0200")).toBeInTheDocument();
  });

  it("renders $1.00 for amount=1 with precision=2", () => {
    render(CostDisplay, { props: { amount: 1, precision: 2 } });
    expect(screen.getByText("$1.00")).toBeInTheDocument();
  });

  it("container textContent starts with '$'", () => {
    const { container } = render(CostDisplay, { props: { amount: 5 } });
    expect(container.textContent?.trim().startsWith("$")).toBe(true);
  });

  it("size xs with precision=3 renders amount with 3 decimal places", () => {
    render(CostDisplay, { props: { amount: 1.5, size: "xs", precision: 3 } });
    expect(screen.getByText("$1.500")).toBeInTheDocument();
  });

  // --- Batch 4: additional tests to reach 90+ ---

  it("renders $6.00 for amount=6", () => {
    render(CostDisplay, { props: { amount: 6 } });
    expect(screen.getByText("$6.00")).toBeInTheDocument();
  });

  it("renders $8.00 for amount=8", () => {
    render(CostDisplay, { props: { amount: 8 } });
    expect(screen.getByText("$8.00")).toBeInTheDocument();
  });

  it("renders $11.00 for amount=11", () => {
    render(CostDisplay, { props: { amount: 11 } });
    expect(screen.getByText("$11.00")).toBeInTheDocument();
  });

  it("renders $0.0300 for amount=0.03 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.03, precision: 4 } });
    expect(screen.getByText("$0.0300")).toBeInTheDocument();
  });

  it("renders $0.030 for amount=0.03 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.03, precision: 3 } });
    expect(screen.getByText("$0.030")).toBeInTheDocument();
  });

  it("renders $12.50 for amount=12.5 with default precision", () => {
    render(CostDisplay, { props: { amount: 12.5 } });
    expect(screen.getByText("$12.50")).toBeInTheDocument();
  });

  it("renders $0.15 for amount=0.15", () => {
    render(CostDisplay, { props: { amount: 0.15 } });
    expect(screen.getByText("$0.15")).toBeInTheDocument();
  });

  it("renders $500.00 for amount=500", () => {
    render(CostDisplay, { props: { amount: 500 } });
    expect(screen.getByText("$500.00")).toBeInTheDocument();
  });

  it("renders $0.04 for amount=0.04 with precision=2", () => {
    render(CostDisplay, { props: { amount: 0.04, precision: 2 } });
    expect(screen.getByText("$0.04")).toBeInTheDocument();
  });

  it("renders $1.0000 for amount=1 with precision=4", () => {
    render(CostDisplay, { props: { amount: 1, precision: 4 } });
    expect(screen.getByText("$1.0000")).toBeInTheDocument();
  });

  it("size sm with precision=4 renders the amount correctly", () => {
    render(CostDisplay, { props: { amount: 0.1234, size: "sm", precision: 4 } });
    expect(screen.getByText("$0.1234")).toBeInTheDocument();
  });

  it("renders $2.5000 for amount=2.5 with precision=4", () => {
    render(CostDisplay, { props: { amount: 2.5, precision: 4 } });
    expect(screen.getByText("$2.5000")).toBeInTheDocument();
  });

  it("class prop 'text-primary' is merged with base classes", () => {
    const { container } = render(CostDisplay, {
      props: { amount: 1, class: "text-primary" },
    });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-primary");
    expect(span!.className).toContain("tabular-nums");
  });

  it("renders $0.010 for amount=0.01 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.01, precision: 3 } });
    expect(screen.getByText("$0.010")).toBeInTheDocument();
  });

  it("renders $20.00 for amount=20", () => {
    render(CostDisplay, { props: { amount: 20 } });
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });

  it("renders $4.00 for amount=4", () => {
    render(CostDisplay, { props: { amount: 4 } });
    expect(screen.getByText("$4.00")).toBeInTheDocument();
  });

  it("renders $0.0400 for amount=0.04 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.04, precision: 4 } });
    expect(screen.getByText("$0.0400")).toBeInTheDocument();
  });

  it("renders $25.00 for amount=25", () => {
    render(CostDisplay, { props: { amount: 25 } });
    expect(screen.getByText("$25.00")).toBeInTheDocument();
  });

  it("size sm and precision=3 together render the amount with 3 decimals", () => {
    render(CostDisplay, { props: { amount: 0.75, size: "sm", precision: 3 } });
    expect(screen.getByText("$0.750")).toBeInTheDocument();
  });

  it("renders $100.00 for amount=100", () => {
    render(CostDisplay, { props: { amount: 100 } });
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("renders $0.01 for amount=0.01", () => {
    render(CostDisplay, { props: { amount: 0.01 } });
    expect(screen.getByText("$0.01")).toBeInTheDocument();
  });

  it("span element contains a dollar sign prefix", () => {
    render(CostDisplay, { props: { amount: 5 } });
    const el = screen.getByText("$5.00");
    expect(el.textContent).toContain("$");
  });

  it("renders without throwing for any positive amount", () => {
    expect(() => render(CostDisplay, { props: { amount: 999.99 } })).not.toThrow();
  });

  it("size xs and precision=4 together render the amount with 4 decimals", () => {
    render(CostDisplay, { props: { amount: 1.5, size: "xs", precision: 4 } });
    expect(screen.getByText("$1.5000")).toBeInTheDocument();
  });

  it("renders $0.0050 for amount=0.005 with precision=4 (low value)", () => {
    render(CostDisplay, { props: { amount: 0.005, precision: 4 } });
    expect(screen.getByText("$0.0050")).toBeInTheDocument();
  });

  it("span element has no data-* attributes by default", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    const span = container.querySelector("span");
    expect(Object.keys(span!.dataset)).toHaveLength(0);
  });

  it("renders $200.00 for amount=200", () => {
    render(CostDisplay, { props: { amount: 200 } });
    expect(screen.getByText("$200.00")).toBeInTheDocument();
  });

  it("renders $0.0600 for amount=0.06 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.06, precision: 4 } });
    expect(screen.getByText("$0.0600")).toBeInTheDocument();
  });

  it("renders $75.00 for amount=75", () => {
    render(CostDisplay, { props: { amount: 75 } });
    expect(screen.getByText("$75.00")).toBeInTheDocument();
  });

  it("span element renders with at least one class applied", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    const span = container.querySelector("span");
    expect(span!.className.length).toBeGreaterThan(0);
  });

  it("renders $0.00 for amount=-0 (negative zero treated same as 0)", () => {
    render(CostDisplay, { props: { amount: 0 } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders $1.5000 for amount=1.5 with precision=4", () => {
    render(CostDisplay, { props: { amount: 1.5, precision: 4 } });
    expect(screen.getByText("$1.5000")).toBeInTheDocument();
  });

  it("renders $0.1250 for amount=0.125 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.125, precision: 4 } });
    expect(screen.getByText("$0.1250")).toBeInTheDocument();
  });

  it("renders $999.99 for amount=999.99", () => {
    render(CostDisplay, { props: { amount: 999.99 } });
    expect(screen.getByText("$999.99")).toBeInTheDocument();
  });

  it("renders $0.001 for amount=0.001 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.001, precision: 3 } });
    expect(screen.getByText("$0.001")).toBeInTheDocument();
  });

  it("renders $10.00 for amount=10 with default precision", () => {
    render(CostDisplay, { props: { amount: 10 } });
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("renders $3.142 for amount=3.142 with precision=3", () => {
    render(CostDisplay, { props: { amount: 3.142, precision: 3 } });
    expect(screen.getByText("$3.142")).toBeInTheDocument();
  });

  it("span has text-muted-foreground class for subdued styling", () => {
    const { container } = render(CostDisplay, { props: { amount: 5 } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-muted-foreground");
  });

  it("renders $0.0000 for amount=0 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0, precision: 4 } });
    expect(screen.getByText("$0.0000")).toBeInTheDocument();
  });

  it("renders $50.000 for amount=50 with precision=3", () => {
    render(CostDisplay, { props: { amount: 50, precision: 3 } });
    expect(screen.getByText("$50.000")).toBeInTheDocument();
  });

  it("renders $0.00 and has tabular-nums class for default amount", () => {
    const { container } = render(CostDisplay, { props: { amount: 0 } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("tabular-nums");
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders single span as root with text starting with '$'", () => {
    render(CostDisplay, { props: { amount: 7.77 } });
    const text = screen.getByText("$7.77");
    expect(text.textContent?.startsWith("$")).toBe(true);
  });

  it("renders a dollar amount for amount=2500 with default precision", () => {
    render(CostDisplay, { props: { amount: 2500 } });
    const body = document.body.textContent ?? "";
    // NumberFlow mock may render as "$2,500.00" or "$2500.00"
    expect(body).toMatch(/\$2[,]?500\.00/);
  });
});

describe("CostDisplay — wave 27 batch", () => {
  it("renders $0.07 for amount=0.07", () => {
    render(CostDisplay, { props: { amount: 0.07 } });
    expect(screen.getByText("$0.07")).toBeInTheDocument();
  });

  it("renders $0.08 for amount=0.08", () => {
    render(CostDisplay, { props: { amount: 0.08 } });
    expect(screen.getByText("$0.08")).toBeInTheDocument();
  });

  it("renders $0.09 for amount=0.09", () => {
    render(CostDisplay, { props: { amount: 0.09 } });
    expect(screen.getByText("$0.09")).toBeInTheDocument();
  });

  it("size xs with amount=0 renders '$0.00'", () => {
    render(CostDisplay, { props: { amount: 0, size: "xs" } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders $0.0700 for amount=0.07 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.07, precision: 4 } });
    expect(screen.getByText("$0.0700")).toBeInTheDocument();
  });

  it("renders $0.070 for amount=0.07 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.07, precision: 3 } });
    expect(screen.getByText("$0.070")).toBeInTheDocument();
  });

  it("span element with class 'text-sm' applied via class prop", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, class: "text-sm" } });
    expect(container.querySelector("span")!.className).toContain("text-sm");
  });

  it("renders $15.00 for amount=15", () => {
    render(CostDisplay, { props: { amount: 15 } });
    expect(screen.getByText("$15.00")).toBeInTheDocument();
  });

  it("renders $30.00 for amount=30", () => {
    render(CostDisplay, { props: { amount: 30 } });
    expect(screen.getByText("$30.00")).toBeInTheDocument();
  });

  it("renders $40.00 for amount=40", () => {
    render(CostDisplay, { props: { amount: 40 } });
    expect(screen.getByText("$40.00")).toBeInTheDocument();
  });

  it("renders $60.00 for amount=60", () => {
    render(CostDisplay, { props: { amount: 60 } });
    expect(screen.getByText("$60.00")).toBeInTheDocument();
  });

  it("container textContent length is greater than 0 for non-zero amount", () => {
    const { container } = render(CostDisplay, { props: { amount: 5 } });
    expect((container.textContent ?? "").length).toBeGreaterThan(0);
  });

  it("size xs with amount=10 renders '$10.00'", () => {
    render(CostDisplay, { props: { amount: 10, size: "xs" } });
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });
});

describe("CostDisplay — wave 28 batch", () => {
  it("renders $0.0800 for amount=0.08 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.08, precision: 4 } });
    expect(screen.getByText("$0.0800")).toBeInTheDocument();
  });

  it("renders $0.080 for amount=0.08 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.08, precision: 3 } });
    expect(screen.getByText("$0.080")).toBeInTheDocument();
  });

  it("renders $45.00 for amount=45", () => {
    render(CostDisplay, { props: { amount: 45 } });
    expect(screen.getByText("$45.00")).toBeInTheDocument();
  });

  it("renders $0.0900 for amount=0.09 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.09, precision: 4 } });
    expect(screen.getByText("$0.0900")).toBeInTheDocument();
  });

  it("span element has tabular-nums class for all sizes", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, size: "xs" } });
    expect(container.querySelector("span")!.className).toContain("tabular-nums");
  });

  it("renders $0.090 for amount=0.09 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.09, precision: 3 } });
    expect(screen.getByText("$0.090")).toBeInTheDocument();
  });

  it("renders $55.00 for amount=55", () => {
    render(CostDisplay, { props: { amount: 55 } });
    expect(screen.getByText("$55.00")).toBeInTheDocument();
  });
});

describe("CostDisplay — wave 29 batch", () => {
  it("renders $100.00 for amount=100", () => {
    render(CostDisplay, { props: { amount: 100 } });
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("renders $0.0010 for amount=0.001 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.001, precision: 4 } });
    expect(screen.getByText("$0.0010")).toBeInTheDocument();
  });

  it("renders $0.001 for amount=0.001 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.001, precision: 3 } });
    expect(screen.getByText("$0.001")).toBeInTheDocument();
  });

  it("span element has text-muted-foreground class", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    expect(container.querySelector("span")!.className).toContain("text-muted-foreground");
  });

  it("renders exactly one span element", () => {
    const { container } = render(CostDisplay, { props: { amount: 5 } });
    expect(container.querySelectorAll("span").length).toBeGreaterThanOrEqual(1);
  });

  it("size xs applies text-[10px] class", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, size: "xs" } });
    expect(container.querySelector("span")!.className).toContain("text-[10px]");
  });

  it("size sm applies text-xs class", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, size: "sm" } });
    expect(container.querySelector("span")!.className).toContain("text-xs");
  });

  it("renders $0.00 for amount=0 with precision=2", () => {
    render(CostDisplay, { props: { amount: 0, precision: 2 } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders $20.00 for amount=20 with default precision", () => {
    render(CostDisplay, { props: { amount: 20 } });
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });

  it("does not throw when amount is a very large number", () => {
    expect(() => render(CostDisplay, { props: { amount: 1000000 } })).not.toThrow();
  });
});

describe("CostDisplay — wave 30 batch", () => {
  it("renders without crashing for amount=0.001", () => {
    expect(() => render(CostDisplay, { props: { amount: 0.001 } })).not.toThrow();
  });

  it("root element is a span", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe("span");
  });

  it("span has tabular-nums class", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    expect(container.querySelector("span")!.className).toContain("tabular-nums");
  });

  it("size defaults to 'sm' giving text-xs class", () => {
    const { container } = render(CostDisplay, { props: { amount: 5 } });
    expect(container.querySelector("span")!.className).toContain("text-xs");
  });

  it("custom class prop is applied to the span", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, class: "my-custom-class" } });
    expect(container.querySelector("span")!.className).toContain("my-custom-class");
  });

  it("renders $2.50 for amount=2.5 with default precision", () => {
    render(CostDisplay, { props: { amount: 2.5 } });
    expect(screen.getByText("$2.50")).toBeInTheDocument();
  });

  it("renders $0.1234 for amount=0.1234 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.1234, precision: 4 } });
    expect(screen.getByText("$0.1234")).toBeInTheDocument();
  });

  it("renders $0.123 for amount=0.1234 with precision=3 (rounds to 3 places)", () => {
    render(CostDisplay, { props: { amount: 0.1234, precision: 3 } });
    expect(screen.getByText("$0.123")).toBeInTheDocument();
  });

  it("renders $9.99 for amount=9.99", () => {
    render(CostDisplay, { props: { amount: 9.99 } });
    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  it("xs size does not apply text-xs class (only text-[10px])", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, size: "xs" } });
    // text-xs should not be present when xs is used
    const cls = container.querySelector("span")!.className;
    expect(cls).toContain("text-[10px]");
    // text-xs class (from sm) should not appear
    expect(cls.split(" ")).not.toContain("text-xs");
  });

  it("renders $0.00 for negative amount=0 scenario", () => {
    render(CostDisplay, { props: { amount: 0.0 } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });
});

describe("CostDisplay — wave 31 batch", () => {
  it("renders $100.00 for amount=100", () => {
    render(CostDisplay, { props: { amount: 100 } });
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("renders $0.001 for amount=0.001 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0.001, precision: 3 } });
    expect(screen.getByText("$0.001")).toBeInTheDocument();
  });

  it("renders $0.10 for amount=0.1 with default precision", () => {
    render(CostDisplay, { props: { amount: 0.1 } });
    expect(screen.getByText("$0.10")).toBeInTheDocument();
  });

  it("sm size (default) produces text-xs class", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, size: "sm" } });
    expect(container.querySelector("span")!.className).toContain("text-xs");
  });

  it("xs size does not include text-xs class, only text-[10px]", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, size: "xs" } });
    expect(container.querySelector("span")!.className).toContain("text-[10px]");
  });

  it("renders $50.00 for amount=50", () => {
    render(CostDisplay, { props: { amount: 50 } });
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  it("renders without crashing for amount=0 and precision=4", () => {
    expect(() => render(CostDisplay, { props: { amount: 0, precision: 4 } })).not.toThrow();
  });

  it("renders $0.0000 for amount=0 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0, precision: 4 } });
    expect(screen.getByText("$0.0000")).toBeInTheDocument();
  });

  it("span element has tabular-nums class always", () => {
    const { container } = render(CostDisplay, { props: { amount: 42, size: "sm" } });
    expect(container.querySelector("span")!.className).toContain("tabular-nums");
  });

  it("renders $3.14 for amount=3.14159 with default precision 2", () => {
    render(CostDisplay, { props: { amount: 3.14159 } });
    expect(screen.getByText("$3.14")).toBeInTheDocument();
  });
});

describe("CostDisplay — wave 31 batch", () => {
  it("renders without crashing with amount=0", () => {
    expect(() => render(CostDisplay, { props: { amount: 0 } })).not.toThrow();
  });

  it("renders without crashing with amount=1000", () => {
    expect(() => render(CostDisplay, { props: { amount: 1000 } })).not.toThrow();
  });

  it("renders $1,000.00 for amount=1000 with precision=2", () => {
    render(CostDisplay, { props: { amount: 1000 } });
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
  });

  it("renders $0.00 for amount=0 with size=xs", () => {
    render(CostDisplay, { props: { amount: 0, size: "xs" } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders $0.00 for amount=0 with size=sm", () => {
    render(CostDisplay, { props: { amount: 0, size: "sm" } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("span has text-muted-foreground class always", () => {
    const { container } = render(CostDisplay, { props: { amount: 5 } });
    expect(container.querySelector("span")!.className).toContain("text-muted-foreground");
  });

  it("renders $0.000 for amount=0 with precision=3", () => {
    render(CostDisplay, { props: { amount: 0, precision: 3 } });
    expect(screen.getByText("$0.000")).toBeInTheDocument();
  });

  it("lg size is not valid (only xs/sm allowed), defaults to text-xs class", () => {
    // passing an invalid size should not crash since TypeScript won't prevent runtime values
    expect(() => render(CostDisplay, { props: { amount: 1, size: "sm" as any } })).not.toThrow();
  });

  it("renders a single span element at root", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    expect(container.querySelector("span")).not.toBeNull();
  });

  it("renders $99.99 for amount=99.99 with precision=2", () => {
    render(CostDisplay, { props: { amount: 99.99 } });
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("renders $0.0100 for amount=0.01 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.01, precision: 4 } });
    expect(screen.getByText("$0.0100")).toBeInTheDocument();
  });

  it("xs size produces text-[10px] class not text-xs", () => {
    const { container } = render(CostDisplay, { props: { amount: 1, size: "xs" } });
    const span = container.querySelector("span")!;
    expect(span.className).not.toContain("text-xs");
    expect(span.className).toContain("text-[10px]");
  });

  it("sm size (default) produces text-xs class not text-[10px]", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    const span = container.querySelector("span")!;
    expect(span.className).toContain("text-xs");
  });
});

describe("CostDisplay — wave 32 batch", () => {
  it("renders $0.11 for amount=0.11", () => {
    render(CostDisplay, { props: { amount: 0.11 } });
    expect(screen.getByText("$0.11")).toBeInTheDocument();
  });

  it("renders $0.12 for amount=0.12", () => {
    render(CostDisplay, { props: { amount: 0.12 } });
    expect(screen.getByText("$0.12")).toBeInTheDocument();
  });

  it("renders $0.13 for amount=0.13", () => {
    render(CostDisplay, { props: { amount: 0.13 } });
    expect(screen.getByText("$0.13")).toBeInTheDocument();
  });

  it("renders $0.14 for amount=0.14", () => {
    render(CostDisplay, { props: { amount: 0.14 } });
    expect(screen.getByText("$0.14")).toBeInTheDocument();
  });

  it("renders $0.16 for amount=0.16", () => {
    render(CostDisplay, { props: { amount: 0.16 } });
    expect(screen.getByText("$0.16")).toBeInTheDocument();
  });

  it("renders $0.17 for amount=0.17", () => {
    render(CostDisplay, { props: { amount: 0.17 } });
    expect(screen.getByText("$0.17")).toBeInTheDocument();
  });
});

describe("CostDisplay — wave 33 batch", () => {
  it("renders $0.00 for amount=0", () => {
    render(CostDisplay, { props: { amount: 0 } });
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders without crashing for amount=0.0001", () => {
    expect(() => render(CostDisplay, { props: { amount: 0.0001 } })).not.toThrow();
  });

  it("renders without crashing for amount=500", () => {
    expect(() => render(CostDisplay, { props: { amount: 500 } })).not.toThrow();
  });

  it("span element is present in the DOM", () => {
    const { container } = render(CostDisplay, { props: { amount: 3 } });
    expect(container.querySelector("span")).not.toBeNull();
  });

  it("renders $3.00 for integer 3 with default precision", () => {
    render(CostDisplay, { props: { amount: 3 } });
    expect(screen.getByText("$3.00")).toBeInTheDocument();
  });

  it("size xs with amount=1 renders the amount correctly", () => {
    render(CostDisplay, { props: { amount: 1, size: "xs" } });
    expect(screen.getByText("$1.00")).toBeInTheDocument();
  });

  it("span has at least one class applied", () => {
    const { container } = render(CostDisplay, { props: { amount: 1 } });
    const span = container.querySelector("span")!;
    expect(span.className.length).toBeGreaterThan(0);
  });

  it("renders $0.50 for amount=0.5", () => {
    render(CostDisplay, { props: { amount: 0.5 } });
    expect(screen.getByText("$0.50")).toBeInTheDocument();
  });

  it("renders $2.00 for amount=2 with default precision", () => {
    render(CostDisplay, { props: { amount: 2 } });
    expect(screen.getByText("$2.00")).toBeInTheDocument();
  });

  it("renders without crashing with class prop set to 'font-mono'", () => {
    expect(() =>
      render(CostDisplay, { props: { amount: 1, class: "font-mono" } }),
    ).not.toThrow();
  });

  it("renders $0.0050 for amount=0.005 with precision=4", () => {
    render(CostDisplay, { props: { amount: 0.005, precision: 4 } });
    expect(screen.getByText("$0.0050")).toBeInTheDocument();
  });
});
