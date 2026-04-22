import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Table from "./Table.svelte";
import TableHeader from "./TableHeader.svelte";
import TableBody from "./TableBody.svelte";
import TableRow from "./TableRow.svelte";
import TableHead from "./TableHead.svelte";
import TableCell from "./TableCell.svelte";
import TableCaption from "./TableCaption.svelte";

describe("Table", () => {
  it("renders a div wrapper with overflow-auto", () => {
    const { container } = render(Table, {
      props: { children: (() => {}) as any },
    });
    const wrapper = container.querySelector("div");
    expect(wrapper).not.toBeNull();
    expect(wrapper!.className).toContain("overflow-auto");
  });

  it("renders a table element inside the wrapper", () => {
    const { container } = render(Table, {
      props: { children: (() => {}) as any },
    });
    const table = container.querySelector("table");
    expect(table).not.toBeNull();
  });

  it("table element has caption-bottom class", () => {
    const { container } = render(Table, {
      props: { children: (() => {}) as any },
    });
    const table = container.querySelector("table");
    expect(table!.className).toContain("caption-bottom");
  });

  it("table element has text-sm class", () => {
    const { container } = render(Table, {
      props: { children: (() => {}) as any },
    });
    const table = container.querySelector("table");
    expect(table!.className).toContain("text-sm");
  });

  it("wrapper has w-full class", () => {
    const { container } = render(Table, {
      props: { children: (() => {}) as any },
    });
    const wrapper = container.querySelector("div");
    expect(wrapper!.className).toContain("w-full");
  });

  it("accepts an extra class on the wrapper", () => {
    const { container } = render(Table, {
      props: { children: (() => {}) as any, class: "my-table-wrapper" },
    });
    const wrapper = container.querySelector("div");
    expect(wrapper!.className).toContain("my-table-wrapper");
  });

  it("does not lose default classes when class prop is provided", () => {
    const { container } = render(Table, {
      props: { children: (() => {}) as any, class: "extra" },
    });
    const wrapper = container.querySelector("div");
    expect(wrapper!.className).toContain("overflow-auto");
    expect(wrapper!.className).toContain("extra");
  });
});

describe("TableHeader", () => {
  it("renders a thead element", () => {
    const { container } = render(TableHeader, {
      props: { children: (() => {}) as any },
    });
    expect(container.querySelector("thead")).not.toBeNull();
  });

  it("thead has [&_tr]:border-b class", () => {
    const { container } = render(TableHeader, {
      props: { children: (() => {}) as any },
    });
    const thead = container.querySelector("thead");
    expect(thead!.className).toContain("[&_tr]:border-b");
  });

  it("thead has [&_tr]:border-border class", () => {
    const { container } = render(TableHeader, {
      props: { children: (() => {}) as any },
    });
    const thead = container.querySelector("thead");
    expect(thead!.className).toContain("[&_tr]:border-border");
  });

  it("accepts an extra class", () => {
    const { container } = render(TableHeader, {
      props: { children: (() => {}) as any, class: "my-header" },
    });
    const thead = container.querySelector("thead");
    expect(thead!.className).toContain("my-header");
  });
});

describe("TableBody", () => {
  it("renders a tbody element", () => {
    const { container } = render(TableBody, {
      props: { children: (() => {}) as any },
    });
    expect(container.querySelector("tbody")).not.toBeNull();
  });

  it("tbody has [&_tr:last-child]:border-0 class", () => {
    const { container } = render(TableBody, {
      props: { children: (() => {}) as any },
    });
    const tbody = container.querySelector("tbody");
    expect(tbody!.className).toContain("[&_tr:last-child]:border-0");
  });

  it("accepts an extra class", () => {
    const { container } = render(TableBody, {
      props: { children: (() => {}) as any, class: "my-body" },
    });
    const tbody = container.querySelector("tbody");
    expect(tbody!.className).toContain("my-body");
  });
});

describe("TableRow", () => {
  it("renders a tr element", () => {
    const { container } = render(TableRow, {
      props: { children: (() => {}) as any },
    });
    expect(container.querySelector("tr")).not.toBeNull();
  });

  it("tr has border-b class", () => {
    const { container } = render(TableRow, {
      props: { children: (() => {}) as any },
    });
    const tr = container.querySelector("tr");
    expect(tr!.className).toContain("border-b");
  });

  it("tr has hover:bg-accent/50 class", () => {
    const { container } = render(TableRow, {
      props: { children: (() => {}) as any },
    });
    const tr = container.querySelector("tr");
    expect(tr!.className).toContain("hover:bg-accent/50");
  });

  it("tr has transition-colors class", () => {
    const { container } = render(TableRow, {
      props: { children: (() => {}) as any },
    });
    const tr = container.querySelector("tr");
    expect(tr!.className).toContain("transition-colors");
  });

  it("accepts an extra class", () => {
    const { container } = render(TableRow, {
      props: { children: (() => {}) as any, class: "bg-muted/20" },
    });
    const tr = container.querySelector("tr");
    expect(tr!.className).toContain("bg-muted/20");
  });

  it("does not lose base classes when extra class is added", () => {
    const { container } = render(TableRow, {
      props: { children: (() => {}) as any, class: "extra" },
    });
    const tr = container.querySelector("tr");
    expect(tr!.className).toContain("border-b");
    expect(tr!.className).toContain("extra");
  });
});

describe("TableHead", () => {
  it("renders a th element", () => {
    const { container } = render(TableHead, {
      props: { children: (() => {}) as any },
    });
    expect(container.querySelector("th")).not.toBeNull();
  });

  it("th has h-9 class", () => {
    const { container } = render(TableHead, {
      props: { children: (() => {}) as any },
    });
    const th = container.querySelector("th");
    expect(th!.className).toContain("h-9");
  });

  it("th has text-left class", () => {
    const { container } = render(TableHead, {
      props: { children: (() => {}) as any },
    });
    const th = container.querySelector("th");
    expect(th!.className).toContain("text-left");
  });

  it("th has uppercase class", () => {
    const { container } = render(TableHead, {
      props: { children: (() => {}) as any },
    });
    const th = container.querySelector("th");
    expect(th!.className).toContain("uppercase");
  });

  it("th has text-muted-foreground class", () => {
    const { container } = render(TableHead, {
      props: { children: (() => {}) as any },
    });
    const th = container.querySelector("th");
    expect(th!.className).toContain("text-muted-foreground");
  });

  it("accepts an extra class", () => {
    const { container } = render(TableHead, {
      props: { children: (() => {}) as any, class: "w-1/4" },
    });
    const th = container.querySelector("th");
    expect(th!.className).toContain("w-1/4");
  });
});

describe("TableCell", () => {
  it("renders a td element", () => {
    const { container } = render(TableCell, {
      props: { children: (() => {}) as any },
    });
    expect(container.querySelector("td")).not.toBeNull();
  });

  it("td has px-4 class", () => {
    const { container } = render(TableCell, {
      props: { children: (() => {}) as any },
    });
    const td = container.querySelector("td");
    expect(td!.className).toContain("px-4");
  });

  it("td has py-2.5 class", () => {
    const { container } = render(TableCell, {
      props: { children: (() => {}) as any },
    });
    const td = container.querySelector("td");
    expect(td!.className).toContain("py-2.5");
  });

  it("td has align-middle class", () => {
    const { container } = render(TableCell, {
      props: { children: (() => {}) as any },
    });
    const td = container.querySelector("td");
    expect(td!.className).toContain("align-middle");
  });

  it("accepts an extra class", () => {
    const { container } = render(TableCell, {
      props: { children: (() => {}) as any, class: "font-mono" },
    });
    const td = container.querySelector("td");
    expect(td!.className).toContain("font-mono");
  });

  it("does not lose base classes when extra class is added", () => {
    const { container } = render(TableCell, {
      props: { children: (() => {}) as any, class: "extra" },
    });
    const td = container.querySelector("td");
    expect(td!.className).toContain("px-4");
    expect(td!.className).toContain("extra");
  });
});

describe("TableCaption", () => {
  it("renders a caption element", () => {
    const { container } = render(TableCaption, {
      props: { children: (() => {}) as any },
    });
    expect(container.querySelector("caption")).not.toBeNull();
  });

  it("caption has mt-4 class", () => {
    const { container } = render(TableCaption, {
      props: { children: (() => {}) as any },
    });
    const caption = container.querySelector("caption");
    expect(caption!.className).toContain("mt-4");
  });

  it("caption has text-xs class", () => {
    const { container } = render(TableCaption, {
      props: { children: (() => {}) as any },
    });
    const caption = container.querySelector("caption");
    expect(caption!.className).toContain("text-xs");
  });

  it("caption has text-muted-foreground class", () => {
    const { container } = render(TableCaption, {
      props: { children: (() => {}) as any },
    });
    const caption = container.querySelector("caption");
    expect(caption!.className).toContain("text-muted-foreground");
  });

  it("accepts an extra class", () => {
    const { container } = render(TableCaption, {
      props: { children: (() => {}) as any, class: "italic" },
    });
    const caption = container.querySelector("caption");
    expect(caption!.className).toContain("italic");
  });
});
