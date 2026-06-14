<script lang="ts">
	import { createHighlighter, type Highlighter } from 'shiki';
	import CopyButton from './CopyButton.svelte';
	import { cn } from '$lib/utils/cn.js';

	let {
		code,
		language = 'plaintext',
		showLanguage = true,
		class: className,
	}: {
		code: string;
		language?: string;
		showLanguage?: boolean;
		class?: string;
	} = $props();

	let html = $state('');
	let highlighter: Highlighter | null = null;

	const SUPPORTED_LANGS = [
		'typescript',
		'javascript',
		'svelte',
		'html',
		'css',
		'json',
		'bash',
		'shell',
		'python',
		'rust',
		'go',
		'plaintext',
		'sql',
		'yaml',
		'toml',
		'markdown',
	] as const;

	async function highlight(src: string, lang: string) {
		if (!highlighter) {
			highlighter = await createHighlighter({
				themes: ['github-dark'],
				langs: SUPPORTED_LANGS as unknown as string[],
			});
		}
		const safeLang = SUPPORTED_LANGS.includes(lang as (typeof SUPPORTED_LANGS)[number])
			? lang
			: 'plaintext';
		return highlighter.codeToHtml(src, { lang: safeLang, theme: 'github-dark' });
	}

	$effect(() => {
		highlight(code, language)
			.then((result) => {
				html = result;
			})
			.catch(() => {
				// Highlighting failed (e.g. in a test environment without WASM support).
				// The component falls back to the plain <pre> display.
			});
	});
</script>

<div
	class={cn(
		'relative overflow-hidden rounded-xl border border-border bg-[#0d1117] font-mono text-sm',
		className,
	)}
>
	{#if showLanguage || true}
		<div class="flex items-center justify-between border-b border-white/8 px-4 py-2">
			{#if showLanguage}
				<span class="text-[11px] font-medium uppercase tracking-wide text-white/40">
					{language}
				</span>
			{:else}
				<span></span>
			{/if}
			<CopyButton
				text={code}
				size={14}
				class="text-white/40 hover:bg-white/8 hover:text-white/80"
			/>
		</div>
	{/if}

	{#if html}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div class="overflow-x-auto [&>pre]:p-4 [&>pre]:text-sm">{@html html}</div>
	{:else}
		<pre class="overflow-x-auto p-4 text-white/70">{code}</pre>
	{/if}
</div>
