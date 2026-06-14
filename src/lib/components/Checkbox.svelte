<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';
	import { CheckIcon, MinusIcon } from '@lucide/svelte';
	import { cn, type WithoutChildrenOrChild } from '../utils.js';

	type Props = WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
		label?: string;
		class?: string;
	};

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		disabled,
		label,
		class: className,
		id,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const checkboxId = $derived(id ?? `checkbox-${uid}`);

	const boxClass =
		'peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50';
</script>

{#snippet box()}
	<CheckboxPrimitive.Root
		bind:ref
		bind:checked
		bind:indeterminate
		id={checkboxId}
		data-slot="checkbox"
		{disabled}
		class={cn(boxClass, !label && className)}
		{...restProps}
	>
		{#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
			{#if isIndeterminate}
				<MinusIcon class="size-3.5" />
			{:else if isChecked}
				<CheckIcon class="size-3.5" />
			{/if}
		{/snippet}
	</CheckboxPrimitive.Root>
{/snippet}

{#if label}
	<label
		for={checkboxId}
		class={cn(
			'inline-flex items-center gap-2 text-sm leading-none font-medium select-none',
			disabled && 'cursor-not-allowed opacity-50',
			className,
		)}
	>
		{@render box()}
		<span>{label}</span>
	</label>
{:else}
	{@render box()}
{/if}
