# @nucel/ui

A comprehensive Svelte 5 UI component library for Nucel projects.

## Features

- **36 Components**: 24 shadcn-svelte primitives + 12 custom components
- **115 Component Files**: Full comprehensive coverage
- **Svelte 5**: Built with runes and modern Svelte patterns
- **TypeScript**: Full type safety
- **Tailwind CSS v4**: Seamless styling integration
- **Accessible**: Built on top of bits-ui for accessibility
- **Tree-shakeable**: Only import what you need

## Installation

```bash
npm install @nucel/ui
# or
bun add @nucel/ui
```

## Peer Dependencies

```bash
npm install svelte@^5.0.0 tailwindcss@^4.0.0
```

## Quick Start

```svelte
<script>
	import {
		Button,
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		StatusBadge,
		Sparkline,
	} from '@nucel/ui';
</script>

<Card>
	<CardHeader>
		<CardTitle>Dashboard</CardTitle>
	</CardHeader>
	<CardContent>
		<StatusBadge status="running" />
		<Sparkline data={[10, 25, 15, 30, 20, 35, 28]} />
		<Button>Action</Button>
	</CardContent>
</Card>
```

## Components

### shadcn-svelte Primitives (24)

- **Accordion**: Expandable/collapsible sections
- **Avatar**: User avatar with fallback
- **Badge**: Status badges with variants
- **Breadcrumb**: Navigation breadcrumbs
- **Button**: Action buttons with multiple variants
- **Card**: Content containers with header, content, footer
- **Collapsible**: Expandable/collapsible content
- **Dialog**: Modal dialogs with overlay
- **DropdownMenu**: Context menus and dropdowns
- **Input**: Text input fields
- **Label**: Form labels
- **NavigationMenu**: Top-level navigation menus
- **Progress**: Progress bars
- **ScrollArea**: Custom scrollable areas
- **Select**: Dropdown selects with search
- **Separator**: Visual dividers
- **Sheet**: Side panels and drawers
- **Skeleton**: Loading placeholders
- **Sonner**: Toast notifications
- **Tabs**: Tabbed interfaces
- **Textarea**: Multi-line text inputs
- **Toggle**: Toggle switches
- **ToggleGroup**: Grouped toggles
- **Tooltip**: Hover tooltips

### Custom Components (12)

- **Backdrop**: Fixed overlay backdrop for modals
- **CountBadge**: Animated count indicators (99+)
- **EmptyState**: Empty state placeholders
- **KbdShortcut**: Keyboard shortcut displays
- **MarkdownRenderer**: Sanitized markdown rendering
- **ProgressRing**: Circular progress indicator
- **ReviewBadge**: PR review status badges
- **Sparkline**: Mini line charts for data visualization
- **StatusBadge**: Combined status indicator with badge
- **StatusDot**: Animated status dots
- **TabBar**: Tab navigation with variants
- **VerticalSeparator**: Inline vertical dividers

## Usage Examples

### Dialog

```svelte
<script>
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
		Button,
	} from '@nucel/ui';
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Dialog</Button>

<Dialog bind:open>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Confirm Action</DialogTitle>
			<DialogDescription>Are you sure you want to proceed?</DialogDescription>
		</DialogHeader>
		<DialogFooter>
			<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			<Button onclick={() => (open = false)}>Confirm</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
```

### Status Components

```svelte
<script>
	import { StatusDot, StatusBadge } from '@nucel/ui';
</script>

<!-- Simple status dot -->
<StatusDot color="bg-green-500" animated />
<StatusDot status="running" />
<StatusDot status="failed" size="sm" />

<!-- Combined status badge -->
<StatusBadge status="open" />
<StatusBadge status="merged" label="Merged by john" />
```

### Data Visualization

```svelte
<script>
	import { Sparkline, ProgressRing } from '@nucel/ui';
</script>

<!-- Mini chart -->
<Sparkline data={[10, 25, 15, 30, 20]} color="stroke-blue-500" />

<!-- Circular progress -->
<ProgressRing spent={75} limit={100} size={24} />
```

### Navigation

```svelte
<script>
	import { TabBar } from '@nucel/ui';
	import { File, GitBranch, Settings } from '@lucide/svelte';

	const items = [
		{ id: 'files', label: 'Files', icon: File },
		{ id: 'branches', label: 'Branches', icon: GitBranch, count: 3 },
		{ id: 'settings', label: 'Settings', icon: Settings },
	];

	let selected = $state('files');
</script>

<TabBar {items} {selected} onselect={(id) => (selected = id)} variant="underline" />
```

## Styling

Components use Tailwind CSS v4 with the following theme structure:

```css
@theme {
	--color-background: oklch(...);
	--color-foreground: oklch(...);
	--color-primary: oklch(...);
	--color-secondary: oklch(...);
	--color-destructive: oklch(...);
	/* ... more theme variables */
}
```

Import the styles in your app:

```css
@import '@nucel/ui/src/styles.css';
```

## Storybook

Explore all components with interactive examples:

```bash
cd packages/ui
bun run storybook
```

## Development

```bash
# Install dependencies
bun install

# Run checks
bun run check

# Run linter
bun run lint

# Format code
bun run format

# Build Storybook
bun run build-storybook
```

## License

MIT © Nucel Team
