<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		subtitle,
		actions,
	}: {
		title: string;
		subtitle?: string;
		actions?: Snippet;
	} = $props();
</script>

<div class="mb-5 flex items-start justify-between gap-4">
	<div class="min-w-0">
		<h1 class="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
		{#if subtitle}
			<p class="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
		{/if}
	</div>
	{#if actions}
		<div class="flex shrink-0 items-center gap-2">{@render actions()}</div>
	{/if}
</div>
