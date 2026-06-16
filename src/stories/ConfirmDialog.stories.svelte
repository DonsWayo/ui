<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ConfirmDialog, Button } from '$lib/index.js';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Components/ConfirmDialog',
		component: ConfirmDialog,
		tags: ['autodocs'],
		argTypes: {
			destructive: { control: { type: 'boolean' } },
			loading: { control: { type: 'boolean' } },
		},
		args: {
			onConfirm: fn(),
			onCancel: fn(),
		},
	});
</script>

<script>
	let basicOpen = $state(false);
	let destructiveOpen = $state(false);
	let loadingOpen = $state(false);
	let loadingBusy = $state(false);
	let typeOpen = $state(false);
</script>

<Story name="Basic">
	{#snippet children(args)}
		<Button variant="outline" onclick={() => (basicOpen = true)}>Open confirm</Button>
		<ConfirmDialog
			bind:open={basicOpen}
			title="Confirm action"
			description="Are you sure you want to proceed? This action cannot be undone."
			onConfirm={() => {
				args.onConfirm?.();
				basicOpen = false;
			}}
		/>
	{/snippet}
</Story>

<Story name="Destructive">
	{#snippet children(args)}
		<Button variant="destructive" onclick={() => (destructiveOpen = true)}>Delete</Button>
		<ConfirmDialog
			bind:open={destructiveOpen}
			destructive
			title="Delete deployment"
			description="This permanently removes the deployment and all its logs."
			confirmLabel="Delete"
			onConfirm={() => {
				args.onConfirm?.();
				destructiveOpen = false;
			}}
		/>
	{/snippet}
</Story>

<Story name="Loading">
	{#snippet children(args)}
		<Button variant="outline" onclick={() => (loadingOpen = true)}>Open (busy on confirm)</Button>
		<ConfirmDialog
			bind:open={loadingOpen}
			loading={loadingBusy}
			title="Publish changes"
			description="Your changes will be rolled out to all environments."
			confirmLabel="Publish"
			onConfirm={() => {
				args.onConfirm?.();
				loadingBusy = true;
				setTimeout(() => {
					loadingBusy = false;
					loadingOpen = false;
				}, 1500);
			}}
		/>
	{/snippet}
</Story>

<Story name="Type To Confirm">
	{#snippet children(args)}
		<Button variant="destructive" onclick={() => (typeOpen = true)}>Delete repo</Button>
		<ConfirmDialog
			bind:open={typeOpen}
			destructive
			title="Delete repository"
			description="This cannot be undone. Type the repository name to confirm."
			confirmText="nucel/web"
			confirmLabel="Delete repository"
			onConfirm={() => {
				args.onConfirm?.();
				typeOpen = false;
			}}
		/>
	{/snippet}
</Story>
