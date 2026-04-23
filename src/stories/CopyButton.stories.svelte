<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CopyButton } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/CopyButton',
		component: CopyButton,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{ text: 'Hello, world!' }}>
	{#snippet children(args)}
		<CopyButton {...args} />
	{/snippet}
</Story>

<Story name="Larger Icon" args={{ text: 'Some code snippet', size: 20 }}>
	{#snippet children(args)}
		<CopyButton {...args} />
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet children()}
		<div class="flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-sm">
			<span class="flex-1 text-foreground">npm install @nucel/ui</span>
			<CopyButton text="npm install @nucel/ui" />
		</div>
	{/snippet}
</Story>
