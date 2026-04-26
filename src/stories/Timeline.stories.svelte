<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Timeline } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Timeline',
		component: Timeline,
		tags: ['autodocs'],
	});
</script>

<Story
	name="Default"
	args={{
		items: [
			{ time: '2m ago', title: 'Build started', status: 'success' },
			{ time: '5m ago', title: 'Tests passed', description: 'All 42 tests passed.', status: 'success' },
			{ time: '8m ago', title: 'Deploying', description: 'Rolling out to production.', status: 'running' },
			{ time: '10m ago', title: 'Review pending', status: 'pending' },
		],
	}}
>
	{#snippet children(args)}
		<Timeline {...args} />
	{/snippet}
</Story>

<Story
	name="With Error"
	args={{
		items: [
			{ time: '1m ago', title: 'Build failed', description: 'ESLint errors found.', status: 'error' },
			{ time: '3m ago', title: 'Tests passed', status: 'success' },
			{ time: '5m ago', title: 'Lint warning', description: 'Unused variable detected.', status: 'warning' },
		],
	}}
>
	{#snippet children(args)}
		<Timeline {...args} />
	{/snippet}
</Story>
