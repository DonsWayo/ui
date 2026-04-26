<script lang="ts">
  // Minimal card for a kanban column. Title is required; body is optional
  // single-paragraph supplementary text. `onDelete` adds a hover-revealed
  // X button. `extra` is a snippet for arbitrary chrome (badges, avatars,
  // etc.) under the body.

  import { X } from '@lucide/svelte';
  import type { Snippet } from 'svelte';

  let {
    title,
    body = null,
    onDelete,
    extra,
  }: {
    title: string;
    body?: string | null;
    onDelete?: () => void;
    extra?: Snippet;
  } = $props();
</script>

<div class="group rounded-md border border-border bg-background p-2.5 text-sm shadow-sm">
  <div class="flex items-start justify-between gap-1">
    <span class="leading-snug">{title}</span>
    {#if onDelete}
      <button
        type="button"
        aria-label="Delete card"
        class="opacity-0 transition-opacity group-hover:opacity-100"
        onclick={onDelete}
      >
        <X class="h-3 w-3 text-muted-foreground hover:text-destructive" />
      </button>
    {/if}
  </div>
  {#if body}
    <p class="mt-1 line-clamp-2 text-xs text-muted-foreground">{body}</p>
  {/if}
  {#if extra}
    <div class="mt-1.5">{@render extra()}</div>
  {/if}
</div>
