<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { StatusBadge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/StatusBadge',
		component: StatusBadge,
		tags: ['autodocs'],
	});
</script>

<Story name="Open" args={{ status: 'open' }}>
	{#snippet children(args)}
		<StatusBadge {...args} />
	{/snippet}
</Story>

<Story name="Closed" args={{ status: 'closed' }}>
	{#snippet children(args)}
		<StatusBadge {...args} />
	{/snippet}
</Story>

<Story name="Running" args={{ status: 'running' }}>
	{#snippet children(args)}
		<StatusBadge {...args} />
	{/snippet}
</Story>

<Story name="Succeeded" args={{ status: 'succeeded' }}>
	{#snippet children(args)}
		<StatusBadge {...args} />
	{/snippet}
</Story>

<Story name="Failed" args={{ status: 'failed' }}>
	{#snippet children(args)}
		<StatusBadge {...args} />
	{/snippet}
</Story>

<Story name="Merged" args={{ status: 'merged' }}>
	{#snippet children(args)}
		<StatusBadge {...args} />
	{/snippet}
</Story>

<Story name="With Custom Label" args={{ status: 'running', label: 'Deploying...' }}>
	{#snippet children(args)}
		<StatusBadge {...args} />
	{/snippet}
</Story>
