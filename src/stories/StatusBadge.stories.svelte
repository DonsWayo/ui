<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { StatusBadge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/StatusBadge',
		component: StatusBadge,
		tags: ['autodocs'],
	});
</script>

<Story name="Open">
	{#snippet children(args)}
		<StatusBadge status="open" />
	{/snippet}
</Story>

<Story name="Closed">
	{#snippet children(args)}
		<StatusBadge status="closed" />
	{/snippet}
</Story>

<Story name="Running">
	{#snippet children(args)}
		<StatusBadge status="running" />
	{/snippet}
</Story>

<Story name="Succeeded">
	{#snippet children(args)}
		<StatusBadge status="succeeded" />
	{/snippet}
</Story>

<Story name="Failed">
	{#snippet children(args)}
		<StatusBadge status="failed" />
	{/snippet}
</Story>

<Story name="Merged">
	{#snippet children(args)}
		<StatusBadge status="merged" />
	{/snippet}
</Story>

<Story name="With Custom Label">
	{#snippet children(args)}
		<StatusBadge status="running" label="Deploying..." />
	{/snippet}
</Story>
