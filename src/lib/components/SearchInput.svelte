<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { SearchIcon, XIcon } from '@lucide/svelte';
	import Input from './ui/input/input.svelte';
	import { cn } from '../utils.js';

	type Props = Omit<HTMLInputAttributes, 'type' | 'value'> & {
		value?: string;
		debounce?: number;
		clearable?: boolean;
		class?: string;
		onDebounced?: (value: string) => void;
	};

	let {
		value = $bindable(''),
		debounce = 300,
		clearable = true,
		class: className,
		placeholder = 'Search…',
		onDebounced,
		...restProps
	}: Props = $props();

	let inner = $state(value ?? '');
	let timer: ReturnType<typeof setTimeout> | null = null;

	// Keep inner in sync if value is updated externally
	$effect(() => {
		if (value !== inner) inner = value ?? '';
	});

	function commit(next: string) {
		value = next;
		onDebounced?.(next);
	}

	function onInput(e: Event) {
		const next = (e.currentTarget as HTMLInputElement).value;
		inner = next;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => commit(next), debounce);
	}

	function clear() {
		inner = '';
		if (timer) clearTimeout(timer);
		commit('');
	}

	// Avoid forwarding the `files` typing onto a text input
	const inputProps = $derived(restProps as Record<string, unknown>);
</script>

<div data-slot="search-input" class={cn('relative w-full', className)}>
	<SearchIcon
		class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
	/>
	<Input
		type="text"
		value={inner}
		oninput={onInput}
		{placeholder}
		class="ps-9 pe-9"
		{...inputProps}
	/>
	{#if clearable && inner}
		<button
			type="button"
			onclick={clear}
			aria-label="Clear search"
			class="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
		>
			<XIcon class="size-3.5" />
		</button>
	{/if}
</div>
