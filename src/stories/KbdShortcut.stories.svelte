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

<Story name="Default">
	{#snippet children(args)}
		<KbdShortcut keys={['Ctrl', 'K']} />
	{/snippet}
</Story>

<Story name="Single Key">
	{#snippet children(args)}
		<KbdShortcut keys={['Enter']} />
	{/snippet}
</Story>

<Story name="Three Keys">
	{#snippet children(args)}
		<KbdShortcut keys={['Ctrl', 'Shift', 'P']} />
	{/snippet}
</Story>

<Story name="Small Size">
	{#snippet children(args)}
		<KbdShortcut keys={['Ctrl', 'K']} size="xs" />
	{/snippet}
</Story>
