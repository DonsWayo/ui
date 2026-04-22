<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ProviderIcon } from '$lib/index.js';

	// Supported provider values (from ProviderIcon.svelte):
	//   'github' | 'github_issues' | 'gitlab' | 'linear' | 'jira'
	//   'bitbucket' | 'plane' | 'digitalocean' | 'do' | 'azure' | 'azuredevops'
	// Anything else renders the generic git icon.

	const { Story } = defineMeta({
		title: 'Components/ProviderIcon',
		component: ProviderIcon,
		tags: ['autodocs'],
		argTypes: {
			provider: {
				control: { type: 'select' },
				options: [
					'github',
					'github_issues',
					'gitlab',
					'linear',
					'jira',
					'bitbucket',
					'plane',
					'digitalocean',
					'azure',
					'azuredevops',
					'unknown',
				],
			},
		},
	});
</script>

<Story name="GitHub" args={{ provider: 'github' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="GitHub Issues" args={{ provider: 'github_issues' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="GitLab" args={{ provider: 'gitlab' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="Linear" args={{ provider: 'linear' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="Jira" args={{ provider: 'jira' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="Bitbucket" args={{ provider: 'bitbucket' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="Plane" args={{ provider: 'plane' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="DigitalOcean" args={{ provider: 'digitalocean' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="Azure DevOps" args={{ provider: 'azuredevops' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="Unknown (Generic)" args={{ provider: 'unknown' }}>
	{#snippet children(args)}
		<ProviderIcon {...args} />
	{/snippet}
</Story>

<Story name="All Providers">
	{#snippet children(args)}
		<div class="flex flex-row flex-wrap gap-4 items-center">
			{#each ['github', 'github_issues', 'gitlab', 'linear', 'jira', 'bitbucket', 'plane', 'digitalocean', 'azuredevops'] as provider}
				<div class="flex flex-col items-center gap-1">
					<ProviderIcon {provider} class="h-5 w-5" />
					<span class="text-[10px] text-muted-foreground">{provider}</span>
				</div>
			{/each}
		</div>
	{/snippet}
</Story>
