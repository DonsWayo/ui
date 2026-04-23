<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { KbdShortcut } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/KbdShortcut',
		component: KbdShortcut,
		tags: ['autodocs'],
		argTypes: {
			keys: { control: 'object' },
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm'],
			},
		},
	});
</script>

<Story name="Default" args={{ keys: ['Ctrl', 'K'] }}>
	{#snippet children(args)}
		<KbdShortcut {...args} />
	{/snippet}
</Story>

<Story name="Single Key" args={{ keys: ['Enter'] }}>
	{#snippet children(args)}
		<KbdShortcut {...args} />
	{/snippet}
</Story>

<Story name="Three Keys" args={{ keys: ['Ctrl', 'Shift', 'P'] }}>
	{#snippet children(args)}
		<KbdShortcut {...args} />
	{/snippet}
</Story>

<Story name="Small Size" args={{ keys: ['Ctrl', 'K'], size: 'xs' }}>
	{#snippet children(args)}
		<KbdShortcut {...args} />
	{/snippet}
</Story>
