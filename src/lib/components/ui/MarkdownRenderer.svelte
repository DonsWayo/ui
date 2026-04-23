<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';

	let { content = '' }: { content?: string } = $props();

	let html = $derived(
		content ? DOMPurify.sanitize(marked.parse(content, { gfm: true, breaks: false }) as string) : '',
	);
</script>

<div class="md-body">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
	.md-body :global(code) {
		background: var(--muted);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: var(--font-mono, monospace);
		font-size: 0.875em;
		color: var(--foreground);
	}
	.md-body :global(pre) {
		background: var(--background);
		padding: 1rem;
		border-radius: 0.375rem;
		overflow-x: auto;
		border: 1px solid var(--border);
	}
	.md-body :global(pre code) {
		background: none;
		padding: 0;
		color: var(--muted-foreground);
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
