<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Select',
		component: Select,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{}}>
	{#snippet children(args)}
		<Select>
			<SelectTrigger class="w-48">
				<span>Pick a framework</span>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="svelte">Svelte</SelectItem>
				<SelectItem value="react">React</SelectItem>
				<SelectItem value="vue">Vue</SelectItem>
				<SelectItem value="solid">Solid</SelectItem>
			</SelectContent>
		</Select>
	{/snippet}
</Story>

<Story name="Disabled" args={{}}>
	{#snippet children(args)}
		<Select disabled>
			<SelectTrigger class="w-48">
				<span>Disabled select</span>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="a">Option A</SelectItem>
				<SelectItem value="b">Option B</SelectItem>
			</SelectContent>
		</Select>
	{/snippet}
</Story>

<Story name="WithPreselected" args={{}}>
	{#snippet children(args)}
		<Select value="react">
			<SelectTrigger class="w-48">
				<span>React</span>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="svelte">Svelte</SelectItem>
				<SelectItem value="react">React</SelectItem>
				<SelectItem value="vue">Vue</SelectItem>
			</SelectContent>
		</Select>
	{/snippet}
</Story>
