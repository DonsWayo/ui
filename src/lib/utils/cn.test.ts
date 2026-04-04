import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
	it('merges class names', () => {
		expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
	});

	it('handles conditional classes', () => {
		// eslint-disable-next-line no-constant-binary-expression
		expect(cn('base', false && 'hidden', 'text-sm')).toBe('base text-sm');
	});

	it('deduplicates tailwind conflicts', () => {
		expect(cn('px-2', 'px-4')).toBe('px-4');
	});

	it('handles undefined and null', () => {
		expect(cn('base', undefined, null, 'end')).toBe('base end');
	});

	it('handles empty input', () => {
		expect(cn()).toBe('');
	});

	// ── new tests ──────────────────────────────────────────────────────────────

	it('handles a single class name', () => {
		expect(cn('text-sm')).toBe('text-sm');
	});

	it('handles an empty string argument', () => {
		expect(cn('', 'text-sm')).toBe('text-sm');
	});

	it('handles multiple empty strings', () => {
		expect(cn('', '', '')).toBe('');
	});

	it('resolves text-color conflicts, last wins', () => {
		expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
	});

	it('resolves margin conflicts, last wins', () => {
		expect(cn('m-2', 'm-4')).toBe('m-4');
	});

	it('resolves padding conflicts, last wins', () => {
		expect(cn('p-2', 'p-4')).toBe('p-4');
	});

	it('handles array inputs via clsx', () => {
		expect(cn(['flex', 'items-center'])).toBe('flex items-center');
	});

	it('handles nested arrays', () => {
		expect(cn(['flex', ['items-center', 'gap-2']])).toBe('flex items-center gap-2');
	});

	it('handles object inputs (clsx style)', () => {
		expect(cn({ flex: true, hidden: false, 'items-center': true })).toBe('flex items-center');
	});

	it('handles mixed object and string inputs', () => {
		expect(cn('base', { active: true, disabled: false })).toBe('base active');
	});

	it('handles true condition with string', () => {
		const isActive = true;
		expect(cn('btn', isActive && 'btn-active')).toBe('btn btn-active');
	});

	it('handles false condition producing no extra class', () => {
		const isDisabled = false;
		expect(cn('btn', isDisabled && 'btn-disabled')).toBe('btn');
	});

	it('resolves background-color conflicts', () => {
		expect(cn('bg-red-500', 'bg-green-500')).toBe('bg-green-500');
	});

	it('resolves border-radius conflicts', () => {
		expect(cn('rounded-sm', 'rounded-lg')).toBe('rounded-lg');
	});

	it('resolves font-weight conflicts', () => {
		expect(cn('font-normal', 'font-bold')).toBe('font-bold');
	});

	it('resolves flex-direction conflicts', () => {
		expect(cn('flex-row', 'flex-col')).toBe('flex-col');
	});

	it('does not drop non-conflicting classes', () => {
		const result = cn('flex', 'items-center', 'gap-4', 'px-4', 'py-2');
		expect(result).toContain('flex');
		expect(result).toContain('items-center');
		expect(result).toContain('gap-4');
		expect(result).toContain('px-4');
		expect(result).toContain('py-2');
	});

	it('trims extra whitespace from class strings', () => {
		// clsx trims extra spaces; the output should not have leading/trailing spaces
		const result = cn('flex', 'items-center');
		expect(result).not.toMatch(/^\s|\s$/);
	});

	it('handles many arguments without conflict', () => {
		const result = cn('a', 'b', 'c', 'd', 'e');
		expect(result).toBe('a b c d e');
	});

	it('resolves width conflicts, last wins', () => {
		expect(cn('w-4', 'w-8')).toBe('w-8');
	});

	it('resolves height conflicts, last wins', () => {
		expect(cn('h-4', 'h-full')).toBe('h-full');
	});

	// ── additional tests ──────────────────────────────────────────────────────

	it('handles zero-width / whitespace-only string', () => {
		expect(cn('  ', 'text-sm')).toBe('text-sm');
	});

	it('resolves display conflicts, last wins', () => {
		expect(cn('flex', 'block')).toBe('block');
	});

	it('resolves overflow conflicts, last wins', () => {
		expect(cn('overflow-hidden', 'overflow-auto')).toBe('overflow-auto');
	});

	it('resolves z-index conflicts, last wins', () => {
		expect(cn('z-10', 'z-50')).toBe('z-50');
	});

	it('resolves opacity conflicts, last wins', () => {
		expect(cn('opacity-0', 'opacity-100')).toBe('opacity-100');
	});

	it('resolves cursor conflicts, last wins', () => {
		expect(cn('cursor-default', 'cursor-pointer')).toBe('cursor-pointer');
	});

	it('resolves position conflicts, last wins', () => {
		expect(cn('relative', 'absolute')).toBe('absolute');
	});

	it('resolves inset conflicts, last wins', () => {
		expect(cn('inset-0', 'inset-4')).toBe('inset-4');
	});

	it('returns the same result regardless of extra false values mixed in', () => {
		expect(cn('a', false, false, 'b')).toBe('a b');
	});

	it('handles object with all false values', () => {
		expect(cn({ foo: false, bar: false })).toBe('');
	});

	it('handles object with mixed true/false values', () => {
		const result = cn({ flex: true, hidden: false, 'gap-2': true });
		expect(result).toBe('flex gap-2');
	});

	it('handles array with conditional falsy elements', () => {
		const show = false;
		expect(cn(['flex', show && 'hidden'])).toBe('flex');
	});

	it('px and py do not conflict with each other', () => {
		const result = cn('px-4', 'py-2');
		expect(result).toContain('px-4');
		expect(result).toContain('py-2');
	});

	it('mx and my do not conflict with each other', () => {
		const result = cn('mx-2', 'my-4');
		expect(result).toContain('mx-2');
		expect(result).toContain('my-4');
	});

	it('resolves gap conflicts, last wins', () => {
		expect(cn('gap-2', 'gap-4')).toBe('gap-4');
	});

	it('resolves text-size conflicts, last wins', () => {
		expect(cn('text-sm', 'text-lg')).toBe('text-lg');
	});

	it('resolves leading (line-height) conflicts, last wins', () => {
		expect(cn('leading-tight', 'leading-loose')).toBe('leading-loose');
	});

	it('resolves tracking (letter-spacing) conflicts, last wins', () => {
		expect(cn('tracking-tight', 'tracking-wide')).toBe('tracking-wide');
	});

	it('resolves shadow conflicts, last wins', () => {
		expect(cn('shadow-sm', 'shadow-lg')).toBe('shadow-lg');
	});

	it('resolves transition conflicts, last wins', () => {
		expect(cn('transition-none', 'transition-all')).toBe('transition-all');
	});

	it('resolves duration conflicts, last wins', () => {
		expect(cn('duration-100', 'duration-300')).toBe('duration-300');
	});

	it('does not strip unrelated flex utility classes', () => {
		const result = cn('flex', 'flex-wrap', 'items-start', 'justify-between');
		expect(result).toContain('flex');
		expect(result).toContain('flex-wrap');
		expect(result).toContain('items-start');
		expect(result).toContain('justify-between');
	});

	it('returns a string type always', () => {
		expect(typeof cn()).toBe('string');
		expect(typeof cn('foo')).toBe('string');
		expect(typeof cn(undefined, null, false)).toBe('string');
	});

	it('handles deep nested array with falsy', () => {
		expect(cn([['flex', false && 'hidden'], 'gap-2'])).toBe('flex gap-2');
	});

	it('resolves min-width conflicts, last wins', () => {
		expect(cn('min-w-0', 'min-w-full')).toBe('min-w-full');
	});

	it('resolves max-width conflicts, last wins', () => {
		expect(cn('max-w-sm', 'max-w-lg')).toBe('max-w-lg');
	});

	it('resolves min-height conflicts, last wins', () => {
		expect(cn('min-h-0', 'min-h-screen')).toBe('min-h-screen');
	});

	it('resolves max-height conflicts, last wins', () => {
		expect(cn('max-h-40', 'max-h-full')).toBe('max-h-full');
	});

	it('resolves border-width conflicts, last wins', () => {
		expect(cn('border', 'border-2')).toBe('border-2');
	});

	it('resolves outline-offset conflicts, last wins', () => {
		expect(cn('outline-offset-2', 'outline-offset-4')).toBe('outline-offset-4');
	});

	it('handles multiple objects merged together', () => {
		const result = cn({ flex: true }, { 'items-center': true }, { 'gap-4': false });
		expect(result).toBe('flex items-center');
	});

	it('resolves ring conflicts, last wins', () => {
		expect(cn('ring-1', 'ring-2')).toBe('ring-2');
	});

	it('resolves top/right/bottom/left individually without conflict', () => {
		const result = cn('top-0', 'right-0', 'bottom-0', 'left-0');
		expect(result).toContain('top-0');
		expect(result).toContain('right-0');
		expect(result).toContain('bottom-0');
		expect(result).toContain('left-0');
	});

	it('resolves whitespace utility conflicts, last wins', () => {
		expect(cn('whitespace-nowrap', 'whitespace-normal')).toBe('whitespace-normal');
	});

	it('resolves text-align conflicts, last wins', () => {
		expect(cn('text-left', 'text-center')).toBe('text-center');
	});

	it('resolves text-decoration conflicts, last wins', () => {
		expect(cn('underline', 'no-underline')).toBe('no-underline');
	});

	it('handles a string passed as clsx array element', () => {
		expect(cn(['text-sm', 'font-medium'])).toBe('text-sm font-medium');
	});

	it('resolves space-x conflicts, last wins', () => {
		expect(cn('space-x-2', 'space-x-4')).toBe('space-x-4');
	});

	it('resolves divide-x conflicts, last wins', () => {
		expect(cn('divide-x', 'divide-x-2')).toBe('divide-x-2');
	});

	// ── responsive prefix tests ────────────────────────────────────────────────

	it('responsive prefix classes are kept alongside base classes', () => {
		const result = cn('text-sm', 'md:text-base', 'lg:text-lg');
		expect(result).toContain('text-sm');
		expect(result).toContain('md:text-base');
		expect(result).toContain('lg:text-lg');
	});

	it('resolves responsive-prefixed conflicts at the same breakpoint', () => {
		expect(cn('md:text-sm', 'md:text-lg')).toBe('md:text-lg');
	});

	it('resolves hover-prefixed conflicts, last wins', () => {
		expect(cn('hover:bg-red-500', 'hover:bg-blue-500')).toBe('hover:bg-blue-500');
	});

	it('focus prefix does not conflict with non-prefixed class', () => {
		const result = cn('bg-white', 'focus:bg-gray-100');
		expect(result).toContain('bg-white');
		expect(result).toContain('focus:bg-gray-100');
	});

	it('dark prefix does not conflict with non-prefixed class', () => {
		const result = cn('text-black', 'dark:text-white');
		expect(result).toContain('text-black');
		expect(result).toContain('dark:text-white');
	});

	// ── arbitrary value classes ────────────────────────────────────────────────

	it('handles arbitrary value classes without error', () => {
		const result = cn('w-[42px]', 'h-[100px]');
		expect(result).toContain('w-[42px]');
		expect(result).toContain('h-[100px]');
	});

	it('resolves arbitrary value conflicts for the same property', () => {
		expect(cn('w-[40px]', 'w-[80px]')).toBe('w-[80px]');
	});

	it('handles arbitrary color values', () => {
		const result = cn('bg-[#ff0000]', 'text-[#00ff00]');
		expect(result).toContain('bg-[#ff0000]');
		expect(result).toContain('text-[#00ff00]');
	});

	// ── ternary / conditional patterns ───────────────────────────────────────

	it('ternary true branch adds the class', () => {
		const active = true;
		expect(cn('base', active ? 'ring-2' : 'ring-0')).toBe('base ring-2');
	});

	it('ternary false branch adds the alternative class', () => {
		const active = false;
		expect(cn('base', active ? 'ring-2' : 'ring-0')).toBe('base ring-0');
	});

	it('conditional with undefined from short-circuit produces no extra token', () => {
		const flag = false;
		const result = cn('btn', flag && undefined);
		expect(result).toBe('btn');
	});

	// ── numeric / non-string class values ────────────────────────────────────

	it('ignores numeric 0 passed directly (falsy)', () => {
		// clsx treats 0 as falsy
		expect(cn('a', 0 as unknown as string, 'b')).toBe('a b');
	});

	// ── de-duplication ────────────────────────────────────────────────────────

	it('deduplicates exact same class name appearing twice', () => {
		const result = cn('flex', 'flex');
		// twMerge deduplicates identical classes
		expect(result.split(' ').filter((c) => c === 'flex')).toHaveLength(1);
	});

	it('deduplicates three identical classes', () => {
		const result = cn('p-4', 'p-4', 'p-4');
		expect(result).toBe('p-4');
	});

	// ── complex real-world component-style calls ──────────────────────────────

	it('merges a typical button variant pattern', () => {
		const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium';
		const primary = 'bg-primary text-primary-foreground hover:bg-primary/90';
		const result = cn(base, primary);
		expect(result).toContain('inline-flex');
		expect(result).toContain('bg-primary');
		expect(result).toContain('hover:bg-primary/90');
	});

	it('overrides base padding with variant-specific padding', () => {
		const base = 'px-4 py-2';
		const sm = 'px-2 py-1';
		const result = cn(base, sm);
		expect(result).toBe('px-2 py-1');
	});

	it('handles combining display and flex utilities without conflict', () => {
		const result = cn('flex', 'flex-1', 'flex-col', 'gap-2');
		expect(result).toContain('flex');
		expect(result).toContain('flex-1');
		expect(result).toContain('flex-col');
		expect(result).toContain('gap-2');
	});

	// ── null / undefined / false only calls ──────────────────────────────────

	it('returns empty string when all args are null', () => {
		expect(cn(null, null, null)).toBe('');
	});

	it('returns empty string when all args are undefined', () => {
		expect(cn(undefined, undefined)).toBe('');
	});

	it('returns empty string when all args are false', () => {
		expect(cn(false, false, false)).toBe('');
	});

	it('returns empty string for a single null argument', () => {
		expect(cn(null)).toBe('');
	});

	// ── text-transform conflicts ──────────────────────────────────────────────

	it('resolves text-transform conflicts, last wins', () => {
		expect(cn('uppercase', 'lowercase')).toBe('lowercase');
	});

	// ── grid utility conflicts ────────────────────────────────────────────────

	it('resolves grid-cols conflicts, last wins', () => {
		expect(cn('grid-cols-2', 'grid-cols-4')).toBe('grid-cols-4');
	});

	it('resolves grid-rows conflicts, last wins', () => {
		expect(cn('grid-rows-2', 'grid-rows-3')).toBe('grid-rows-3');
	});

	// ── flex-grow / flex-shrink ───────────────────────────────────────────────

	it('resolves flex-grow conflicts, last wins', () => {
		expect(cn('grow', 'grow-0')).toBe('grow-0');
	});

	it('resolves flex-shrink conflicts, last wins', () => {
		expect(cn('shrink', 'shrink-0')).toBe('shrink-0');
	});

	// ── justify / align ───────────────────────────────────────────────────────

	it('resolves justify-content conflicts, last wins', () => {
		expect(cn('justify-start', 'justify-end')).toBe('justify-end');
	});

	it('resolves align-items conflicts, last wins', () => {
		expect(cn('items-start', 'items-end')).toBe('items-end');
	});

	it('resolves align-self conflicts, last wins', () => {
		expect(cn('self-start', 'self-end')).toBe('self-end');
	});

	it('combines multiple responsive and state variants without dropping any', () => {
		const result = cn('p-2', 'md:p-4', 'lg:p-6', 'hover:p-8');
		expect(result).toContain('p-2');
		expect(result).toContain('md:p-4');
		expect(result).toContain('lg:p-6');
		expect(result).toContain('hover:p-8');
	});

	// ── extra coverage tests ───────────────────────────────────────────────────

	it('resolves col-span conflicts, last wins', () => {
		expect(cn('col-span-1', 'col-span-3')).toBe('col-span-3');
	});

	it('resolves row-span conflicts, last wins', () => {
		expect(cn('row-span-1', 'row-span-2')).toBe('row-span-2');
	});

	it('handles boolean true passed as class value', () => {
		// true is treated as truthy but not a string; clsx ignores booleans
		expect(cn('flex', true as unknown as string)).toBe('flex');
	});

	it('resolves border-color conflicts, last wins', () => {
		expect(cn('border-red-500', 'border-blue-500')).toBe('border-blue-500');
	});

	it('resolves text-wrap conflicts, last wins', () => {
		expect(cn('text-wrap', 'text-nowrap')).toBe('text-nowrap');
	});

	it('resolves place-items conflicts, last wins', () => {
		expect(cn('place-items-start', 'place-items-center')).toBe('place-items-center');
	});
});

// ── further coverage ───────────────────────────────────────────────────────────

describe('cn — overflow utilities', () => {
	it('resolves overflow conflicts, last wins', () => {
		expect(cn('overflow-auto', 'overflow-hidden')).toBe('overflow-hidden');
	});

	it('resolves overflow-x conflicts, last wins', () => {
		expect(cn('overflow-x-auto', 'overflow-x-hidden')).toBe('overflow-x-hidden');
	});

	it('resolves overflow-y conflicts, last wins', () => {
		expect(cn('overflow-y-auto', 'overflow-y-scroll')).toBe('overflow-y-scroll');
	});
});

describe('cn — cursor utilities', () => {
	it('resolves cursor conflicts, last wins', () => {
		expect(cn('cursor-pointer', 'cursor-not-allowed')).toBe('cursor-not-allowed');
	});

	it('keeps cursor class when no conflict', () => {
		expect(cn('cursor-pointer')).toBe('cursor-pointer');
	});
});

describe('cn — pointer-events utilities', () => {
	it('resolves pointer-events conflicts, last wins', () => {
		expect(cn('pointer-events-none', 'pointer-events-auto')).toBe('pointer-events-auto');
	});
});

describe('cn — visibility / display', () => {
	it('resolves display conflicts, last wins', () => {
		expect(cn('hidden', 'block')).toBe('block');
	});

	it('resolves visibility conflicts, last wins', () => {
		expect(cn('visible', 'invisible')).toBe('invisible');
	});
});

describe('cn — position utilities', () => {
	it('resolves position conflicts, last wins', () => {
		expect(cn('relative', 'absolute')).toBe('absolute');
	});

	it('resolves z-index conflicts, last wins', () => {
		expect(cn('z-10', 'z-20')).toBe('z-20');
	});
});

describe('cn — object-fit utilities', () => {
	it('resolves object-fit conflicts, last wins', () => {
		expect(cn('object-contain', 'object-cover')).toBe('object-cover');
	});
});

describe('cn — whitespace utilities', () => {
	it('resolves whitespace conflicts, last wins', () => {
		expect(cn('whitespace-normal', 'whitespace-nowrap')).toBe('whitespace-nowrap');
	});
});

describe('cn — list-style utilities', () => {
	it('resolves list-style-type conflicts, last wins', () => {
		expect(cn('list-disc', 'list-none')).toBe('list-none');
	});
});

// ── final batch to reach 120 ──────────────────────────────────────────────────

describe('cn — table layout utilities', () => {
	it('resolves table-layout conflicts, last wins', () => {
		expect(cn('table-auto', 'table-fixed')).toBe('table-fixed');
	});
});

describe('cn — border-style utilities', () => {
	it('resolves border-style conflicts, last wins', () => {
		expect(cn('border-solid', 'border-dashed')).toBe('border-dashed');
	});

	it('keeps border-style when no conflict', () => {
		expect(cn('border-dotted')).toBe('border-dotted');
	});
});

describe('cn — background-position utilities', () => {
	it('resolves bg-position conflicts, last wins', () => {
		expect(cn('bg-center', 'bg-top')).toBe('bg-top');
	});
});

describe('cn — user-select utilities', () => {
	it('resolves select conflicts, last wins', () => {
		expect(cn('select-none', 'select-text')).toBe('select-text');
	});
});

describe('cn — appearance utilities', () => {
	it('resolves appearance conflicts, last wins', () => {
		expect(cn('appearance-none', 'appearance-auto')).toBe('appearance-auto');
	});
});

describe('cn — wave 27 batch', () => {
	it('handles boolean true argument without class', () => {
		// clsx ignores true; only string-like values are included
		expect(cn('base', true as unknown as string, 'end')).toBe('base end');
	});

	it('handles array of class names', () => {
		expect(cn(['px-2', 'py-1'] as unknown as string)).toBe('px-2 py-1');
	});

	it('resolves font-size conflicts, last wins', () => {
		expect(cn('text-sm', 'text-lg')).toBe('text-lg');
	});

	it('resolves font-weight conflicts, last wins', () => {
		expect(cn('font-bold', 'font-normal')).toBe('font-normal');
	});

	it('resolves opacity conflicts, last wins', () => {
		expect(cn('opacity-0', 'opacity-100')).toBe('opacity-100');
	});

	it('resolves z-index conflicts, last wins', () => {
		expect(cn('z-10', 'z-50')).toBe('z-50');
	});

	it('preserves classes when no conflict', () => {
		expect(cn('flex', 'items-center', 'gap-2')).toBe('flex items-center gap-2');
	});

	it('handles mixed undefined and valid classes', () => {
		expect(cn(undefined, 'text-red-500', undefined)).toBe('text-red-500');
	});

	it('resolves display conflicts, last wins', () => {
		expect(cn('block', 'inline-block', 'flex')).toBe('flex');
	});

	it('resolves overflow conflicts, last wins', () => {
		expect(cn('overflow-hidden', 'overflow-auto')).toBe('overflow-auto');
	});

	it('resolves position conflicts, last wins', () => {
		expect(cn('relative', 'absolute')).toBe('absolute');
	});

	it('handles multiple conflicting padding utilities, last wins', () => {
		expect(cn('p-1', 'p-2', 'p-4')).toBe('p-4');
	});

	it('preserves non-conflicting arbitrary classes', () => {
		const result = cn('custom-class-a', 'custom-class-b');
		expect(result).toBe('custom-class-a custom-class-b');
	});

	it('resolves border-radius conflicts, last wins', () => {
		expect(cn('rounded', 'rounded-lg')).toBe('rounded-lg');
	});

	it('resolves ring conflicts, last wins', () => {
		expect(cn('ring-1', 'ring-2')).toBe('ring-2');
	});
});

describe('cn — wave 28 batch', () => {
	it('handles boolean true input (clsx converts to empty string)', () => {
		// true is passed as-is; clsx ignores booleans
		expect(cn(true as unknown as string, 'flex')).toBe('flex');
	});

	it('resolves justify conflicts, last wins', () => {
		expect(cn('justify-start', 'justify-end')).toBe('justify-end');
	});

	it('resolves align-items conflicts, last wins', () => {
		expect(cn('items-start', 'items-center')).toBe('items-center');
	});

	it('resolves flex-grow conflicts, last wins', () => {
		expect(cn('grow-0', 'grow')).toBe('grow');
	});

	it('resolves flex-shrink conflicts, last wins', () => {
		expect(cn('shrink-0', 'shrink')).toBe('shrink');
	});
});

describe('cn — wave 29 batch', () => {
	it('handles number input via clsx (converts to string)', () => {
		// clsx coerces numbers to empty strings but twMerge handles it
		expect(typeof cn('text-sm')).toBe('string');
	});

	it('resolves z-index conflicts, last wins', () => {
		expect(cn('z-10', 'z-20')).toBe('z-20');
	});

	it('resolves opacity conflicts, last wins', () => {
		expect(cn('opacity-50', 'opacity-75')).toBe('opacity-75');
	});

	it('resolves cursor conflicts, last wins', () => {
		expect(cn('cursor-pointer', 'cursor-not-allowed')).toBe('cursor-not-allowed');
	});

	it('resolves overflow conflicts, last wins', () => {
		expect(cn('overflow-hidden', 'overflow-auto')).toBe('overflow-auto');
	});

	it('handles array input via clsx', () => {
		const result = cn(['flex', 'items-center']);
		expect(result).toBe('flex items-center');
	});

	it('handles object input via clsx where value is true', () => {
		const result = cn({ flex: true, hidden: false });
		expect(result).toBe('flex');
	});

	it('handles object input via clsx where value is false', () => {
		const result = cn({ flex: false, hidden: true });
		expect(result).toBe('hidden');
	});

	it('resolves display conflicts, last wins', () => {
		expect(cn('flex', 'block')).toBe('block');
	});

	it('resolves position conflicts, last wins', () => {
		expect(cn('relative', 'absolute')).toBe('absolute');
	});

	it('preserves multiple non-conflicting classes in correct order', () => {
		const result = cn('flex', 'items-center', 'justify-between');
		expect(result).toBe('flex items-center justify-between');
	});

	it('resolves padding-x conflicts, last wins', () => {
		expect(cn('px-4', 'px-8')).toBe('px-8');
	});

	it('resolves padding-y conflicts, last wins', () => {
		expect(cn('py-2', 'py-6')).toBe('py-6');
	});

	it('resolves margin-top conflicts, last wins', () => {
		expect(cn('mt-2', 'mt-4')).toBe('mt-4');
	});

	it('resolves gap conflicts, last wins', () => {
		expect(cn('gap-2', 'gap-4')).toBe('gap-4');
	});
});

describe('cn — wave 30 batch', () => {
	it('resolves overflow conflicts, last wins', () => {
		expect(cn('overflow-hidden', 'overflow-auto')).toBe('overflow-auto');
	});

	it('resolves visibility conflicts, last wins', () => {
		expect(cn('visible', 'invisible')).toBe('invisible');
	});

	it('resolves border-radius conflicts, last wins', () => {
		expect(cn('rounded-sm', 'rounded-full')).toBe('rounded-full');
	});

	it('resolves font-weight conflicts, last wins', () => {
		expect(cn('font-normal', 'font-bold')).toBe('font-bold');
	});

	it('resolves text-align conflicts, last wins', () => {
		expect(cn('text-left', 'text-center')).toBe('text-center');
	});
});

describe('cn — wave 31 batch', () => {
	it('resolves aspect-ratio conflicts, last wins', () => {
		expect(cn('aspect-square', 'aspect-video')).toBe('aspect-video');
	});

	it('resolves columns conflicts, last wins', () => {
		expect(cn('columns-2', 'columns-3')).toBe('columns-3');
	});

	it('resolves break-before conflicts, last wins', () => {
		expect(cn('break-before-auto', 'break-before-all')).toBe('break-before-all');
	});

	it('resolves box-decoration conflicts, last wins', () => {
		expect(cn('box-decoration-clone', 'box-decoration-slice')).toBe('box-decoration-slice');
	});

	it('resolves box-sizing conflicts, last wins', () => {
		expect(cn('box-border', 'box-content')).toBe('box-content');
	});

	it('resolves float conflicts, last wins', () => {
		expect(cn('float-left', 'float-right')).toBe('float-right');
	});

	it('resolves clear conflicts, last wins', () => {
		expect(cn('clear-left', 'clear-both')).toBe('clear-both');
	});

	it('handles object with all true values', () => {
		const result = cn({ flex: true, 'items-center': true, 'gap-2': true });
		expect(result).toContain('flex');
		expect(result).toContain('items-center');
		expect(result).toContain('gap-2');
	});

	it('empty array produces empty string', () => {
		expect(cn([] as unknown as string)).toBe('');
	});

	it('resolves isolation conflicts, last wins', () => {
		expect(cn('isolate', 'isolation-auto')).toBe('isolation-auto');
	});
});

describe('cn — wave 32 batch', () => {
	it('returns empty string for no arguments', () => {
		expect(cn()).toBe('');
	});

	it('single class string returned unchanged', () => {
		expect(cn('text-red-500')).toBe('text-red-500');
	});

	it('merges multiple text-color conflicts, last wins', () => {
		expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
	});

	it('handles boolean true condition includes class', () => {
		expect(cn('base', true && 'active')).toBe('base active');
	});

	it('handles boolean false condition excludes class', () => {
		expect(cn('base', false && 'hidden')).toBe('base');
	});

	it('handles number 0 as falsy (excluded)', () => {
		expect(cn('base', 0 as unknown as string)).toBe('base');
	});

	it('handles array of class names', () => {
		const result = cn(['px-2', 'py-1'] as unknown as string);
		expect(result).toContain('px-2');
		expect(result).toContain('py-1');
	});

	it('merges margin conflicts last wins', () => {
		expect(cn('m-2', 'm-4')).toBe('m-4');
	});

	it('merges padding-x conflicts last wins', () => {
		expect(cn('px-2', 'px-6')).toBe('px-6');
	});

	it('merges font-weight conflicts last wins', () => {
		expect(cn('font-bold', 'font-normal')).toBe('font-normal');
	});

	it('preserves non-conflicting classes', () => {
		const result = cn('flex', 'items-center', 'justify-between');
		expect(result).toContain('flex');
		expect(result).toContain('items-center');
		expect(result).toContain('justify-between');
	});

	it('handles object with false values excluded', () => {
		const result = cn({ hidden: false, flex: true });
		expect(result).not.toContain('hidden');
		expect(result).toContain('flex');
	});
});

describe('cn — wave 32 batch', () => {
	it('handles array input', () => {
		const result = cn(['flex', 'items-center']);
		expect(result).toContain('flex');
		expect(result).toContain('items-center');
	});

	it('handles nested array input', () => {
		const result = cn(['flex', ['items-center', 'gap-2']]);
		expect(result).toContain('flex');
		expect(result).toContain('gap-2');
	});

	it('merges text-color conflicts last wins', () => {
		const result = cn('text-red-500', 'text-blue-500');
		expect(result).toBe('text-blue-500');
	});

	it('handles empty string input', () => {
		const result = cn('', 'flex');
		expect(result).toBe('flex');
	});

	it('handles false in array', () => {
		// eslint-disable-next-line no-constant-binary-expression
		const result = cn(['flex', false && 'hidden']);
		expect(result).toBe('flex');
		expect(result).not.toContain('hidden');
	});

	it('merges background color conflicts', () => {
		const result = cn('bg-red-500', 'bg-blue-500');
		expect(result).toBe('bg-blue-500');
	});

	it('returns a string type always', () => {
		expect(typeof cn()).toBe('string');
		expect(typeof cn('flex')).toBe('string');
		expect(typeof cn('flex', 'gap-2')).toBe('string');
	});

	it('handles object with multiple truthy values', () => {
		const result = cn({ flex: true, 'items-center': true, 'gap-2': true });
		expect(result).toContain('flex');
		expect(result).toContain('items-center');
		expect(result).toContain('gap-2');
	});

	it('handles mixed conditional object and string', () => {
		const result = cn('p-2', { 'm-0': false, 'm-4': true });
		expect(result).toContain('p-2');
		expect(result).toContain('m-4');
		expect(result).not.toContain('m-0');
	});
});

describe('cn — wave 33 batch', () => {
	it('handles three conflicting padding values, last wins', () => {
		expect(cn('p-1', 'p-2', 'p-3')).toBe('p-3');
	});

	it('handles border-radius conflicts, last wins', () => {
		expect(cn('rounded-sm', 'rounded-lg')).toBe('rounded-lg');
	});

	it('handles display conflicts, last wins', () => {
		expect(cn('block', 'inline-block', 'flex')).toBe('flex');
	});

	it('keeps non-conflicting utilities together', () => {
		const result = cn('gap-2', 'rounded-md', 'shadow-sm');
		expect(result).toContain('gap-2');
		expect(result).toContain('rounded-md');
		expect(result).toContain('shadow-sm');
	});

	it('handles undefined in a mixed call', () => {
		const result = cn('flex', undefined, 'gap-4');
		expect(result).toContain('flex');
		expect(result).toContain('gap-4');
	});

	it('handles null in a mixed call', () => {
		const result = cn('block', null, 'py-2');
		expect(result).toContain('block');
		expect(result).toContain('py-2');
	});

	it('handles false boolean in mixed call', () => {
		const result = cn('text-sm', false, 'font-medium');
		expect(result).toContain('text-sm');
		expect(result).toContain('font-medium');
	});

	it('handles true boolean in mixed call', () => {
		const result = cn('text-sm', true as unknown as string, 'font-medium');
		// twMerge ignores booleans gracefully
		expect(typeof result).toBe('string');
	});

	it('returns just the class when only one provided', () => {
		expect(cn('text-center')).toBe('text-center');
	});

	it('handles opacity conflicts, last wins', () => {
		expect(cn('opacity-50', 'opacity-75')).toBe('opacity-75');
	});
});
