<script lang="ts">
	import { Copy, Check } from '@lucide/svelte';
	import { cn } from '$lib/utils/cn.js';

	let {
		text,
		size = 16,
		class: className,
	}: {
		text: string;
		size?: number;
		class?: string;
	} = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			copied = false;
			timer = null;
		}, 2000);
	}
</script>

<button
	type="button"
	onclick={copy}
	aria-label={copied ? 'Copied' : 'Copy to clipboard'}
	class={cn(
		'inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
		className,
	)}
>
	{#if copied}
		<Check {size} class="text-success" />
	{:else}
		<Copy {size} />
	{/if}
</button>
