<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Separator } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Separator',
		component: Separator,
		tags: ['autodocs'],
	});
</script>

<Story name="Horizontal" args={{}}>
	{#snippet children(args)}
		<div class="flex flex-col gap-2 w-48">
			<span class="text-sm">Above</span>
			<Separator />
			<span class="text-sm">Below</span>
		</div>
	{/snippet}
</Story>

<Story name="Vertical" args={{}}>
	{#snippet children(args)}
		<div class="flex flex-row items-center gap-2">
			<span class="text-sm">Left</span>
			<Separator orientation="vertical" class="h-6" />
			<span class="text-sm">Right</span>
		</div>
	{/snippet}
</Story>
