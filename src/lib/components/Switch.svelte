<script lang="ts">
	import { Switch as SwitchPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '../utils.js';

	type Props = WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
		class?: string;
	};

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		disabled,
		id,
		name,
		class: className,
		...restProps
	}: Props = $props();
</script>

<SwitchPrimitive.Root
	bind:ref
	bind:checked
	{id}
	{name}
	{disabled}
	data-slot="switch"
	class={cn(
		'peer focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
		className,
	)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		data-slot="switch-thumb"
		class="bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
	/>
</SwitchPrimitive.Root>
