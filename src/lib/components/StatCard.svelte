<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from '@lucide/svelte';
	import { cn } from '../utils.js';

	type Trend = 'up' | 'down' | 'flat';

	let {
		label,
		value,
		delta,
		trend,
		icon,
		hint,
		invertTrend = false,
		class: className,
		children,
	}: {
		label: string;
		value: string | number;
		delta?: number;
		trend?: Trend;
		icon?: Component<{ class?: string }>;
		hint?: string;
		invertTrend?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();

	const computedTrend = $derived<Trend>(
		trend ?? (delta === undefined ? 'flat' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'),
	);

	const trendIsGood = $derived(
		computedTrend === 'flat'
			? null
			: invertTrend
				? computedTrend === 'down'
				: computedTrend === 'up',
	);

	const trendColor = $derived.by(() => {
		if (computedTrend === 'flat') return 'text-muted-foreground';
		return trendIsGood
			? 'text-emerald-600 dark:text-emerald-400'
			: 'text-destructive';
	});

	const formattedDelta = $derived.by(() => {
		if (delta === undefined) return null;
		const sign = delta > 0 ? '+' : '';
		return `${sign}${delta}%`;
	});
</script>

<div
	data-slot="stat-card"
	class={cn(
		'bg-card text-card-foreground border-border flex flex-col gap-2 rounded-xl border p-4 shadow-xs',
		className,
	)}
>
	<div class="flex items-start justify-between gap-2">
		<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
			{label}
		</p>
		{#if icon}
			{@const Icon = icon}
			<div
				class="bg-secondary text-muted-foreground flex h-7 w-7 items-center justify-center rounded-md"
			>
				<Icon class="size-3.5" />
			</div>
		{/if}
	</div>
	<div class="flex items-baseline gap-2">
		<span class="text-foreground text-2xl font-semibold tabular-nums">{value}</span>
		{#if delta !== undefined || trend}
			<span class={cn('inline-flex items-center gap-0.5 text-xs font-medium', trendColor)}>
				{#if computedTrend === 'up'}
					<ArrowUpIcon class="size-3" />
				{:else if computedTrend === 'down'}
					<ArrowDownIcon class="size-3" />
				{:else}
					<MinusIcon class="size-3" />
				{/if}
				{#if formattedDelta}{formattedDelta}{/if}
			</span>
		{/if}
	</div>
	{#if hint}
		<p class="text-muted-foreground text-xs">{hint}</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>
