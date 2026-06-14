<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { StatCard } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/StatCard',
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{ value: '42', label: 'Issues Open' }}>
	{#snippet children(args)}
		<StatCard {...args} />
	{/snippet}
</Story>

<Story
	name="With Hint"
	args={{ value: '$12.50', label: 'Monthly Cost', hint: '↓ 8% from last month' }}
>
	{#snippet children(args)}
		<StatCard {...args} />
	{/snippet}
</Story>

<Story name="Grid" args={{}}>
	{#snippet children(args)}
		<div class="grid grid-cols-3 gap-4">
			<StatCard value="42" label="Issues Open" />
			<StatCard value="$12.50" label="Monthly Cost" hint="↓ 8% from last month" />
			<StatCard value="7" label="Active Agents" />
		</div>
	{/snippet}
</Story>
