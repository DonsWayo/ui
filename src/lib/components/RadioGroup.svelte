<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '../utils.js';

	type Props = WithoutChild<RadioGroupPrimitive.RootProps> & {
		class?: string;
	};

	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<RadioGroupPrimitive.Root
	bind:ref
	bind:value
	data-slot="radio-group"
	class={cn('grid gap-2', className)}
	{...restProps}
>
	{@render children?.()}
</RadioGroupPrimitive.Root>
