<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CodeBlock } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/CodeBlock',
		tags: ['autodocs'],
	});
</script>

<Story
	name="TypeScript"
	args={{
		language: 'typescript',
		code: `function greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconst msg = greet('World');\nconsole.log(msg);`,
	}}
>
	{#snippet children(args)}
		<CodeBlock {...args} />
	{/snippet}
</Story>

<Story
	name="Bash"
	args={{
		language: 'bash',
		code: `mise exec -- bun install\nmise exec -- bun run dev`,
	}}
>
	{#snippet children(args)}
		<CodeBlock {...args} />
	{/snippet}
</Story>

<Story
	name="JSON"
	args={{
		language: 'json',
		code: `{\n  "name": "@nucel/ui",\n  "version": "0.2.1"\n}`,
	}}
>
	{#snippet children(args)}
		<CodeBlock {...args} />
	{/snippet}
</Story>

<Story name="Multi-language" args={{}}>
	{#snippet children(args)}
		<div class="flex flex-col gap-4">
			<CodeBlock language="python" code={`def add(a: int, b: int) -> int:\n    return a + b`} />
			<CodeBlock language="rust" code={`fn main() {\n    println!("Hello, world!");\n}`} />
		</div>
	{/snippet}
</Story>
