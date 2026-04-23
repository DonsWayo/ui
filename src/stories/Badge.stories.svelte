<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Badge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'secondary', 'destructive', 'outline'],
			},
		},
	});
</script>

<Story name="Default" args={{}}>
	{#snippet children(args)}
		<Badge>Badge</Badge>
	{/snippet}
</Story>

<Story name="Secondary" args={{}}>
	{#snippet children(args)}
		<Badge variant="secondary">Secondary</Badge>
	{/snippet}
</Story>

<Story name="Destructive" args={{}}>
	{#snippet children(args)}
		<Badge variant="destructive">Destructive</Badge>
	{/snippet}
</Story>

<Story name="Outline" args={{}}>
	{#snippet children(args)}
		<Badge variant="outline">Outline</Badge>
	{/snippet}
</Story>

<Story name="All Variants" args={{}}>
	{#snippet children(args)}
		<div class="flex flex-row gap-2 items-center">
			<Badge variant="default">Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
		</div>
	{/snippet}
</Story>
