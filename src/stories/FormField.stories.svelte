<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { FormField, Input, Textarea, Label } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/FormField',
		component: FormField,
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	{#snippet children(args)}
		<FormField label="Username" for="username" {...args}>
			<Input id="username" placeholder="Enter a username" />
		</FormField>
	{/snippet}
</Story>

<Story name="With Hint">
	{#snippet children(args)}
		<FormField label="Username" for="username-hint" hint="Must be between 3–20 characters" {...args}>
			<Input id="username-hint" placeholder="Enter a username" />
		</FormField>
	{/snippet}
</Story>

<Story name="With Error">
	{#snippet children(args)}
		<FormField label="Username" for="username-error" error="This field is required" {...args}>
			<Input id="username-error" placeholder="Enter a username" />
		</FormField>
	{/snippet}
</Story>

<Story name="Without Label">
	{#snippet children(args)}
		<FormField {...args}>
			<Input placeholder="No label above this input" />
		</FormField>
	{/snippet}
</Story>

<Story name="With Textarea">
	{#snippet children(args)}
		<FormField label="Description" for="description" {...args}>
			<Textarea id="description" placeholder="Describe what this does…" rows={4} />
		</FormField>
	{/snippet}
</Story>
