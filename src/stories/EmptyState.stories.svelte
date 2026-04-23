<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { EmptyState } from '$lib/index.js';
	import { Button } from '$lib/index.js';
	import { FileQuestion } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Components/EmptyState',
		component: EmptyState,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{ title: 'No results found', description: 'Try adjusting your search terms.' }}>
	{#snippet children(args)}
		<EmptyState {...args} />
	{/snippet}
</Story>

<Story name="With Icon" args={{}}>
	{#snippet children(args)}
		<EmptyState
			title="No results found"
			description="Try adjusting your search terms."
			icon={FileQuestion}
		/>
	{/snippet}
</Story>

<Story name="With Action" args={{}}>
	{#snippet children(args)}
		<EmptyState title="No results found" description="Try adjusting your search terms.">
			<Button>Clear Filters</Button>
		</EmptyState>
	{/snippet}
</Story>

<Story name="Compact" args={{ variant: 'compact', title: 'No results' }}>
	{#snippet children(args)}
		<EmptyState {...args} />
	{/snippet}
</Story>

<Story name="Inline" args={{ variant: 'inline', title: 'No results' }}>
	{#snippet children(args)}
		<EmptyState {...args} />
	{/snippet}
</Story>
