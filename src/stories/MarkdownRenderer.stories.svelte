<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { MarkdownRenderer } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/MarkdownRenderer',
		component: MarkdownRenderer,
		tags: ['autodocs'],
	});

	const sampleMarkdown = `# Hello World

This is a paragraph with **bold** and *italic* text.

## Lists

- Item 1
- Item 2
- Item 3

## Code

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

## Links

[Visit Example](https://example.com)
`;
</script>

<Story name="Default" args={{}}>
	{#snippet children(args)}
		<MarkdownRenderer content={sampleMarkdown} />
	{/snippet}
</Story>

<Story name="With Links" args={{ content: 'Check out [our docs](/docs) for more info.' }}>
	{#snippet children(args)}
		<MarkdownRenderer {...args} />
	{/snippet}
</Story>
