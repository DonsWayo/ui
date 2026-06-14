<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '../utils.js';

	// Native <input type="color"> wrapper styled to match @nucel/ui form
	// controls (matching border/ring/focus tokens). Used for label colours,
	// theme pickers, etc. Optionally renders the current hex value alongside.
	type Props = Omit<WithElementRef<HTMLInputAttributes>, 'type'> & {
		value?: string;
		/** Show the current hex value next to the swatch. */
		showValue?: boolean;
		class?: string;
	};

	let {
		ref = $bindable(null),
		value = $bindable('#000000'),
		showValue = false,
		class: className,
		'data-slot': dataSlot = 'color-input',
		...restProps
	}: Props = $props();
</script>

<span data-slot={dataSlot} class={cn('inline-flex items-center gap-2', showValue && 'min-w-0')}>
	<input
		bind:this={ref}
		type="color"
		bind:value
		class={cn(
			'h-9 w-12 cursor-pointer rounded-md border border-input bg-background p-1 shadow-xs transition-[color,box-shadow] outline-none',
			'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
			'disabled:cursor-not-allowed disabled:opacity-50',
			className,
		)}
		{...restProps}
	/>
	{#if showValue}
		<span class="text-muted-foreground font-mono text-xs uppercase">{value}</span>
	{/if}
</span>
