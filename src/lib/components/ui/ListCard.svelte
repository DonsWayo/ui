<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
	{@render children()}
</div>
