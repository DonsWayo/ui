<script lang="ts">
	import type { Snippet, Component } from 'svelte';

	let {
		icon,
		title,
		description,
		action,
		variant = 'default',
	}: {
		icon?: Component<{ class?: string }>;
		title: string;
		description?: string;
		action?: Snippet;
		variant?: 'default' | 'compact' | 'inline';
	} = $props();
</script>

{#if variant === 'inline'}
	<div class="text-muted-foreground flex items-center gap-2 px-3 py-2 text-xs">
		{#if icon}
			{@const Icon = icon}
			<Icon class="h-3.5 w-3.5 shrink-0" />
		{/if}
		<span>{title}</span>
	</div>
{:else if variant === 'compact'}
	<div class="flex flex-col items-center gap-1.5 px-4 py-6 text-center">
		{#if icon}
			{@const Icon = icon}
			<div class="bg-secondary flex h-9 w-9 items-center justify-center rounded-lg">
				<Icon class="text-muted-foreground h-4 w-4" />
			</div>
		{/if}
		<p class="text-muted-foreground text-xs font-medium">{title}</p>
		{#if description}
			<p class="text-muted-foreground/70 max-w-[200px] text-[10px]">{description}</p>
		{/if}
		{#if action}
			<div class="mt-1">
				{@render action()}
			</div>
		{/if}
	</div>
{:else}
	<div class="flex flex-col items-center gap-2 px-6 py-10 text-center">
		{#if icon}
			{@const Icon = icon}
			<div class="relative mb-1">
				<div class="bg-secondary flex h-12 w-12 items-center justify-center rounded-xl">
					<Icon class="text-muted-foreground h-5 w-5" />
				</div>
				<div
					class="border-background bg-muted absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2"
				></div>
			</div>
		{/if}
		<p class="text-foreground/80 text-sm font-medium">{title}</p>
		{#if description}
			<p class="text-muted-foreground max-w-[260px] text-xs">{description}</p>
		{/if}
		{#if action}
			<div class="mt-2">
				{@render action()}
			</div>
		{/if}
	</div>
{/if}
