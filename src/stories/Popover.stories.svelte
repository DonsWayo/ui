<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Popover, Button, Avatar, AvatarFallback } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Popover',
		component: Popover,
		tags: ['autodocs'],
		argTypes: {
			side: {
				control: { type: 'select' },
				options: ['top', 'right', 'bottom', 'left'],
			},
			align: {
				control: { type: 'select' },
				options: ['start', 'center', 'end'],
			},
		},
	});
</script>

<Story name="Basic">
	{#snippet children(args)}
		<Popover {...args}>
			{#snippet trigger()}
				<Button variant="outline">Open popover</Button>
			{/snippet}
			<div class="flex flex-col gap-2">
				<p class="text-sm leading-none font-medium">Dimensions</p>
				<p class="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
			</div>
		</Popover>
	{/snippet}
</Story>

<Story name="Avatar Menu" args={{ align: 'end' }}>
	{#snippet children(args)}
		<Popover {...args} class="w-56 p-1">
			{#snippet trigger()}
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			{/snippet}
			<div class="flex flex-col">
				<button class="hover:bg-accent rounded-sm px-2 py-1.5 text-start text-sm">Profile</button>
				<button class="hover:bg-accent rounded-sm px-2 py-1.5 text-start text-sm">Settings</button>
				<button class="hover:bg-accent rounded-sm px-2 py-1.5 text-start text-sm">Sign out</button>
			</div>
		</Popover>
	{/snippet}
</Story>
