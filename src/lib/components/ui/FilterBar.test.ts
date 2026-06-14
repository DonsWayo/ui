import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import FilterBar from './FilterBar.svelte';

const filters = [
	{ key: 'status', label: 'Status', value: 'running' },
	{ key: 'owner', label: 'Owner', value: 'alice' },
];

describe('FilterBar — rendering', () => {
	it('renders without crashing', () => {
		expect(() => render(FilterBar, { props: {} })).not.toThrow();
	});

	it('renders a search input', () => {
		render(FilterBar, { props: {} });
		expect(screen.getByRole('searchbox')).toBeInTheDocument();
	});

	it('shows provided search value', () => {
		render(FilterBar, { props: { value: 'hello' } });
		expect(screen.getByRole('searchbox')).toHaveValue('hello');
	});

	it('renders filter chips for each filter', () => {
		render(FilterBar, { props: { filters } });
		expect(screen.getByText('running')).toBeInTheDocument();
		expect(screen.getByText('alice')).toBeInTheDocument();
	});

	it('renders the filter label for each chip', () => {
		render(FilterBar, { props: { filters } });
		expect(screen.getByText('Status:')).toBeInTheDocument();
		expect(screen.getByText('Owner:')).toBeInTheDocument();
	});

	it('renders remove buttons for each chip', () => {
		render(FilterBar, { props: { filters } });
		const removeBtns = screen.getAllByRole('button');
		expect(removeBtns.length).toBe(filters.length);
	});

	it('renders no chips when filters is empty', () => {
		render(FilterBar, { props: { filters: [] } });
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});
});

describe('FilterBar — events', () => {
	it('calls onchange when the input value changes', async () => {
		const onchange = vi.fn();
		render(FilterBar, { props: { onchange } });
		const input = screen.getByRole('searchbox');
		await fireEvent.input(input, { target: { value: 'test query' } });
		expect(onchange).toHaveBeenCalledWith('test query');
	});

	it('calls onremove with the correct filter when remove is clicked', async () => {
		const onremove = vi.fn();
		render(FilterBar, { props: { filters, onremove } });
		const removeBtns = screen.getAllByRole('button');
		await fireEvent.click(removeBtns[0]);
		expect(onremove).toHaveBeenCalledWith(filters[0]);
	});

	it('calls onremove with the second filter when its remove button is clicked', async () => {
		const onremove = vi.fn();
		render(FilterBar, { props: { filters, onremove } });
		const removeBtns = screen.getAllByRole('button');
		await fireEvent.click(removeBtns[1]);
		expect(onremove).toHaveBeenCalledWith(filters[1]);
	});
});
