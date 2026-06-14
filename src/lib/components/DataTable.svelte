<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type ColumnDef<T> = {
		/** Column key — used for sorting and React-style row[key] access if accessor is omitted */
		key: string;
		/** Column header label */
		header: string;
		/** Optional cell value accessor — defaults to `row[key]` */
		accessor?: (row: T) => unknown;
		/** Optional custom cell renderer snippet receiving the row */
		cell?: Snippet<[T]>;
		/** Enable sorting on this column (defaults true) */
		sortable?: boolean;
		/** Optional column width (CSS) */
		width?: string;
		/** Optional alignment */
		align?: 'left' | 'center' | 'right';
		/** Extra class for both header and cells */
		class?: string;
	};

	export type SortDirection = 'asc' | 'desc' | null;
</script>

<script lang="ts" generics="T">
	import { ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from '@lucide/svelte';
	import Pagination from './Pagination.svelte';
	import { cn } from '../utils.js';

	type Props = {
		data: T[];
		columns: ColumnDef<T>[];
		pageSize?: number;
		/** Initial page (1-indexed) */
		page?: number;
		/** Show pagination row (defaults true when data > pageSize) */
		paginate?: boolean;
		/** Optional row key fn — used for keyed-each */
		rowKey?: (row: T, idx: number) => string | number;
		/** Empty-state message */
		emptyMessage?: string;
		class?: string;
		onRowClick?: (row: T) => void;
	};

	let {
		data,
		columns,
		pageSize = 10,
		page = $bindable(1),
		paginate,
		rowKey,
		emptyMessage = 'No results',
		class: className,
		onRowClick,
	}: Props = $props();

	let sortKey = $state<string | null>(null);
	let sortDir = $state<SortDirection>(null);

	function getValue(row: T, col: ColumnDef<T>): unknown {
		if (col.accessor) return col.accessor(row);
		return (row as Record<string, unknown>)[col.key];
	}

	function compare(a: unknown, b: unknown): number {
		if (a === b) return 0;
		if (a === null || a === undefined) return -1;
		if (b === null || b === undefined) return 1;
		if (typeof a === 'number' && typeof b === 'number') return a - b;
		if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
		return String(a).localeCompare(String(b));
	}

	function toggleSort(col: ColumnDef<T>) {
		if (col.sortable === false) return;
		if (sortKey !== col.key) {
			sortKey = col.key;
			sortDir = 'asc';
		} else if (sortDir === 'asc') {
			sortDir = 'desc';
		} else if (sortDir === 'desc') {
			sortKey = null;
			sortDir = null;
		} else {
			sortDir = 'asc';
		}
		page = 1;
	}

	const sortedData = $derived.by(() => {
		if (!sortKey || !sortDir) return data;
		const col = columns.find((c) => c.key === sortKey);
		if (!col) return data;
		const dir = sortDir === 'asc' ? 1 : -1;
		return [...data].sort((a, b) => compare(getValue(a, col), getValue(b, col)) * dir);
	});

	const total = $derived(sortedData.length);
	const shouldPaginate = $derived(paginate ?? total > pageSize);

	const pagedData = $derived.by(() => {
		if (!shouldPaginate) return sortedData;
		const start = (page - 1) * pageSize;
		return sortedData.slice(start, start + pageSize);
	});

	function alignClass(a?: 'left' | 'center' | 'right') {
		switch (a) {
			case 'center':
				return 'text-center';
			case 'right':
				return 'text-right';
			default:
				return 'text-left';
		}
	}
</script>

<div
	data-slot="data-table"
	class={cn('border-border bg-card overflow-hidden rounded-lg border', className)}
>
	<div class="overflow-x-auto">
		<table class="w-full caption-bottom text-sm">
			<thead class="bg-muted/50 border-border border-b">
				<tr>
					{#each columns as col (col.key)}
						<th
							scope="col"
							style={col.width ? `width:${col.width}` : undefined}
							class={cn(
								'text-muted-foreground h-10 px-3 font-medium select-none',
								alignClass(col.align),
								col.class,
							)}
						>
							{#if col.sortable !== false}
								<button
									type="button"
									onclick={() => toggleSort(col)}
									class="hover:text-foreground inline-flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded"
									aria-label={`Sort by ${col.header}`}
								>
									<span>{col.header}</span>
									{#if sortKey === col.key && sortDir === 'asc'}
										<ArrowUpIcon class="size-3" />
									{:else if sortKey === col.key && sortDir === 'desc'}
										<ArrowDownIcon class="size-3" />
									{:else}
										<ArrowUpDownIcon class="text-muted-foreground/50 size-3" />
									{/if}
								</button>
							{:else}
								<span>{col.header}</span>
							{/if}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#if pagedData.length === 0}
					<tr>
						<td colspan={columns.length} class="text-muted-foreground py-8 text-center text-sm">
							{emptyMessage}
						</td>
					</tr>
				{:else}
					{#each pagedData as row, i (rowKey ? rowKey(row, i) : i)}
						<tr
							class={cn(
								'border-border hover:bg-muted/40 border-b transition-colors last:border-b-0',
								onRowClick && 'cursor-pointer',
							)}
							onclick={onRowClick ? () => onRowClick(row) : undefined}
						>
							{#each columns as col (col.key)}
								<td class={cn('px-3 py-2.5 align-middle', alignClass(col.align), col.class)}>
									{#if col.cell}
										{@render col.cell(row)}
									{:else}
										{String(getValue(row, col) ?? '')}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
	{#if shouldPaginate && total > 0}
		<div
			class="border-border bg-muted/30 flex items-center justify-between gap-2 border-t px-3 py-2"
		>
			<span class="text-muted-foreground text-xs">
				Showing {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)} of
				{total}
			</span>
			<Pagination {total} bind:page {pageSize} />
		</div>
	{/if}
</div>
