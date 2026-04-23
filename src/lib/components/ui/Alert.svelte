<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn.js';

  let {
    variant = 'default',
    title,
    children,
    icon: Icon,
    class: className,
  }: {
    variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
    title?: string;
    children?: Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
    class?: string;
  } = $props();

  const variantClasses: Record<string, string> = {
    default: 'border-border/60 bg-muted/40 text-foreground',
    destructive: 'border-destructive/30 bg-destructive/10 text-destructive',
    success: 'border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400',
    warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500',
    info: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  };

  const containerClass = $derived(
    cn(
      'flex items-start gap-3 rounded-md border px-4 py-3 text-sm',
      variantClasses[variant],
      className,
    ),
  );
</script>

<div class={containerClass} role="alert">
  {#if Icon}
    <Icon class="mt-0.5 h-4 w-4 shrink-0" />
  {/if}
  <div>
    {#if title}
      <p class="font-semibold">{title}</p>
    {/if}
    {@render children?.()}
  </div>
</div>
