import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import PageHeader from "./PageHeader.svelte";

describe("PageHeader", () => {
  it("renders the title", () => {
    render(PageHeader, { props: { title: "Repositories" } });
    expect(screen.getByText("Repositories")).toBeInTheDocument();
  });

  it("title is rendered as an h1 element", () => {
    render(PageHeader, { props: { title: "Repositories" } });
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("Repositories");
  });

  it("renders the subtitle when provided", () => {
    render(PageHeader, { props: { title: "Repositories", subtitle: "All repositories" } });
    expect(screen.getByText("All repositories")).toBeInTheDocument();
  });

  it("does not render a subtitle element when subtitle is not given", () => {
    render(PageHeader, { props: { title: "Repositories" } });
    expect(screen.queryByText("All repositories")).not.toBeInTheDocument();
  });

  it("subtitle is rendered as a paragraph element", () => {
    const { container } = render(PageHeader, {
      props: { title: "Repositories", subtitle: "Some subtitle" },
    });
    const p = container.querySelector("p");
    expect(p).not.toBeNull();
    expect(p!.textContent).toBe("Some subtitle");
  });

  it("does not render a paragraph element when subtitle is absent", () => {
    const { container } = render(PageHeader, { props: { title: "Only Title" } });
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders different title text correctly", () => {
    render(PageHeader, { props: { title: "Issues" } });
    expect(screen.getByText("Issues")).toBeInTheDocument();
  });

  it("renders without crashing when only title is provided", () => {
    expect(() =>
      render(PageHeader, { props: { title: "Test" } }),
    ).not.toThrow();
  });

  it("renders without crashing when title and subtitle are provided", () => {
    expect(() =>
      render(PageHeader, { props: { title: "Test", subtitle: "A subtitle" } }),
    ).not.toThrow();
  });

  it("h1 has tracking-tight class", () => {
    const { container } = render(PageHeader, { props: { title: "Test" } });
    const h1 = container.querySelector("h1");
    expect(h1!.className).toContain("tracking-tight");
  });

  it("subtitle paragraph has text-muted-foreground class", () => {
    const { container } = render(PageHeader, {
      props: { title: "Test", subtitle: "Sub" },
    });
    const p = container.querySelector("p");
    expect(p!.className).toContain("text-muted-foreground");
  });
});
