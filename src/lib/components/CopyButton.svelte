<script lang="ts" module>
	export type CopyButtonVariant = ButtonVariant;
	export type CopyButtonSize = ButtonSize;
</script>

<script lang="ts">
	import { CheckIcon, CopyIcon } from '@lucide/svelte';
	import Button, { type ButtonVariant, type ButtonSize } from './ui/button/button.svelte';
	import { cn } from '../utils.js';

	type Props = {
		/** The text to write to the clipboard. */
		value: string;
		/** Visible label. Pass `false`/empty for an icon-only button. */
		label?: string | false;
		/** Label swapped in after a successful copy. */
		copiedLabel?: string;
		/** How long (ms) the "copied" state lasts before reverting. */
		timeout?: number;
		variant?: CopyButtonVariant;
		size?: CopyButtonSize;
		/** Hide the leading icon (e.g. when you only want a text toggle). */
		hideIcon?: boolean;
		class?: string;
		disabled?: boolean;
		/** Fired after a successful copy. */
		onCopy?: (value: string) => void;
		/** Fired when the clipboard write throws (e.g. permission denied). */
		onError?: (err: unknown) => void;
		'aria-label'?: string;
	};

	let {
		value,
		label = 'Copy',
		copiedLabel = 'Copied',
		timeout = 2000,
		variant = 'outline',
		size = 'sm',
		hideIcon = false,
		class: className,
		disabled = false,
		onCopy,
		onError,
		'aria-label': ariaLabel,
		...restProps
	}: Props = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	const iconOnly = $derived(label === false || label === '');

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			onCopy?.(value);
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				copied = false;
				timer = null;
			}, timeout);
		} catch (err) {
			onError?.(err);
		}
	}

	$effect(() => () => {
		if (timer) clearTimeout(timer);
	});
</script>

<Button
	{variant}
	size={iconOnly && size === 'sm' ? 'icon-sm' : size}
	{disabled}
	onclick={copy}
	data-slot="copy-button"
	data-copied={copied ? '' : undefined}
	aria-label={ariaLabel ?? (iconOnly ? (copied ? copiedLabel : (label || 'Copy')) : undefined)}
	class={cn(className)}
	{...restProps}
>
	{#if !hideIcon}
		{#if copied}
			<CheckIcon class="text-success" />
		{:else}
			<CopyIcon />
		{/if}
	{/if}
	{#if !iconOnly}
		<span>{copied ? copiedLabel : label}</span>
	{/if}
</Button>
