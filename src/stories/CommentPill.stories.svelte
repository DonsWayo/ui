<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CommentPill } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/CommentPill',
		component: CommentPill,
		tags: ['autodocs'],
	});
</script>

<Story name="With Count" args={{ count: 5 }}>
	{#snippet children(args)}
		<CommentPill {...args} />
	{/snippet}
</Story>

<Story
	name="Zero (hidden)"
	args={{ count: 0 }}
	parameters={{
		docs: {
			description: {
				story: 'count=0 renders nothing — the component is intentionally invisible at zero.',
			},
		},
	}}
>
	{#snippet children(args)}
		<CommentPill {...args} />
	{/snippet}
</Story>

<Story name="Large Count" args={{ count: 42 }}>
	{#snippet children(args)}
		<CommentPill {...args} />
	{/snippet}
</Story>
