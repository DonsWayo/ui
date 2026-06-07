<script lang="ts" module>
	import { cn, type WithElementRef } from '../utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	// Icon-only button/link. Distinct from `Button size="icon"` in that it
	// defaults to the muted-foreground + hover:bg-accent "toolbar glyph" look
	// used pervasively in TopBar / file trees / tooltip dismiss buttons, and
	// offers a 44×44 `tap` size for mobile hit targets.
	export const iconButtonVariants = tv({
		base: "inline-grid place-items-center shrink-0 rounded-md transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		variants: {
			variant: {
				// Default toolbar glyph: muted until hovered.
				ghost: 'text-muted-foreground hover:bg-accent hover:text-foreground',
				outline:
					'border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
				default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
				destructive: 'text-destructive hover:bg-destructive/10',
			},
			size: {
				sm: 'size-8',
				default: 'size-9',
				lg: 'size-10',
				// 44×44 — meets the recommended mobile tap target.
				tap: 'size-11',
			},
		},
		defaultVariants: {
			variant: 'ghost',
			size: 'default',
		},
	});

	export type IconButtonVariant = VariantProps<typeof iconButtonVariants>['variant'];
	export type IconButtonSize = VariantProps<typeof iconButtonVariants>['size'];

	export type IconButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: IconButtonVariant;
			size?: IconButtonSize;
			/** Required for an icon-only control. */
			'aria-label': string;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'ghost',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled = false,
		children,
		...restProps
	}: IconButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="icon-button"
		class={cn(iconButtonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled ? true : undefined}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="icon-button"
		class={cn(iconButtonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
