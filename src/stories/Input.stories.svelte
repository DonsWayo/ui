<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { userEvent, within, expect } from 'storybook/test';
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

<Story
	name="Default"
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');
		await userEvent.type(input, 'Hello world');
		await expect(input).toHaveValue('Hello world');
	}}
>
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
