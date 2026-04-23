<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { StatusDot } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/StatusDot',
		component: StatusDot,
		tags: ['autodocs'],
		argTypes: {
			color: { control: 'text' },
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm', 'md'],
			},
			animated: { control: 'boolean' },
		},
	});
</script>

<Story name="Default" args={{ color: 'bg-green-500' }}>
	{#snippet children(args)}
		<StatusDot {...args} />
	{/snippet}
</Story>

<Story name="With Status" args={{ status: 'open' }}>
	{#snippet children(args)}
		<StatusDot {...args} />
	{/snippet}
</Story>

<Story name="Animated" args={{ color: 'bg-blue-500', animated: true }}>
	{#snippet children(args)}
		<StatusDot {...args} />
	{/snippet}
</Story>

<Story name="Running Status" args={{ status: 'running' }}>
	{#snippet children(args)}
		<StatusDot {...args} />
	{/snippet}
</Story>

<Story name="Sizes" args={{}}>
	{#snippet children(args)}
		<div class="flex items-center gap-4">
			<StatusDot color="bg-green-500" size="xs" />
			<StatusDot color="bg-green-500" size="sm" />
			<StatusDot color="bg-green-500" size="md" />
		</div>
	{/snippet}
</Story>
