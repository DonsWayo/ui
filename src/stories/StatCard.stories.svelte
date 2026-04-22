<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { StatCard } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/StatCard',
		component: StatCard,
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	{#snippet children(args)}
		<StatCard value="42" label="Issues Open" />
	{/snippet}
</Story>

<Story name="With Hint">
	{#snippet children(args)}
		<StatCard value="$12.50" label="Monthly Cost" hint="↓ 8% from last month" />
	{/snippet}
</Story>

<Story name="Grid">
	{#snippet children(args)}
		<div class="grid grid-cols-3 gap-4">
			<StatCard value="42" label="Issues Open" />
			<StatCard value="$12.50" label="Monthly Cost" hint="↓ 8% from last month" />
			<StatCard value="7" label="Active Agents" />
		</div>
	{/snippet}
</Story>
