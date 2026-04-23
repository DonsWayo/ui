<script lang="ts">
  let {
    label,
    collapsed = false,
  }: {
    label: string;
    collapsed?: boolean;
  } = $props();
</script>

{#if !collapsed}
  <p class="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80">
    {label}
  </p>
{:else}
  <div class="pt-3"></div>
{/if}
