import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/svelte";

afterEach(() => cleanup());

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// JSDOM does not implement scrollIntoView
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || function () {};

// Mock NumberFlow as a passthrough that renders the formatted value as text.
// Svelte 5 mounts components by calling fn(anchor, props) where anchor is a
// Comment node; the component inserts its DOM before that anchor.
vi.mock("@number-flow/svelte", () => ({
  default: (anchor: Node, props: Record<string, unknown>) => {
    const value = (props?.value ?? 0) as number;
    const format = (props?.format ?? {}) as Intl.NumberFormatOptions;
    const locales = (props?.locales as string | string[] | undefined) ?? undefined;
    const text = new Intl.NumberFormat(locales, format).format(value);
    const node = document.createTextNode(text);
    if (anchor.parentNode) {
      anchor.parentNode.insertBefore(node, anchor);
    }
    return { $destroy: () => node.parentNode?.removeChild(node) };
  },
}));
