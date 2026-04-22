<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn.js';

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<td class={cn("px-4 py-2.5 align-middle [&:has([role=checkbox])]:pr-0", className)}>
  {@render children()}
</td>
