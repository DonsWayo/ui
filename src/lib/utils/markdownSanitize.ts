/**
 * Hardened DOMPurify configuration for rendering user-authored markdown.
 *
 * `MarkdownRenderer` re-highlights fenced code blocks with Shiki *after*
 * sanitization, by DOM-replacing each `<pre>` (see its `$effect` /
 * `pre.replaceWith`). Shiki's colour-token `<span style="color:…">` output
 * therefore never passes through DOMPurify, so the sanitizer does NOT need to
 * permit inline `style`.
 *
 * Allowing `style` on *user-authored* markdown was a stored-XSS / CSS-overlay
 * foot-gun — e.g. a `position:fixed; inset:0; z-index:9999` overlay that
 * hijacks clicks (clickjacking) on top of trusted UI. We strip it, along with
 * the active/embedding tags (`form`, `iframe`, `object`, `svg`, `math`, …)
 * that DOMPurify would otherwise keep. `data-*` attributes stay allowed
 * (DOMPurify's default) so the editor's `[data-callout]` blocks still render.
 */
export const MARKDOWN_PURIFY_CONFIG: Record<string, unknown> = {
	// Code-block hooks emitted by the highlighter — harmless, explicitly kept.
	ADD_ATTR: ['data-line', 'data-language'],
	FORBID_TAGS: [
		'style',
		'form',
		'input',
		'button',
		'textarea',
		'select',
		'iframe',
		'object',
		'embed',
		'base',
		'link',
		'meta',
		'svg',
		'math',
	],
	FORBID_ATTR: ['style', 'srcset', 'ping', 'formaction', 'background'],
};

/** Minimal structural type for the slice of DOMPurify we use (version-agnostic). */
export type HtmlSanitizer = {
	sanitize(dirty: string, config?: Record<string, unknown>): string;
};

/**
 * Sanitize already-parsed markdown HTML with {@link MARKDOWN_PURIFY_CONFIG}.
 *
 * The DOMPurify instance is passed in rather than imported here so callers can
 * keep it lazily loaded — a top-level `dompurify` import would pull ~45 KB into
 * every `@nucel/ui` consumer's bundle even when no markdown is ever rendered.
 */
export function sanitizeMarkdownHtml(purifier: HtmlSanitizer, html: string): string {
	return purifier.sanitize(html, MARKDOWN_PURIFY_CONFIG);
}
