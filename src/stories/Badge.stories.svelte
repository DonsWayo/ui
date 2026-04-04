<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Badge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'secondary', 'destructive', 'outline'],
			},
		},
	});
</script>

<Story name="Default">
	<Badge>Badge</Badge>
</Story>

<Story name="Secondary">
	<Badge variant="secondary">Secondary</Badge>
</Story>

<Story name="Destructive">
	<Badge variant="destructive">Destructive</Badge>
</Story>

<Story name="Outline">
	<Badge variant="outline">Outline</Badge>
</Story>
