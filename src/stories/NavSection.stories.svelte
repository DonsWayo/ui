<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { NavSection, NavItem } from '$lib/index.js';
	import { LayoutDashboard, Settings } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Layout/NavSection',
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	{#snippet children()}
		<div class="w-56 rounded-lg border border-border bg-sidebar p-2">
			<NavSection label="Main" />
			<NavItem href="#" label="Dashboard" icon={LayoutDashboard} />
			<NavSection label="System" />
			<NavItem href="#" label="Settings" icon={Settings} />
		</div>
	{/snippet}
</Story>

<Story name="Collapsed">
	{#snippet children()}
		<div class="w-14 rounded-lg border border-border bg-sidebar p-2">
			<NavSection label="Main" collapsed />
			<NavItem href="#" label="Dashboard" icon={LayoutDashboard} collapsed />
			<NavSection label="System" collapsed />
			<NavItem href="#" label="Settings" icon={Settings} collapsed />
		</div>
	{/snippet}
</Story>
