<script lang="ts">
	import { GitBranch } from '@lucide/svelte';

	let {
		name,
		size = 'sm',
	}: {
		name: string;
		size?: 'xs' | 'sm';
	} = $props();

	let sizeCls = $derived(size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5');
	let iconSize = $derived(size === 'xs' ? 'h-2.5 w-2.5' : 'h-3 w-3');
</script>

<span
	class="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background font-mono text-foreground/80 {sizeCls}"
>
	<GitBranch class={iconSize} />
	{name}
</span>
