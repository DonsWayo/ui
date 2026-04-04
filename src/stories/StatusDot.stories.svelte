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

<Story name="Default">
	{#snippet children(args)}
		<StatusDot color="bg-green-500" />
	{/snippet}
</Story>

<Story name="With Status">
	{#snippet children(args)}
		<StatusDot status="open" />
	{/snippet}
</Story>

<Story name="Animated">
	{#snippet children(args)}
		<StatusDot color="bg-blue-500" animated />
	{/snippet}
</Story>

<Story name="Running Status">
	{#snippet children(args)}
		<StatusDot status="running" />
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet children(args)}
		<div class="flex items-center gap-4">
			<StatusDot color="bg-green-500" size="xs" />
			<StatusDot color="bg-green-500" size="sm" />
			<StatusDot color="bg-green-500" size="md" />
		</div>
	{/snippet}
</Story>
