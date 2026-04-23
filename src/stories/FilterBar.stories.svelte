<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { FilterBar } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/FilterBar',
		component: FilterBar,
		tags: ['autodocs'],
	});
</script>

<Story name="Empty" args={{ value: '', filters: [] }}>
	{#snippet children(args)}
		<FilterBar {...args} />
	{/snippet}
</Story>

<Story
	name="With Filters"
	args={{
		value: 'agent',
		filters: [
			{ key: 'status', label: 'Status', value: 'running' },
			{ key: 'owner', label: 'Owner', value: 'donswayo' },
		],
	}}
>
	{#snippet children(args)}
		<FilterBar {...args} />
	{/snippet}
</Story>

<Story name="Many Chips">
	{#snippet children()}
		<FilterBar
			value=""
			filters={[
				{ key: 'status', label: 'Status', value: 'active' },
				{ key: 'env', label: 'Env', value: 'prod' },
				{ key: 'region', label: 'Region', value: 'eu-west-1' },
				{ key: 'type', label: 'Type', value: 'api' },
			]}
		/>
	{/snippet}
</Story>
