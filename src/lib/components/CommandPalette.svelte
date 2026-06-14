<script lang="ts" module>
	import type { Component } from 'svelte';

	export type CommandPaletteItem = {
		id: string;
		label: string;
		description?: string;
		group?: string;
		keywords?: string[];
		shortcut?: string;
		icon?: Component<{ class?: string }>;
		onSelect?: () => void;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import { Command as CommandPrimitive, Dialog as DialogPrimitive } from 'bits-ui';
	import { SearchIcon } from '@lucide/svelte';
	import { cn } from '../utils.js';

	type Props = {
		open?: boolean;
		items: CommandPaletteItem[];
		placeholder?: string;
		emptyMessage?: string;
		label?: string;
		class?: string;
		/** Close palette on item select (defaults true) */
		closeOnSelect?: boolean;
	};

	let {
		open = $bindable(false),
		items,
		placeholder = 'Type a command or search…',
		emptyMessage = 'No results found.',
		label = 'Command palette',
		class: className,
		closeOnSelect = true,
	}: Props = $props();

	// Group items by `group` (default group = ""). Uses an insertion-ordered
	// plain object as an ephemeral accumulator — this is a pure derivation, not
	// reactive state, so a SvelteMap isn't needed (and a built-in Map would trip
	// svelte/prefer-svelte-reactivity).
	const grouped = $derived.by(() => {
		const groups: Record<string, CommandPaletteItem[]> = {};
		for (const item of items) {
			const g = item.group ?? '';
			(groups[g] ??= []).push(item);
		}
		return Object.entries(groups) as [string, CommandPaletteItem[]][];
	});

	function handleSelect(item: CommandPaletteItem) {
		if (item.disabled) return;
		item.onSelect?.();
		if (closeOnSelect) open = false;
	}
</script>

<DialogPrimitive.Root bind:open>
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
		/>
		<DialogPrimitive.Content
			class={cn(
				'bg-popover text-popover-foreground border-border data-[state=open]:animate-in data-[state=closed]:animate-out fixed top-[20%] left-1/2 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border shadow-lg',
				className,
			)}
		>
			<DialogPrimitive.Title class="sr-only">{label}</DialogPrimitive.Title>
			<DialogPrimitive.Description class="sr-only">{placeholder}</DialogPrimitive.Description>

			<CommandPrimitive.Root {label} class="flex flex-col" loop>
				<div class="border-border flex items-center gap-2 border-b px-3">
					<SearchIcon class="text-muted-foreground size-4 shrink-0" />
					<CommandPrimitive.Input
						{placeholder}
						class="placeholder:text-muted-foreground flex h-11 w-full bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<CommandPrimitive.List class="max-h-80 overflow-y-auto p-1">
					<CommandPrimitive.Empty class="text-muted-foreground py-6 text-center text-sm">
						{emptyMessage}
					</CommandPrimitive.Empty>
					<CommandPrimitive.Viewport>
						{#each grouped as [group, groupItems] (group)}
							<CommandPrimitive.Group value={group || 'default'} class="overflow-hidden p-1">
								{#if group}
									<CommandPrimitive.GroupHeading
										class="text-muted-foreground px-2 py-1.5 text-xs font-medium"
									>
										{group}
									</CommandPrimitive.GroupHeading>
								{/if}
								<CommandPrimitive.GroupItems>
									{#each groupItems as item (item.id)}
										<CommandPrimitive.Item
											value={item.id}
											keywords={item.keywords}
											disabled={item.disabled}
											onSelect={() => handleSelect(item)}
											class="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
										>
											{#if item.icon}
												{@const Icon = item.icon}
												<Icon class="size-4 shrink-0" />
											{/if}
											<div class="flex flex-1 flex-col">
												<span>{item.label}</span>
												{#if item.description}
													<span class="text-muted-foreground text-xs">{item.description}</span>
												{/if}
											</div>
											{#if item.shortcut}
												<kbd
													class="bg-muted text-muted-foreground ms-auto rounded px-1.5 py-0.5 font-mono text-[10px]"
												>
													{item.shortcut}
												</kbd>
											{/if}
										</CommandPrimitive.Item>
									{/each}
								</CommandPrimitive.GroupItems>
							</CommandPrimitive.Group>
						{/each}
					</CommandPrimitive.Viewport>
				</CommandPrimitive.List>
			</CommandPrimitive.Root>
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
</DialogPrimitive.Root>
