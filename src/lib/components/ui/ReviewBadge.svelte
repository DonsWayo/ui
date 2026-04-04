<script lang="ts">
	import { Badge } from '../../index.js';

	let { status, reviewer }: { status: string; reviewer: string } = $props();

	let icon = $derived(
		status === 'approved' ? 'check' : status === 'changes_requested' ? 'x' : 'comment',
	);

	let label = $derived(
		status === 'approved'
			? 'approved'
			: status === 'changes_requested'
				? 'requested changes'
				: 'commented',
	);

	const variantMap: Record<string, string> = {
		approved: 'border-success/30 bg-success/10 text-success',
		changes_requested: 'border-destructive/30 bg-destructive/10 text-destructive',
		commented: '',
	};

	const variant = $derived(status === 'commented' ? 'secondary' : 'outline');
	const extraClass = $derived(variantMap[status] ?? '');
</script>

<Badge {variant} class="inline-flex items-center gap-1.5 rounded-full {extraClass}">
	{#if icon === 'check'}
		<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
	{:else if icon === 'x'}
		<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	{:else}
		<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
			/>
		</svg>
	{/if}
	<span class="font-medium">{reviewer}</span>
	<span>{label}</span>
</Badge>
