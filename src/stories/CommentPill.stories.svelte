<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CommentPill } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/CommentPill',
		component: CommentPill,
		tags: ['autodocs'],
	});
</script>

<Story name="With Count">
	{#snippet children(args)}
		<CommentPill count={5} />
	{/snippet}
</Story>

<Story name="Zero (hidden)" parameters={{ docs: { description: { story: 'count=0 renders nothing — the component is intentionally invisible at zero.' } } }}>
	{#snippet children(args)}
		<CommentPill count={0} />
	{/snippet}
</Story>

<Story name="Large Count">
	{#snippet children(args)}
		<CommentPill count={42} />
	{/snippet}
</Story>
