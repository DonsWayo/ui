<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { cn } from '$lib/utils/cn.js';

	let {
		page,
		totalPages,
		onchange,
		class: className,
	}: {
		page: number;
		totalPages: number;
		onchange?: (page: number) => void;
		class?: string;
	} = $props();

	function go(p: number) {
		if (p < 1 || p > totalPages) return;
		onchange?.(p);
	}

	const visiblePages = $derived.by(() => {
		const pages: (number | '...')[] = [];
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			pages.push(1);
			if (page > 3) pages.push('...');
			for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
				pages.push(i);
			}
			if (page < totalPages - 2) pages.push('...');
			pages.push(totalPages);
		}
		return pages;
	});
</script>

<nav aria-label="Pagination" class={cn('flex items-center gap-1', className)}>
	<button
		type="button"
		onclick={() => go(page - 1)}
		disabled={page <= 1}
		aria-label="Previous page"
		class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
	>
		<ChevronLeft size={15} />
	</button>

	{#each visiblePages as p, i (i)}
		{#if p === '...'}
			<span class="flex h-8 w-8 items-center justify-center text-[13px] text-muted-foreground">
				…
			</span>
		{:else}
			<button
				type="button"
				onclick={() => go(p)}
				aria-label="Page {p}"
				aria-current={p === page ? 'page' : undefined}
				class={cn(
					'inline-flex h-8 w-8 items-center justify-center rounded-md border text-[13px] font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
					p === page
						? 'border-border bg-primary text-primary-foreground hover:bg-primary/90'
						: 'border-transparent text-foreground',
				)}
			>
				{p}
			</button>
		{/if}
	{/each}

	<button
		type="button"
		onclick={() => go(page + 1)}
		disabled={page >= totalPages}
		aria-label="Next page"
		class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
	>
		<ChevronRight size={15} />
	</button>
</nav>
