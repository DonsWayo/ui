<script lang="ts">
	import { Search, X } from '@lucide/svelte';
	import { cn } from '$lib/utils/cn.js';

	type Filter = {
		key: string;
		label: string;
		value: string;
	};

	let {
		value = '',
		filters = [],
		placeholder = 'Search…',
		onchange,
		onremove,
		class: className,
	}: {
		value?: string;
		filters?: Filter[];
		placeholder?: string;
		onchange?: (value: string) => void;
		onremove?: (filter: Filter) => void;
		class?: string;
	} = $props();

	function handleInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		onchange?.(target.value);
	}
</script>

<div class={cn('flex flex-wrap items-center gap-2', className)}>
	<!-- search input -->
	<div class="relative flex min-w-[200px] items-center">
		<Search size={14} class="absolute left-2.5 text-muted-foreground" />
		<input
			type="search"
			{placeholder}
			{value}
			oninput={handleInput}
			class="h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		/>
	</div>

	<!-- filter chips -->
	{#each filters as filter (filter.key)}
		<span
			class="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-0.5 text-[12px] font-medium text-foreground"
		>
			<span class="text-muted-foreground">{filter.label}:</span>
			<span>{filter.value}</span>
			<button
				type="button"
				onclick={() => onremove?.(filter)}
				aria-label="Remove {filter.label} filter"
				class="ml-0.5 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				<X size={11} />
			</button>
		</span>
	{/each}
</div>
