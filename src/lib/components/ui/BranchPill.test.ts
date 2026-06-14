import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BranchPill from './BranchPill.svelte';

describe('BranchPill — rendering', () => {
	it('renders the branch name', () => {
		render(BranchPill, { props: { name: 'main' } });
		expect(screen.getByText('main')).toBeInTheDocument();
	});

	it('renders a different branch name', () => {
		render(BranchPill, { props: { name: 'feature/my-feature' } });
		expect(screen.getByText('feature/my-feature')).toBeInTheDocument();
	});

	it('renders an svg element (git branch icon)', () => {
		const { container } = render(BranchPill, { props: { name: 'main' } });
		expect(container.querySelector('svg')).not.toBeNull();
	});

	it('renders without crashing', () => {
		expect(() => render(BranchPill, { props: { name: 'develop' } })).not.toThrow();
	});

	it('root element is a span', () => {
		const { container } = render(BranchPill, { props: { name: 'main' } });
		const el = container.firstElementChild;
		expect(el?.tagName.toLowerCase()).toBe('span');
	});
});

describe('BranchPill — classes', () => {
	it('applies inline-flex class', () => {
		const { container } = render(BranchPill, { props: { name: 'main' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('inline-flex');
	});

	it('applies items-center class', () => {
		const { container } = render(BranchPill, { props: { name: 'main' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('items-center');
	});

	it('applies font-mono class', () => {
		const { container } = render(BranchPill, { props: { name: 'main' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('font-mono');
	});

	it('applies rounded-md class', () => {
		const { container } = render(BranchPill, { props: { name: 'main' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('rounded-md');
	});

	it('has border class', () => {
		const { container } = render(BranchPill, { props: { name: 'main' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('border');
	});

	it("size='sm' (default) applies text-[11px]", () => {
		const { container } = render(BranchPill, { props: { name: 'main' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('text-[11px]');
	});

	it("size='sm' applies px-2", () => {
		const { container } = render(BranchPill, { props: { name: 'main', size: 'sm' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('px-2');
	});

	it("size='xs' applies text-[10px]", () => {
		const { container } = render(BranchPill, { props: { name: 'main', size: 'xs' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('text-[10px]');
	});

	it("size='xs' applies px-1.5", () => {
		const { container } = render(BranchPill, { props: { name: 'main', size: 'xs' } });
		const span = container.querySelector('span');
		expect(span?.className).toContain('px-1.5');
	});

	it("size='xs' does not apply text-[11px]", () => {
		const { container } = render(BranchPill, { props: { name: 'main', size: 'xs' } });
		const span = container.querySelector('span');
		expect(span?.className).not.toContain('text-[11px]');
	});

	it("size='sm' does not apply text-[10px]", () => {
		const { container } = render(BranchPill, { props: { name: 'main', size: 'sm' } });
		const span = container.querySelector('span');
		expect(span?.className).not.toContain('text-[10px]');
	});
});

describe('BranchPill — edge cases', () => {
	it('renders branch names with slashes', () => {
		render(BranchPill, { props: { name: 'feat/TICKET-123/add-auth' } });
		expect(screen.getByText('feat/TICKET-123/add-auth')).toBeInTheDocument();
	});

	it('renders very long branch names', () => {
		const longName = 'feature/very-long-branch-name-that-is-quite-descriptive';
		render(BranchPill, { props: { name: longName } });
		expect(screen.getByText(longName)).toBeInTheDocument();
	});

	it('renders branch name with numbers', () => {
		render(BranchPill, { props: { name: 'release/1.2.3' } });
		expect(screen.getByText('release/1.2.3')).toBeInTheDocument();
	});

	it('renders both xs and sm without throwing', () => {
		expect(() => render(BranchPill, { props: { name: 'main', size: 'xs' } })).not.toThrow();
		expect(() => render(BranchPill, { props: { name: 'main', size: 'sm' } })).not.toThrow();
	});
});
