<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Input } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Input',
		component: Input,
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
		<Input {...args} placeholder="Enter text..." />
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	{#snippet children(args)}
		<Input {...args} placeholder="Disabled input" />
	{/snippet}
</Story>

<Story name="Password">
	{#snippet children(args)}
		<Input {...args} type="password" placeholder="Enter password..." />
	{/snippet}
</Story>

<Story name="Number">
	{#snippet children(args)}
		<Input {...args} type="number" placeholder="0" />
	{/snippet}
</Story>
