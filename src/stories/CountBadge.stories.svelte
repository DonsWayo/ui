<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CountBadge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/CountBadge',
		component: CountBadge,
		tags: ['autodocs'],
		argTypes: {
			count: { control: 'number' },
			max: { control: 'number' },
			variant: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'destructive'],
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'md'],
			},
		},
	});
</script>

<Story name="Default" args={{ count: 5 }}>
	{#snippet children(args)}
		<CountBadge {...args} />
	{/snippet}
</Story>

<Story name="With Max" args={{ count: 150, max: 99 }}>
	{#snippet children(args)}
		<CountBadge {...args} />
	{/snippet}
</Story>

<Story name="Variants" args={{}}>
	{#snippet children(args)}
		<div class="flex gap-4">
			<CountBadge count={5} variant="primary" />
			<CountBadge count={10} variant="secondary" />
			<CountBadge count={3} variant="destructive" />
		</div>
	{/snippet}
</Story>

<Story name="Sizes" args={{}}>
	{#snippet children(args)}
		<div class="flex items-center gap-4">
			<CountBadge count={5} size="sm" />
			<CountBadge count={10} size="md" />
		</div>
	{/snippet}
</Story>

<Story name="Zero Count (Hidden)" args={{ count: 0 }}>
	{#snippet children(args)}
		<CountBadge {...args} />
	{/snippet}
</Story>
