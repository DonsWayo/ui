<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../utils.js';

	type Props = {
		/** Code text. If `children` is provided, that wins. */
		code?: string;
		children?: Snippet;
		class?: string;
	};

	const { code, children, class: className }: Props = $props();
</script>

<!--
  Inline `<code>` — single-line, no syntax highlighting (intentionally cheap;
  pages with hundreds of inline code spans should not load Shiki). Pair with
  `<CodeBlock>` for multi-line / highlighted samples.
-->
<code
	data-slot="inline-code"
	class={cn(
		'bg-muted/60 text-foreground border-border/60 rounded border px-1.5 py-0.5 font-mono text-[0.875em]',
		className,
	)}
>
	{#if children}{@render children()}{:else}{code}{/if}
</code>
