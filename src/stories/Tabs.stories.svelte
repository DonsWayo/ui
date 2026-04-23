<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Tabs',
		component: Tabs,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{}}>
	{#snippet children(args)}
		<Tabs value="overview" class="w-80">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="activity">Activity</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<p class="text-sm text-muted-foreground">Overview content goes here.</p>
			</TabsContent>
			<TabsContent value="activity">
				<p class="text-sm text-muted-foreground">Recent activity will appear here.</p>
			</TabsContent>
			<TabsContent value="settings">
				<p class="text-sm text-muted-foreground">Configure your settings here.</p>
			</TabsContent>
		</Tabs>
	{/snippet}
</Story>

<Story name="SecondTabActive" args={{}}>
	{#snippet children(args)}
		<Tabs value="activity" class="w-80">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="activity">Activity</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<p class="text-sm text-muted-foreground">Overview content goes here.</p>
			</TabsContent>
			<TabsContent value="activity">
				<p class="text-sm text-muted-foreground">Recent activity will appear here.</p>
			</TabsContent>
			<TabsContent value="settings">
				<p class="text-sm text-muted-foreground">Configure your settings here.</p>
			</TabsContent>
		</Tabs>
	{/snippet}
</Story>
