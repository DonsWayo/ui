<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '../../utils/cn.js';

  let {
    children,
    class: className,
  }: {
    children: Snippet;
    class?: string;
  } = $props();
</script>

<h3 class={cn('mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground', className)}>
  {@render children()}
</h3>
