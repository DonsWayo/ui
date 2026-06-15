<script lang="ts" module>
	import type { DateRange } from 'bits-ui';
	export type { DateRange };

	export type DateRangePreset = {
		label: string;
		/** Returns the [start, end] range (inclusive). end defaults to today. */
		range: () => { start: Date; end: Date };
	};

	export const DEFAULT_PRESETS: DateRangePreset[] = [
		{
			label: 'Today',
			range: () => {
				const d = new Date();
				return { start: d, end: d };
			},
		},
		{
			label: '7d',
			range: () => {
				const end = new Date();
				const start = new Date();
				start.setDate(end.getDate() - 6);
				return { start, end };
			},
		},
		{
			label: '30d',
			range: () => {
				const end = new Date();
				const start = new Date();
				start.setDate(end.getDate() - 29);
				return { start, end };
			},
		},
	];
</script>

<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/svelte';
	import { cn } from '../utils.js';

	type Props = {
		value?: DateRange;
		numberOfMonths?: number;
		presets?: DateRangePreset[];
		showPresets?: boolean;
		locale?: string;
		class?: string;
		onValueChange?: (range: DateRange) => void;
	};

	let {
		value = $bindable<DateRange>({ start: undefined, end: undefined }),
		numberOfMonths = 2,
		presets = DEFAULT_PRESETS,
		showPresets = true,
		locale = 'en-US',
		class: className,
		onValueChange,
	}: Props = $props();

	function toCalendarDate(d: Date): CalendarDate {
		return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
	}

	function applyPreset(p: DateRangePreset) {
		const r = p.range();
		const next: DateRange = {
			start: toCalendarDate(r.start),
			end: toCalendarDate(r.end),
		};
		value = next;
		onValueChange?.(next);
	}

	function isPresetActive(p: DateRangePreset): boolean {
		if (!value?.start || !value?.end) return false;
		const r = p.range();
		const sCal = toCalendarDate(r.start);
		const eCal = toCalendarDate(r.end);
		return value.start.compare(sCal) === 0 && value.end.compare(eCal) === 0;
	}

	const placeholder = today(getLocalTimeZone());

	const cellBase =
		'group relative inline-flex size-9 items-center justify-center rounded-md p-0 text-sm font-normal outline-none aria-selected:opacity-100';
	const dayClass = cn(
		cellBase,
		'data-[selected]:bg-primary data-[selected]:text-primary-foreground',
		'data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:rounded-l-md',
		'data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:rounded-r-md',
		'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
		'data-[outside-month]:text-muted-foreground/50',
		'data-[disabled]:text-muted-foreground/40 data-[disabled]:pointer-events-none',
		'hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50',
	);
</script>

<div
	data-slot="date-range-picker"
	class={cn(
		'border-border bg-card text-card-foreground inline-flex flex-col gap-3 rounded-lg border p-3 shadow-sm',
		className,
	)}
>
	{#if showPresets && presets.length > 0}
		<div class="flex flex-wrap items-center gap-1.5">
			{#each presets as p (p.label)}
				<button
					type="button"
					onclick={() => applyPreset(p)}
					class={cn(
						'inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
						isPresetActive(p)
							? 'bg-primary text-primary-foreground border-primary'
							: 'border-border bg-background hover:bg-accent hover:text-accent-foreground',
					)}
				>
					{p.label}
				</button>
			{/each}
		</div>
	{/if}

	<RangeCalendarPrimitive.Root
		bind:value
		{numberOfMonths}
		{locale}
		{placeholder}
		{onValueChange}
		weekdayFormat="short"
		class="flex flex-col gap-2"
	>
		{#snippet children({ months, weekdays })}
			<RangeCalendarPrimitive.Header class="flex items-center justify-between px-1">
				<RangeCalendarPrimitive.PrevButton
					class="hover:bg-accent inline-flex size-8 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					aria-label="Previous month"
				>
					<ChevronLeftIcon class="size-4" />
				</RangeCalendarPrimitive.PrevButton>
				<RangeCalendarPrimitive.Heading class="text-sm font-medium" />
				<RangeCalendarPrimitive.NextButton
					class="hover:bg-accent inline-flex size-8 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
					aria-label="Next month"
				>
					<ChevronRightIcon class="size-4" />
				</RangeCalendarPrimitive.NextButton>
			</RangeCalendarPrimitive.Header>
			<div class="flex flex-col gap-4 sm:flex-row">
				{#each months as month (month.value.toString())}
					<RangeCalendarPrimitive.Grid class="border-collapse">
						<RangeCalendarPrimitive.GridHead>
							<RangeCalendarPrimitive.GridRow class="flex">
								{#each weekdays as wd (wd)}
									<RangeCalendarPrimitive.HeadCell
										class="text-muted-foreground w-9 text-[0.7rem] font-normal"
									>
										{wd.slice(0, 2)}
									</RangeCalendarPrimitive.HeadCell>
								{/each}
							</RangeCalendarPrimitive.GridRow>
						</RangeCalendarPrimitive.GridHead>
						<RangeCalendarPrimitive.GridBody>
							{#each month.weeks as week, wi (wi)}
								<RangeCalendarPrimitive.GridRow class="mt-1 flex w-full">
									{#each week as date (date.toString())}
										<RangeCalendarPrimitive.Cell {date} month={month.value} class="p-0">
											<RangeCalendarPrimitive.Day class={dayClass} />
										</RangeCalendarPrimitive.Cell>
									{/each}
								</RangeCalendarPrimitive.GridRow>
							{/each}
						</RangeCalendarPrimitive.GridBody>
					</RangeCalendarPrimitive.Grid>
				{/each}
			</div>
		{/snippet}
	</RangeCalendarPrimitive.Root>
</div>
