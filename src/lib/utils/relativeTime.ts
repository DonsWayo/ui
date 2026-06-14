/**
 * Human-friendly "time ago" formatter.
 *
 * "just now", "5m ago", "3h ago", "12d ago", then an absolute date for
 * anything older than ~30 days. Pure and SSR-safe (uses `Date.now()` only).
 */
export function relativeTime(dateStr: string | Date): string {
	const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
	const diffMs = Date.now() - date.getTime();
	const diffSec = Math.floor(diffMs / 1000);
	if (diffSec < 60) return 'just now';
	const diffMin = Math.floor(diffSec / 60);
	if (diffMin < 60) return `${diffMin}m ago`;
	const diffHr = Math.floor(diffMin / 60);
	if (diffHr < 24) return `${diffHr}h ago`;
	const diffDay = Math.floor(diffHr / 24);
	if (diffDay < 30) return `${diffDay}d ago`;
	return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
