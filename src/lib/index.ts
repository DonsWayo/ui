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

// Skeleton
export { Skeleton } from './components/ui/skeleton/index.js';

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
