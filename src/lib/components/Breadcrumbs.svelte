<script lang="ts">
	import { ChevronRightIcon } from '@lucide/svelte';
	import { cn } from '../utils.js';

	type Item = {
		label: string;
		href?: string;
	};

	let {
		items,
		separator,
		class: className,
		ariaLabel = 'breadcrumb',
	}: {
		items: Item[];
		separator?: string;
		class?: string;
		ariaLabel?: string;
	} = $props();
</script>

<nav data-slot="breadcrumbs" aria-label={ariaLabel} class={cn('w-full', className)}>
	<ol class="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
		{#each items as item, i (i)}
			{@const isLast = i === items.length - 1}
			<li class="inline-flex items-center gap-1.5">
				{#if isLast || !item.href}
					<span
						class={cn(
							isLast ? 'text-foreground font-medium' : 'text-muted-foreground',
						)}
						aria-current={isLast ? 'page' : undefined}
					>
						{item.label}
					</span>
				{:else}
					<a
						href={item.href}
						class="hover:text-foreground transition-colors"
					>
						{item.label}
					</a>
				{/if}
			</li>
			{#if !isLast}
				<li class="text-muted-foreground/60 inline-flex items-center" aria-hidden="true">
					{#if separator}
						<span>{separator}</span>
					{:else}
						<ChevronRightIcon class="size-3.5" />
					{/if}
				</li>
			{/if}
		{/each}
	</ol>
</nav>
