<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ReviewBadge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/ReviewBadge',
		component: ReviewBadge,
		tags: ['autodocs'],
	});
</script>

<Story name="Approved">
	{#snippet children(args)}
		<ReviewBadge status="approved" reviewer="john" />
	{/snippet}
</Story>

<Story name="Changes Requested">
	{#snippet children(args)}
		<ReviewBadge status="changes_requested" reviewer="jane" />
	{/snippet}
</Story>

<Story name="Commented">
	{#snippet children(args)}
		<ReviewBadge status="commented" reviewer="bob" />
	{/snippet}
</Story>
