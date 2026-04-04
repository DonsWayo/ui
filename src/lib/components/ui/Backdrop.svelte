<script lang="ts">
	let {
		onclick,
		zIndex = 40,
	}: {
		onclick?: () => void;
		zIndex?: number;
	} = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0"
	style="z-index: {zIndex}"
	{onclick}
	onkeydown={(e) => {
		if (e.key === 'Escape') onclick?.();
	}}
></div>
