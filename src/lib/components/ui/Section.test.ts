import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Section from './Section.svelte';

describe('Section', () => {
	it('renders a container div', () => {
		const { container } = render(Section, { props: {} });
		expect(container.querySelector('div')).not.toBeNull();
	});

	it('renders the title when given', () => {
		const { container } = render(Section, {
			props: { title: 'My Section' },
		});
		const h3 = container.querySelector('h3');
		expect(h3).not.toBeNull();
		expect(h3!.textContent).toBe('My Section');
	});

	it('does NOT render an h3 when no title is given', () => {
		const { container } = render(Section, {
			props: {},
		});
		expect(container.querySelector('h3')).toBeNull();
	});

	it('the h3 has the uppercase class', () => {
		const { container } = render(Section, {
			props: { title: 'Settings' },
		});
		const h3 = container.querySelector('h3');
		expect(h3).not.toBeNull();
		expect(h3!.className).toContain('uppercase');
	});

	it('extra class prop is merged into the container div', () => {
		const { container } = render(Section, {
			props: { class: 'my-extra-class' },
		});
		const div = container.querySelector('div');
		expect(div).not.toBeNull();
		expect(div!.className).toContain('my-extra-class');
	});
});
