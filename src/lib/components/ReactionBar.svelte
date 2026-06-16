<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		Button,
		Tooltip,
		TooltipTrigger,
		TooltipContent,
		TooltipProvider,
	} from '../index.js';
	import { SmilePlus } from '@lucide/svelte';

	// Emoji reactions for a comment/issue/PR.
	//
	// Two modes:
	//  • Server mode — pass `endpoint` (a POST URL that toggles `{emoji}` and
	//    returns `{ reactions: [{emoji,count,reacted}] }`) plus the `initial`
	//    summary rendered server-side. Reactions are shared, counted state.
	//  • Local mode — pass only `storageKey`; reactions persist per-browser in
	//    localStorage. Used where no reactions endpoint exists yet (PR/Wiki).
	export type ReactionSummary = { emoji: string; count: number; reacted: boolean };

	let {
		storageKey,
		endpoint,
		initial = [],
	}: {
		storageKey?: string;
		endpoint?: string;
		initial?: ReactionSummary[];
	} = $props();

	// The GitHub reaction set, in GitHub's canonical order — pills always render
	// in this order so a comment never reshuffles as you toggle.
	const EMOJI = ['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀'];
	const serverMode = $derived(!!endpoint);

	// ── Local (localStorage) state ───────────────────────────────────────────
	function loadLocal(): Record<string, boolean> {
		if (typeof localStorage === 'undefined' || !storageKey) return {};
		try {
			return JSON.parse(localStorage.getItem(`nucel:reactions:${storageKey}`) ?? '{}');
		} catch {
			return {};
		}
	}
	let localReacted = $state<Record<string, boolean>>(loadLocal());

	// ── Server state ─────────────────────────────────────────────────────────
	let summary = $state<ReactionSummary[]>(initial);
	let busy = $state(false);
	let pickerOpen = $state(false);

	// Unified view model: [{emoji, count, reacted}] in canonical order.
	const pills = $derived.by<ReactionSummary[]>(() => {
		if (serverMode) {
			const by = new Map(summary.map((r) => [r.emoji, r]));
			return EMOJI.filter((e) => by.has(e) && (by.get(e)!.count ?? 0) > 0).map(
				(e) => by.get(e)!,
			);
		}
		return EMOJI.filter((e) => localReacted[e]).map((e) => ({
			emoji: e,
			count: 1,
			reacted: true,
		}));
	});
	const isReacted = $derived.by<(e: string) => boolean>(() => {
		if (serverMode) {
			const by = new Map(summary.map((r) => [r.emoji, r]));
			return (e: string) => !!by.get(e)?.reacted;
		}
		return (e: string) => !!localReacted[e];
	});

	async function toggle(emoji: string) {
		if (serverMode) {
			if (busy) return;
			busy = true;
			// Optimistic: flip locally so the pill responds instantly.
			const prev = summary;
			summary = optimistic(summary, emoji);
			try {
				const res = await fetch(endpoint!, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'same-origin',
					body: JSON.stringify({ emoji }),
				});
				if (!res.ok) throw new Error(`reaction failed: ${res.status}`);
				const data = (await res.json()) as { reactions: ReactionSummary[] };
				summary = data.reactions ?? [];
			} catch {
				summary = prev; // revert on failure
			} finally {
				busy = false;
			}
			return;
		}
		// Local mode
		const next = { ...localReacted, [emoji]: !localReacted[emoji] };
		if (!next[emoji]) delete next[emoji];
		localReacted = next;
		try {
			localStorage.setItem(`nucel:reactions:${storageKey}`, JSON.stringify(next));
		} catch {
			/* storage may be unavailable (private mode) — reactions stay in-memory */
		}
	}

	// Compute the optimistic summary after toggling `emoji` (add or remove me).
	function optimistic(cur: ReactionSummary[], emoji: string): ReactionSummary[] {
		const out = cur.map((r) => ({ ...r }));
		const ex = out.find((r) => r.emoji === emoji);
		if (ex) {
			ex.count += ex.reacted ? -1 : 1;
			ex.reacted = !ex.reacted;
			return out.filter((r) => r.count > 0);
		}
		out.push({ emoji, count: 1, reacted: true });
		return out;
	}
</script>

<TooltipProvider delayDuration={200}>
	<div class="flex flex-wrap items-center gap-1.5" data-testid="reaction-bar">
		{#each pills as pill (pill.emoji)}
			<Tooltip>
				<TooltipTrigger>
					{#snippet child({ props })}
						<button
							{...props}
							type="button"
							aria-pressed={pill.reacted ? 'true' : 'false'}
							aria-label="{pill.reacted ? 'Remove' : 'Add'} {pill.emoji} reaction"
							disabled={busy}
							class="focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-60 {pill.reacted
								? 'border-primary/50 bg-primary/10 text-primary hover:bg-primary/20'
								: 'border-border bg-muted/40 text-muted-foreground hover:bg-muted'}"
							onclick={() => toggle(pill.emoji)}
						>
							<span class="text-sm leading-none">{pill.emoji}</span>
							<span class="tabular-nums leading-none">{pill.count}</span>
						</button>
					{/snippet}
				</TooltipTrigger>
				<TooltipContent>
					<span class="text-xs"
						>{pill.reacted ? 'You reacted with' : 'React with'} {pill.emoji}</span
					>
				</TooltipContent>
			</Tooltip>
		{/each}

		<DropdownMenu bind:open={pickerOpen}>
			<DropdownMenuTrigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="ghost"
						size="icon"
						title="Add reaction"
						class="text-muted-foreground hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground h-7 w-7 rounded-full transition-colors"
						aria-label="Add reaction"
					>
						<SmilePlus class="h-4 w-4" />
					</Button>
				{/snippet}
			</DropdownMenuTrigger>
			<DropdownMenuContent class="flex w-auto gap-0.5 rounded-full p-1" align="start" sideOffset={6}>
				{#each EMOJI as emoji (emoji)}
					<button
						type="button"
						aria-pressed={isReacted(emoji) ? 'true' : 'false'}
						class="hover:bg-muted focus-visible:ring-ring flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 {isReacted(
							emoji,
						)
							? 'bg-primary/15 ring-1 ring-primary/40'
							: ''}"
						onclick={() => {
							toggle(emoji);
							pickerOpen = false;
						}}
						aria-label="React with {emoji}">{emoji}</button
					>
				{/each}
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</TooltipProvider>
