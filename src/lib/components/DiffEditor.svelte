<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type * as MonacoNs from 'monaco-editor';
	import { cn } from '../utils.js';
	import { loadMonaco, resolveMonacoTheme } from '../utils/monacoLoader.js';
	import Skeleton from './Skeleton.svelte';
	import type { CodeEditorTheme } from './CodeEditor.svelte';

	type Props = {
		/** Original (left) content. */
		original?: string;
		/** Modified (right) content. Bindable when not read-only. */
		modified?: string;
		/** Monaco language id. */
		language?: string;
		/** Theme mode. */
		theme?: CodeEditorTheme;
		/** Lock the right side. Defaults to true (most diff views are read-only). */
		readOnly?: boolean;
		/** Toggle inline vs side-by-side rendering. */
		inline?: boolean;
		/** Render whitespace differences. */
		renderWhitespace?: boolean;
		/** Hide unchanged regions to focus on actual changes. */
		hideUnchangedRegions?: boolean;
		/** CSS height. */
		height?: string;
		/** Container className. */
		class?: string;
		/** Called when modified content changes. */
		onchange?: (modified: string) => void;
		/** Aria label. */
		ariaLabel?: string;
	};

	let {
		original = '',
		modified = $bindable(''),
		language = 'plaintext',
		theme = 'auto',
		readOnly = true,
		inline = false,
		renderWhitespace = false,
		hideUnchangedRegions = true,
		height = '500px',
		class: className,
		onchange,
		ariaLabel,
	}: Props = $props();

	let container: HTMLDivElement;
	let diffEditor: MonacoNs.editor.IStandaloneDiffEditor | null = null;
	let originalModel: MonacoNs.editor.ITextModel | null = null;
	let modifiedModel: MonacoNs.editor.ITextModel | null = null;
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

			diffEditor = monaco.editor.createDiffEditor(container, {
				theme: resolveMonacoTheme(theme),
				readOnly,
				renderSideBySide: !inline,
				automaticLayout: true,
				fontSize: 13,
				fontFamily:
					'"JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
				scrollBeyondLastLine: false,
				renderWhitespace: renderWhitespace ? 'all' : 'none',
				hideUnchangedRegions: { enabled: hideUnchangedRegions },
				ariaLabel: ariaLabel ?? `Diff editor (${language})`,
				originalEditable: false,
			});

			originalModel = monaco.editor.createModel(original ?? '', language);
			modifiedModel = monaco.editor.createModel(modified ?? '', language);
			diffEditor.setModel({ original: originalModel, modified: modifiedModel });

			modifiedModel.onDidChangeContent(() => {
				if (!modifiedModel || suppressNextChange) {
					suppressNextChange = false;
					return;
				}
				const next = modifiedModel.getValue();
				modified = next;
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
		diffEditor?.dispose();
		originalModel?.dispose();
		modifiedModel?.dispose();
		diffEditor = null;
		originalModel = null;
		modifiedModel = null;
	});

	$effect(() => {
		if (!originalModel) return;
		if (originalModel.getValue() !== original) {
			originalModel.setValue(original ?? '');
		}
	});

	$effect(() => {
		if (!modifiedModel) return;
		if (modifiedModel.getValue() !== modified) {
			suppressNextChange = true;
			modifiedModel.setValue(modified ?? '');
		}
	});

	$effect(() => {
		if (!monacoRef || !originalModel || !modifiedModel) return;
		if (originalModel.getLanguageId() !== language) {
			monacoRef.editor.setModelLanguage(originalModel, language);
		}
		if (modifiedModel.getLanguageId() !== language) {
			monacoRef.editor.setModelLanguage(modifiedModel, language);
		}
	});

	$effect(() => {
		if (!monacoRef) return;
		monacoRef.editor.setTheme(resolveMonacoTheme(theme));
	});

	$effect(() => {
		diffEditor?.updateOptions({
			readOnly,
			renderSideBySide: !inline,
			renderWhitespace: renderWhitespace ? 'all' : 'none',
			hideUnchangedRegions: { enabled: hideUnchangedRegions },
		});
	});
</script>

<div
	bind:this={container}
	data-slot="diff-editor"
	class={cn('border-border bg-background relative overflow-hidden rounded-lg border', className)}
	style="height: {height};"
	role="group"
	aria-label={ariaLabel ?? `Diff editor (${language})`}
>
	{#if !ready}
		<div class="absolute inset-0 p-2">
			<Skeleton class="h-full w-full" />
		</div>
	{/if}
</div>
