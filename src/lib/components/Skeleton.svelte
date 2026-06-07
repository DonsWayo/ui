<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '../utils.js';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		width?: string | number;
		height?: string | number;
		rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
		shimmer?: boolean;
	};

	let {
		ref = $bindable(null),
		width,
		height,
		rounded = 'md',
		shimmer = true,
		class: className,
		style: styleProp,
		...restProps
	}: Props = $props();

	function toCssLength(v: string | number | undefined): string | undefined {
		if (v === undefined) return undefined;
		return typeof v === 'number' ? `${v}px` : v;
	}

	const inlineStyle = $derived.by(() => {
		const parts: string[] = [];
		const w = toCssLength(width);
		const h = toCssLength(height);
		if (w) parts.push(`width:${w}`);
		if (h) parts.push(`height:${h}`);
		if (styleProp) parts.push(String(styleProp));
		return parts.length ? parts.join(';') : undefined;
	});

	const roundedClass = $derived.by(() => {
		switch (rounded) {
			case 'none':
				return 'rounded-none';
			case 'sm':
				return 'rounded-sm';
			case 'lg':
				return 'rounded-lg';
			case 'full':
				return 'rounded-full';
			case 'md':
			default:
				return 'rounded-md';
		}
	});
</script>

<div
	bind:this={ref}
	data-slot="skeleton"
	style={inlineStyle}
	class={cn(
		'bg-accent relative overflow-hidden',
		shimmer ? 'animate-pulse' : '',
		roundedClass,
		shimmer &&
			"after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.8s_infinite] after:bg-gradient-to-r after:from-transparent after:via-black/5 after:to-transparent dark:after:via-white/10 after:content-['']",
		className,
	)}
	{...restProps}
></div>

<style>
	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}
</style>
