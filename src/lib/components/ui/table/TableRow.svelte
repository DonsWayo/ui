<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '../../../utils/cn.js';

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<tr class={cn("border-b border-border transition-colors hover:bg-accent/50 data-[state=selected]:bg-accent", className)}>
  {@render children()}
</tr>
