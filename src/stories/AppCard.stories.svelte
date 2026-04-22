<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { AppCard, Button, Badge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/AppCard',
		component: AppCard,
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	{#snippet children(args)}
		<div class="rounded-xl border border-border">
			<AppCard
				name="Deploy Bot"
				href="/apps/deploy-bot"
				subtitle="Automates deployments"
				{...args}
			/>
		</div>
	{/snippet}
</Story>

<Story name="With Permissions">
	{#snippet children(args)}
		<div class="rounded-xl border border-border">
			<AppCard
				name="Deploy Bot"
				href="/apps/deploy-bot"
				subtitle="Automates deployments"
				permissions={{ deployments: 'write', issues: 'read', actions: 'none' }}
				{...args}
			/>
		</div>
	{/snippet}
</Story>

<Story name="With Actions">
	{#snippet children(args)}
		<div class="rounded-xl border border-border">
			<AppCard
				name="Deploy Bot"
				href="/apps/deploy-bot"
				subtitle="Automates deployments"
				permissions={{ deployments: 'write', issues: 'read', actions: 'none' }}
				{...args}
			>
				{#snippet actions()}
					<Button size="sm" variant="outline">Install</Button>
				{/snippet}
			</AppCard>
		</div>
	{/snippet}
</Story>

<Story name="Without Icon">
	{#snippet children(args)}
		<div class="rounded-xl border border-border">
			<AppCard
				name="Deploy Bot"
				href="/apps/deploy-bot"
				subtitle="Automates deployments"
				{...args}
			/>
		</div>
	{/snippet}
</Story>
