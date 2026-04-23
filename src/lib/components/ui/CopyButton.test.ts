import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import CopyButton from './CopyButton.svelte';

describe('CopyButton — rendering', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders a button element', () => {
    render(CopyButton, { props: { text: 'hello' } });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has aria-label "Copy to clipboard" by default', () => {
    render(CopyButton, { props: { text: 'hello' } });
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copy to clipboard');
  });

  it('does not throw for empty text', () => {
    expect(() => render(CopyButton, { props: { text: '' } })).not.toThrow();
  });
});

describe('CopyButton — copy behaviour', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('calls clipboard.writeText with the provided text', async () => {
    render(CopyButton, { props: { text: 'copy me' } });
    await fireEvent.click(screen.getByRole('button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('copy me');
  });

  it('changes aria-label to "Copied" after click', async () => {
    render(CopyButton, { props: { text: 'hello' } });
    const btn = screen.getByRole('button');
    await fireEvent.click(btn);
    // Wait for the promise to resolve
    await Promise.resolve();
    expect(btn).toHaveAttribute('aria-label', 'Copied');
  });

  it('resets aria-label back to "Copy to clipboard" after 2 seconds', async () => {
    render(CopyButton, { props: { text: 'hello' } });
    const btn = screen.getByRole('button');
    await fireEvent.click(btn);
    await Promise.resolve();
    vi.advanceTimersByTime(2000);
    await Promise.resolve();
    expect(btn).toHaveAttribute('aria-label', 'Copy to clipboard');
  });
});
