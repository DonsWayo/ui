<script lang="ts">
  import NumberFlow from "@number-flow/svelte";

  let {
    amount,
    precision = 2,
    size = "sm",
    class: className = "",
  }: {
    amount: number;
    precision?: 2 | 3 | 4;
    size?: "xs" | "sm";
    class?: string;
  } = $props();

  const sizeClass = $derived(
    size === "xs" ? "text-[10px]" : "text-xs",
  );
</script>

<span class="tabular-nums text-muted-foreground {sizeClass} {className}">
  <NumberFlow
    value={amount}
    format={{ style: "currency", currency: "USD", minimumFractionDigits: precision, maximumFractionDigits: precision }}
  />
</span>
