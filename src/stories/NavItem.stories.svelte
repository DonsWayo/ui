<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { NavItem } from '$lib/index.js';
	import { LayoutDashboard, GitBranch, Settings } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Layout/NavItem',
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	{#snippet children()}
		<div class="w-56 rounded-lg border border-border bg-sidebar p-2">
			<NavItem href="#" label="Dashboard" icon={LayoutDashboard} />
		</div>
	{/snippet}
</Story>

<Story name="Active">
	{#snippet children()}
		<div class="w-56 rounded-lg border border-border bg-sidebar p-2">
			<NavItem href="#" label="Dashboard" icon={LayoutDashboard} active />
		</div>
	{/snippet}
</Story>

<Story name="IconOnly">
	{#snippet children()}
		<div class="w-14 rounded-lg border border-border bg-sidebar p-2">
			<NavItem href="#" label="Dashboard" icon={LayoutDashboard} collapsed />
		</div>
	{/snippet}
</Story>

<Story name="AllStates">
	{#snippet children()}
		<div class="w-56 rounded-lg border border-border bg-sidebar p-2 flex flex-col gap-0.5">
			<NavItem href="#" label="Dashboard" icon={LayoutDashboard} />
			<NavItem href="#" label="Repositories" icon={GitBranch} active />
			<NavItem href="#" label="Settings" icon={Settings} />
		</div>
	{/snippet}
</Story>
