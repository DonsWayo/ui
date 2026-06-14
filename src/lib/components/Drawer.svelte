<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sheet from './ui/sheet/sheet.svelte';
	import SheetTrigger from './ui/sheet/sheet-trigger.svelte';
	import SheetContent from './ui/sheet/sheet-content.svelte';
	import SheetHeader from './ui/sheet/sheet-header.svelte';
	import SheetTitle from './ui/sheet/sheet-title.svelte';
	import SheetDescription from './ui/sheet/sheet-description.svelte';
	import SheetFooter from './ui/sheet/sheet-footer.svelte';
	import { cn } from '../utils.js';

	type Side = 'top' | 'right' | 'bottom' | 'left';

	type Props = {
		open?: boolean;
		side?: Side;
		title?: string;
		description?: string;
		class?: string;
		trigger?: Snippet;
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	};

	let {
		open = $bindable(false),
		side = 'right',
		title,
		description,
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
	<SheetContent {side} class={cn('flex flex-col', className)}>
		{#if header}
			{@render header()}
		{:else if title || description}
			<SheetHeader>
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
			<SheetFooter>
				{@render footer()}
			</SheetFooter>
		{/if}
	</SheetContent>
</Sheet>
