<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { AlertCircle } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Components/Alert',
		component: Alert,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'destructive', 'success', 'warning', 'info'],
			},
		},
	});
</script>

<Story name="Default">
	<Alert>Your changes have been saved.</Alert>
</Story>

<Story name="Destructive">
	<Alert variant="destructive">Something went wrong. Please try again.</Alert>
</Story>

<Story name="Success">
	<Alert variant="success">Your account has been created successfully.</Alert>
</Story>

<Story name="Warning">
	<Alert variant="warning">Your trial ends in 3 days. Upgrade to keep your agents running.</Alert>
</Story>

<Story name="Info">
	<Alert variant="info">A new version of the agent runtime is available.</Alert>
</Story>

<Story name="With Title">
	<Alert variant="warning" title="Usage limit approaching">
		You have used 85% of your monthly token quota. Consider upgrading your plan.
	</Alert>
</Story>

<Story name="With Icon">
	<Alert variant="destructive" icon={AlertCircle} title="Deployment failed">
		The agent could not be deployed. Check the logs for more details.
	</Alert>
</Story>

<Story name="All Variants">
	<div class="flex flex-col gap-3">
		<Alert>Default — system notification with no urgency.</Alert>
		<Alert variant="info" icon={AlertCircle}>Info — informational message for the user.</Alert>
		<Alert variant="success" title="Deployment complete">
			Your agent was deployed and is now live.
		</Alert>
		<Alert variant="warning" title="Quota warning">
			You are approaching your monthly usage limit.
		</Alert>
		<Alert variant="destructive" icon={AlertCircle} title="Error">
			An unexpected error occurred. Please contact support.
		</Alert>
	</div>
</Story>
