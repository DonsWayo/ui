<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		Tooltip,
		TooltipContent,
		TooltipTrigger,
		TooltipProvider,
		Button,
	} from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Tooltip',
		component: TooltipProvider,
		tags: ['autodocs'],
	});
</script>

<Story name="Default" args={{}}>
	{#snippet children(args)}
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button variant="outline">Hover me</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>This is a tooltip</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	{/snippet}
</Story>

<Story name="HelpTooltip" args={{}}>
	{#snippet children(args)}
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button variant="outline">More info</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>More information about this feature</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	{/snippet}
</Story>
