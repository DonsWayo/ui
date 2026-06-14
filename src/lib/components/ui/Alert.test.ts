import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Alert from './Alert.svelte';

describe('Alert', () => {
	it('renders without crashing', () => {
		expect(() => render(Alert, { props: { children: (() => {}) as any } })).not.toThrow();
	});

	it('renders a div with role=alert', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		expect(container.querySelector('[role=alert]')).not.toBeNull();
	});

	it('applies base flex classes', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('flex');
		expect(el!.className).toContain('items-start');
		expect(el!.className).toContain('rounded-md');
		expect(el!.className).toContain('border');
	});

	it('applies default variant classes when no variant given', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('bg-muted/40');
		expect(el!.className).toContain('text-foreground');
	});

	it('applies destructive variant classes', () => {
		const { container } = render(Alert, {
			props: { variant: 'destructive', children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('text-destructive');
		expect(el!.className).toContain('bg-destructive/10');
	});

	it('applies success variant classes', () => {
		const { container } = render(Alert, {
			props: { variant: 'success', children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('bg-green-500/10');
		expect(el!.className).toContain('text-green-600');
	});

	it('applies warning variant classes', () => {
		const { container } = render(Alert, {
			props: { variant: 'warning', children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('bg-yellow-500/10');
		expect(el!.className).toContain('text-yellow-500');
	});

	it('applies info variant classes', () => {
		const { container } = render(Alert, {
			props: { variant: 'info', children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('bg-blue-500/10');
		expect(el!.className).toContain('text-blue-400');
	});

	it('renders title text when title prop is provided', () => {
		render(Alert, {
			props: { title: 'Heads up!', children: (() => {}) as any },
		});
		expect(screen.getByText('Heads up!')).toBeInTheDocument();
	});

	it('title element has font-semibold class', () => {
		const { container } = render(Alert, {
			props: { title: 'My Title', children: (() => {}) as any },
		});
		const p = container.querySelector('p');
		expect(p).not.toBeNull();
		expect(p!.className).toContain('font-semibold');
	});

	it('does not render a p element when title is not provided', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		expect(container.querySelector('p')).toBeNull();
	});

	it('merges extra class prop with base classes', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any, class: 'my-extra-class' },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('my-extra-class');
		expect(el!.className).toContain('rounded-md');
	});

	it('does not render an svg/icon when icon prop is not provided', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		expect(container.querySelector('svg')).toBeNull();
	});

	it('destructive variant has border-destructive/30 class', () => {
		const { container } = render(Alert, {
			props: { variant: 'destructive', children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('border-destructive/30');
	});

	it('info variant has border-blue-500/30 class', () => {
		const { container } = render(Alert, {
			props: { variant: 'info', children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('border-blue-500/30');
	});

	it('warning variant has border-yellow-500/30 class', () => {
		const { container } = render(Alert, {
			props: { variant: 'warning', children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('border-yellow-500/30');
	});

	it('success variant has border-green-500/30 class', () => {
		const { container } = render(Alert, {
			props: { variant: 'success', children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('border-green-500/30');
	});

	it('default variant has border-border/60 class', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('border-border/60');
	});

	it('renders without crashing when neither children nor title given', () => {
		expect(() => render(Alert, { props: {} })).not.toThrow();
	});

	it('root element tag is div', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.tagName.toLowerCase()).toBe('div');
	});

	it('root element has gap-3 class', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('gap-3');
	});

	it('root element has px-4 class', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('px-4');
	});

	it('root element has py-3 class', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('py-3');
	});

	it('root element has text-sm class', () => {
		const { container } = render(Alert, {
			props: { children: (() => {}) as any },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('text-sm');
	});

	it('does not lose variant classes when extra class is added', () => {
		const { container } = render(Alert, {
			props: { variant: 'destructive', children: (() => {}) as any, class: 'extra' },
		});
		const el = container.querySelector('[role=alert]');
		expect(el!.className).toContain('text-destructive');
		expect(el!.className).toContain('extra');
	});
});
