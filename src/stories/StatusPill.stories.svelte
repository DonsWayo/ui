<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { StatusPill } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/StatusPill',
		component: StatusPill,
		tags: ['autodocs'],
	});
</script>

<Story name="Success">
	{#snippet children(args)}
		<StatusPill status="success" />
	{/snippet}
</Story>

<Story name="Failure">
	{#snippet children(args)}
		<StatusPill status="failure" />
	{/snippet}
</Story>

<Story name="Running">
	{#snippet children(args)}
		<StatusPill status="running" />
	{/snippet}
</Story>

<Story name="Pending">
	{#snippet children(args)}
		<StatusPill status="pending" />
	{/snippet}
</Story>

<Story name="Cancelled">
	{#snippet children(args)}
		<StatusPill status="cancelled" />
	{/snippet}
</Story>

<Story name="Warning">
	{#snippet children(args)}
		<StatusPill status="warning" />
	{/snippet}
</Story>

<Story name="With Custom Label">
	{#snippet children(args)}
		<StatusPill status="success" label="Deployed" />
	{/snippet}
</Story>

<Story name="Small (xs)">
	{#snippet children(args)}
		<StatusPill status="running" size="xs" />
	{/snippet}
</Story>
