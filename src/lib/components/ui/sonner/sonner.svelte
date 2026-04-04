<script lang="ts">
	import { Toaster as SonnerToaster } from 'svelte-sonner';
	import type { ComponentProps } from 'svelte';
	type ToasterProps = ComponentProps<typeof SonnerToaster>;
	import { cn } from '../../../utils.js';

	let { class: className, ...restProps }: ToasterProps & { class?: string } = $props();
</script>

<SonnerToaster class={cn('toaster group', className)} theme="dark" closeButton {...restProps} />
