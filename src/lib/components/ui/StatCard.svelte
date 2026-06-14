<script lang="ts">
	let {
		label,
		value,
		hint,
	}: {
		label: string;
		value: string | number;
		hint?: string;
	} = $props();
</script>

<div class="rounded-xl border border-border bg-card p-4">
	<div class="text-xl font-semibold tracking-tight tabular-nums text-foreground">{value}</div>
	<div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
		{label}
	</div>
	{#if hint}
		<div class="mt-1 text-[11px] text-muted-foreground/70">{hint}</div>
	{/if}
</div>
