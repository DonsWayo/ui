<script lang="ts">
	let {
		count,
		max = 99,
		size = 'md',
		variant = 'primary',
	}: {
		count: number;
		max?: number;
		size?: 'sm' | 'md';
		variant?: 'primary' | 'secondary' | 'destructive';
	} = $props();

	const display = $derived(count > max ? `${max}+` : `${count}`);

	const sizeClass = $derived(
		size === 'sm'
			? 'h-3.5 min-w-[14px] text-[7px] px-0.5'
			: 'h-[18px] min-w-[18px] text-[9px] px-1',
	);

	const variantClass = $derived.by(() => {
		switch (variant) {
			case 'destructive':
				return 'bg-destructive text-destructive-foreground shadow-sm shadow-destructive/30';
			case 'secondary':
				return 'bg-secondary text-secondary-foreground';
			default:
				return 'bg-primary text-primary-foreground shadow-sm shadow-primary/30';
		}
	});
</script>

{#if count > 0}
	<span
		class="flex items-center justify-center rounded-full font-bold {sizeClass} {variantClass} animate-in zoom-in-50 duration-200"
	>
		{display}
	</span>
{/if}
