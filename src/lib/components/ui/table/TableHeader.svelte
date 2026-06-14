<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn.js';

	let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<thead class={cn('[&_tr]:border-b [&_tr]:border-border', className)}>
	{@render children()}
</thead>
