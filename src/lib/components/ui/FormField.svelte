<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '../../utils/cn.js';
  import { Label } from './label/index.js';

  let {
    label,
    for: forId,
    hint,
    error,
    children,
    class: className,
  }: {
    label?: string;
    for?: string;
    hint?: string;
    error?: string;
    children?: Snippet;
    class?: string;
  } = $props();
</script>

<div class={cn('space-y-1.5', className)}>
  {#if label}
    <Label for={forId}>{label}</Label>
  {/if}
  {@render children?.()}
  {#if hint && !error}
    <p class="text-[11px] text-muted-foreground">{hint}</p>
  {/if}
  {#if error}
    <p class="text-sm text-destructive">{error}</p>
  {/if}
</div>
