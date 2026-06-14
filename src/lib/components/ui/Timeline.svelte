<script lang="ts">
	import type { Component } from 'svelte';
	import { Check, X, AlertTriangle, Clock, Loader2 } from '@lucide/svelte';
	import { cn } from '$lib/utils/cn.js';

	type Status = 'success' | 'error' | 'warning' | 'pending' | 'running';

	type TimelineItem = {
		time?: string;
		title: string;
		description?: string;
		icon?: Component;
		status?: Status;
	};

	let {
		items,
		class: className,
	}: {
		items: TimelineItem[];
		class?: string;
	} = $props();

	const statusStyles: Record<Status, string> = {
		success: 'border-green-500/40 bg-green-500/10 text-green-500',
		error: 'border-destructive/40 bg-destructive/10 text-destructive',
		warning: 'border-amber-500/40 bg-amber-500/10 text-amber-500',
		pending: 'border-border bg-muted text-muted-foreground',
		running: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
	};
</script>

<ol class={cn('flex flex-col', className)}>
	{#each items as item, i (item)}
		{@const isLast = i === items.length - 1}
		{@const status = item.status}
		<li class="relative flex gap-4">
			<!-- connector line -->
			{#if !isLast}
				<div class="absolute left-[15px] top-8 h-full w-px bg-border"></div>
			{/if}

			<!-- dot / icon -->
			<div
				class={cn(
					'relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
					status ? statusStyles[status] : 'border-border bg-muted text-muted-foreground',
				)}
			>
				{#if item.icon}
					{@const Icon = item.icon}
					<Icon size={14} />
				{:else if status === 'success'}
					<Check size={14} />
				{:else if status === 'error'}
					<X size={14} />
				{:else if status === 'warning'}
					<AlertTriangle size={14} />
				{:else if status === 'running'}
					<Loader2 size={14} class="animate-spin" />
				{:else}
					<Clock size={14} />
				{/if}
			</div>

			<!-- content -->
			<div class={cn('min-w-0 flex-1 pb-6', isLast && 'pb-0')}>
				<div class="flex items-baseline gap-2">
					<span class="text-[13px] font-medium text-foreground">{item.title}</span>
					{#if item.time}
						<span class="shrink-0 text-[11px] text-muted-foreground">{item.time}</span>
					{/if}
				</div>
				{#if item.description}
					<p class="mt-0.5 text-[13px] text-muted-foreground">{item.description}</p>
				{/if}
			</div>
		</li>
	{/each}
</ol>
