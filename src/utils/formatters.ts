/** Format milliseconds to a human-readable duration */
export function formatDuration(ms: number | null | undefined): string {
  if (ms == null) return '—';
  if (ms < 1000) return `${ms}ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(0);
  return `${minutes}m ${remainingSeconds}s`;
}

/** Format a number as a percentage string */
export function formatPercentage(value: number | null | undefined): string {
  if (value == null) return '—';
  return `${value.toFixed(1)}%`;
}

/** Format an ISO date string to a locale-friendly display */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString();
}

/** Map test status to display text */
export function formatTestStatus(status: string | null | undefined): string {
  if (!status) return 'UNKNOWN';
  return status.toUpperCase();
}
