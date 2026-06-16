import { describe, it, expect } from 'vitest';
import DOMPurifyImport from 'dompurify';
import { sanitizeMarkdownHtml, MARKDOWN_PURIFY_CONFIG } from './markdownSanitize.js';

// `dompurify`'s default export is a ready instance when a `window` exists
// (jsdom env), or a factory `(window) => instance` otherwise. Normalise both.
const purifier =
	typeof (DOMPurifyImport as unknown as { sanitize?: unknown }).sanitize === 'function'
		? (DOMPurifyImport as unknown as Parameters<typeof sanitizeMarkdownHtml>[0])
		: (DOMPurifyImport as unknown as (w: unknown) => Parameters<typeof sanitizeMarkdownHtml>[0])(
				globalThis.window,
			);

const clean = (html: string) => sanitizeMarkdownHtml(purifier, html);

describe('sanitizeMarkdownHtml', () => {
	it('removes <script> tags', () => {
		const out = clean('<p>hello</p><script>alert(1)</script>');
		expect(out).not.toMatch(/<script/i);
		expect(out).toContain('hello');
	});

	it('strips inline style — the CSS-overlay / clickjacking vector this fix closes', () => {
		// A full-viewport fixed overlay would hijack clicks on trusted UI.
		const out = clean('<p style="position:fixed;inset:0;z-index:9999;">x</p>');
		expect(out).not.toMatch(/style\s*=/i);
		expect(out).not.toContain('position:fixed');
		expect(out).toContain('x'); // text content survives
	});

	it('drops event-handler attributes (onerror, onclick, …)', () => {
		const out = clean('<img src="x" onerror="alert(1)"><a href="#" onclick="alert(1)">y</a>');
		expect(out).not.toMatch(/onerror/i);
		expect(out).not.toMatch(/onclick/i);
	});

	it('neutralises javascript: URLs in links', () => {
		const out = clean('<a href="javascript:alert(1)">click</a>');
		expect(out).not.toMatch(/javascript:/i);
	});

	it('removes embedding / active tags (iframe, object, embed, base, form, svg, math)', () => {
		for (const tag of ['iframe', 'object', 'embed', 'base', 'form', 'svg', 'math']) {
			const out = clean(`<${tag}></${tag}>`);
			expect(out, `${tag} should be stripped`).not.toMatch(new RegExp(`<${tag}`, 'i'));
		}
	});

	it('removes <style> tags (CSS injection)', () => {
		const out = clean('<style>body{display:none}</style><p>ok</p>');
		expect(out).not.toMatch(/<style/i);
		expect(out).toContain('ok');
	});

	it('unwraps SVG-nested scripts', () => {
		const out = clean('<svg><script>alert(1)</script></svg>');
		expect(out).not.toMatch(/<svg/i);
		expect(out).not.toMatch(/<script/i);
	});

	it('keeps ordinary safe markdown output intact', () => {
		const out = clean(
			'<h1>Title</h1><p>A <a href="https://example.com">link</a> and <code>code</code>.</p>',
		);
		expect(out).toContain('<h1>Title</h1>');
		expect(out).toContain('href="https://example.com"');
		expect(out).toContain('<code>code</code>');
	});

	it('preserves the editor [data-callout] blocks (feature must survive hardening)', () => {
		const out = clean('<div data-callout="info"><p>note</p></div>');
		expect(out).toMatch(/data-callout="info"/);
		expect(out).toContain('note');
	});

	it('config forbids the style attribute and tag explicitly', () => {
		expect(MARKDOWN_PURIFY_CONFIG.FORBID_ATTR).toContain('style');
		expect(MARKDOWN_PURIFY_CONFIG.FORBID_TAGS).toContain('style');
		// And does NOT re-introduce the old inline-style allowance.
		expect(MARKDOWN_PURIFY_CONFIG.ADD_ATTR).not.toContain('style');
	});
});
