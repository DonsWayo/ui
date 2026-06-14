<script lang="ts">
	// Outer kanban container: a horizontally-scrollable row of columns plus
	// an optional trailing slot for an "Add column" affordance.
	//
	// Composition: caller puts <KanbanColumn> elements (or anything else)
	// into the default slot. DnD wiring stays out of this primitive — the
	// consumer attaches dndzone to whichever container they want sortable.

	import type { Snippet } from 'svelte';

	let {
		children,
		trailing,
	}: {
		children: Snippet;
		trailing?: Snippet;
	} = $props();
</script>

<div class="flex items-start gap-3 overflow-x-auto pb-4">
	{@render children()}
	{#if trailing}
		<div class="w-72 flex-shrink-0">
			{@render trailing()}
		</div>
	{/if}
</div>
