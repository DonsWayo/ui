<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { VerticalSeparator } from '$lib/index.js';
	import { Button } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/VerticalSeparator',
		component: VerticalSeparator,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{}}>
	{#snippet children(args)}
		<div class="flex items-center gap-4">
			<Button variant="outline">First</Button>
			<VerticalSeparator />
			<Button variant="outline">Second</Button>
			<VerticalSeparator />
			<Button variant="outline">Third</Button>
		</div>
	{/snippet}
</Story>
