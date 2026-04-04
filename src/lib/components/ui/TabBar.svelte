<script lang="ts">
	import type { Component } from 'svelte';

	type TabItem = {
		id: string;
		label: string;
		icon?: Component;
		count?: number;
		closable?: boolean;
	};

	let {
		items,
		selected,
		onselect,
		onclose,
		variant = 'underline',
		orientation = 'horizontal',
		size = 'sm',
		class: className = '',
	}: {
		items: TabItem[];
		selected: string;
		onselect: (id: string) => void;
		onclose?: (id: string) => void;
		variant?: 'underline' | 'pill' | 'fill';
		orientation?: 'horizontal' | 'vertical';
		size?: 'xs' | 'sm';
		class?: string;
	} = $props();

	const isVertical = $derived(orientation === 'vertical');

	const containerClass = $derived.by(() => {
		const base = isVertical ? 'flex flex-col gap-0.5' : 'flex items-center gap-0';
		return `${base} ${className}`;
	});

	const itemClass = $derived.by(() => {
		const sizeStyles = size === 'xs' ? 'text-[10px] px-2 py-1' : 'text-xs px-3 py-1.5';

		if (variant === 'pill') {
			return {
				base: `rounded-full font-medium transition-all duration-150 ${sizeStyles}`,
				active: 'bg-primary/15 text-primary font-medium',
				inactive: 'text-muted-foreground hover:text-foreground',
			};
		}

		if (variant === 'fill') {
			const fillSize = isVertical
				? `w-full text-xs px-2 py-1.5 rounded-md`
				: `${sizeStyles} rounded`;
			return {
				base: `font-medium transition-colors ${fillSize}`,
				active: 'bg-accent text-foreground',
				inactive: 'text-muted-foreground hover:text-foreground',
			};
		}

		// underline (default)
		return {
			base: `relative font-medium transition-colors shrink-0 ${sizeStyles}`,
			active: 'text-foreground',
			inactive: 'text-muted-foreground hover:text-foreground',
		};
	});
</script>

<div class={containerClass} role="tablist" aria-orientation={orientation}>
	{#each items as item (item.id)}
		{@const isActive = selected === item.id}
		<button
			role="tab"
			aria-selected={isActive}
			class="group flex items-center gap-1.5 {itemClass.base} {isActive
				? itemClass.active
				: itemClass.inactive}"
			onclick={() => onselect(item.id)}
		>
			{#if item.icon}
				{@const Icon = item.icon}
				<Icon class={size === 'xs' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
			{/if}
			{item.label}
			{#if item.count !== undefined && item.count > 0}
				{#if variant === 'underline'}
					<span class="bg-primary/10 text-primary rounded-full px-1.5 text-[10px] font-bold"
						>{item.count}</span
					>
				{:else}
					<span class="bg-muted ml-1 rounded-full px-1.5 text-[10px] tabular-nums"
						>{item.count}</span
					>
				{/if}
			{/if}
			{#if item.closable && onclose}
				<span
					class="hover:bg-muted ml-0.5 hidden h-3 w-3 items-center justify-center rounded-sm group-hover:inline-flex"
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						onclose?.(item.id);
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter') {
							e.stopPropagation();
							onclose?.(item.id);
						}
					}}
				>
					<svg
						class="h-2 w-2"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"><path d="M18 6L6 18M6 6l12 12" /></svg
					>
				</span>
			{/if}
			{#if variant === 'underline' && isActive}
				<span class="bg-primary absolute right-2 bottom-0 left-2 h-0.5 rounded-full"></span>
			{/if}
		</button>
	{/each}
</div>
