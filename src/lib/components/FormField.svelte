<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../utils.js';

	let {
		label,
		error,
		hint,
		required = false,
		htmlFor,
		class: className,
		children,
	}: {
		label?: string;
		error?: string | null;
		hint?: string;
		required?: boolean;
		htmlFor?: string;
		class?: string;
		children: Snippet<[{ id: string; describedBy: string | undefined; invalid: boolean }]>;
	} = $props();

	const uid = $props.id();
	const fieldId = $derived(htmlFor ?? `field-${uid}`);
	const errorId = $derived(`${fieldId}-error`);
	const hintId = $derived(`${fieldId}-hint`);
	const describedBy = $derived(
		error ? errorId : hint ? hintId : undefined,
	);
	const invalid = $derived(Boolean(error));
</script>

<div data-slot="form-field" class={cn('flex flex-col gap-1.5', className)}>
	{#if label}
		<label
			for={fieldId}
			class="text-foreground/90 inline-flex items-center gap-1 text-sm leading-none font-medium select-none"
		>
			{label}
			{#if required}
				<span class="text-destructive" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}
	{@render children({ id: fieldId, describedBy, invalid })}
	{#if error}
		<p id={errorId} class="text-destructive text-xs leading-tight" role="alert">{error}</p>
	{:else if hint}
		<p id={hintId} class="text-muted-foreground text-xs leading-tight">{hint}</p>
	{/if}
</div>
