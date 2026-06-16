<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { LoaderCircleIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import Button from './ui/button/button.svelte';
	import { cn } from '../utils.js';

	type Props = {
		/** Controlled open state. */
		open?: boolean;
		/** Dialog heading. */
		title: string;
		/** Supporting copy under the title. */
		description?: string;
		/** Label for the confirm button. */
		confirmLabel?: string;
		/** Label for the cancel button. */
		cancelLabel?: string;
		/**
		 * Style the confirm button as destructive (red) — for delete / remove
		 * flows.
		 */
		destructive?: boolean;
		/**
		 * When the action is in flight: disables both buttons and shows a spinner
		 * on the confirm button. `busy` is an alias.
		 */
		loading?: boolean;
		/** Alias for {@link loading}. */
		busy?: boolean;
		/**
		 * When set, the confirm button stays disabled until the user types this
		 * exact string into the confirmation field. Use for high-stakes flows
		 * like "type the repo name to delete it".
		 */
		confirmText?: string;
		/**
		 * Placeholder for the type-to-confirm input. Defaults to the
		 * `confirmText` value.
		 */
		confirmTextPlaceholder?: string;
		class?: string;
		/** Extra content rendered between the description and the footer. */
		children?: Snippet;
		/** Fired when the user confirms (and the type-to-confirm guard passes). */
		onConfirm?: () => void;
		/** Fired when the user cancels or dismisses the dialog. */
		onCancel?: () => void;
	};

	let {
		open = $bindable(false),
		title,
		description,
		confirmLabel = 'Confirm',
		cancelLabel = 'Cancel',
		destructive = false,
		loading = false,
		busy = false,
		confirmText,
		confirmTextPlaceholder,
		class: className,
		children,
		onConfirm,
		onCancel,
	}: Props = $props();

	let typed = $state('');

	const isBusy = $derived(loading || busy);
	const needsTextConfirm = $derived(!!confirmText);
	const textMatches = $derived(!needsTextConfirm || typed === confirmText);
	const confirmDisabled = $derived(isBusy || !textMatches);

	// Reset the typed value whenever the dialog opens/closes so a re-opened
	// dialog never starts pre-confirmed.
	$effect(() => {
		if (!open) typed = '';
	});

	function handleConfirm() {
		if (confirmDisabled) return;
		onConfirm?.();
	}

	function handleCancel() {
		onCancel?.();
		open = false;
	}

	function handleOpenChange(next: boolean) {
		// A close that wasn't driven by the confirm button is a cancel
		// (escape, overlay click, cancel button). Don't fire while busy.
		if (!next && open && !isBusy) onCancel?.();
	}
</script>

<AlertDialogPrimitive.Root bind:open onOpenChange={handleOpenChange}>
	<AlertDialogPrimitive.Portal>
		<AlertDialogPrimitive.Overlay
			data-slot="confirm-dialog-overlay"
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
		/>
		<AlertDialogPrimitive.Content
			data-slot="confirm-dialog-content"
			class={cn(
				'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
				className,
			)}
		>
			<div class="flex flex-col gap-2 text-center sm:text-start">
				<AlertDialogPrimitive.Title
					data-slot="confirm-dialog-title"
					class="text-lg leading-none font-semibold"
				>
					{title}
				</AlertDialogPrimitive.Title>
				{#if description}
					<AlertDialogPrimitive.Description
						data-slot="confirm-dialog-description"
						class="text-muted-foreground text-sm"
					>
						{description}
					</AlertDialogPrimitive.Description>
				{/if}
			</div>

			{#if children}
				{@render children()}
			{/if}

			{#if needsTextConfirm}
				<input
					type="text"
					autocomplete="off"
					autocapitalize="off"
					spellcheck="false"
					bind:value={typed}
					disabled={isBusy}
					placeholder={confirmTextPlaceholder ?? confirmText}
					aria-label={`Type ${confirmText} to confirm`}
					class="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
				/>
			{/if}

			<div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				<Button variant="outline" disabled={isBusy} onclick={handleCancel}>
					{cancelLabel}
				</Button>
				<Button
					variant={destructive ? 'destructive' : 'default'}
					disabled={confirmDisabled}
					onclick={handleConfirm}
				>
					{#if isBusy}
						<LoaderCircleIcon class="size-4 animate-spin" />
					{/if}
					{confirmLabel}
				</Button>
			</div>
		</AlertDialogPrimitive.Content>
	</AlertDialogPrimitive.Portal>
</AlertDialogPrimitive.Root>
