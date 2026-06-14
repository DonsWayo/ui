<script lang="ts">
	import { TrendingUp, TrendingDown, Minus } from '@lucide/svelte';
	import Sparkline from './Sparkline.svelte';
	import { cn } from '$lib/utils/cn.js';

	type Trend = 'up' | 'down' | 'neutral';

	let {
		value,
		label,
		hint,
		data = [],
		trend,
		class: className,
	}: {
		value: string | number;
		label: string;
		hint?: string;
		data?: number[];
		trend?: Trend;
		class?: string;
	} = $props();

	const trendStyles: Record<Trend, string> = {
		up: 'text-success',
		down: 'text-destructive',
		neutral: 'text-muted-foreground',
	};

	const trendSparkColor: Record<Trend, string> = {
		up: 'stroke-success',
		down: 'stroke-destructive',
		neutral: 'stroke-muted-foreground',
	};

	const trendFillColor: Record<Trend, string> = {
		up: 'fill-success/10',
		down: 'fill-destructive/10',
		neutral: 'fill-muted/30',
	};
</script>

<div class={cn('rounded-xl border border-border bg-card p-4', className)}>
	<div class="flex items-start justify-between gap-2">
		<div class="min-w-0 flex-1">
			<div class="text-xl font-semibold tracking-tight tabular-nums text-foreground">{value}</div>
			<div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
				{label}
			</div>
			{#if hint}
				<div
					class={cn(
						'mt-1 flex items-center gap-1 text-[11px]',
						trend ? trendStyles[trend] : 'text-muted-foreground/70',
					)}
				>
					{#if trend === 'up'}
						<TrendingUp size={11} />
					{:else if trend === 'down'}
						<TrendingDown size={11} />
					{:else if trend === 'neutral'}
						<Minus size={11} />
					{/if}
					{hint}
				</div>
			{/if}
		</div>

		{#if data.length > 0}
			<Sparkline
				{data}
				color={trend ? trendSparkColor[trend] : 'stroke-primary'}
				fillColor={trend ? trendFillColor[trend] : 'fill-primary/10'}
				width={72}
				height={28}
			/>
		{/if}
	</div>
</div>
