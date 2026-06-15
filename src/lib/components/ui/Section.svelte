<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '../../utils/cn.js';

  let {
    title,
    children,
    class: className,
  }: {
    title?: string;
    children?: Snippet;
    class?: string;
  } = $props();
</script>

<div class={cn('rounded-xl border border-border bg-card p-5', className)}>
  {#if title}
    <h3 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
  {/if}
  {@render children?.()}
</div>
