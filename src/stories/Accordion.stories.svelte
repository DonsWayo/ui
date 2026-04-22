<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Accordion',
		component: Accordion,
		tags: ['autodocs'],
	});
</script>

<Story name="Single">
	{#snippet children(args)}
		<Accordion type="single" class="w-80">
			<AccordionItem value="item-1">
				<AccordionTrigger>What is Nucel?</AccordionTrigger>
				<AccordionContent>
					Nucel is an AI agent platform that lets you run autonomous agents across your repositories.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>How do agents work?</AccordionTrigger>
				<AccordionContent>
					Agents are triggered by events in your connected tools and autonomously complete tasks like reviewing
					code, triaging issues, and drafting pull requests.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Which providers are supported?</AccordionTrigger>
				<AccordionContent>
					Nucel supports GitHub, GitLab, Bitbucket, Linear, Jira, Plane, and Azure DevOps.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	{/snippet}
</Story>

<Story name="Multiple">
	{#snippet children(args)}
		<Accordion type="multiple" class="w-80">
			<AccordionItem value="item-1">
				<AccordionTrigger>Can I open multiple at once?</AccordionTrigger>
				<AccordionContent>
					Yes — in multiple mode every item can be expanded independently.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Does closing one affect others?</AccordionTrigger>
				<AccordionContent>
					No, each item is completely independent in multiple mode.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Is this useful for settings panels?</AccordionTrigger>
				<AccordionContent>
					Absolutely — multiple mode works great for settings or filter panels where several sections
					need to stay open simultaneously.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	{/snippet}
</Story>

<Story name="Default Open">
	{#snippet children(args)}
		<Accordion type="single" value="item-2" class="w-80">
			<AccordionItem value="item-1">
				<AccordionTrigger>Closed by default</AccordionTrigger>
				<AccordionContent>This item starts closed.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Open by default</AccordionTrigger>
				<AccordionContent>
					This item is open because its value matches the accordion's initial value prop.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Also closed</AccordionTrigger>
				<AccordionContent>This item also starts closed.</AccordionContent>
			</AccordionItem>
		</Accordion>
	{/snippet}
</Story>
