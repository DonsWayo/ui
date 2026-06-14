<script lang="ts" module>
	// Deterministic avatar colour from a name, so the same author renders the
	// same hue everywhere (list rows, timeline, participants). GitHub/Linear
	// both lean on stable per-identity colours to make threads scannable.
	export function userAvatarHue(name: string | null | undefined): number {
		const s = name ?? '';
		let h = 0;
		for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
		return h;
	}
	export function userAvatarInitial(name: string | null | undefined): string {
		return (name?.trim()?.[0] ?? '?').toUpperCase();
	}
</script>

<script lang="ts">
	import { Sparkles } from '@lucide/svelte';

	let {
		name,
		ai = false,
		size = 'md',
		ring = false,
		class: className = '',
	}: {
		name: string | null | undefined;
		ai?: boolean;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		ring?: boolean;
		class?: string;
	} = $props();

	const dim = $derived(
		size === 'xs'
			? 'h-5 w-5 text-[9px]'
			: size === 'sm'
				? 'h-6 w-6 text-[10px]'
				: size === 'lg'
					? 'h-9 w-9 text-sm'
					: 'h-8 w-8 text-xs',
	);
	const ringCls = $derived(ring ? 'ring-2 ring-card' : '');
	const iconDim = $derived(size === 'xs' || size === 'sm' ? 'h-3 w-3' : 'h-4 w-4');
</script>

{#if ai}
	<span
		class="inline-flex shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-500 shadow-sm dark:text-purple-400 {dim} {ringCls} {className}"
		title="Nucel AI"
		aria-label="Nucel AI"
	>
		<Sparkles class={iconDim} />
	</span>
{:else}
	<span
		class="inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white shadow-sm {dim} {ringCls} {className}"
		style="background-color: hsl({userAvatarHue(name)} 55% 45%)"
		title={name ?? 'unknown'}
		aria-label={name ?? 'unknown'}>{userAvatarInitial(name)}</span
	>
{/if}
