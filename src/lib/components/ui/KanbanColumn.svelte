<script lang="ts">
	// A single kanban column: header (title + count + optional delete),
	// a body snippet for cards (where the caller attaches a dndzone), and
	// a footer snippet for the per-column "Add card" affordance.

	import { X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	let {
		name,
		count,
		onDelete,
		body,
		footer,
	}: {
		name: string;
		count: number;
		/** When provided, renders a small delete-X in the header. */
		onDelete?: () => void;
		/** Sortable body — caller drops their dndzone-decorated container here. */
		body: Snippet;
		/** Optional footer (e.g. "+ Add card"). */
		footer?: Snippet;
	} = $props();
</script>

<div class="w-72 flex-shrink-0 rounded-lg bg-muted/50 p-3">
	<div class="mb-2 flex items-center justify-between">
		<h3 class="text-sm font-semibold">{name}</h3>
		<div class="flex items-center gap-1">
			<span class="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
				{count}
			</span>
			{#if onDelete}
				<button
					type="button"
					aria-label={`Delete column ${name}`}
					class="rounded p-0.5 text-muted-foreground hover:bg-background hover:text-destructive"
					onclick={onDelete}
				>
					<X class="h-3 w-3" />
				</button>
			{/if}
		</div>
	</div>

	{@render body()}

	{#if footer}
		{@render footer()}
	{/if}
</div>
