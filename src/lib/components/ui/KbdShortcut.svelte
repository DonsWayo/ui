<script lang="ts">
	let {
		keys,
		size = 'sm',
	}: {
		keys: string[];
		size?: 'xs' | 'sm';
	} = $props();

	const sizeClass = $derived(size === 'xs' ? 'px-0.5 py-px text-[9px]' : 'px-1 py-0.5 text-[10px]');
</script>

<span class="inline-flex items-center gap-0.5">
	{#each keys as key, i (key)}
		{#if i > 0}
			<span class="text-muted-foreground/30 text-[10px]">+</span>
		{/if}
		<kbd class="bg-muted rounded {sizeClass} text-muted-foreground font-mono">{key}</kbd>
	{/each}
</span>
