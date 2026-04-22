<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Textarea } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		argTypes: {
			disabled: {
				control: { type: 'boolean' },
			},
		},
	});
</script>

<Story name="Default">
	{#snippet children(args)}
		<Textarea {...args} placeholder="Enter text..." />
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	{#snippet children(args)}
		<Textarea {...args} placeholder="Disabled textarea" />
	{/snippet}
</Story>

<Story name="With Rows">
	{#snippet children(args)}
		<Textarea {...args} rows={6} placeholder="Tall textarea with 6 rows..." />
	{/snippet}
</Story>

<Story name="Monospace">
	{#snippet children(args)}
		<Textarea {...args} class="font-mono text-xs" placeholder="Monospace textarea for code..." />
	{/snippet}
</Story>
