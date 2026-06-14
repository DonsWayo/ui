<script lang="ts">
	/**
	 * BottomSheet — mobile-first bottom-anchored sheet.
	 *
	 * Built on Sheet primitive with `side="bottom"` plus a few mobile
	 * affordances: a top grabber handle, larger touch targets in the
	 * header, and an explicit safe-area inset on the bottom so the
	 * close button isn't eaten by the home indicator.
	 *
	 * Use for: mobile filter panels, action menus, "more options"
	 * surfaces that would be a popover on desktop.
	 *
	 * Pair with a Tailwind `md:hidden` wrapper on the trigger to keep
	 * the desktop dropdown menu unchanged.
	 */
	import type { Snippet } from 'svelte';
	import Sheet from './ui/sheet/sheet.svelte';
	import SheetTrigger from './ui/sheet/sheet-trigger.svelte';
	import SheetContent from './ui/sheet/sheet-content.svelte';
	import SheetHeader from './ui/sheet/sheet-header.svelte';
	import SheetTitle from './ui/sheet/sheet-title.svelte';
	import SheetDescription from './ui/sheet/sheet-description.svelte';
	import SheetFooter from './ui/sheet/sheet-footer.svelte';
	import { cn } from '../utils.js';

	type Props = {
		open?: boolean;
		title?: string;
		description?: string;
		/** Show the grabber bar at the top. Defaults to true. */
		grabber?: boolean;
		class?: string;
		trigger?: Snippet;
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	};

	let {
		open = $bindable(false),
		title,
		description,
		grabber = true,
		class: className,
		trigger,
		header,
		footer,
		children,
	}: Props = $props();
</script>

<Sheet bind:open>
	{#if trigger}
		<SheetTrigger>
			{@render trigger()}
		</SheetTrigger>
	{/if}
	<SheetContent
		side="bottom"
		class={cn(
			'flex max-h-[90dvh] flex-col rounded-t-xl px-0 pb-[env(safe-area-inset-bottom,0px)]',
			className,
		)}
	>
		{#if grabber}
			<div class="flex justify-center pt-2 pb-1" aria-hidden="true">
				<div class="h-1.5 w-10 rounded-full bg-muted-foreground/30"></div>
			</div>
		{/if}

		{#if header}
			<div class="px-4">
				{@render header()}
			</div>
		{:else if title || description}
			<SheetHeader class="px-4">
				{#if title}
					<SheetTitle>{title}</SheetTitle>
				{/if}
				{#if description}
					<SheetDescription>{description}</SheetDescription>
				{/if}
			</SheetHeader>
		{/if}

		<div class="flex-1 overflow-y-auto px-4 py-2">
			{#if children}{@render children()}{/if}
		</div>

		{#if footer}
			<SheetFooter class="px-4">
				{@render footer()}
			</SheetFooter>
		{/if}
	</SheetContent>
</Sheet>
