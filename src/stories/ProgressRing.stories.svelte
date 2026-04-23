<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ProgressRing } from '$lib/index.js';

	// ProgressRing renders nothing when limit === 0, so every story must pass limit > 0.
	// Props: spent, limit, size (px, default 16), strokeWidth (default 2)
	// Color thresholds: <50% → success, 50–79% → warning, ≥80% → destructive

	const { Story } = defineMeta({
		title: 'Components/ProgressRing',
		component: ProgressRing,
		tags: ['autodocs'],
		argTypes: {
			spent: { control: { type: 'number' } },
			limit: { control: { type: 'number' } },
			size: { control: { type: 'number' } },
			strokeWidth: { control: { type: 'number' } },
		},
	});
</script>

<Story name="Empty" args={{ spent: 0, limit: 100 }}>
	{#snippet children(args)}
		<ProgressRing {...args} />
	{/snippet}
</Story>

<Story name="Quarter" args={{ spent: 25, limit: 100 }}>
	{#snippet children(args)}
		<ProgressRing {...args} />
	{/snippet}
</Story>

<Story name="ThreeQuarters" args={{ spent: 75, limit: 100 }}>
	{#snippet children(args)}
		<ProgressRing {...args} />
	{/snippet}
</Story>

<Story name="Full" args={{ spent: 100, limit: 100 }}>
	{#snippet children(args)}
		<ProgressRing {...args} />
	{/snippet}
</Story>

<Story name="Custom Size" args={{ spent: 60, limit: 100, size: 40, strokeWidth: 4 }}>
	{#snippet children(args)}
		<ProgressRing {...args} />
	{/snippet}
</Story>
