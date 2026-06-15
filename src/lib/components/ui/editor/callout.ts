import { mergeAttributes, Node } from '@tiptap/core';

/**
 * Callout — Confluence-style info/warning/tip/danger panel.
 *
 * Serializes as `<div data-callout="info"><p>…</p></div>` so rendered wiki
 * pages can style it with plain CSS (`[data-callout]`), no NodeView needed.
 * Styling for BOTH the editor and rendered pages lives in
 * RichEditor.svelte's :global styles and the app's prose styles.
 */

export type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      /** Wrap the selection in a callout (or change an existing one's type). */
      setCallout: (attrs?: { type: CalloutType }) => ReturnType;
      /** Lift the content back out of the callout. */
      unsetCallout: () => ReturnType;
    };
  }
}

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'info' as CalloutType,
        parseHTML: (element) => element.getAttribute('data-callout') ?? 'info',
        renderHTML: (attributes) => ({ 'data-callout': attributes.type }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setCallout:
        (attrs = { type: 'info' as CalloutType }) =>
        ({ commands, editor }) => {
          if (editor.isActive(this.name)) {
            return commands.updateAttributes(this.name, attrs);
          }
          return commands.wrapIn(this.name, attrs);
        },
      unsetCallout:
        () =>
        ({ commands }) =>
          commands.lift(this.name),
    };
  },

  addKeyboardShortcuts() {
    return {
      // Backspace at the very start of an empty callout lifts out of it
      // instead of deleting the previous node — matches blockquote feel.
      'Mod-Shift-9': () => this.editor.commands.setCallout({ type: 'info' }),
    };
  },
});
