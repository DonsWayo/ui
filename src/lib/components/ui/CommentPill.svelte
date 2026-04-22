<script lang="ts">
  import { MessageCircle } from '@lucide/svelte';

  let { count }: { count: number } = $props();
</script>

{#if count > 0}
  <div class="flex shrink-0 items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-xs text-muted-foreground">
    <MessageCircle class="h-3 w-3" />
    <span>{count}</span>
  </div>
{/if}
