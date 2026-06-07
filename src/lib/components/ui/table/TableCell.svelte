<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '../../../utils/cn.js';

  let { children, class: className, ...rest }: { children?: Snippet; class?: string; [key: string]: unknown } = $props();
</script>

<td class={cn("px-4 py-2.5 align-middle [&:has([role=checkbox])]:pr-0", className)} {...rest}>
  {@render children?.()}
</td>
