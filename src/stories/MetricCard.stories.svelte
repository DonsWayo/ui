<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { MetricCard } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/MetricCard',
		component: MetricCard,
		tags: ['autodocs'],
	});
</script>

<Story
	name="Trending Up"
	args={{
		value: '$12.50',
		label: 'Monthly Cost',
		hint: '+8% from last month',
		trend: 'up',
		data: [4, 6, 5, 8, 7, 10, 12],
	}}
>
	{#snippet children(args)}
		<MetricCard {...args} />
	{/snippet}
</Story>

<Story
	name="Trending Down"
	args={{
		value: '42',
		label: 'Open Issues',
		hint: '−12% from last week',
		trend: 'down',
		data: [80, 70, 65, 60, 55, 48, 42],
	}}
>
	{#snippet children(args)}
		<MetricCard {...args} />
	{/snippet}
</Story>

<Story
	name="Neutral"
	args={{
		value: '7',
		label: 'Active Agents',
		hint: 'No change',
		trend: 'neutral',
		data: [7, 6, 8, 7, 7, 6, 7],
	}}
>
	{#snippet children(args)}
		<MetricCard {...args} />
	{/snippet}
</Story>

<Story name="Grid">
	{#snippet children()}
		<div class="grid grid-cols-3 gap-4">
			<MetricCard
				value="$12.50"
				label="Monthly Cost"
				hint="+8%"
				trend="up"
				data={[4, 6, 5, 8, 7, 10, 12]}
			/>
			<MetricCard
				value="42"
				label="Open Issues"
				hint="−12%"
				trend="down"
				data={[80, 70, 65, 60, 55, 48, 42]}
			/>
			<MetricCard
				value="7"
				label="Active Agents"
				trend="neutral"
				data={[7, 6, 8, 7, 7, 6, 7]}
			/>
		</div>
	{/snippet}
</Story>
