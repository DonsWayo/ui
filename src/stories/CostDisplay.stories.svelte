<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CostDisplay } from '$lib/index.js';

	// Props: amount (number), precision (2 | 3 | 4, default 2), size ("xs" | "sm", default "sm")
	// Renders an animated currency value in USD using NumberFlow.

	const { Story } = defineMeta({
		title: 'Components/CostDisplay',
		component: CostDisplay,
		tags: ['autodocs'],
		argTypes: {
			precision: {
				control: { type: 'select' },
				options: [2, 3, 4],
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm'],
			},
		},
	});
</script>

<Story name="Zero Cost" args={{ amount: 0 }}>
	{#snippet children(args)}
		<CostDisplay {...args} />
	{/snippet}
</Story>

<Story name="Small Cost" args={{ amount: 0.0042, precision: 4 }}>
	{#snippet children(args)}
		<CostDisplay {...args} />
	{/snippet}
</Story>

<Story name="Large Cost" args={{ amount: 12.5 }}>
	{#snippet children(args)}
		<CostDisplay {...args} />
	{/snippet}
</Story>

<Story name="With Precision 4" args={{ amount: 3.14159, precision: 4 }}>
	{#snippet children(args)}
		<CostDisplay {...args} />
	{/snippet}
</Story>
