import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import FormField from "./FormField.svelte";

describe("FormField", () => {
  it("renders children (wrapper div is present)", () => {
    const { container } = render(FormField, { props: {} });
    expect(container.querySelector("div")).not.toBeNull();
  });

  it("renders label when label prop is given", () => {
    render(FormField, { props: { label: "Username" } });
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("does NOT render a label element when label prop is absent", () => {
    const { container } = render(FormField, { props: {} });
    expect(container.querySelector("label")).toBeNull();
  });

  it("renders error text when error prop is given", () => {
    render(FormField, { props: { error: "This field is required" } });
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders hint text when hint prop is given and error is absent", () => {
    render(FormField, { props: { hint: "Must be between 3–20 characters" } });
    expect(screen.getByText("Must be between 3–20 characters")).toBeInTheDocument();
  });

  it("does NOT render hint when error is also given", () => {
    render(FormField, {
      props: {
        hint: "Some hint",
        error: "Some error",
      },
    });
    expect(screen.queryByText("Some hint")).toBeNull();
    expect(screen.getByText("Some error")).toBeInTheDocument();
  });
});
