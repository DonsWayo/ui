<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { MoonIcon, SunIcon, MonitorIcon } from '@lucide/svelte';
	import { cn } from '../utils.js';
	import { getThemeContext } from './ThemeProvider.svelte';

	type Props = HTMLButtonAttributes & {
		/** Visual size variant. */
		size?: 'sm' | 'md' | 'lg';
		/** Override accessible label. */
		label?: string;
		class?: string;
	};

	let { size = 'md', label, class: className, onclick, ...restProps }: Props = $props();

	const ctx = getThemeContext();

	const sizeClass = $derived(size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-9 w-9');
	const iconClass = $derived(size === 'sm' ? 'size-3.5' : size === 'lg' ? 'size-5' : 'size-4');

	const ariaLabel = $derived(
		label ??
			(ctx.theme === 'system'
				? 'Theme: system. Click to switch to light.'
				: ctx.theme === 'light'
					? 'Theme: light. Click to switch to dark.'
					: 'Theme: dark. Click to switch to system.'),
	);

	function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		ctx.cycleTheme();
		onclick?.(e);
	}
</script>

<button
	type="button"
	aria-label={ariaLabel}
	title={ariaLabel}
	data-theme={ctx.theme}
	data-resolved-theme={ctx.resolved}
	onclick={handleClick}
	class={cn(
		'border-border bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 inline-flex shrink-0 items-center justify-center rounded-md border text-sm transition-colors outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
		sizeClass,
		className,
	)}
	{...restProps}
>
	{#if ctx.theme === 'system'}
		<MonitorIcon class={iconClass} aria-hidden="true" />
	{:else if ctx.theme === 'light'}
		<SunIcon class={iconClass} aria-hidden="true" />
	{:else}
		<MoonIcon class={iconClass} aria-hidden="true" />
	{/if}
</button>
