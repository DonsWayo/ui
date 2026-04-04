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

<Story name="Default">
	{#snippet children(args)}
		<EmptyState title="No results found" description="Try adjusting your search terms." />
	{/snippet}
</Story>

<Story name="With Icon">
	{#snippet children(args)}
		<EmptyState
			title="No results found"
			description="Try adjusting your search terms."
			icon={FileQuestion}
		/>
	{/snippet}
</Story>

<Story name="With Action">
	{#snippet children(args)}
		<EmptyState title="No results found" description="Try adjusting your search terms.">
			<Button>Clear Filters</Button>
		</EmptyState>
	{/snippet}
</Story>

<Story name="Compact">
	{#snippet children(args)}
		<EmptyState variant="compact" title="No results" />
	{/snippet}
</Story>

<Story name="Inline">
	{#snippet children(args)}
		<EmptyState variant="inline" title="No results" />
	{/snippet}
</Story>
