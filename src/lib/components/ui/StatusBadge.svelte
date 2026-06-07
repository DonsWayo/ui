<script lang="ts">
	import { Badge } from '../../index.js';
	import StatusDot from './StatusDot.svelte';

	let { status, label }: { status: string; label?: string } = $props();

	const displayLabel = $derived(label ?? status);

	const classes: Record<string, string> = {
		open: 'border-success/30 bg-success/10 text-success',
		closed: '',
		merged:
			'border-purple-500/30 bg-purple-500/10 text-purple-700 dark:border-purple-400/30 dark:bg-purple-400/10 dark:text-purple-300',
		running:
			'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300',
		active:
			'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300',
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
