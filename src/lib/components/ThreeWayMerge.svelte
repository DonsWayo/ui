<script lang="ts">
	import { cn } from '../utils.js';
	import CodeEditor from './CodeEditor.svelte';
	import type { CodeEditorTheme } from './CodeEditor.svelte';

	type Props = {
		/** Common ancestor / merge base content. */
		base?: string;
		/** "Ours" side (current branch). */
		ours?: string;
		/** "Theirs" side (incoming branch). */
		theirs?: string;
		/** Resolved/merged content. Bindable — consumer reads this back. */
		merged?: string;
		/** Optional labels for each pane. */
		baseLabel?: string;
		oursLabel?: string;
		theirsLabel?: string;
		mergedLabel?: string;
		/** Monaco language id. */
		language?: string;
		/** Theme mode. */
		theme?: CodeEditorTheme;
		/** Height per editor pane. */
		paneHeight?: string;
		/** Container className. */
		class?: string;
		/** Called when merged content changes. */
		onchange?: (merged: string) => void;
	};

	let {
		base = '',
		ours = '',
		theirs = '',
		merged = $bindable(''),
		baseLabel = 'Base',
		oursLabel = 'Ours',
		theirsLabel = 'Theirs',
		mergedLabel = 'Merged result',
		language = 'plaintext',
		theme = 'auto',
		paneHeight = '320px',
		class: className,
		onchange,
	}: Props = $props();

	function acceptOurs() {
		merged = ours;
		onchange?.(merged);
	}

	function acceptTheirs() {
		merged = theirs;
		onchange?.(merged);
	}

	function acceptBase() {
		merged = base;
		onchange?.(merged);
	}

	function acceptCombined() {
		// Crude but useful starting point: concatenate ours then theirs with
		// a marker between. Consumers wanting a smarter merge should run a
		// proper 3-way text-merge on the backend and feed `merged` directly.
		merged = `${ours}\n\n// ===== incoming =====\n${theirs}`;
		onchange?.(merged);
	}

	function handleMergedChange(next: string) {
		onchange?.(next);
	}
</script>

<div
	data-slot="three-way-merge"
	class={cn('flex w-full flex-col gap-3', className)}
	role="region"
	aria-label="Three-way merge"
>
	<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
		<div class="flex flex-col gap-1.5">
			<div class="text-muted-foreground flex items-center justify-between text-xs font-medium">
				<span>{baseLabel}</span>
				<button
					type="button"
					class="hover:text-foreground rounded px-1.5 py-0.5 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					onclick={acceptBase}
				>
					Accept base
				</button>
			</div>
			<CodeEditor
				value={base}
				{language}
				{theme}
				readOnly
				height={paneHeight}
				ariaLabel={`${baseLabel} (read-only)`}
			/>
		</div>

		<div class="flex flex-col gap-1.5">
			<div class="text-muted-foreground flex items-center justify-between text-xs font-medium">
				<span class="text-success">{oursLabel}</span>
				<button
					type="button"
					class="hover:text-foreground rounded px-1.5 py-0.5 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					onclick={acceptOurs}
				>
					Accept ours
				</button>
			</div>
			<CodeEditor
				value={ours}
				{language}
				{theme}
				readOnly
				height={paneHeight}
				ariaLabel={`${oursLabel} (read-only)`}
			/>
		</div>

		<div class="flex flex-col gap-1.5">
			<div class="text-muted-foreground flex items-center justify-between text-xs font-medium">
				<span class="text-warning">{theirsLabel}</span>
				<button
					type="button"
					class="hover:text-foreground rounded px-1.5 py-0.5 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					onclick={acceptTheirs}
				>
					Accept theirs
				</button>
			</div>
			<CodeEditor
				value={theirs}
				{language}
				{theme}
				readOnly
				height={paneHeight}
				ariaLabel={`${theirsLabel} (read-only)`}
			/>
		</div>
	</div>

	<div class="flex flex-col gap-1.5">
		<div class="flex items-center justify-between gap-2">
			<span class="text-foreground text-sm font-medium">{mergedLabel}</span>
			<div class="flex items-center gap-2">
				<button
					type="button"
					class="hover:bg-accent rounded-md border border-border px-2 py-1 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					onclick={acceptCombined}
					title="Concatenate ours + theirs as a starting point for manual edit"
				>
					Combine
				</button>
				<button
					type="button"
					class="hover:bg-accent rounded-md border border-border px-2 py-1 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					onclick={acceptOurs}
				>
					Use ours
				</button>
				<button
					type="button"
					class="hover:bg-accent rounded-md border border-border px-2 py-1 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					onclick={acceptTheirs}
				>
					Use theirs
				</button>
			</div>
		</div>
		<CodeEditor
			bind:value={merged}
			{language}
			{theme}
			height={paneHeight}
			placeholder="Edit the merged result here…"
			ariaLabel={mergedLabel}
			onchange={handleMergedChange}
		/>
	</div>
</div>
