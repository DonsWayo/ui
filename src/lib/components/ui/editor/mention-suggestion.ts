import tippy, { type Instance, type Props as TippyProps } from 'tippy.js';

export type MentionItem = {
	id: string;
	label: string;
	type?: 'user' | 'team';
	slug?: string;
	avatar_url?: string;
	sublabel?: string;
};

function escapeHtml(text: string): string {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}

function getInitials(name: string): string {
	return name
		.split(' ')
		.map((p) => p.charAt(0))
		.join('')
		.toUpperCase()
		.slice(0, 2);
}

function createDropdown(props: { items: MentionItem[]; command: (item: MentionItem) => void }) {
	const el = document.createElement('div');
	el.className = 'mention-list';
	let selectedIndex = 0;
	let items = props.items;
	let command = props.command;

	function render() {
		if (items.length === 0) {
			el.innerHTML = `<div class="mention-list-empty">No results</div>`;
			return;
		}
		if (items.length === 1 && (items[0] as any).type === 'hint') {
			el.innerHTML = `<div class="mention-list-empty">${escapeHtml(items[0].label)}</div>`;
			return;
		}
		el.innerHTML = items
			.map(
				(item, i) => `
      <button type="button" class="mention-list-item ${i === selectedIndex ? 'is-selected' : ''}" data-index="${i}">
        ${
					item.avatar_url
						? `<img src="${escapeHtml(item.avatar_url)}" alt="" class="mention-avatar" />`
						: `<span class="mention-avatar-fallback">${getInitials(item.label)}</span>`
				}
        <span class="mention-info">
          <span class="mention-label">${escapeHtml(item.label)}</span>
          ${item.sublabel ? `<span class="mention-sublabel">${escapeHtml(item.sublabel)}</span>` : ''}
        </span>
        ${item.type === 'team' ? `<span class="mention-badge">Team</span>` : ''}
      </button>
    `,
			)
			.join('');

		el.querySelectorAll('.mention-list-item').forEach((btn) => {
			btn.addEventListener('click', () => {
				const idx = parseInt((btn as HTMLElement).dataset.index ?? '0');
				select(idx);
			});
		});
	}

	function select(idx: number) {
		const item = items[idx];
		if (item) command(item);
	}

	function updateSelection(idx: number) {
		selectedIndex = ((idx % items.length) + items.length) % items.length;
		render();
	}

	render();

	return {
		el,
		update(newItems: MentionItem[], newCommand: (item: MentionItem) => void) {
			items = newItems;
			command = newCommand;
			selectedIndex = 0;
			render();
		},
		onKeyDown(key: string): boolean {
			if (key === 'ArrowUp') {
				updateSelection(selectedIndex - 1);
				return true;
			}
			if (key === 'ArrowDown') {
				updateSelection(selectedIndex + 1);
				return true;
			}
			if (key === 'Enter') {
				select(selectedIndex);
				return true;
			}
			return false;
		},
	};
}

export function createMentionSuggestion(mentionsUrl: string) {
	return {
		char: '@',
		allowSpaces: false,
		items: async ({ query }: { query: string }): Promise<MentionItem[]> => {
			if (!query || query.length < 1) {
				return [{ id: 'hint', label: 'Type to search users…', type: 'user' } as any];
			}
			try {
				const sep = mentionsUrl.includes('?') ? '&' : '?';
				const res = await fetch(`${mentionsUrl}${sep}query=${encodeURIComponent(query)}`, {
					headers: { Accept: 'application/json' },
				});
				if (!res.ok) return [];
				const data = await res.json();
				return Array.isArray(data.suggestions) ? data.suggestions : [];
			} catch {
				return [];
			}
		},
		render: () => {
			let dropdown: ReturnType<typeof createDropdown>;
			let popup: Instance<TippyProps>[];

			return {
				onStart(props: any) {
					dropdown = createDropdown({
						items: props.items,
						command: (item) =>
							props.command({ id: item.id, label: item.label, type: item.type, slug: item.slug }),
					});
					if (!props.clientRect) return;
					popup = tippy('body', {
						getReferenceClientRect: props.clientRect,
						appendTo: () => document.body,
						content: dropdown.el,
						showOnCreate: true,
						interactive: true,
						trigger: 'manual',
						placement: 'bottom-start',
					}) as Instance<TippyProps>[];
				},
				onUpdate(props: any) {
					dropdown.update(props.items, (item) =>
						props.command({ id: item.id, label: item.label, type: item.type, slug: item.slug }),
					);
					if (props.clientRect && popup?.[0]) {
						popup[0].setProps({ getReferenceClientRect: props.clientRect });
					}
				},
				onKeyDown(props: any) {
					if (props.event.key === 'Escape') {
						popup?.[0]?.hide();
						return true;
					}
					return dropdown.onKeyDown(props.event.key);
				},
				onExit() {
					popup?.[0]?.destroy();
					dropdown.el.remove();
				},
			};
		},
	};
}
