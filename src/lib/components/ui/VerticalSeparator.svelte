<script lang="ts">
	let {
		class: className = '',
	}: {
		class?: string;
	} = $props();
</script>

<span class="bg-border/60 mx-0.5 h-3.5 w-px shrink-0 {className}"></span>
