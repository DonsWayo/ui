<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	let {
		collapsed = $bindable(false),
		brand,
		nav,
		footer,
	}: {
		collapsed?: boolean;
		brand?: Snippet<[{ collapsed: boolean }]>;
		nav?: Snippet<[{ collapsed: boolean }]>;
		footer?: Snippet<[{ collapsed: boolean }]>;
	} = $props();
</script>

<aside
	class="flex flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200"
	style:width={collapsed ? '56px' : '224px'}
	style:min-width={collapsed ? '56px' : '224px'}
>
	<div class="flex h-12 shrink-0 items-center border-b border-sidebar-border px-3">
		<div class="flex-1 overflow-hidden">
			{#if brand}{@render brand({ collapsed })}{/if}
		</div>
		<button
			class="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
			onclick={() => (collapsed = !collapsed)}
			aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
		>
			{#if collapsed}<ChevronRight size={14} />{:else}<ChevronLeft size={14} />{/if}
		</button>
	</div>

	<nav class="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
		{#if nav}{@render nav({ collapsed })}{/if}
	</nav>

	{#if footer}
		<div class="border-t border-sidebar-border p-2">
			{@render footer({ collapsed })}
		</div>
	{/if}
</aside>
