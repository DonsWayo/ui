<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Pagination } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Pagination',
		component: Pagination,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{ page: 1, totalPages: 10 }}>
	{#snippet children(args)}
		<Pagination {...args} />
	{/snippet}
</Story>

<Story name="Middle Page" args={{ page: 5, totalPages: 10 }}>
	{#snippet children(args)}
		<Pagination {...args} />
	{/snippet}
</Story>

<Story name="Last Page" args={{ page: 10, totalPages: 10 }}>
	{#snippet children(args)}
		<Pagination {...args} />
	{/snippet}
</Story>

<Story name="Few Pages" args={{ page: 2, totalPages: 4 }}>
	{#snippet children(args)}
		<Pagination {...args} />
	{/snippet}
</Story>
