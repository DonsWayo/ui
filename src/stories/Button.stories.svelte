<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '$lib/index.js';
	import { fn, userEvent, within, expect } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Components/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
			},
			size: {
				control: { type: 'select' },
				options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
			},
			disabled: {
				control: { type: 'boolean' },
			},
		},
		args: {
			onclick: fn(),
		},
	});
</script>

<Story
	name="Default"
	args={{ children: 'Button' }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const buttons = canvas.getAllByRole('button');
		const button = buttons[0];
		await expect(button).toBeInTheDocument();
		await userEvent.click(button);
		// button click should not throw an error
		await expect(button).toBeVisible();
	}}
>
	{#snippet children(args)}
		<Button {...args}>Button</Button>
	{/snippet}
</Story>

<Story name="Destructive" args={{ variant: 'destructive', children: 'Delete' }}>
	{#snippet children(args)}
		<Button {...args}>Delete</Button>
	{/snippet}
</Story>

<Story name="Outline" args={{ variant: 'outline', children: 'Outline' }}>
	{#snippet children(args)}
		<Button {...args}>Outline</Button>
	{/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary', children: 'Secondary' }}>
	{#snippet children(args)}
		<Button {...args}>Secondary</Button>
	{/snippet}
</Story>

<Story name="Ghost" args={{ variant: 'ghost', children: 'Ghost' }}>
	{#snippet children(args)}
		<Button {...args}>Ghost</Button>
	{/snippet}
</Story>

<Story name="Link" args={{ variant: 'link', children: 'Link' }}>
	{#snippet children(args)}
		<Button {...args}>Link</Button>
	{/snippet}
</Story>

<Story name="Small" args={{ size: 'sm', children: 'Small' }}>
	{#snippet children(args)}
		<Button {...args}>Small</Button>
	{/snippet}
</Story>

<Story name="Large" args={{ size: 'lg', children: 'Large' }}>
	{#snippet children(args)}
		<Button {...args}>Large</Button>
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, children: 'Disabled' }}>
	{#snippet children(args)}
		<Button {...args}>Disabled</Button>
	{/snippet}
</Story>

<Story name="As Link" args={{ href: '#', children: 'Link Button' }}>
	{#snippet children(args)}
		<Button {...args}>Link Button</Button>
	{/snippet}
</Story>
