<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { AppSidebar, NavItem, NavSection } from '$lib/index.js';
	import { LayoutDashboard, GitBranch, Settings, Users, Bell } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Layout/AppSidebar',
		tags: ['autodocs'],
	});
</script>

<Story name="Expanded">
	{#snippet children()}
		<div style="height: 400px; display: flex; border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
			<AppSidebar collapsed={false}>
				{#snippet brand({ collapsed })}
					{#if !collapsed}
						<span class="text-sm font-semibold text-foreground">Nucel</span>
					{/if}
				{/snippet}
				{#snippet nav({ collapsed })}
					<NavSection label="Main" {collapsed} />
					<NavItem href="#" label="Dashboard" icon={LayoutDashboard} {collapsed} active />
					<NavItem href="#" label="Repositories" icon={GitBranch} {collapsed} />
					<NavItem href="#" label="Team" icon={Users} {collapsed} />
					<NavSection label="System" {collapsed} />
					<NavItem href="#" label="Settings" icon={Settings} {collapsed} />
				{/snippet}
			</AppSidebar>
		</div>
	{/snippet}
</Story>

<Story name="Collapsed">
	{#snippet children()}
		<div style="height: 400px; display: flex; border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
			<AppSidebar collapsed={true}>
				{#snippet brand({ collapsed })}
					{#if !collapsed}
						<span class="text-sm font-semibold text-foreground">Nucel</span>
					{/if}
				{/snippet}
				{#snippet nav({ collapsed })}
					<NavSection label="Main" {collapsed} />
					<NavItem href="#" label="Dashboard" icon={LayoutDashboard} {collapsed} active />
					<NavItem href="#" label="Repositories" icon={GitBranch} {collapsed} />
					<NavItem href="#" label="Team" icon={Users} {collapsed} />
					<NavSection label="System" {collapsed} />
					<NavItem href="#" label="Settings" icon={Settings} {collapsed} />
				{/snippet}
			</AppSidebar>
		</div>
	{/snippet}
</Story>

<Story name="WithFooter">
	{#snippet children()}
		<div style="height: 400px; display: flex; border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
			<AppSidebar collapsed={false}>
				{#snippet brand({ collapsed })}
					{#if !collapsed}
						<span class="text-sm font-semibold text-foreground">Nucel</span>
					{/if}
				{/snippet}
				{#snippet nav({ collapsed })}
					<NavSection label="Main" {collapsed} />
					<NavItem href="#" label="Dashboard" icon={LayoutDashboard} {collapsed} active />
					<NavItem href="#" label="Repositories" icon={GitBranch} {collapsed} />
					<NavItem href="#" label="Team" icon={Users} {collapsed} />
				{/snippet}
				{#snippet footer({ collapsed })}
					<NavItem href="#" label="Notifications" icon={Bell} {collapsed} />
					<NavItem href="#" label="Settings" icon={Settings} {collapsed} />
				{/snippet}
			</AppSidebar>
		</div>
	{/snippet}
</Story>
