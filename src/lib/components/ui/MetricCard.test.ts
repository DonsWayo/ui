import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MetricCard from './MetricCard.svelte';

describe('MetricCard — rendering', () => {
  it('renders without crashing', () => {
    expect(() => render(MetricCard, { props: { value: '42', label: 'Issues' } })).not.toThrow();
  });

  it('renders the value', () => {
    render(MetricCard, { props: { value: '$12.50', label: 'Cost' } });
    expect(screen.getByText('$12.50')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(MetricCard, { props: { value: '7', label: 'Active Agents' } });
    expect(screen.getByText('Active Agents')).toBeInTheDocument();
  });

  it('renders hint when provided', () => {
    render(MetricCard, { props: { value: '7', label: 'Agents', hint: '+5% this week' } });
    expect(screen.getByText('+5% this week')).toBeInTheDocument();
  });

  it('does not render hint when not provided', () => {
    render(MetricCard, { props: { value: '7', label: 'Agents' } });
    expect(screen.queryByText('+5% this week')).not.toBeInTheDocument();
  });

  it('renders an SVG sparkline when data is provided', () => {
    const { container } = render(MetricCard, {
      props: { value: '42', label: 'Issues', data: [1, 2, 3, 4, 5] },
    });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('does not render a sparkline when data is empty', () => {
    const { container } = render(MetricCard, {
      props: { value: '42', label: 'Issues', data: [] },
    });
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});

describe('MetricCard — trend variants', () => {
  it('renders all trend variants without crashing', () => {
    const trends = ['up', 'down', 'neutral'] as const;
    for (const trend of trends) {
      expect(() =>
        render(MetricCard, { props: { value: '1', label: 'x', trend, hint: 'hint', data: [1, 2] } }),
      ).not.toThrow();
    }
  });

  it('renders without trend prop', () => {
    expect(() =>
      render(MetricCard, { props: { value: '1', label: 'x', data: [1, 2] } }),
    ).not.toThrow();
  });
});
