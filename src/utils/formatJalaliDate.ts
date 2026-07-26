/**
 * Format a date-only ISO string (YYYY-MM-DD) or Date as Jalali (Persian calendar).
 * Uses UTC so date-only values don't shift a day across timezones.
 */
export function formatJalaliDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('fa-IR', {
    calendar: 'persian',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  }).format(date);
}
