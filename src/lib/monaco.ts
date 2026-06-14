/**
 * `@nucel/ui/monaco` — Monaco-powered editor surface, split out of the main
 * barrel.
 *
 * Why a separate entry: `monacoLoader` does `import('monaco-editor/esm/.../
 * *.worker?worker')`. Even though those are *dynamic* (lazy at runtime), a
 * bundler's dep-optimizer scans them statically, and the `?worker` query trips
 * Vite 8's rolldown pre-bundler with `UNLOADABLE_DEPENDENCY`. Re-exporting the
 * loader from the main `@nucel/ui` barrel dragged monaco into *every*
 * consumer's optimize pass — even apps that never render an editor.
 *
 * Keeping these exports here means `@nucel/ui` (the main entry) is monaco-free
 * and pre-bundles cleanly; only code that actually imports `@nucel/ui/monaco`
 * pulls in the editor + its workers.
 */
export { default as CodeEditor } from './components/CodeEditor.svelte';
export type { CodeEditorTheme } from './components/CodeEditor.svelte';
export { default as DiffEditor } from './components/DiffEditor.svelte';
export { default as ThreeWayMerge } from './components/ThreeWayMerge.svelte';
export { loadMonaco, resolveMonacoTheme } from './utils/monacoLoader.js';
