import { Extension, type Editor, type Range } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import tippy, { type Instance, type Props as TippyProps } from 'tippy.js';

/**
 * SlashCommands — Notion/Confluence-style block menu.
 *
 * Typing `/` opens a filterable list of block types; picking one replaces
 * the `/query` text with the chosen block. Used by RichEditor's `document`
 * mode (the wiki editor). Styles live in RichEditor.svelte under the
 * `.slash-menu` :global classes, mirroring the mention dropdown.
 */

type SlashItem = {
  title: string;
  hint: string;
  keywords: string[];
  /** Inline SVG (16×16 viewBox 24) — kept as a string so the menu can be
   *  plain DOM like the mention dropdown (no Svelte mount per keystroke). */
  icon: string;
  run: (editor: Editor, range: Range) => void;
};

const ICON = {
  text: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7V5h16v2"/><path d="M12 5v14"/><path d="M9 19h6"/></svg>',
  h1: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 12h8M4 6v12M12 6v12"/><path d="M17 12l3-2v8"/></svg>',
  h2: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 12h8M4 6v12M12 6v12"/><path d="M16 11a2 2 0 114 1.5L16 18h4.5"/></svg>',
  h3: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 12h8M4 6v12M12 6v12"/><path d="M16.5 10.5a2 2 0 113 2 2 2 0 11-3 2.5"/></svg>',
  bullet: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none"/></svg>',
  ordered: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
  task: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5" width="6" height="6" rx="1.5"/><path d="M5 8l1.5 1.5L9 6"/><line x1="13" y1="8" x2="21" y2="8"/><rect x="3" y="14" width="6" height="6" rx="1.5"/><line x1="13" y1="17" x2="21" y2="17"/></svg>',
  quote: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>',
  code: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  table: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
  divider: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><circle cx="12" cy="5" r="0.5" fill="currentColor"/><circle cx="12" cy="19" r="0.5" fill="currentColor"/></svg>',
  info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/></svg>',
  warning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 4.1l-7.5 13a2 2 0 001.7 3h15a2 2 0 001.7-3l-7.5-13a2 2 0 00-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16.5" r="0.5" fill="currentColor"/></svg>',
  tip: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1.2 2.1h4.6c.2-.9.6-1.6 1.2-2.1A6 6 0 0012 3z"/></svg>',
  danger: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
};

const ITEMS: SlashItem[] = [
  {
    title: 'Text',
    hint: 'Plain paragraph',
    keywords: ['text', 'paragraph', 'p', 'normal'],
    icon: ICON.text,
    run: (e, r) => e.chain().focus().deleteRange(r).setParagraph().run(),
  },
  {
    title: 'Heading 1',
    hint: 'Large section heading',
    keywords: ['h1', 'heading', 'title', '#'],
    icon: ICON.h1,
    run: (e, r) => e.chain().focus().deleteRange(r).setHeading({ level: 1 }).run(),
  },
  {
    title: 'Heading 2',
    hint: 'Medium section heading',
    keywords: ['h2', 'heading', 'subtitle', '##'],
    icon: ICON.h2,
    run: (e, r) => e.chain().focus().deleteRange(r).setHeading({ level: 2 }).run(),
  },
  {
    title: 'Heading 3',
    hint: 'Small section heading',
    keywords: ['h3', 'heading', '###'],
    icon: ICON.h3,
    run: (e, r) => e.chain().focus().deleteRange(r).setHeading({ level: 3 }).run(),
  },
  {
    title: 'Bullet list',
    hint: 'Unordered list',
    keywords: ['bullet', 'list', 'ul', '-'],
    icon: ICON.bullet,
    run: (e, r) => e.chain().focus().deleteRange(r).toggleBulletList().run(),
  },
  {
    title: 'Numbered list',
    hint: 'Ordered list',
    keywords: ['numbered', 'ordered', 'list', 'ol', '1.'],
    icon: ICON.ordered,
    run: (e, r) => e.chain().focus().deleteRange(r).toggleOrderedList().run(),
  },
  {
    title: 'Task list',
    hint: 'Checklist with checkboxes',
    keywords: ['task', 'todo', 'checklist', 'checkbox', '[]'],
    icon: ICON.task,
    run: (e, r) => e.chain().focus().deleteRange(r).toggleTaskList().run(),
  },
  {
    title: 'Quote',
    hint: 'Blockquote callout',
    keywords: ['quote', 'blockquote', 'citation', '>'],
    icon: ICON.quote,
    run: (e, r) => e.chain().focus().deleteRange(r).toggleBlockquote().run(),
  },
  {
    title: 'Code block',
    hint: 'Multi-line code snippet',
    keywords: ['code', 'codeblock', 'snippet', '```'],
    icon: ICON.code,
    run: (e, r) => e.chain().focus().deleteRange(r).toggleCodeBlock().run(),
  },
  {
    title: 'Table',
    hint: '3×3 table with header row',
    keywords: ['table', 'grid', 'rows', 'columns'],
    icon: ICON.table,
    run: (e, r) =>
      e.chain().focus().deleteRange(r).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    title: 'Divider',
    hint: 'Horizontal rule',
    keywords: ['divider', 'hr', 'rule', 'separator', '---'],
    icon: ICON.divider,
    run: (e, r) => e.chain().focus().deleteRange(r).setHorizontalRule().run(),
  },
  {
    title: 'Info callout',
    hint: 'Highlighted info panel',
    keywords: ['info', 'callout', 'note', 'panel'],
    icon: ICON.info,
    run: (e, r) => e.chain().focus().deleteRange(r).setCallout({ type: 'info' }).run(),
  },
  {
    title: 'Warning callout',
    hint: 'Highlighted warning panel',
    keywords: ['warning', 'callout', 'caution', 'panel'],
    icon: ICON.warning,
    run: (e, r) => e.chain().focus().deleteRange(r).setCallout({ type: 'warning' }).run(),
  },
  {
    title: 'Tip callout',
    hint: 'Highlighted tip panel',
    keywords: ['tip', 'callout', 'hint', 'success', 'panel'],
    icon: ICON.tip,
    run: (e, r) => e.chain().focus().deleteRange(r).setCallout({ type: 'tip' }).run(),
  },
  {
    title: 'Danger callout',
    hint: 'Highlighted danger panel',
    keywords: ['danger', 'callout', 'error', 'critical', 'panel'],
    icon: ICON.danger,
    run: (e, r) => e.chain().focus().deleteRange(r).setCallout({ type: 'danger' }).run(),
  },
];

function filterItems(query: string): SlashItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return ITEMS;
  return ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(q) || item.keywords.some((k) => k.startsWith(q))
  );
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function createMenu(props: { items: SlashItem[]; command: (item: SlashItem) => void }) {
  const el = document.createElement('div');
  el.className = 'slash-menu';
  let selectedIndex = 0;
  let items = props.items;
  let command = props.command;

  function render() {
    if (items.length === 0) {
      el.innerHTML = `<div class="slash-menu-empty">No matching blocks</div>`;
      return;
    }
    el.innerHTML = items
      .map(
        (item, i) => `
      <button type="button" class="slash-menu-item ${i === selectedIndex ? 'is-selected' : ''}" data-index="${i}">
        <span class="slash-menu-icon">${item.icon}</span>
        <span class="slash-menu-info">
          <span class="slash-menu-title">${escapeHtml(item.title)}</span>
          <span class="slash-menu-hint">${escapeHtml(item.hint)}</span>
        </span>
      </button>
    `
      )
      .join('');

    el.querySelectorAll('.slash-menu-item').forEach((btn) => {
      btn.addEventListener('mousedown', (ev) => {
        // mousedown (not click) so the editor selection survives.
        ev.preventDefault();
        const idx = parseInt((btn as HTMLElement).dataset.index ?? '0');
        const item = items[idx];
        if (item) command(item);
      });
    });
    el.querySelector('.is-selected')?.scrollIntoView({ block: 'nearest' });
  }

  function updateSelection(idx: number) {
    selectedIndex = ((idx % items.length) + items.length) % items.length;
    render();
  }

  render();

  return {
    el,
    update(newItems: SlashItem[], newCommand: (item: SlashItem) => void) {
      items = newItems;
      command = newCommand;
      selectedIndex = 0;
      render();
    },
    onKeyDown(key: string): boolean {
      if (items.length === 0) return false;
      if (key === 'ArrowUp') {
        updateSelection(selectedIndex - 1);
        return true;
      }
      if (key === 'ArrowDown') {
        updateSelection(selectedIndex + 1);
        return true;
      }
      if (key === 'Enter') {
        const item = items[selectedIndex];
        if (item) command(item);
        return true;
      }
      return false;
    },
  };
}

export const SlashCommands = Extension.create({
  name: 'slashCommands',

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        allowSpaces: false,
        startOfLine: false,
        command: ({ editor, range, props }: { editor: Editor; range: Range; props: SlashItem }) => {
          props.run(editor, range);
        },
        items: ({ query }: { query: string }) => filterItems(query),
        render: () => {
          let menu: ReturnType<typeof createMenu>;
          let popup: Instance<TippyProps>[];

          return {
            onStart(props: any) {
              menu = createMenu({ items: props.items, command: (item) => props.command(item) });
              if (!props.clientRect) return;
              popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: menu.el,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              }) as Instance<TippyProps>[];
            },
            onUpdate(props: any) {
              menu.update(props.items, (item) => props.command(item));
              if (props.clientRect && popup?.[0]) {
                popup[0].setProps({ getReferenceClientRect: props.clientRect });
              }
            },
            onKeyDown(props: any) {
              if (props.event.key === 'Escape') {
                popup?.[0]?.hide();
                return true;
              }
              return menu.onKeyDown(props.event.key);
            },
            onExit() {
              popup?.[0]?.destroy();
              menu.el.remove();
            },
          };
        },
      }),
    ];
  },
});
