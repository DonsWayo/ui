<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { StatusPill } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/StatusPill',
		component: StatusPill,
		tags: ['autodocs'],
	});
</script>

<Story name="Success" args={{ status: 'success' }}>
	{#snippet children(args)}
		<StatusPill {...args} />
	{/snippet}
</Story>

<Story name="Failure" args={{ status: 'failure' }}>
	{#snippet children(args)}
		<StatusPill {...args} />
	{/snippet}
</Story>

<Story name="Running" args={{ status: 'running' }}>
	{#snippet children(args)}
		<StatusPill {...args} />
	{/snippet}
</Story>

<Story name="Pending" args={{ status: 'pending' }}>
	{#snippet children(args)}
		<StatusPill {...args} />
	{/snippet}
</Story>

<Story name="Cancelled" args={{ status: 'cancelled' }}>
	{#snippet children(args)}
		<StatusPill {...args} />
	{/snippet}
</Story>

<Story name="Warning" args={{ status: 'warning' }}>
	{#snippet children(args)}
		<StatusPill {...args} />
	{/snippet}
</Story>

<Story name="With Custom Label" args={{ status: 'success', label: 'Deployed' }}>
	{#snippet children(args)}
		<StatusPill {...args} />
	{/snippet}
</Story>

<Story name="Small (xs)" args={{ status: 'running', size: 'xs' }}>
	{#snippet children(args)}
		<StatusPill {...args} />
	{/snippet}
</Story>
