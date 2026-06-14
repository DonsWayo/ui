<script lang="ts" module>
	export type ComboboxOption = {
		value: string;
		label: string;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import { Combobox as ComboboxPrimitive } from 'bits-ui';
	import { CheckIcon, ChevronsUpDownIcon } from '@lucide/svelte';
	import { cn } from '../utils.js';

	type Props = {
		options: ComboboxOption[];
		value?: string;
		placeholder?: string;
		emptyMessage?: string;
		disabled?: boolean;
		class?: string;
		inputClass?: string;
		contentClass?: string;
		onValueChange?: (value: string) => void;
	};

	let {
		options,
		value = $bindable(''),
		placeholder = 'Select…',
		emptyMessage = 'No results',
		disabled = false,
		class: className,
		inputClass,
		contentClass,
		onValueChange,
	}: Props = $props();

	let search = $state('');

	const filtered = $derived.by(() => {
		const q = search.trim().toLowerCase();
		if (!q) return options;
		return options.filter((o) => o.label.toLowerCase().includes(q));
	});

	const inputValue = $derived(options.find((o) => o.value === value)?.label ?? '');
</script>

<ComboboxPrimitive.Root type="single" bind:value {inputValue} {disabled} {onValueChange}>
	<div data-slot="combobox" class={cn('relative w-full', className)}>
		<ComboboxPrimitive.Input
			oninput={(e: Event) => (search = (e.currentTarget as HTMLInputElement).value)}
			class={cn(
				'border-input bg-background placeholder:text-muted-foreground flex h-9 w-full rounded-md border px-3 py-1 pr-8 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				inputClass,
			)}
			{placeholder}
		/>
		<ComboboxPrimitive.Trigger
			class="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 outline-none"
			aria-label="Open options"
		>
			<ChevronsUpDownIcon class="size-4" />
		</ComboboxPrimitive.Trigger>
	</div>
	<ComboboxPrimitive.Portal>
		<ComboboxPrimitive.Content
			sideOffset={4}
			class={cn(
				'bg-popover text-popover-foreground border-border data-[state=open]:animate-in data-[state=closed]:animate-out z-50 max-h-72 min-w-[var(--bits-combobox-anchor-width)] overflow-hidden rounded-md border p-1 shadow-md',
				contentClass,
			)}
		>
			<ComboboxPrimitive.Viewport class="max-h-64 overflow-y-auto p-1">
				{#each filtered as opt (opt.value)}
					<ComboboxPrimitive.Item
						value={opt.value}
						label={opt.label}
						disabled={opt.disabled}
						class="data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
					>
						{#snippet children({ selected })}
							<span class="flex-1">{opt.label}</span>
							{#if selected}
								<CheckIcon class="size-4" />
							{/if}
						{/snippet}
					</ComboboxPrimitive.Item>
				{:else}
					<div class="text-muted-foreground px-2 py-3 text-center text-sm">
						{emptyMessage}
					</div>
				{/each}
			</ComboboxPrimitive.Viewport>
		</ComboboxPrimitive.Content>
	</ComboboxPrimitive.Portal>
</ComboboxPrimitive.Root>
