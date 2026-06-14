import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Timeline from './Timeline.svelte';

const items = [
	{ time: '2m ago', title: 'Build started', status: 'success' as const },
	{
		time: '5m ago',
		title: 'Tests passed',
		description: 'All tests green.',
		status: 'success' as const,
	},
	{ title: 'Deploy pending', status: 'pending' as const },
];

describe('Timeline — rendering', () => {
	it('renders without crashing', () => {
		expect(() => render(Timeline, { props: { items } })).not.toThrow();
	});

	it('renders all item titles', () => {
		render(Timeline, { props: { items } });
		expect(screen.getByText('Build started')).toBeInTheDocument();
		expect(screen.getByText('Tests passed')).toBeInTheDocument();
		expect(screen.getByText('Deploy pending')).toBeInTheDocument();
	});

	it('renders description when provided', () => {
		render(Timeline, { props: { items } });
		expect(screen.getByText('All tests green.')).toBeInTheDocument();
	});

	it('renders time when provided', () => {
		render(Timeline, { props: { items } });
		expect(screen.getByText('2m ago')).toBeInTheDocument();
	});

	it('renders an ordered list', () => {
		const { container } = render(Timeline, { props: { items } });
		expect(container.querySelector('ol')).toBeInTheDocument();
	});

	it('renders one list item per event', () => {
		const { container } = render(Timeline, { props: { items } });
		const listItems = container.querySelectorAll('li');
		expect(listItems.length).toBe(items.length);
	});

	it('renders an empty list without crashing', () => {
		expect(() => render(Timeline, { props: { items: [] } })).not.toThrow();
	});
});

describe('Timeline — status variants', () => {
	it('renders all status types without crashing', () => {
		const allStatuses = [
			{ title: 'Success', status: 'success' as const },
			{ title: 'Error', status: 'error' as const },
			{ title: 'Warning', status: 'warning' as const },
			{ title: 'Pending', status: 'pending' as const },
			{ title: 'Running', status: 'running' as const },
		];
		expect(() => render(Timeline, { props: { items: allStatuses } })).not.toThrow();
	});
});
