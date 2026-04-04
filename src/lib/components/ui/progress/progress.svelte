<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '../../../utils.js';

	let {
		ref = $bindable(null),
		class: className,
		value = 0,
		max = 100,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		value?: number;
		max?: number;
	} = $props();

	const percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));
</script>

<div
	bind:this={ref}
	data-slot="progress"
	role="progressbar"
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={max}
	class={cn('bg-accent relative h-2 w-full overflow-hidden rounded-full', className)}
	{...restProps}
>
	<div
		class="bg-primary h-full transition-all duration-300 ease-in-out"
		style="width: {percentage}%"
	></div>
</div>
