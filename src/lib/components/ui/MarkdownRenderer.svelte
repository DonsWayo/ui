<script lang="ts">
	import { onMount, tick } from 'svelte';
	import {
		getHighlighter,
		loadLanguage,
		resolveLang,
		SHIKI_LIGHT_THEME,
		SHIKI_DARK_THEME,
	} from '../../utils/shikiHighlighter.js';

	let {
		content,
		highlight = true,
	}: {
		content: string;
		/**
		 * When true (default), fenced code blocks are run through Shiki after
		 * the markdown is rendered. Set to false to fall back to plain `<pre>`.
		 */
		highlight?: boolean;
	} = $props();

	let host = $state<HTMLDivElement | undefined>(undefined);
	let isDark = $state(false);

	// `marked` (~45KB) and `DOMPurify` (~45KB) are loaded lazily on mount rather
	// than imported at module scope — a top-level import pulled both into every
	// @nucel/ui consumer's bundle even when no markdown was ever rendered. They
	// resolve to `null` until loaded (and during SSR), so `html` is empty for
	// one tick, then renders.
	let parse = $state<((md: string) => string) | null>(null);
	let sanitize = $state<((html: string) => string) | null>(null);

	let html = $derived(
		parse && sanitize
			? sanitize(parse(content))
			: '',
	);

	function readDarkMode(): boolean {
		if (typeof document === 'undefined') return false;
		return document.documentElement.classList.contains('dark');
	}

	onMount(() => {
		isDark = readDarkMode();
		const mo = new MutationObserver(() => {
			isDark = readDarkMode();
		});
		mo.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		// Lazy-load the markdown + sanitizer stack (fire-and-forget).
		void (async () => {
			const [{ marked }, { default: DOMPurify }] = await Promise.all([
				import('marked'),
				import('dompurify'),
			]);
			parse = (md: string) => marked.parse(md, { gfm: true, breaks: false }) as string;
			sanitize = (h: string) =>
				DOMPurify.sanitize(h, {
					// Allow Shiki's inline style attributes on spans (colour tokens).
					ADD_ATTR: ['style', 'data-line', 'data-language'],
				});
		})();

		return () => mo.disconnect();
	});

	// Re-highlight whenever the markdown re-renders or the theme flips.
	$effect(() => {
		void html;
		void isDark;
		if (!highlight || typeof window === 'undefined' || !host) return;

		let cancelled = false;
		(async () => {
			// Wait one tick so the @html DOM is in place.
			await tick();
			if (cancelled || !host) return;

			const blocks = host.querySelectorAll('pre > code[class*="language-"]');
			if (blocks.length === 0) return;

			const theme = isDark ? SHIKI_DARK_THEME : SHIKI_LIGHT_THEME;
			const hl = await getHighlighter();

			for (const block of Array.from(blocks)) {
				if (cancelled) return;
				const pre = block.parentElement;
				if (!pre || pre.dataset.shikiDone === 'true') continue;

				const langClass = Array.from(block.classList).find((c) =>
					c.startsWith('language-'),
				);
				const requested = langClass ? langClass.slice('language-'.length) : 'plaintext';

				await loadLanguage(requested);
				const lang = resolveLang(requested);
				const code = block.textContent ?? '';

				try {
					const shikiHtml = hl.codeToHtml(code, { lang, theme });
					// Shiki only emits <pre><code><span> with style="color: #xxx"
					// attributes — fully trusted output, but parse it via the DOM
					// parser (rather than innerHTML) to keep our defensive defaults.
					const doc = new DOMParser().parseFromString(shikiHtml, 'text/html');
					const next = doc.body.firstElementChild;
					if (next) {
						(next as HTMLElement).dataset.shikiDone = 'true';
						(next as HTMLElement).dataset.lang = requested;
						pre.replaceWith(next);
					}
				} catch (err) {
					console.warn('[@nucel/ui MarkdownRenderer] Shiki failed:', err);
					pre.dataset.shikiDone = 'true';
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	});
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<div bind:this={host} class="md-body" data-theme={isDark ? 'dark' : 'light'}>
	{@html html}
</div>

<style>
	/* :global() is required here to style injected {@html} content */
	.md-body {
		max-width: none;
	}
	.md-body :global(h1),
	.md-body :global(h2),
	.md-body :global(h3),
	.md-body :global(h4) {
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.5rem;
		color: var(--foreground);
	}
	/* Inline code (not inside a <pre>) — keep simple. */
	.md-body :global(code:not(pre code)) {
		background: var(--muted);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.875em;
		color: var(--foreground);
	}
	/* Fallback <pre> (before Shiki replaces it, or when highlight=false). */
	.md-body :global(pre) {
		background: var(--muted);
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		border: 1px solid var(--border);
	}
	.md-body :global(pre code) {
		background: none;
		padding: 0;
		color: var(--foreground);
	}
	/* Shiki-rendered <pre class="shiki ...">.
	   The colour tokens come from Shiki; we own the chrome. */
	.md-body :global(pre.shiki) {
		margin: 1rem 0;
		padding: 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--border);
		overflow-x: auto;
		font-family: var(--font-mono, ui-monospace, SFMono-Regular, monospace);
		font-size: 0.85rem;
		line-height: 1.55;
		tab-size: 2;
	}
	.md-body :global(pre.shiki code) {
		display: block;
		min-width: max-content;
		background: transparent;
		padding: 0;
	}
	.md-body :global(a) {
		color: var(--primary);
	}
	.md-body :global(p) {
		color: var(--muted-foreground);
		line-height: 1.6;
	}
	.md-body :global(ul),
	.md-body :global(ol) {
		color: var(--muted-foreground);
	}
	.md-body :global(blockquote) {
		border-left: 3px solid var(--border);
		margin-left: 0;
		padding-left: 1rem;
		color: var(--muted-foreground);
	}
	.md-body :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
	}
	.md-body :global(table) {
		border-collapse: collapse;
		width: 100%;
	}
	.md-body :global(th),
	.md-body :global(td) {
		border: 1px solid var(--border);
		padding: 0.5rem 0.75rem;
		color: var(--muted-foreground);
	}
	.md-body :global(th) {
		background: var(--card);
		color: var(--foreground);
	}
</style>
