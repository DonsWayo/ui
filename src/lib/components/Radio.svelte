<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import { CircleIcon } from '@lucide/svelte';
	import { cn, type WithoutChildrenOrChild } from '../utils.js';

	type Props = WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> & {
		label?: string;
		class?: string;
	};

	let {
		ref = $bindable(null),
		value,
		disabled,
		label,
		class: className,
		id,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const itemId = $derived(id ?? `radio-${uid}`);

	const dotClass =
		'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 inline-flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50';
</script>

{#snippet dot()}
	<RadioGroupPrimitive.Item
		bind:ref
		id={itemId}
		{value}
		{disabled}
		data-slot="radio-group-item"
		class={cn(dotClass, !label && className)}
		{...restProps}
	>
		{#snippet children({ checked })}
			{#if checked}
				<CircleIcon class="fill-primary text-primary size-2" />
			{/if}
		{/snippet}
	</RadioGroupPrimitive.Item>
{/snippet}

{#if label}
	<label
		for={itemId}
		class={cn(
			'inline-flex items-center gap-2 text-sm leading-none font-medium select-none',
			disabled && 'cursor-not-allowed opacity-50',
			className,
		)}
	>
		{@render dot()}
		<span>{label}</span>
	</label>
{:else}
	{@render dot()}
{/if}
