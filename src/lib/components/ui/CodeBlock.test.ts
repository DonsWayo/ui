import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CodeBlock from './CodeBlock.svelte';

// Shiki calls out to WASM in real environments; mock to avoid heavy deps in jsdom.
vi.mock('shiki', () => ({
  createHighlighter: vi.fn().mockResolvedValue({
    codeToHtml: (_code: string) =>
      `<pre class="shiki"><code>${_code}</code></pre>`,
  }),
}));

describe('CodeBlock — rendering', () => {
  it('renders without crashing', () => {
    expect(() => render(CodeBlock, { props: { code: 'const x = 1;', language: 'typescript' } })).not.toThrow();
  });

  it('shows language label when showLanguage is true', () => {
    render(CodeBlock, { props: { code: 'hello', language: 'bash', showLanguage: true } });
    expect(screen.getByText('bash')).toBeInTheDocument();
  });

  it('hides language label when showLanguage is false', () => {
    render(CodeBlock, { props: { code: 'hello', language: 'bash', showLanguage: false } });
    expect(screen.queryByText('bash')).not.toBeInTheDocument();
  });

  it('renders a copy button', () => {
    render(CodeBlock, { props: { code: 'hello', language: 'typescript' } });
    expect(screen.getByLabelText('Copy to clipboard')).toBeInTheDocument();
  });

  it('falls back to plain text while highlighting', () => {
    // Before the async highlight resolves the pre with the raw code is shown
    const { container } = render(CodeBlock, { props: { code: 'raw code', language: 'plaintext' } });
    // Either the pre fallback or the highlighted version contains the code
    expect(container.textContent).toContain('raw code');
  });
});

describe('CodeBlock — defaults', () => {
  it('defaults to plaintext language', () => {
    render(CodeBlock, { props: { code: 'hello' } });
    // language label defaults to 'plaintext'
    expect(screen.getByText('plaintext')).toBeInTheDocument();
  });
});
