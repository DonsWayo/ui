<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Skeleton } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Skeleton',
		component: Skeleton,
		tags: ['autodocs'],
	});
</script>

<Story name="Line">
	{#snippet children(args)}
		<Skeleton class="h-4 w-48" />
	{/snippet}
</Story>

<Story name="Circle">
	{#snippet children(args)}
		<Skeleton class="h-10 w-10 rounded-full" />
	{/snippet}
</Story>

<Story name="Card Skeleton">
	{#snippet children(args)}
		<div class="flex flex-col gap-3 rounded-lg border p-4 w-64">
			<div class="flex flex-row items-center gap-3">
				<Skeleton class="h-10 w-10 rounded-full" />
				<div class="flex flex-col gap-2 flex-1">
					<Skeleton class="h-4 w-32" />
					<Skeleton class="h-3 w-24" />
				</div>
			</div>
			<Skeleton class="h-3 w-full" />
			<Skeleton class="h-3 w-full" />
			<Skeleton class="h-3 w-3/4" />
		</div>
	{/snippet}
</Story>
