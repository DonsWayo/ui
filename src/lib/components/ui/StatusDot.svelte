<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '../../utils.js';

	type Status =
		| 'open'
		| 'closed'
		| 'running'
		| 'succeeded'
		| 'failed'
		| 'active'
		| 'paused'
		| 'merged'
		| 'error'
		| 'warning'
		| 'passed'
		| 'cancelled'
		| 'terminated'
		| string;

	let {
		ref = $bindable(null),
		color,
		status,
		animated = false,
		size = 'md',
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> & {
		color?: string;
		status?: Status;
		animated?: boolean;
		size?: 'xs' | 'sm' | 'md';
	} = $props();

	const colorMap: Record<string, string> = {
		open: 'bg-success',
		active: 'bg-success',
		succeeded: 'bg-success',
		passed: 'bg-success',
		closed: 'bg-muted-foreground',
		paused: 'bg-muted-foreground',
		terminated: 'bg-muted-foreground',
		running: 'bg-blue-500 dark:bg-blue-400',
		merged: 'bg-purple-500 dark:bg-purple-400',
		failed: 'bg-destructive',
		error: 'bg-destructive',
		warning: 'bg-warning',
	};

	const resolvedColor = $derived(
		color ?? (status ? (colorMap[status] ?? 'bg-muted-foreground') : 'bg-muted-foreground'),
	);
	const isAnimated = $derived(animated || status === 'running');
	const sizeClass = $derived(size === 'xs' ? 'h-1 w-1' : size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2');
</script>

<span bind:this={ref} class="relative flex {sizeClass} shrink-0 {cn(className)}" {...restProps}>
	{#if isAnimated}
		<span
			class="absolute inline-flex h-full w-full animate-ping rounded-full {resolvedColor} opacity-50"
		></span>
	{/if}
	<span class="relative inline-flex {sizeClass} rounded-full {resolvedColor}"></span>
</span>
