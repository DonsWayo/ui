<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import Link from '@tiptap/extension-link';
	import Underline from '@tiptap/extension-underline';
	import TextAlign from '@tiptap/extension-text-align';
	import { TextStyle } from '@tiptap/extension-text-style';
	import { Color } from '@tiptap/extension-color';
	import Highlight from '@tiptap/extension-highlight';
	import Typography from '@tiptap/extension-typography';
	import Subscript from '@tiptap/extension-subscript';
	import Superscript from '@tiptap/extension-superscript';
	import CharacterCount from '@tiptap/extension-character-count';
	import { Table } from '@tiptap/extension-table';
	import { TableRow } from '@tiptap/extension-table-row';
	import { TableCell } from '@tiptap/extension-table-cell';
	import { TableHeader } from '@tiptap/extension-table-header';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import Mention from '@tiptap/extension-mention';
	import { createMentionSuggestion } from './mention-suggestion.js';

	/**
	 * mode:
	 *  'full'     — wiki editor: full toolbar + all extensions
	 *  'standard' — issues/PRs: toolbar without table controls
	 *  'minimal'  — comments: no toolbar, just formatting via shortcuts
	 */
	type Mode = 'full' | 'standard' | 'minimal';

	type Props = {
		content?: Record<string, unknown> | null;
		placeholder?: string;
		mode?: Mode;
		bordered?: boolean;
		mentionsUrl?: string | null;
		onUpdate?: (json: Record<string, unknown>, html: string) => void;
		onSubmit?: () => void;
		class?: string;
		autofocus?: boolean;
	};

	let {
		content = null,
		placeholder = 'Write something…',
		mode = 'standard',
		bordered = true,
		mentionsUrl = null,
		onUpdate,
		onSubmit,
		class: className = '',
		autofocus = false,
	}: Props = $props();

	let element: HTMLDivElement;
	let editor = $state<Editor | undefined>(undefined);
	let wordCount = $state(0);

	// Active state for toolbar
	let isBold = $state(false);
	let isItalic = $state(false);
	let isUnderline = $state(false);
	let isStrike = $state(false);
	let isCode = $state(false);
	let isBlockquote = $state(false);
	let isCodeBlock = $state(false);
	let isBulletList = $state(false);
	let isOrderedList = $state(false);
	let isTaskList = $state(false);
	let isHighlight = $state(false);
	let isLink = $state(false);
	let currentHeading = $state<number | null>(null);
	let showHeadingMenu = $state(false);
	let showLinkPopover = $state(false);
	let linkUrl = $state('');

	function sync() {
		if (!editor) return;
		isBold = editor.isActive('bold');
		isItalic = editor.isActive('italic');
		isUnderline = editor.isActive('underline');
		isStrike = editor.isActive('strike');
		isCode = editor.isActive('code');
		isBlockquote = editor.isActive('blockquote');
		isCodeBlock = editor.isActive('codeBlock');
		isBulletList = editor.isActive('bulletList');
		isOrderedList = editor.isActive('orderedList');
		isTaskList = editor.isActive('taskList');
		isHighlight = editor.isActive('highlight');
		isLink = editor.isActive('link');
		currentHeading = editor.isActive('heading', { level: 1 })
			? 1
			: editor.isActive('heading', { level: 2 })
				? 2
				: editor.isActive('heading', { level: 3 })
					? 3
					: null;
	}

	onMount(() => {
		const extensions: any[] = [
			StarterKit.configure({ link: false, codeBlock: false }),
			Placeholder.configure({ placeholder }),
			Link.configure({ openOnClick: false }),
			Underline,
			TextStyle,
			Color,
			Highlight.configure({ multicolor: false }),
			Typography,
			Subscript,
			Superscript,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			TaskList,
			TaskItem.configure({ nested: true }),
			CharacterCount,
		];

		if (mode === 'full') {
			extensions.push(Table.configure({ resizable: true }), TableRow, TableHeader, TableCell);
		}

		if (mentionsUrl) {
			extensions.push(
				Mention.configure({
					HTMLAttributes: { class: 'mention' },
					renderHTML: ({ node }: any) => [
						'span',
						{
							class:
								'mention bg-primary/10 text-primary px-1 py-0.5 rounded text-sm font-medium cursor-pointer',
							'data-id': node.attrs.id,
							'data-type': node.attrs.type,
						},
						`@${node.attrs.label}`,
					],
					suggestion: createMentionSuggestion(mentionsUrl),
				}),
			);
		}

		editor = new Editor({
			element,
			extensions,
			content: content ?? '',
			autofocus: autofocus ? 'end' : false,
			onUpdate({ editor }) {
				wordCount = editor.storage.characterCount.words();
				sync();
				onUpdate?.(editor.getJSON() as Record<string, unknown>, editor.getHTML());
			},
			onSelectionUpdate() {
				sync();
			},
			onCreate({ editor }) {
				wordCount = editor.storage.characterCount.words();
				sync();
			},
		});
	});

	onDestroy(() => editor?.destroy());

	function cmd(fn: () => void) {
		fn();
		editor?.view.focus();
		sync();
	}

	function setHeading(level: 0 | 1 | 2 | 3) {
		showHeadingMenu = false;
		if (!editor) return;
		if (level === 0) editor.chain().focus().setParagraph().run();
		else editor.chain().focus().toggleHeading({ level }).run();
		sync();
	}

	function openLink() {
		if (!editor) return;
		linkUrl = editor.getAttributes('link').href ?? '';
		showLinkPopover = true;
		showHeadingMenu = false;
	}

	function applyLink() {
		if (!editor) return;
		if (linkUrl.trim()) editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
		else editor.chain().focus().unsetLink().run();
		showLinkPopover = false;
		linkUrl = '';
		sync();
	}

	const headingLabel = $derived(
		currentHeading === 1 ? 'H1' : currentHeading === 2 ? 'H2' : currentHeading === 3 ? 'H3' : 'T',
	);

	const showToolbar = $derived(mode !== 'minimal');
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
	class="rich-editor {className}"
	data-mode={mode}
	data-bordered={bordered}
	onkeydown={(e) => {
		if (onSubmit && (e.metaKey || e.ctrlKey) && e.key === 'Enter') {
			e.preventDefault();
			onSubmit();
		}
	}}
>
	{#if showToolbar}
		<div class="re-toolbar">
			<!-- Undo / Redo -->
			<button
				type="button"
				title="Undo"
				class="re-btn"
				onclick={() => cmd(() => editor?.chain().focus().undo().run())}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M3 7v6h6" /><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" /></svg
				>
			</button>
			<button
				type="button"
				title="Redo"
				class="re-btn"
				onclick={() => cmd(() => editor?.chain().focus().redo().run())}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" /></svg
				>
			</button>

			<span class="re-sep"></span>

			<!-- Heading dropdown -->
			<div class="re-dropdown">
				<button
					type="button"
					class="re-btn re-heading-btn"
					title="Text style"
					onclick={() => {
						showHeadingMenu = !showHeadingMenu;
						showLinkPopover = false;
					}}
				>
					<span class="re-heading-label">{headingLabel}</span>
					<svg
						width="10"
						height="10"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"><path d="M6 9l6 6 6-6" /></svg
					>
				</button>
				{#if showHeadingMenu}
					<div class="fixed inset-0 z-10" onclick={() => (showHeadingMenu = false)}></div>
					<div class="re-dropdown-menu">
						<button
							type="button"
							class="re-menu-item {!currentHeading ? 're-menu-active' : ''}"
							onclick={() => setHeading(0)}>Normal</button
						>
						<button
							type="button"
							class="re-menu-item re-h1 {currentHeading === 1 ? 're-menu-active' : ''}"
							onclick={() => setHeading(1)}>Heading 1</button
						>
						<button
							type="button"
							class="re-menu-item re-h2 {currentHeading === 2 ? 're-menu-active' : ''}"
							onclick={() => setHeading(2)}>Heading 2</button
						>
						<button
							type="button"
							class="re-menu-item re-h3 {currentHeading === 3 ? 're-menu-active' : ''}"
							onclick={() => setHeading(3)}>Heading 3</button
						>
					</div>
				{/if}
			</div>

			<span class="re-sep"></span>

			<!-- Inline marks -->
			<button
				type="button"
				title="Bold (⌘B)"
				class="re-btn re-bold {isBold ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleBold().run())}>B</button
			>
			<button
				type="button"
				title="Italic (⌘I)"
				class="re-btn re-italic {isItalic ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleItalic().run())}>I</button
			>
			<button
				type="button"
				title="Underline (⌘U)"
				class="re-btn re-underline {isUnderline ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleUnderline().run())}>U</button
			>
			<button
				type="button"
				title="Strikethrough"
				class="re-btn re-strike {isStrike ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleStrike().run())}>S</button
			>
			<button
				type="button"
				title="Code"
				class="re-btn re-code {isCode ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleCode().run())}>`</button
			>
			<button
				type="button"
				title="Highlight"
				class="re-btn {isHighlight ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleHighlight().run())}
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"
					><path
						d="M15.243 3.757L8.586 10.414 6 13l1.5 1.5-3 3L6 19l1.5-1.5 1.5 1.5 2.586-2.586L13 18l6.243-6.243a2 2 0 000-2.829l-1.171-1.171a2 2 0 00-2.829 0z"
					/></svg
				>
			</button>

			<span class="re-sep"></span>

			<!-- Lists -->
			<button
				type="button"
				title="Bullet list"
				class="re-btn {isBulletList ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleBulletList().run())}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					><line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line
						x1="9"
						y1="18"
						x2="20"
						y2="18"
					/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" /><circle
						cx="4"
						cy="12"
						r="1.5"
						fill="currentColor"
						stroke="none"
					/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" /></svg
				>
			</button>
			<button
				type="button"
				title="Ordered list"
				class="re-btn {isOrderedList ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleOrderedList().run())}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line
						x1="10"
						y1="18"
						x2="21"
						y2="18"
					/><path d="M4 6h1v4" stroke-linecap="round" /><path
						d="M4 10h2"
						stroke-linecap="round"
					/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" stroke-linecap="round" /></svg
				>
			</button>
			<button
				type="button"
				title="Task list"
				class="re-btn {isTaskList ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleTaskList().run())}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					><rect x="3" y="5" width="6" height="6" rx="1" /><path
						d="M5 8l1.5 1.5L9 6"
						stroke-linecap="round"
					/><line x1="13" y1="8" x2="21" y2="8" /><rect
						x="3"
						y="14"
						width="6"
						height="6"
						rx="1"
					/><line x1="13" y1="17" x2="21" y2="17" /></svg
				>
			</button>

			<span class="re-sep"></span>

			<!-- Block elements -->
			<button
				type="button"
				title="Blockquote"
				class="re-btn {isBlockquote ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleBlockquote().run())}
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
					><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" /></svg
				>
			</button>
			<button
				type="button"
				title="Code block"
				class="re-btn {isCodeBlock ? 're-active' : ''}"
				onclick={() => cmd(() => editor?.chain().focus().toggleCodeBlock().run())}
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg
				>
			</button>

			<!-- Full mode extras: table insert -->
			{#if mode === 'full'}
				<button
					type="button"
					title="Insert table"
					class="re-btn"
					onclick={() =>
						cmd(() =>
							editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
						)}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><rect x="3" y="3" width="18" height="18" rx="2" /><line
							x1="3"
							y1="9"
							x2="21"
							y2="9"
						/><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /></svg
					>
				</button>
			{/if}

			<span class="re-sep"></span>

			<!-- Link -->
			<div class="re-dropdown">
				<button
					type="button"
					title="Link"
					class="re-btn {isLink ? 're-active' : ''}"
					onclick={openLink}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path
							d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
						/></svg
					>
				</button>
				{#if showLinkPopover}
					<div class="fixed inset-0 z-10" onclick={() => (showLinkPopover = false)}></div>
					<div class="re-link-popover">
						<input
							type="url"
							bind:value={linkUrl}
							placeholder="https://…"
							class="re-link-input"
							onkeydown={(e) => {
								if (e.key === 'Enter') applyLink();
								if (e.key === 'Escape') showLinkPopover = false;
							}}
						/>
						<div class="re-link-actions">
							<button type="button" class="re-link-apply" onclick={applyLink}>Apply</button>
							{#if isLink}
								<button
									type="button"
									class="re-link-remove"
									onclick={() => {
										editor?.chain().focus().unsetLink().run();
										showLinkPopover = false;
									}}>Remove</button
								>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<!-- Word count -->
			<span class="re-word-count">{wordCount}w</span>

			<!-- Hint for onSubmit -->
			{#if onSubmit}
				<span class="re-submit-hint">⌘↵ to submit</span>
			{/if}
		</div>
	{/if}

	<div bind:this={element} class="re-content"></div>
</div>

<style>
	.rich-editor {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		overflow: hidden;
		background: var(--background);
	}
	.rich-editor[data-mode='minimal'],
	.rich-editor[data-bordered='false'] {
		border: none;
		border-radius: 0;
		background: transparent;
	}
	.rich-editor[data-bordered='false'] .re-toolbar {
		border-bottom: 1px solid var(--border);
		background: transparent;
	}

	/* ── Toolbar ── */
	.re-toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1px;
		padding: 4px 8px;
		border-bottom: 1px solid var(--border);
		background: var(--muted);
	}

	.re-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding: 0;
		border: none;
		border-radius: 4px;
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		font-size: 13px;
		transition:
			background 0.1s,
			color 0.1s;
		flex-shrink: 0;
	}
	.re-btn:hover {
		background: var(--accent);
		color: var(--foreground);
	}
	.re-active {
		background: var(--primary) !important;
		color: var(--primary-foreground) !important;
	}
	.re-active:hover {
		opacity: 0.9;
	}

	.re-bold {
		font-weight: 700;
	}
	.re-italic {
		font-style: italic;
	}
	.re-underline {
		text-decoration: underline;
	}
	.re-strike {
		text-decoration: line-through;
	}
	.re-code {
		font-family: ui-monospace, monospace;
		font-size: 12px;
	}

	.re-sep {
		width: 1px;
		height: 18px;
		background: var(--border);
		margin: 0 3px;
		flex-shrink: 0;
	}

	.re-heading-btn {
		width: auto;
		padding: 0 6px;
		gap: 4px;
		font-size: 12px;
		font-weight: 600;
		min-width: 40px;
	}
	.re-heading-label {
		min-width: 16px;
		text-align: center;
	}

	.re-dropdown {
		position: relative;
	}
	.re-dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 20;
		margin-top: 4px;
		min-width: 140px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--card);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
		overflow: hidden;
	}
	.re-menu-item {
		display: block;
		width: 100%;
		padding: 7px 12px;
		text-align: left;
		border: none;
		background: transparent;
		color: var(--foreground);
		cursor: pointer;
		font-size: 13px;
		transition: background 0.1s;
	}
	.re-menu-item:hover {
		background: var(--muted);
	}
	.re-menu-active {
		background: color-mix(in oklch, var(--primary) 10%, transparent);
	}
	.re-h1 {
		font-size: 1.2rem;
		font-weight: 700;
	}
	.re-h2 {
		font-size: 1.05rem;
		font-weight: 700;
	}
	.re-h3 {
		font-size: 0.95rem;
		font-weight: 600;
	}

	.re-link-popover {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 20;
		margin-top: 4px;
		width: 260px;
		padding: 10px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--card);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
	}
	.re-link-input {
		width: 100%;
		padding: 6px 10px;
		font-size: 13px;
		border: 1px solid var(--border);
		border-radius: 5px;
		background: var(--background);
		color: var(--foreground);
		outline: none;
		box-sizing: border-box;
	}
	.re-link-input:focus {
		border-color: var(--primary);
	}
	.re-link-actions {
		display: flex;
		gap: 6px;
		margin-top: 7px;
	}
	.re-link-apply {
		padding: 4px 10px;
		font-size: 12px;
		font-weight: 500;
		border: none;
		border-radius: 4px;
		background: var(--primary);
		color: var(--primary-foreground);
		cursor: pointer;
	}
	.re-link-apply:hover {
		opacity: 0.9;
	}
	.re-link-remove {
		padding: 4px 10px;
		font-size: 12px;
		border: 1px solid var(--border);
		border-radius: 4px;
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
	}
	.re-link-remove:hover {
		background: var(--muted);
	}

	.re-word-count {
		margin-left: auto;
		font-size: 11px;
		color: var(--muted-foreground);
		opacity: 0.6;
		user-select: none;
		padding-right: 2px;
	}
	.re-submit-hint {
		font-size: 11px;
		color: var(--muted-foreground);
		opacity: 0.5;
		user-select: none;
		white-space: nowrap;
	}

	/* ── Editor area ── */
	.re-content {
		flex: 1;
		padding: 12px 16px;
		min-height: 120px;
		overflow-y: auto;
	}
	.rich-editor[data-mode='full'] .re-content {
		min-height: 300px;
		padding: 20px 24px;
	}
	.rich-editor[data-mode='minimal'] .re-content {
		padding: 8px 12px;
		min-height: 60px;
	}

	:global(.rich-editor .ProseMirror) {
		outline: none;
	}
	:global(.rich-editor .ProseMirror p.is-editor-empty:first-child::before) {
		color: var(--muted-foreground);
		opacity: 0.45;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}

	:global(.rich-editor .ProseMirror h1) {
		font-size: 1.6rem;
		font-weight: 700;
		margin: 0.9rem 0 0.4rem;
	}
	:global(.rich-editor .ProseMirror h2) {
		font-size: 1.3rem;
		font-weight: 700;
		margin: 0.75rem 0 0.35rem;
	}
	:global(.rich-editor .ProseMirror h3) {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0.65rem 0 0.3rem;
	}
	:global(.rich-editor .ProseMirror p) {
		margin: 0.3rem 0;
		line-height: 1.65;
	}
	:global(.rich-editor .ProseMirror a) {
		color: var(--primary);
		text-decoration: underline;
	}

	:global(.rich-editor .ProseMirror code) {
		background: var(--muted);
		padding: 0.1em 0.3em;
		border-radius: 3px;
		font-size: 0.875em;
		font-family: ui-monospace, monospace;
	}
	:global(.rich-editor .ProseMirror pre) {
		background: var(--muted);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 12px 16px;
		overflow-x: auto;
		margin: 8px 0;
	}
	:global(.rich-editor .ProseMirror pre code) {
		background: none;
		padding: 0;
		font-size: 0.875rem;
	}

	:global(.rich-editor .ProseMirror blockquote) {
		border-left: 3px solid var(--border);
		padding-left: 1rem;
		margin: 8px 0;
		color: var(--muted-foreground);
		font-style: italic;
	}

	:global(.rich-editor .ProseMirror ul) {
		padding-left: 1.4rem;
		margin: 4px 0;
	}
	:global(.rich-editor .ProseMirror ol) {
		padding-left: 1.4rem;
		margin: 4px 0;
	}
	:global(.rich-editor .ProseMirror li) {
		margin: 2px 0;
	}

	:global(.rich-editor .ProseMirror ul[data-type='taskList']) {
		list-style: none;
		padding-left: 0;
	}
	:global(.rich-editor .ProseMirror ul[data-type='taskList'] li) {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		margin: 3px 0;
	}
	:global(.rich-editor .ProseMirror ul[data-type='taskList'] li label) {
		margin-top: 2px;
		cursor: pointer;
	}
	:global(.rich-editor .ProseMirror ul[data-type='taskList'] li[data-checked='true'] > div) {
		opacity: 0.6;
		text-decoration: line-through;
	}

	:global(.rich-editor .ProseMirror table) {
		border-collapse: collapse;
		width: 100%;
		margin: 8px 0;
	}
	:global(.rich-editor .ProseMirror td, .rich-editor .ProseMirror th) {
		border: 1px solid var(--border);
		padding: 6px 10px;
		min-width: 60px;
	}
	:global(.rich-editor .ProseMirror th) {
		background: var(--muted);
		font-weight: 600;
		text-align: left;
	}

	:global(.rich-editor .ProseMirror mark) {
		background: oklch(0.97 0.12 95);
		border-radius: 2px;
		padding: 0 1px;
	}

	:global(.rich-editor .mention) {
		display: inline-flex;
		align-items: center;
		padding: 1px 5px;
		border-radius: 4px;
		font-size: 0.875em;
		font-weight: 500;
		background: color-mix(in oklch, var(--primary) 12%, transparent);
		color: var(--primary);
		cursor: pointer;
	}

	/* Mention dropdown (tippy) */
	:global(.mention-list) {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		overflow: hidden;
		min-width: 220px;
	}
	:global(.mention-list-empty) {
		padding: 10px 14px;
		font-size: 13px;
		color: var(--muted-foreground);
	}
	:global(.mention-list-item) {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 12px;
		border: none;
		background: transparent;
		text-align: left;
		cursor: pointer;
		transition: background 0.1s;
	}
	:global(.mention-list-item:hover),
	:global(.mention-list-item.is-selected) {
		background: var(--muted);
	}
	:global(.mention-avatar) {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		object-fit: cover;
	}
	:global(.mention-avatar-fallback) {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--muted);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 600;
		color: var(--muted-foreground);
	}
	:global(.mention-info) {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}
	:global(.mention-label) {
		font-size: 13px;
		font-weight: 500;
		color: var(--foreground);
	}
	:global(.mention-sublabel) {
		font-size: 11px;
		color: var(--muted-foreground);
	}
	:global(.mention-badge) {
		font-size: 10px;
		font-weight: 600;
		padding: 1px 6px;
		border-radius: 10px;
		background: var(--secondary);
		color: var(--secondary-foreground);
	}
</style>
