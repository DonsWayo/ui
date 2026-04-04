<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '../../utils.js';

	let {
		ref = $bindable(null),
		spent = 0,
		limit = 0,
		size = 16,
		strokeWidth = 2,
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> & {
		spent?: number;
		limit?: number;
		size?: number;
		strokeWidth?: number;
	} = $props();

	const radius = $derived((size - strokeWidth) / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const pct = $derived(limit > 0 ? Math.min(1, spent / limit) : 0);
	const dashOffset = $derived(circumference * (1 - pct));
	const color = $derived(
		pct >= 0.8 ? 'stroke-destructive' : pct >= 0.5 ? 'stroke-warning' : 'stroke-success',
	);
	const bgColor = $derived(
		pct >= 0.8 ? 'stroke-destructive/20' : pct >= 0.5 ? 'stroke-warning/20' : 'stroke-success/20',
	);
</script>

{#if limit > 0}
	<span
		bind:this={ref}
		title="${spent.toFixed(2)} / ${limit.toFixed(2)} ({Math.round(pct * 100)}%)"
		class={cn(className)}
		{...restProps}
	>
		<svg width={size} height={size} class="shrink-0 -rotate-90">
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke-width={strokeWidth}
				class={bgColor}
			/>
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke-width={strokeWidth}
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={dashOffset}
				class="{color} transition-[stroke-dashoffset] duration-500 ease-out"
			/>
		</svg>
	</span>
{/if}
