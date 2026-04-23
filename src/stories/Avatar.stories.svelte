<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Avatar',
		component: Avatar,
		tags: ['autodocs'],
	});
</script>

<Story name="WithImage" args={{}}>
	{#snippet children(args)}
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	{/snippet}
</Story>

<Story name="FallbackOnly" args={{}}>
	{#snippet children(args)}
		<Avatar>
			<AvatarFallback>DN</AvatarFallback>
		</Avatar>
	{/snippet}
</Story>

<Story name="MultipleAvatars" args={{}}>
	{#snippet children(args)}
		<div class="flex gap-2">
			<Avatar>
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>CD</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>EF</AvatarFallback>
			</Avatar>
		</div>
	{/snippet}
</Story>
