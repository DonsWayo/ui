<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { TabBar } from '$lib/index.js';
	import { File, GitBranch, Settings } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Components/TabBar',
		component: TabBar,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['underline', 'pill', 'fill'],
			},
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical'],
			},
			size: {
				control: { type: 'select' },
				options: ['xs', 'sm'],
			},
		},
	});

	const items = [
		{ id: 'files', label: 'Files', icon: File },
		{ id: 'branches', label: 'Branches', icon: GitBranch, count: 3 },
		{ id: 'settings', label: 'Settings', icon: Settings },
	];
</script>

<Story name="Default">
	<TabBar {items} selected="files" onselect={(id) => console.log('Selected:', id)} />
</Story>

<Story name="Pill Variant">
	<TabBar
		{items}
		selected="branches"
		variant="pill"
		onselect={(id) => console.log('Selected:', id)}
	/>
</Story>

<Story name="Fill Variant">
	<TabBar
		{items}
		selected="settings"
		variant="fill"
		onselect={(id) => console.log('Selected:', id)}
	/>
</Story>

<Story name="Vertical">
	<TabBar
		{items}
		selected="files"
		orientation="vertical"
		onselect={(id) => console.log('Selected:', id)}
	/>
</Story>

<Story name="With Close">
	<TabBar
		items={[
			{ id: 'tab1', label: 'Tab 1', closable: true },
			{ id: 'tab2', label: 'Tab 2', closable: true },
			{ id: 'tab3', label: 'Tab 3', closable: true },
		]}
		selected="tab1"
		onselect={(id) => console.log('Selected:', id)}
		onclose={(id) => console.log('Closed:', id)}
	/>
</Story>

<Story name="XS Size">
	<TabBar {items} selected="files" size="xs" onselect={(id) => console.log('Selected:', id)} />
</Story>
