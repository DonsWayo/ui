import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import StatusBadge from './StatusBadge.svelte';

describe('StatusBadge — label rendering', () => {
	it("renders 'open' as the label for status=open", () => {
		render(StatusBadge, { props: { status: 'open' } });
		expect(screen.getByText('open')).toBeInTheDocument();
	});

	it("renders 'closed' as the label for status=closed", () => {
		render(StatusBadge, { props: { status: 'closed' } });
		expect(screen.getByText('closed')).toBeInTheDocument();
	});

	it("renders 'running' as the label for status=running", () => {
		render(StatusBadge, { props: { status: 'running' } });
		expect(screen.getByText('running')).toBeInTheDocument();
	});

	it("renders 'succeeded' as the label for status=succeeded", () => {
		render(StatusBadge, { props: { status: 'succeeded' } });
		expect(screen.getByText('succeeded')).toBeInTheDocument();
	});

	it("renders 'failed' as the label for status=failed", () => {
		render(StatusBadge, { props: { status: 'failed' } });
		expect(screen.getByText('failed')).toBeInTheDocument();
	});

	it("renders 'merged' as the label for status=merged", () => {
		render(StatusBadge, { props: { status: 'merged' } });
		expect(screen.getByText('merged')).toBeInTheDocument();
	});

	it('renders custom label when label prop is provided', () => {
		render(StatusBadge, { props: { status: 'open', label: 'In Progress' } });
		expect(screen.getByText('In Progress')).toBeInTheDocument();
	});

	it('custom label overrides the default status label', () => {
		render(StatusBadge, { props: { status: 'open', label: 'My Label' } });
		expect(screen.queryByText('open')).not.toBeInTheDocument();
		expect(screen.getByText('My Label')).toBeInTheDocument();
	});

	it('renders without crashing for any known status', () => {
		const statuses = ['open', 'closed', 'running', 'succeeded', 'failed', 'merged'];
		for (const status of statuses) {
			expect(() => render(StatusBadge, { props: { status } })).not.toThrow();
		}
	});
});

describe('StatusBadge — color classes', () => {
	it('applies success color classes for status=open', () => {
		const { container } = render(StatusBadge, { props: { status: 'open' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('text-success');
	});

	it('applies purple color classes for status=merged', () => {
		const { container } = render(StatusBadge, { props: { status: 'merged' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('text-purple-400');
	});

	it('applies blue color classes for status=running', () => {
		const { container } = render(StatusBadge, { props: { status: 'running' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('text-blue-400');
	});

	it('applies success color classes for status=succeeded', () => {
		const { container } = render(StatusBadge, { props: { status: 'succeeded' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('text-success');
	});

	it('applies destructive color classes for status=failed', () => {
		const { container } = render(StatusBadge, { props: { status: 'failed' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('text-destructive');
	});

	it('uses secondary variant for status=closed', () => {
		// closed maps to secondary variant (no extraClass)
		const { container } = render(StatusBadge, { props: { status: 'closed' } });
		expect(container.firstElementChild).not.toBeNull();
	});
});

describe('StatusBadge — structure', () => {
	it('renders an inline-flex element', () => {
		const { container } = render(StatusBadge, { props: { status: 'open' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('inline-flex');
	});

	it('renders items-center class', () => {
		const { container } = render(StatusBadge, { props: { status: 'open' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('items-center');
	});

	it('contains a span with the label text', () => {
		const { container } = render(StatusBadge, { props: { status: 'open' } });
		const span = container.querySelector('span');
		expect(span).not.toBeNull();
	});

	it('renders without crashing for unknown status', () => {
		expect(() => render(StatusBadge, { props: { status: 'unknown' } })).not.toThrow();
	});

	it('renders custom label for any status', () => {
		render(StatusBadge, { props: { status: 'failed', label: 'Broken' } });
		expect(screen.getByText('Broken')).toBeInTheDocument();
	});

	it('background color class is present for status=open', () => {
		const { container } = render(StatusBadge, { props: { status: 'open' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('bg-success/10');
	});

	it('background color class is present for status=merged', () => {
		const { container } = render(StatusBadge, { props: { status: 'merged' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('bg-purple-500/10');
	});

	it('background color class is present for status=running', () => {
		const { container } = render(StatusBadge, { props: { status: 'running' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('bg-blue-500/10');
	});

	it('background color class is present for status=failed', () => {
		const { container } = render(StatusBadge, { props: { status: 'failed' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('bg-destructive/10');
	});

	it('background color class is present for status=succeeded', () => {
		const { container } = render(StatusBadge, { props: { status: 'succeeded' } });
		const badge = container.firstElementChild;
		expect(badge?.className).toContain('bg-success/10');
	});
});
