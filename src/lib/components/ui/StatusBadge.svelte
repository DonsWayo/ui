<script lang="ts">
	import { Badge } from '../../index.js';
	import StatusDot from './StatusDot.svelte';

	let { status, label }: { status: string; label?: string } = $props();

	const displayLabel = $derived(label ?? status);

	const classes: Record<string, string> = {
		open: 'border-success/30 bg-success/10 text-success',
		closed: '',
		merged: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
		running: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
		active: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
		passed: 'border-success/30 bg-success/10 text-success',
		succeeded: 'border-success/30 bg-success/10 text-success',
		failed: 'border-destructive/30 bg-destructive/10 text-destructive',
		error: 'border-destructive/30 bg-destructive/10 text-destructive',
		cancelled: '',
		paused: '',
	};

	const variant = $derived(
		status === 'closed' || status === 'cancelled' || status === 'paused' ? 'secondary' : 'outline',
	);
	const extraClass = $derived(classes[status] ?? '');
</script>

<Badge {variant} class="inline-flex items-center gap-1 {extraClass}">
	<StatusDot {status} />
	<span>{displayLabel}</span>
</Badge>
