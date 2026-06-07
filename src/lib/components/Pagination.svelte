<script lang="ts">
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/svelte';
	import { cn } from '../utils.js';

	let {
		total,
		page = $bindable(1),
		pageSize = 10,
		siblingCount = 1,
		class: className,
		ariaLabel = 'pagination',
	}: {
		total: number;
		page?: number;
		pageSize?: number;
		siblingCount?: number;
		class?: string;
		ariaLabel?: string;
	} = $props();

	const buttonBase =
		'inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 text-sm font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50';
	const navClass = `${buttonBase} hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50`;
	const pageClass = `${buttonBase} hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50`;
	const pageSelectedClass = `${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs`;
</script>

<PaginationPrimitive.Root
	count={total}
	perPage={pageSize}
	bind:page
	{siblingCount}
	aria-label={ariaLabel}
	data-slot="pagination"
	class={cn('flex items-center justify-center gap-1', className)}
>
	{#snippet children({ pages, currentPage })}
		<PaginationPrimitive.PrevButton class={navClass} aria-label="Previous page">
			<ChevronLeftIcon class="size-4" />
			<span class="hidden sm:inline">Prev</span>
		</PaginationPrimitive.PrevButton>
		{#each pages as p (p.key)}
			{#if p.type === 'ellipsis'}
				<span
					class="text-muted-foreground inline-flex h-9 min-w-9 items-center justify-center text-sm"
					aria-hidden="true">…</span
				>
			{:else}
				<PaginationPrimitive.Page
					page={p}
					class={p.value === currentPage ? pageSelectedClass : pageClass}
					aria-label={`Page ${p.value}`}
					aria-current={p.value === currentPage ? 'page' : undefined}
				>
					{p.value}
				</PaginationPrimitive.Page>
			{/if}
		{/each}
		<PaginationPrimitive.NextButton class={navClass} aria-label="Next page">
			<span class="hidden sm:inline">Next</span>
			<ChevronRightIcon class="size-4" />
		</PaginationPrimitive.NextButton>
	{/snippet}
</PaginationPrimitive.Root>
