<script lang="ts">
	/**
	 * Fab — Floating Action Button.
	 *
	 * Mobile-first primary-action affordance. Pinned bottom-right by
	 * default, respects `env(safe-area-inset-bottom)` so it clears the
	 * iOS home indicator. Size is fixed at 56×56 (Material spec, also
	 * comfortably above Apple's 44×44 HIG minimum).
	 *
	 * Hidden on `md:` and up by default — desktop should use a normal
	 * Button in the page header instead. Override with `alwaysVisible`
	 * if you need the FAB on all viewports.
	 *
	 * Use for: New mission, New issue, New comment — the single
	 * top-of-funnel action on a list/feed view.
	 */
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '../utils.js';

	type Props = {
		href?: string;
		class?: string;
		'aria-label': string;
		/** Show on all viewports (default: hide >= md). */
		alwaysVisible?: boolean;
		/** Snippet for icon content (e.g. lucide icon). */
		children?: Snippet;
	} & Omit<HTMLButtonAttributes, 'class' | 'aria-label'> &
		Omit<HTMLAnchorAttributes, 'class' | 'aria-label'>;

	let {
		href,
		class: className,
		alwaysVisible = false,
		children,
		...restProps
	}: Props = $props();

	const base = cn(
		'fixed right-4 z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30',
		'transition-transform hover:scale-105 active:scale-95',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		// Anchor 16px above the bottom safe area
		'bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)]',
		alwaysVisible ? '' : 'md:hidden',
		className,
	);
</script>

{#if href}
	<a {href} class={base} {...restProps}>
		{#if children}{@render children()}{/if}
	</a>
{:else}
	<button type="button" class={base} {...restProps}>
		{#if children}{@render children()}{/if}
	</button>
{/if}
