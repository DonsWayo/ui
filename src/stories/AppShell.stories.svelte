<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { AppShell, AppSidebar, NavItem, NavSection } from '$lib/index.js';
	import { LayoutDashboard, GitBranch, Settings } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Layout/AppShell',
		component: AppShell,
		tags: ['autodocs'],
	});
</script>

<Story name="WithSidebar">
	{#snippet children()}
		<div style="height: 400px; overflow: hidden; border: 1px solid var(--border); border-radius: 8px;">
			<AppShell>
				{#snippet sidebar()}
					<AppSidebar>
						{#snippet brand({ collapsed })}
							{#if !collapsed}
								<span class="text-sm font-semibold text-foreground">Nucel</span>
							{/if}
						{/snippet}
						{#snippet nav({ collapsed })}
							<NavItem href="#" label="Dashboard" icon={LayoutDashboard} {collapsed} active />
							<NavItem href="#" label="Repositories" icon={GitBranch} {collapsed} />
							<NavSection label="Settings" {collapsed} />
							<NavItem href="#" label="Settings" icon={Settings} {collapsed} />
						{/snippet}
					</AppSidebar>
				{/snippet}
				{#snippet header()}
					<span class="text-sm font-medium text-foreground">Dashboard</span>
				{/snippet}
				{#snippet children()}
					<div class="rounded-lg border border-border p-4 text-sm text-muted-foreground">
						Main content area
					</div>
				{/snippet}
			</AppShell>
		</div>
	{/snippet}
</Story>

<Story name="WithoutSidebar">
	{#snippet children()}
		<div style="height: 400px; overflow: hidden; border: 1px solid var(--border); border-radius: 8px;">
			<AppShell>
				{#snippet header()}
					<span class="text-sm font-medium text-foreground">Page Title</span>
				{/snippet}
				{#snippet children()}
					<div class="rounded-lg border border-border p-4 text-sm text-muted-foreground">
						Main content area without a sidebar
					</div>
				{/snippet}
			</AppShell>
		</div>
	{/snippet}
</Story>
