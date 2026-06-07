<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '../../../utils/cn.js';

  let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<tbody class={cn("[&_tr:last-child]:border-0", className)}>
  {@render children()}
</tbody>
