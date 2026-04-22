import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import StatusPill from "./StatusPill.svelte";

describe("StatusPill", () => {
  it("renders default label 'passed' for status=success", () => {
    render(StatusPill, { props: { status: "success" } });
    expect(screen.getByText("passed")).toBeInTheDocument();
  });

  it("renders default label 'failed' for status=failure", () => {
    render(StatusPill, { props: { status: "failure" } });
    expect(screen.getByText("failed")).toBeInTheDocument();
  });

  it("renders default label 'running' for status=running", () => {
    render(StatusPill, { props: { status: "running" } });
    expect(screen.getByText("running")).toBeInTheDocument();
  });

  it("renders default label 'pending' for status=pending", () => {
    render(StatusPill, { props: { status: "pending" } });
    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("renders default label 'cancelled' for status=cancelled", () => {
    render(StatusPill, { props: { status: "cancelled" } });
    expect(screen.getByText("cancelled")).toBeInTheDocument();
  });

  it("renders default label 'warning' for status=warning", () => {
    render(StatusPill, { props: { status: "warning" } });
    expect(screen.getByText("warning")).toBeInTheDocument();
  });

  it("renders custom label when label prop is provided", () => {
    render(StatusPill, { props: { status: "success", label: "Deployed" } });
    expect(screen.getByText("Deployed")).toBeInTheDocument();
  });

  it("custom label overrides the default label", () => {
    render(StatusPill, { props: { status: "success", label: "Custom" } });
    expect(screen.queryByText("passed")).not.toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("size='xs' applies text-[10px] class", () => {
    const { container } = render(StatusPill, { props: { status: "success", size: "xs" } });
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span!.className).toContain("text-[10px]");
  });

  it("size='xs' applies px-1.5 class", () => {
    const { container } = render(StatusPill, { props: { status: "success", size: "xs" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("px-1.5");
  });

  it("size='sm' (default) applies text-[11px] class", () => {
    const { container } = render(StatusPill, { props: { status: "success" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-[11px]");
  });

  it("size='sm' applies px-2 class", () => {
    const { container } = render(StatusPill, { props: { status: "success", size: "sm" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("px-2");
  });

  it("size='xs' does not apply text-[11px] class", () => {
    const { container } = render(StatusPill, { props: { status: "running", size: "xs" } });
    const span = container.querySelector("span");
    expect(span!.className).not.toContain("text-[11px]");
  });

  it("root element is a span", () => {
    const { container } = render(StatusPill, { props: { status: "success" } });
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe("span");
  });

  it("applies green color classes for success status", () => {
    const { container } = render(StatusPill, { props: { status: "success" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-green-500");
  });

  it("applies destructive color classes for failure status", () => {
    const { container } = render(StatusPill, { props: { status: "failure" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-destructive");
  });

  it("applies blue color classes for running status", () => {
    const { container } = render(StatusPill, { props: { status: "running" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-blue-400");
  });

  it("applies yellow color classes for pending status", () => {
    const { container } = render(StatusPill, { props: { status: "pending" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-yellow-500");
  });

  it("applies amber color classes for warning status", () => {
    const { container } = render(StatusPill, { props: { status: "warning" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-amber-500");
  });

  it("applies muted color classes for cancelled status", () => {
    const { container } = render(StatusPill, { props: { status: "cancelled" } });
    const span = container.querySelector("span");
    expect(span!.className).toContain("text-muted-foreground");
  });

  it("renders without crashing for all statuses", () => {
    const statuses = ["success", "failure", "running", "pending", "cancelled", "warning"] as const;
    for (const status of statuses) {
      expect(() => render(StatusPill, { props: { status } })).not.toThrow();
    }
  });
});
