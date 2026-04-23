<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ReviewBadge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/ReviewBadge',
		component: ReviewBadge,
		tags: ['autodocs'],
	});
</script>

<Story name="Approved" args={{ status: 'approved', reviewer: 'john' }}>
	{#snippet children(args)}
		<ReviewBadge {...args} />
	{/snippet}
</Story>

<Story name="Changes Requested" args={{ status: 'changes_requested', reviewer: 'jane' }}>
	{#snippet children(args)}
		<ReviewBadge {...args} />
	{/snippet}
</Story>

<Story name="Commented" args={{ status: 'commented', reviewer: 'bob' }}>
	{#snippet children(args)}
		<ReviewBadge {...args} />
	{/snippet}
</Story>
