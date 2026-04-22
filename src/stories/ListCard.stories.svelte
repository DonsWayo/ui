<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ListCard } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/ListCard',
		component: ListCard,
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	{#snippet children(args)}
		<ListCard>
			<div class="px-4 py-3 text-sm">First item</div>
			<div class="px-4 py-3 text-sm">Second item</div>
			<div class="px-4 py-3 text-sm">Third item</div>
		</ListCard>
	{/snippet}
</Story>
