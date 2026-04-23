<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Backdrop } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Backdrop',
		component: Backdrop,
		tags: ['autodocs'],
		argTypes: {
			class: { control: 'text' },
		},
	});
</script>

<Story name="Default" args={{}}>
	{#snippet children(args)}
		<div class="relative">
			<p class="p-4">Content behind backdrop</p>
			<Backdrop class="bg-black/50" />
		</div>
	{/snippet}
</Story>

<Story name="With Click" args={{}}>
	{#snippet children(args)}
		<div class="relative">
			<button class="btn">Open Modal</button>
			<Backdrop class="bg-black/50" onclick={() => console.log('clicked')} />
		</div>
	{/snippet}
</Story>
