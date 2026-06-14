/**
 * `@nucel/ui/editor` — the Tiptap-powered rich text editor, split out of the
 * main barrel.
 *
 * Why a separate entry: `RichEditor.svelte` statically imports `@tiptap/core`,
 * `@tiptap/starter-kit` and ~19 extensions (plus `tippy.js` via the mention
 * suggestion) at module scope. Re-exporting it from the main `@nucel/ui` barrel
 * dragged the entire Tiptap/ProseMirror graph (~400-700KB) into EVERY
 * consumer's dep-optimizer + bundle — even apps that never render an editor.
 * Same failure class as Monaco, but silent (it bloats instead of erroring).
 *
 * Import RichEditor from `@nucel/ui/editor` when you need it.
 */
export { default as RichEditor } from './components/ui/editor/RichEditor.svelte';
