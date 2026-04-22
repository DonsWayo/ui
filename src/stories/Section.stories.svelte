<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Section, Button } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Section',
		component: Section,
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	{#snippet children(args)}
		<Section {...args}>
			<p class="text-sm text-foreground">This is some content inside the section.</p>
		</Section>
	{/snippet}
</Story>

<Story name="With Title">
	{#snippet children(args)}
		<Section title="Credentials" {...args}>
			<p class="text-sm text-foreground">Your API credentials are stored securely.</p>
		</Section>
	{/snippet}
</Story>

<Story name="Danger Zone">
	{#snippet children(args)}
		<Section title="Danger zone" class="border-destructive/40" {...args}>
			<div class="flex items-center justify-between">
				<p class="text-sm text-foreground">Permanently delete this resource and all its data.</p>
				<Button variant="destructive" size="sm">Delete</Button>
			</div>
		</Section>
	{/snippet}
</Story>

<Story name="Stacked">
	{#snippet children(args)}
		<div>
			<Section title="General" class="mb-4" {...args}>
				<p class="text-sm text-foreground">General settings go here.</p>
			</Section>
			<Section title="Credentials" class="mb-4">
				<p class="text-sm text-foreground">Manage your API keys and tokens.</p>
			</Section>
			<Section title="Danger zone" class="border-destructive/40">
				<p class="text-sm text-foreground">Irreversible actions live here.</p>
			</Section>
		</div>
	{/snippet}
</Story>
