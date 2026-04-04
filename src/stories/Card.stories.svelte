<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
		Button,
	} from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Card',
		component: Card,
		tags: ['autodocs'],
	});
</script>

<Story name="Default">
	<Card class="w-[350px]">
		<CardHeader>
			<CardTitle>Create project</CardTitle>
			<CardDescription>Deploy your new project in one-click.</CardDescription>
		</CardHeader>
		<CardContent>
			<p>Card content goes here.</p>
		</CardContent>
		<CardFooter class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button>Deploy</Button>
		</CardFooter>
	</Card>
</Story>

<Story name="With Form">
	<Card class="w-[350px]">
		<CardHeader>
			<CardTitle>Login</CardTitle>
			<CardDescription>Enter your credentials to continue.</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<label for="email">Email</label>
					<input
						id="email"
						placeholder="m@example.com"
						class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
					/>
				</div>
				<div class="flex flex-col space-y-1.5">
					<label for="password">Password</label>
					<input
						id="password"
						type="password"
						class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
					/>
				</div>
			</div>
		</CardContent>
		<CardFooter class="flex justify-between">
			<Button variant="outline">Cancel</Button>
			<Button>Login</Button>
		</CardFooter>
	</Card>
</Story>
