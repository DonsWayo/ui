<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn.js';

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<caption class={cn("mt-4 text-xs text-muted-foreground", className)}>
  {@render children()}
</caption>
