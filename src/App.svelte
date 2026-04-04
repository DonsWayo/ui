<script lang="ts">
	import {
		Button,
		Badge,
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/index.js';
</script>

<div class="container mx-auto space-y-8 p-8">
	<h1 class="text-3xl font-bold">@nucel/ui Components</h1>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Buttons</h2>
		<div class="flex gap-4">
			<Button>Default</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Badges</h2>
		<div class="flex gap-4">
			<Badge>Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Cards</h2>
		<div class="grid grid-cols-2 gap-4">
			<Card>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card description goes here.</CardDescription>
				</CardHeader>
				<CardContent>
					<p>This is the card content area.</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Another Card</CardTitle>
					<CardDescription>With different content.</CardDescription>
				</CardHeader>
				<CardContent>
					<p>More card content here.</p>
				</CardContent>
			</Card>
		</div>
	</section>
</div>
