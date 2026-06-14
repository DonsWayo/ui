<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn.js';

	let {
		children,
		class: className,
		...rest
	}: { children?: Snippet; class?: string; [key: string]: unknown } = $props();
</script>

<th
	class={cn(
		'h-9 px-4 text-left align-middle text-[10px] font-semibold uppercase tracking-wide text-muted-foreground [&:has([role=checkbox])]:pr-0',
		className,
	)}
	{...rest}
>
	{@render children?.()}
</th>
