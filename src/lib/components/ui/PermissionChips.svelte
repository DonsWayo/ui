<script lang="ts">
	// Compact permission chips for Nucel-App permission sets.
	//
	// Used by the marketplace card, installed-apps card, and the
	// developer's per-app Show page. Filters out `none` automatically and
	// sorts alphabetically so the visual order is stable across calls.
	//
	// `compact=true` (default) renders single-line `key:level` chips
	// (used inside cards). `compact=false` renders a per-row list with
	// primary-tinted level badges (used on the Show page).

	let {
		permissions,
		compact = true,
	}: {
		permissions: Record<string, string> | null | undefined;
		compact?: boolean;
	} = $props();

	const entries = $derived(
		Object.entries(permissions ?? {})
			.filter(([_, v]) => typeof v === 'string' && v !== 'none')
			.sort(([a], [b]) => a.localeCompare(b)),
	);
</script>

{#if entries.length === 0}
	<span class="text-[11px] italic text-muted-foreground">No write access requested.</span>
{:else if compact}
	<div class="flex flex-wrap gap-1">
		{#each entries as [key, level]}
			<span class="rounded-md border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[11px]">
				<code class="font-mono">{key}</code>:{level}
			</span>
		{/each}
	</div>
{:else}
	<ul class="space-y-1.5">
		{#each entries as [key, level]}
			<li
				class="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-muted/30 px-3 py-1.5 text-xs"
			>
				<code class="font-mono">{key}</code>
				<span
					class="rounded-md border px-1.5 py-0.5 text-[11px] {level === 'write' || level === 'admin'
						? 'border-primary/40 bg-primary/10 text-primary'
						: 'border-border/60 bg-muted text-muted-foreground'}"
				>
					{level}
				</span>
			</li>
		{/each}
	</ul>
{/if}
