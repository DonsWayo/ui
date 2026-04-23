<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Sparkline } from '$lib/index.js';

	// Props: data (number[]), color (Tailwind stroke class), fillColor (Tailwind fill class),
	//        width (px, default 80), height (px, default 24)

	const { Story } = defineMeta({
		title: 'Components/Sparkline',
		component: Sparkline,
		tags: ['autodocs'],
	});
</script>

<Story name="Trending Up" args={{ data: [1, 3, 2, 5, 4, 8, 6] }}>
	{#snippet children(args)}
		<Sparkline {...args} />
	{/snippet}
</Story>

<Story name="Trending Down" args={{ data: [9, 7, 8, 5, 6, 3, 2], color: 'stroke-destructive', fillColor: 'fill-destructive/10' }}>
	{#snippet children(args)}
		<Sparkline {...args} />
	{/snippet}
</Story>

<Story name="Flat Line" args={{ data: [4, 4, 4, 4, 4, 4, 4], color: 'stroke-muted-foreground', fillColor: 'fill-muted/10' }}>
	{#snippet children(args)}
		<Sparkline {...args} />
	{/snippet}
</Story>
