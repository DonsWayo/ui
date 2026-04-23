import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Pagination from './Pagination.svelte';

describe('Pagination — rendering', () => {
  it('renders prev and next buttons', () => {
    render(Pagination, { props: { page: 1, totalPages: 5 } });
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('renders page buttons for small totalPages', () => {
    render(Pagination, { props: { page: 1, totalPages: 4 } });
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 4')).toBeInTheDocument();
  });

  it('marks the current page with aria-current=page', () => {
    render(Pagination, { props: { page: 3, totalPages: 5 } });
    const currentBtn = screen.getByLabelText('Page 3');
    expect(currentBtn).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark non-current pages with aria-current', () => {
    render(Pagination, { props: { page: 3, totalPages: 5 } });
    const btn = screen.getByLabelText('Page 1');
    expect(btn).not.toHaveAttribute('aria-current');
  });
});

describe('Pagination — disabled states', () => {
  it('disables prev button on first page', () => {
    render(Pagination, { props: { page: 1, totalPages: 5 } });
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(Pagination, { props: { page: 5, totalPages: 5 } });
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('enables both buttons on a middle page', () => {
    render(Pagination, { props: { page: 3, totalPages: 5 } });
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
  });
});

describe('Pagination — events', () => {
  it('calls onchange with page+1 when next is clicked', async () => {
    const onchange = vi.fn();
    render(Pagination, { props: { page: 2, totalPages: 5, onchange } });
    await fireEvent.click(screen.getByLabelText('Next page'));
    expect(onchange).toHaveBeenCalledWith(3);
  });

  it('calls onchange with page-1 when prev is clicked', async () => {
    const onchange = vi.fn();
    render(Pagination, { props: { page: 3, totalPages: 5, onchange } });
    await fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onchange).toHaveBeenCalledWith(2);
  });

  it('calls onchange with the correct page number when a page button is clicked', async () => {
    const onchange = vi.fn();
    render(Pagination, { props: { page: 1, totalPages: 5, onchange } });
    await fireEvent.click(screen.getByLabelText('Page 4'));
    expect(onchange).toHaveBeenCalledWith(4);
  });

  it('does not call onchange when prev is clicked on first page', async () => {
    const onchange = vi.fn();
    render(Pagination, { props: { page: 1, totalPages: 5, onchange } });
    await fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onchange).not.toHaveBeenCalled();
  });
});
