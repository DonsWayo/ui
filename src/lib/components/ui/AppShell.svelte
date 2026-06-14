<script lang="ts">
	import type { Snippet } from 'svelte';
	let { sidebar, header, children }: { sidebar?: Snippet; header?: Snippet; children?: Snippet } =
		$props();
</script>

<div class="flex h-screen overflow-hidden bg-background">
	{#if sidebar}{@render sidebar()}{/if}
	<div class="flex flex-1 flex-col overflow-hidden">
		{#if header}<header
				class="flex h-12 shrink-0 items-center border-b border-border bg-background px-4"
			>
				{@render header()}
			</header>{/if}
		<main class="flex-1 overflow-y-auto p-6">
			{@render children?.()}
		</main>
	</div>
</div>
