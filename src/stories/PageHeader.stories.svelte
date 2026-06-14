<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { PageHeader, Button } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/PageHeader',
		component: PageHeader,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{ title: 'Repositories' }}>
	{#snippet children(args)}
		<PageHeader {...args} />
	{/snippet}
</Story>

<Story
	name="With Subtitle"
	args={{ title: 'Repositories', subtitle: 'All repositories in your workspace' }}
>
	{#snippet children(args)}
		<PageHeader {...args} />
	{/snippet}
</Story>

<Story name="With Actions" args={{}}>
	{#snippet children(args)}
		<PageHeader title="Repositories" subtitle="All repositories in your workspace">
			{#snippet actions()}
				<Button size="sm">New Repository</Button>
			{/snippet}
		</PageHeader>
	{/snippet}
</Story>
