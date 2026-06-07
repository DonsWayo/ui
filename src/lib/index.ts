// Utils
export { cn } from './utils/cn.js';
export type {
	WithElementRef,
	WithoutChildren,
	WithoutChild,
	WithoutChildrenOrChild,
} from './utils.js';

// For namespace imports, use sub-paths:
// import * as Dialog from '@nucel/ui/components/ui/dialog'
// import * as Select from '@nucel/ui/components/ui/select'

// For named imports, use the main export:
// import { Button, Badge, Dialog, DialogContent } from '@nucel/ui'

// Avatar
export {
	Root as Avatar,
	Image as AvatarImage,
	Fallback as AvatarFallback,
} from './components/ui/avatar/index.js';

// Badge
export { Badge, badgeVariants } from './components/ui/badge/index.js';

// Button
export {
	Button,
	buttonVariants,
	type ButtonVariant,
	type ButtonSize,
	type ButtonProps,
} from './components/ui/button/index.js';

// Card
export {
	Root as Card,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle,
	Action as CardAction,
} from './components/ui/card/index.js';

// Collapsible
export {
	Root as Collapsible,
	Content as CollapsibleContent,
	Trigger as CollapsibleTrigger,
} from './components/ui/collapsible/index.js';

// Accordion
export {
	Root as Accordion,
	Item as AccordionItem,
	Trigger as AccordionTrigger,
	Content as AccordionContent,
} from './components/ui/accordion/index.js';

// Breadcrumb
export {
	Root as Breadcrumb,
	List as BreadcrumbList,
	Item as BreadcrumbItem,
	Link as BreadcrumbLink,
	Separator as BreadcrumbSeparator,
	Ellipsis as BreadcrumbEllipsis,
	Page as BreadcrumbPage,
} from './components/ui/breadcrumb/index.js';

// Dialog
export {
	Root as Dialog,
	Content as DialogContent,
	Description as DialogDescription,
	Footer as DialogFooter,
	Header as DialogHeader,
	Title as DialogTitle,
	Trigger as DialogTrigger,
	Close as DialogClose,
	Overlay as DialogOverlay,
	Portal as DialogPortal,
} from './components/ui/dialog/index.js';

// Dropdown Menu
export {
	Root as DropdownMenu,
	CheckboxItem as DropdownMenuCheckboxItem,
	Content as DropdownMenuContent,
	Group as DropdownMenuGroup,
	GroupHeading as DropdownMenuGroupHeading,
	Item as DropdownMenuItem,
	Label as DropdownMenuLabel,
	RadioGroup as DropdownMenuRadioGroup,
	RadioItem as DropdownMenuRadioItem,
	Separator as DropdownMenuSeparator,
	Sub as DropdownMenuSub,
	SubContent as DropdownMenuSubContent,
	SubTrigger as DropdownMenuSubTrigger,
	Trigger as DropdownMenuTrigger,
	Shortcut as DropdownMenuShortcut,
	Portal as DropdownMenuPortal,
} from './components/ui/dropdown-menu/index.js';

// Input
export { Input } from './components/ui/input/index.js';

// Label
export { Label } from './components/ui/label/index.js';

// Progress
export { Progress } from './components/ui/progress/index.js';

// Navigation Menu
export {
	Root as NavigationMenu,
	List as NavigationMenuList,
	Item as NavigationMenuItem,
	Trigger as NavigationMenuTrigger,
	Content as NavigationMenuContent,
	Link as NavigationMenuLink,
	Indicator as NavigationMenuIndicator,
	Viewport as NavigationMenuViewport,
} from './components/ui/navigation-menu/index.js';

// Sheet
export {
	Root as Sheet,
	Content as SheetContent,
	Header as SheetHeader,
	Footer as SheetFooter,
	Title as SheetTitle,
	Description as SheetDescription,
	Trigger as SheetTrigger,
	Close as SheetClose,
	Overlay as SheetOverlay,
	Portal as SheetPortal,
} from './components/ui/sheet/index.js';

// Scroll Area
export {
	Root as ScrollArea,
	Scrollbar as ScrollAreaScrollbar,
} from './components/ui/scroll-area/index.js';

// Select
export {
	Root as Select,
	Content as SelectContent,
	Group as SelectGroup,
	GroupHeading as SelectGroupHeading,
	Item as SelectItem,
	Label as SelectLabel,
	Trigger as SelectTrigger,
	Separator as SelectSeparator,
	ScrollUpButton as SelectScrollUpButton,
	ScrollDownButton as SelectScrollDownButton,
	Portal as SelectPortal,
} from './components/ui/select/index.js';

// Separator
export { Separator } from './components/ui/separator/index.js';

// Skeleton (primitive — kept for backwards-compat)
export { Skeleton as SkeletonPrimitive } from './components/ui/skeleton/index.js';

// Sonner (Toaster)
export { Toaster } from './components/ui/sonner/index.js';

// Textarea
export { Textarea } from './components/ui/textarea/index.js';

// Toggle
export {
	Toggle,
	toggleVariants,
	type ToggleVariants,
	type ToggleSize,
	type ToggleVariant,
} from './components/ui/toggle/index.js';

// Toggle Group
export {
	Root as ToggleGroup,
	Item as ToggleGroupItem,
} from './components/ui/toggle-group/index.js';

// Tabs
export {
	Root as Tabs,
	List as TabsList,
	Trigger as TabsTrigger,
	Content as TabsContent,
} from './components/ui/tabs/index.js';

// Tooltip
export {
	Root as Tooltip,
	Content as TooltipContent,
	Trigger as TooltipTrigger,
	Provider as TooltipProvider,
	Portal as TooltipPortal,
} from './components/ui/tooltip/index.js';

// Backdrop
export { default as Backdrop } from './components/ui/Backdrop.svelte';

// CountBadge
export { default as CountBadge } from './components/ui/CountBadge.svelte';

// EmptyState
export { default as EmptyState } from './components/ui/EmptyState.svelte';

// KbdShortcut
export { default as KbdShortcut } from './components/ui/KbdShortcut.svelte';

// StatusDot
export { default as StatusDot } from './components/ui/StatusDot.svelte';

// TabBar
export { default as TabBar } from './components/ui/TabBar.svelte';

// VerticalSeparator
export { default as VerticalSeparator } from './components/ui/VerticalSeparator.svelte';

// StatusBadge
export { default as StatusBadge } from './components/ui/StatusBadge.svelte';

// ReviewBadge
export { default as ReviewBadge } from './components/ui/ReviewBadge.svelte';

// MarkdownRenderer
export { default as MarkdownRenderer } from './components/ui/MarkdownRenderer.svelte';

// ProgressRing (replaces CostRing)
export { default as ProgressRing } from './components/ui/ProgressRing.svelte';

// Sparkline
export { default as Sparkline } from './components/ui/Sparkline.svelte';

// ProviderIcon
export { default as ProviderIcon } from './components/ui/ProviderIcon.svelte';

// Checkbox (shadcn-styled wrapper over bits-ui)
export { default as Checkbox } from './components/Checkbox.svelte';

// RadioGroup + Radio (shadcn-styled wrappers over bits-ui)
export { default as RadioGroup } from './components/RadioGroup.svelte';
export { default as Radio } from './components/Radio.svelte';

// Form + FormField (InertiaJS-friendly defaults)
export { default as Form } from './components/Form.svelte';
export { default as FormField } from './components/FormField.svelte';

// Pagination (composite, bits-ui driven)
export { default as Pagination } from './components/Pagination.svelte';

// StatCard (dashboard metric)
export { default as StatCard } from './components/StatCard.svelte';

// Breadcrumbs (array-driven composite; for low-level pieces use Breadcrumb*)
export { default as Breadcrumbs } from './components/Breadcrumbs.svelte';

// ---- 0.5.0 additions ----

// DataTable
export { default as DataTable } from './components/DataTable.svelte';
export type { ColumnDef, SortDirection } from './components/DataTable.svelte';

// SearchInput
export { default as SearchInput } from './components/SearchInput.svelte';

// DateRangePicker
export { default as DateRangePicker } from './components/DateRangePicker.svelte';
export type { DateRange, DateRangePreset } from './components/DateRangePicker.svelte';
export { DEFAULT_PRESETS as DateRangePickerDefaultPresets } from './components/DateRangePicker.svelte';

// CodeBlock
export { default as CodeBlock } from './components/CodeBlock.svelte';

// Skeleton (composite — shimmer + width/height; supersedes SkeletonPrimitive)
export { default as Skeleton } from './components/Skeleton.svelte';

// Drawer (side panel, built on Sheet primitive)
export { default as Drawer } from './components/Drawer.svelte';

// Combobox (searchable Select built on bits-ui Combobox)
export { default as Combobox } from './components/Combobox.svelte';
export type { ComboboxOption } from './components/Combobox.svelte';

// CommandPalette (cmdk-style palette built on bits-ui Command + Dialog)
export { default as CommandPalette } from './components/CommandPalette.svelte';
export type { CommandPaletteItem } from './components/CommandPalette.svelte';

// ---- 0.6.0 additions ----

// ThemeProvider — exposes a `theme` ('light' | 'dark' | 'system') context,
// persists the user's preference in localStorage, and reacts to
// `prefers-color-scheme` when set to 'system'.
export { default as ThemeProvider } from './components/ThemeProvider.svelte';
export {
	getThemeContext,
	type Theme,
	type ResolvedTheme,
	type ThemeContext,
} from './components/ThemeProvider.svelte';

// ThemeToggle — icon button cycling system -> light -> dark -> system.
export { default as ThemeToggle } from './components/ThemeToggle.svelte';

// ---- 0.7.0 additions ----

// Monaco-powered editors (CodeEditor, DiffEditor, ThreeWayMerge, loadMonaco,
// resolveMonacoTheme) moved to the `@nucel/ui/monaco` subpath. Keeping them out
// of the main barrel stops monaco's `?worker` imports from being dragged into
// every consumer's dep-optimizer pass (Vite 8 rolldown UNLOADABLE_DEPENDENCY).
// Import them from '@nucel/ui/monaco' when you need an editor.

// ---- 0.8.0 additions ----

// InlineCode — single-line <code> with subtle background, no highlighting.
export { default as InlineCode } from './components/InlineCode.svelte';

// Shiki helpers (re-exported so consumers can warm the highlighter early or
// load extra languages outside CodeBlock — e.g. for a route prefetch hook).
export {
	getHighlighter as getShikiHighlighter,
	loadLanguage as loadShikiLanguage,
	SHIKI_LIGHT_THEME,
	SHIKI_DARK_THEME,
} from './utils/shikiHighlighter.js';

// File-path → Shiki language id helper, useful for repo file viewers.
export { detectLanguageFromPath } from './utils/detectLanguage.js';

// ---- 0.9.0 additions (mobile primitives) ----

// BottomSheet — mobile bottom-anchored sheet (Sheet primitive with grabber +
// safe-area). Pair with `md:hidden` on triggers to keep desktop unchanged.
export { default as BottomSheet } from './components/BottomSheet.svelte';

// Fab — floating action button for mobile primary actions.
// Defaults to `md:hidden`; pass `alwaysVisible` to show on desktop too.
export { default as Fab } from './components/Fab.svelte';

// ---- 0.10.0 additions (raw-primitive gap closers) ----

// CopyButton — copy-to-clipboard button with built-in "Copied" feedback and
// timeout reset. Replaces the duplicated clipboard.writeText + copied-state
// pattern in repo clone boxes, token reveal screens, session viewers, etc.
export { default as CopyButton } from './components/CopyButton.svelte';
export type { CopyButtonVariant, CopyButtonSize } from './components/CopyButton.svelte';

// IconButton — icon-only button OR anchor (pass `href`). Defaults to the
// muted-foreground "toolbar glyph" look (hover:bg-accent) used in TopBar,
// file trees, and dismiss buttons. `size="tap"` gives a 44×44 mobile target.
// `aria-label` is required.
export { default as IconButton } from './components/IconButton.svelte';
export {
	iconButtonVariants,
	type IconButtonVariant,
	type IconButtonSize,
	type IconButtonProps,
} from './components/IconButton.svelte';

// ColorInput — styled native <input type="color"> wrapper matching the
// form-control border/ring/focus tokens. Optional `showValue` hex readout.
export { default as ColorInput } from './components/ColorInput.svelte';

// ---- 0.11.0 additions (restored components) ----
//
// These components were part of the export surface in earlier releases but
// were dropped from the 0.10.0 barrel. The nucel app still imports them, so a
// clean `bun install --frozen-lockfile` against 0.10.0 broke the build. They
// are restored here against the package's shared-component conventions.

// Alert — inline notice banner (info/success/warning/error variants).
export { default as Alert } from './components/ui/Alert.svelte';

// Section + SectionTitle — page section wrapper + heading.
export { default as Section } from './components/ui/Section.svelte';
export { default as SectionTitle } from './components/ui/SectionTitle.svelte';

// PageHeader — page title + actions header row.
export { default as PageHeader } from './components/ui/PageHeader.svelte';

// ListCard — bordered list-item card row.
export { default as ListCard } from './components/ui/ListCard.svelte';

// Pills — compact status/branch/comment chips.
export { default as StatusPill } from './components/ui/StatusPill.svelte';
export { default as BranchPill } from './components/ui/BranchPill.svelte';
export { default as CommentPill } from './components/ui/CommentPill.svelte';

// PermissionChips — permission/scope chip group.
export { default as PermissionChips } from './components/ui/PermissionChips.svelte';

// AppCard — app/repo summary card.
export { default as AppCard } from './components/ui/AppCard.svelte';

// Kanban — board / column / card composites.
export { default as KanbanBoard } from './components/ui/KanbanBoard.svelte';
export { default as KanbanColumn } from './components/ui/KanbanColumn.svelte';
export { default as KanbanCard } from './components/ui/KanbanCard.svelte';

// RichEditor — Tiptap-powered rich text editor (wiki/issues/PR comments).
export { default as RichEditor } from './components/ui/editor/RichEditor.svelte';

// Table — shadcn-styled table primitives.
export {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
} from './components/ui/table/index.js';
// ReactionBar — emoji reactions control
export { default as ReactionBar } from './components/ReactionBar.svelte';
