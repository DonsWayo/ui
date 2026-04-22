<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { BranchPill } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/BranchPill',
		component: BranchPill,
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	{#snippet children(args)}
		<BranchPill name="main" />
	{/snippet}
</Story>

<Story name="Small">
	{#snippet children(args)}
		<BranchPill size="xs" name="feature/auth" />
	{/snippet}
</Story>

<Story name="Long Branch Name">
	{#snippet children(args)}
		<BranchPill name="fix/auth-middleware-session-token-storage" />
	{/snippet}
</Story>
