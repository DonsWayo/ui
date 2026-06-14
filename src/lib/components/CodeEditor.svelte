<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type * as MonacoNs from 'monaco-editor';
	import { cn } from '../utils.js';
	import { loadMonaco, resolveMonacoTheme } from '../utils/monacoLoader.js';
	import Skeleton from './Skeleton.svelte';

	export type CodeEditorTheme = 'light' | 'dark' | 'auto';

	type Props = {
		/** Editor content (bindable). */
		value?: string;
		/** Monaco language id, e.g. "typescript", "yaml", "markdown". */
		language?: string;
		/** Theme mode. "auto" follows the .dark class on <html>. */
		theme?: CodeEditorTheme;
		/** Read-only mode (disables editing but keeps copy/select). */
		readOnly?: boolean;
		/** CSS height for the editor container. */
		height?: string;
		/** Show Monaco's minimap. Off by default to keep things calm. */
		minimap?: boolean;
		/** Show line numbers. */
		lineNumbers?: boolean;
		/** Soft word wrap. */
		wordWrap?: boolean;
		/** Tab size (spaces). */
		tabSize?: number;
		/** Container className. */
		class?: string;
		/** Optional placeholder shown when value is empty. */
		placeholder?: string;
		/** Called on every value change. */
		onchange?: (value: string) => void;
		/** Aria label for the editor (accessibility). */
		ariaLabel?: string;
	};

	let {
		value = $bindable(''),
		language = 'plaintext',
		theme = 'auto',
		readOnly = false,
		height = '400px',
		minimap = false,
		lineNumbers = true,
		wordWrap = true,
		tabSize = 2,
		class: className,
		placeholder,
		onchange,
		ariaLabel,
	}: Props = $props();

	let container: HTMLDivElement;
	let editor: MonacoNs.editor.IStandaloneCodeEditor | null = null;
	let monacoRef: typeof MonacoNs | null = null;
	let ready = $state(false);
	let suppressNextChange = false;

	onMount(() => {
		const p = loadMonaco();
		if (!p) return;

		let disposed = false;

		p.then((monaco) => {
			if (disposed || !container) return;
			monacoRef = monaco;

			editor = monaco.editor.create(container, {
				value: value ?? '',
				language,
				theme: resolveMonacoTheme(theme),
				readOnly,
				minimap: { enabled: minimap },
				lineNumbers: lineNumbers ? 'on' : 'off',
				wordWrap: wordWrap ? 'on' : 'off',
				tabSize,
				automaticLayout: true,
				scrollBeyondLastLine: false,
				fontSize: 13,
				fontFamily:
					'"JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
				smoothScrolling: true,
				cursorBlinking: 'smooth',
				padding: { top: 12, bottom: 12 },
				renderLineHighlight: 'all',
				ariaLabel: ariaLabel ?? `Code editor (${language})`,
			});

			editor.onDidChangeModelContent(() => {
				if (!editor || suppressNextChange) {
					suppressNextChange = false;
					return;
				}
				const next = editor.getValue();
				value = next;
				onchange?.(next);
			});

			ready = true;
		}).catch((err) => {
			console.error('[@nucel/ui] Monaco failed to load', err);
		});

		return () => {
			disposed = true;
		};
	});

	onDestroy(() => {
		editor?.dispose();
		editor = null;
	});

	// React to prop changes after mount.
	$effect(() => {
		if (!editor) return;
		const current = editor.getValue();
		if (value !== current) {
			suppressNextChange = true;
			editor.setValue(value ?? '');
		}
	});

	$effect(() => {
		if (!editor || !monacoRef) return;
		const model = editor.getModel();
		if (model && model.getLanguageId() !== language) {
			monacoRef.editor.setModelLanguage(model, language);
		}
	});

	$effect(() => {
		if (!monacoRef) return;
		monacoRef.editor.setTheme(resolveMonacoTheme(theme));
	});

	$effect(() => {
		editor?.updateOptions({
			readOnly,
			minimap: { enabled: minimap },
			lineNumbers: lineNumbers ? 'on' : 'off',
			wordWrap: wordWrap ? 'on' : 'off',
			tabSize,
		});
	});
</script>

<div
	bind:this={container}
	data-slot="code-editor"
	class={cn('border-border bg-background relative overflow-hidden rounded-lg border', className)}
	style="height: {height};"
	role="group"
	aria-label={ariaLabel ?? `Code editor (${language})`}
>
	{#if !ready}
		<div class="absolute inset-0 p-2">
			<Skeleton class="h-full w-full" />
		</div>
	{/if}
	{#if ready && placeholder && (!value || value.length === 0)}
		<div
			class="text-muted-foreground pointer-events-none absolute left-14 top-3 font-mono text-[13px] opacity-60"
		>
			{placeholder}
		</div>
	{/if}
</div>
