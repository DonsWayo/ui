<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
		DialogFooter,
		DialogClose,
		Button,
	} from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Dialog',
		component: Dialog,
		tags: ['autodocs'],
	});
</script>

<Story name="Basic" args={{}}>
	{#snippet children(args)}
		<Dialog>
			<DialogTrigger>
				<Button variant="outline">Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm action</DialogTitle>
					<DialogDescription>
						Are you sure you want to proceed? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	{/snippet}
</Story>

<Story name="WithForm" args={{}}>
	{#snippet children(args)}
		<Dialog>
			<DialogTrigger>
				<Button>Create new item</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create item</DialogTitle>
					<DialogDescription>Fill in the details below to create a new item.</DialogDescription>
				</DialogHeader>
				<div class="grid gap-4 py-4">
					<input
						placeholder="Item name"
						class="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm"
					/>
				</div>
				<DialogFooter>
					<DialogClose>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button>Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	{/snippet}
</Story>
