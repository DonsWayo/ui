import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { userEvent } from '@testing-library/user-event';
import ConfirmDialog from './ConfirmDialog.svelte';

// Resolve the confirm <button> by its label text. bits-ui's AlertDialog content
// is portalled to document.body, so query the whole document rather than the
// render container.
function confirmButton(label: string): HTMLButtonElement {
	const btn = Array.from(document.querySelectorAll('button')).find(
		(b) => b.textContent?.trim() === label,
	);
	if (!btn) throw new Error(`confirm button "${label}" not found`);
	return btn as HTMLButtonElement;
}

describe('ConfirmDialog', () => {
	it('fires onConfirm when the confirm button is clicked', async () => {
		const onConfirm = vi.fn();
		render(ConfirmDialog, {
			props: { open: true, title: 'Proceed?', confirmLabel: 'Confirm', onConfirm },
		});
		await tick();

		const btn = confirmButton('Confirm');
		expect(btn).not.toBeDisabled();
		btn.click();
		expect(onConfirm).toHaveBeenCalledTimes(1);
	});

	it('disables the confirm button while loading/busy', async () => {
		const onConfirm = vi.fn();
		render(ConfirmDialog, {
			props: { open: true, title: 'Publish?', confirmLabel: 'Publish', loading: true, onConfirm },
		});
		await tick();

		const btn = confirmButton('Publish');
		expect(btn).toBeDisabled();
		btn.click();
		expect(onConfirm).not.toHaveBeenCalled();
	});

	it('keeps confirm disabled until the exact confirmText is typed', async () => {
		const onConfirm = vi.fn();
		const user = userEvent.setup();
		render(ConfirmDialog, {
			props: {
				open: true,
				title: 'Delete repo',
				confirmLabel: 'Delete',
				confirmText: 'nucel/web',
				onConfirm,
			},
		});
		await tick();

		const btn = confirmButton('Delete');
		expect(btn).toBeDisabled();

		const input = document.querySelector(
			'input[aria-label="Type nucel/web to confirm"]',
		) as HTMLInputElement;
		expect(input).toBeTruthy();

		// Wrong text — still disabled.
		await user.type(input, 'nucel/wrong');
		await tick();
		expect(confirmButton('Delete')).toBeDisabled();

		// Clear and type the exact value — now enabled and confirmable.
		await user.clear(input);
		await user.type(input, 'nucel/web');
		await tick();
		const enabled = confirmButton('Delete');
		expect(enabled).not.toBeDisabled();
		enabled.click();
		expect(onConfirm).toHaveBeenCalledTimes(1);
	});
});
