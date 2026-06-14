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

	// Emoji reactions for a comment. There's no server reactions endpoint
	// yet, so these persist locally (per-browser, keyed by comment id) —
	// a genuine, self-contained interaction that lights up the timeline
	// without pretending to be shared state. When a reactions API lands,
	// swap `load`/`save` for fetch calls and keep the same surface.
	let { storageKey }: { storageKey: string } = $props();

	// The GitHub reaction set, in GitHub's canonical order.
	const EMOJI = ['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀'];
	const key = $derived(`nucel:reactions:${storageKey}`);

	function load(): Record<string, boolean> {
		if (typeof localStorage === 'undefined') return {};
		try {
			return JSON.parse(localStorage.getItem(`nucel:reactions:${storageKey}`) ?? '{}');
		} catch {
			return {};
		}
	}

	let reacted = $state<Record<string, boolean>>(load());
	let pickerOpen = $state(false);

	function toggle(emoji: string) {
		const next = { ...reacted, [emoji]: !reacted[emoji] };
		if (!next[emoji]) delete next[emoji];
		reacted = next;
		try {
			localStorage.setItem(key, JSON.stringify(next));
		} catch {
			/* storage may be unavailable (private mode) — reactions stay in-memory */
		}
	}

	// Keep pills in the canonical emoji order so a comment never reshuffles
	// its reactions as you toggle them.
	const active = $derived(EMOJI.filter((e) => reacted[e]));
</script>

<TooltipProvider delayDuration={200}>
	<div class="flex flex-wrap items-center gap-1.5" data-testid="reaction-bar">
		{#each active as emoji (emoji)}
			<Tooltip>
				<TooltipTrigger>
					{#snippet child({ props })}
						<button
							{...props}
							type="button"
							aria-pressed="true"
							aria-label="Remove {emoji} reaction (you reacted)"
							class="focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-7 items-center gap-1.5 rounded-full border border-primary/50 bg-primary/10 px-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
							onclick={() => toggle(emoji)}
						>
							<span class="text-sm leading-none">{emoji}</span>
							<span class="tabular-nums leading-none">1</span>
						</button>
					{/snippet}
				</TooltipTrigger>
				<TooltipContent>
					<span class="text-xs">You reacted with {emoji}</span>
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
			<DropdownMenuContent
				class="flex w-auto gap-0.5 rounded-full p-1"
				align="start"
				sideOffset={6}
			>
				{#each EMOJI as emoji (emoji)}
					<button
						type="button"
						aria-pressed={reacted[emoji] ? 'true' : 'false'}
						class="hover:bg-muted focus-visible:ring-ring flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 {reacted[
							emoji
						]
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
