<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '../utils.js';

	type Props = WithElementRef<HTMLFormAttributes, HTMLFormElement> & {
		class?: string;
		/**
		 * Logical content type for the form payload. Defaults to `application/json`,
		 * which is what InertiaJS handlers expect. This is exposed as `data-content-type`
		 * on the rendered element so consumer code (e.g. an Inertia visit) can read it.
		 *
		 * Note: the native HTML `enctype` attribute does not accept `application/json`,
		 * so we deliberately don't set it. Consumers using Inertia / fetch should set
		 * the `Content-Type` header themselves.
		 */
		contentType?: string;
	};

	let {
		ref = $bindable(null),
		method = 'post',
		contentType = 'application/json',
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<form
	bind:this={ref}
	data-slot="form"
	data-content-type={contentType}
	{method}
	class={cn('flex flex-col gap-4', className)}
	{...restProps}
>
	{@render children?.()}
</form>
