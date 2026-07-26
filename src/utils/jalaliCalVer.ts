/**
 * Jalali CalVer — same scheme as the ریالیتی app (`YY.MM.DDHH`, Asia/Tehran).
 *
 *   YY   — last 2 digits of Jalali year
 *   MM   — zero-padded Jalali month (01–12)
 *   DDHH — zero-padded day + hour (e.g. ۴ مرداد ۱۴:۰۰ → 0414)
 */
export const JALALI_CALVER_RE = /^\d{2}\.\d{2}\.\d{4}$/;

export function isJalaliCalVer(version: string): boolean {
  return JALALI_CALVER_RE.test(version);
}

/** Display form matching in-app changelog: `v05.05.0201` */
export function formatAppVersionLabel(version: string): string {
  return version.startsWith('v') ? version : `v${version}`;
}

/**
 * Compare two Jalali CalVer stamps. Lexicographic order works because
 * each segment is zero-padded to fixed width.
 */
export function compareJalaliCalVer(a: string, b: string): number {
  return a.localeCompare(b);
}
