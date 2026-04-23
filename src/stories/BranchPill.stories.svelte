<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { BranchPill } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/BranchPill',
		component: BranchPill,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{ name: 'main' }}>
	{#snippet children(args)}
		<BranchPill {...args} />
	{/snippet}
</Story>

<Story name="Small" args={{ size: 'xs', name: 'feature/auth' }}>
	{#snippet children(args)}
		<BranchPill {...args} />
	{/snippet}
</Story>

<Story name="Long Branch Name" args={{ name: 'fix/auth-middleware-session-token-storage' }}>
	{#snippet children(args)}
		<BranchPill {...args} />
	{/snippet}
</Story>
