<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Switch } from '$lib/index.js';
	import { fn, within, expect } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Components/Switch',
		component: Switch,
		tags: ['autodocs'],
		argTypes: {
			checked: { control: { type: 'boolean' } },
			disabled: { control: { type: 'boolean' } },
		},
		args: {
			onCheckedChange: fn(),
		},
	});
</script>

<Story
	name="Default"
	args={{}}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const sw = canvas.getByRole('switch');
		await expect(sw).toBeInTheDocument();
		await expect(sw).toHaveAttribute('data-state', 'unchecked');
	}}
>
	{#snippet children(args)}
		<Switch {...args} />
	{/snippet}
</Story>

<Story name="Checked" args={{ checked: true }}>
	{#snippet children(args)}
		<Switch {...args} />
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	{#snippet children(args)}
		<Switch {...args} />
	{/snippet}
</Story>

<Story name="Disabled Checked" args={{ disabled: true, checked: true }}>
	{#snippet children(args)}
		<Switch {...args} />
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet children(args)}
		<label class="flex items-center gap-2 text-sm font-medium select-none">
			<Switch {...args} />
			Enable notifications
		</label>
	{/snippet}
</Story>
