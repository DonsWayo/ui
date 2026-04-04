<script lang="ts">
	import { cn } from '../../utils.js';

	let {
		ref = $bindable(null),
		data,
		color = 'stroke-primary',
		fillColor = 'fill-primary/10',
		width = 80,
		height = 24,
		class: className,
		...restProps
	}: {
		ref?: SVGSVGElement | null;
		data: number[];
		color?: string;
		fillColor?: string;
		width?: number;
		height?: number;
		class?: string;
	} = $props();

	const points = $derived.by(() => {
		if (data.length === 0) return '';
		const max = Math.max(...data, 1);
		const step = width / Math.max(data.length - 1, 1);
		return data.map((v, i) => `${i * step},${height - (v / max) * (height - 2) - 1}`).join(' ');
	});

	const areaPoints = $derived.by(() => {
		if (data.length === 0) return '';
		const max = Math.max(...data, 1);
		const step = width / Math.max(data.length - 1, 1);
		const linePoints = data
			.map((v, i) => `${i * step},${height - (v / max) * (height - 2) - 1}`)
			.join(' ');
		return `0,${height} ${linePoints} ${(data.length - 1) * step},${height}`;
	});
</script>

<svg
	bind:this={ref}
	viewBox="0 0 {width} {height}"
	class={cn('overflow-visible', className)}
	style="width: {width}px; height: {height}px;"
	{...restProps}
>
	{#if data.length > 1}
		<polygon points={areaPoints} class={fillColor} />
		<polyline
			{points}
			fill="none"
			class={color}
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if data.length === 1}
		<line x1="0" y1={height / 2} x2={width} y2={height / 2} class={color} stroke-width="1.5" />
	{/if}
</svg>
