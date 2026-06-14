<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn.js';

	type Props = HTMLAnchorAttributes & {
		href: string;
		label: string;
		icon?: any;
		active?: boolean;
		collapsed?: boolean;
	};

	let {
		href,
		label,
		icon: Icon,
		active = false,
		collapsed = false,
		class: className,
		...rest
	}: Props = $props();
</script>

<a
	{href}
	class={cn(
		'flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground',
		active && 'bg-sidebar-accent text-sidebar-primary',
		className,
	)}
	aria-label={collapsed ? label : undefined}
	{...rest}
>
	{#if Icon}
		<span class="flex size-5 shrink-0 items-center justify-center">
			<Icon size={16} />
		</span>
	{/if}
	{#if !collapsed}
		<span class="truncate">{label}</span>
	{/if}
</a>
