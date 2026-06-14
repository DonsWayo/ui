<script lang="ts">
	import { Check, X, Loader2, CircleSlash, Clock, AlertTriangle } from '@lucide/svelte';

	type Status = 'success' | 'failure' | 'running' | 'pending' | 'cancelled' | 'warning';

	let {
		status,
		label,
		size = 'sm',
	}: {
		status: Status;
		label?: string;
		size?: 'xs' | 'sm';
	} = $props();

	const defaults: Record<Status, string> = {
		success: 'passed',
		failure: 'failed',
		running: 'running',
		pending: 'pending',
		cancelled: 'cancelled',
		warning: 'warning',
	};

	const styles: Record<Status, string> = {
		success: 'border-green-500/30 bg-green-500/10 text-green-500',
		failure: 'border-destructive/30 bg-destructive/10 text-destructive',
		running: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
		pending: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500',
		cancelled: 'border-border/60 bg-muted text-muted-foreground',
		warning: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
	};

	let text = $derived(label ?? defaults[status]);
	let sizeCls = $derived(size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5');
	let iconSize = $derived(size === 'xs' ? 'h-2.5 w-2.5' : 'h-3 w-3');
</script>

<span
	class="inline-flex items-center gap-1 rounded-full border font-medium {sizeCls} {styles[status]}"
>
	{#if status === 'success'}
		<Check class={iconSize} />
	{:else if status === 'failure'}
		<X class={iconSize} />
	{:else if status === 'running'}
		<Loader2 class="{iconSize} animate-spin" />
	{:else if status === 'cancelled'}
		<CircleSlash class={iconSize} />
	{:else if status === 'warning'}
		<AlertTriangle class={iconSize} />
	{:else}
		<Clock class={iconSize} />
	{/if}
	{text}
</span>
