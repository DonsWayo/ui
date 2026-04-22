<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Progress } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Progress',
		component: Progress,
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: { type: 'range', min: 0, max: 100, step: 1 },
			},
		},
	});
</script>

<Story name="Empty" args={{ value: 0 }}>
	{#snippet children(args)}
		<Progress {...args} class="w-64" />
	{/snippet}
</Story>

<Story name="Half" args={{ value: 50 }}>
	{#snippet children(args)}
		<Progress {...args} class="w-64" />
	{/snippet}
</Story>

<Story name="Full" args={{ value: 100 }}>
	{#snippet children(args)}
		<Progress {...args} class="w-64" />
	{/snippet}
</Story>

<Story name="Animated" args={{ value: 75 }}>
	{#snippet children(args)}
		<Progress {...args} class="w-64" />
	{/snippet}
</Story>
