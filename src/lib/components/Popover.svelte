<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { cn } from '../utils.js';

	type Align = 'start' | 'center' | 'end';
	type Side = 'top' | 'right' | 'bottom' | 'left';

	type Props = {
		/** Controlled open state. */
		open?: boolean;
		/** Which side of the trigger the content opens on. */
		side?: Side;
		/** Alignment of the content relative to the trigger. */
		align?: Align;
		/** Gap (px) between the trigger and the content. */
		sideOffset?: number;
		/** Class applied to the content panel. */
		class?: string;
		/** Class applied to the trigger wrapper button. */
		triggerClass?: string;
		/** The clickable element that toggles the popover. */
		trigger?: Snippet;
		/** The popover panel contents. */
		children?: Snippet;
		onOpenChange?: (open: boolean) => void;
	};

	let {
		open = $bindable(false),
		side = 'bottom',
		align = 'center',
		sideOffset = 4,
		class: className,
		triggerClass,
		trigger,
		children,
		onOpenChange,
	}: Props = $props();
</script>

<PopoverPrimitive.Root bind:open {onOpenChange}>
	{#if trigger}
		<PopoverPrimitive.Trigger class={cn('outline-none', triggerClass)}>
			{@render trigger()}
		</PopoverPrimitive.Trigger>
	{/if}
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			{side}
			{align}
			{sideOffset}
			data-slot="popover-content"
			class={cn(
				'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--bits-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-none',
				className,
			)}
		>
			{#if children}{@render children()}{/if}
		</PopoverPrimitive.Content>
	</PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
