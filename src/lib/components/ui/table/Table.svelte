<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn.js';

	let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn('w-full overflow-auto', className)}>
	<table class="w-full caption-bottom text-sm">
		{@render children()}
	</table>
</div>
