import changelogData from './changelogEntries.json';

export type ChangelogTag =
  | 'feature'
  | 'beta'
  | 'enhancement'
  | 'platform';

export type ChangelogEntry = {
  id: string;
  /**
   * Jalali CalVer `YY.MM.DDHH` (Asia/Tehran) — same as app `package.json` /
   * in-app changelog `version`. Omit until the feature ships in a store build.
   */
  version?: string;
  /** ISO date YYYY-MM-DD — shown as Jalali */
  date: string;
  tag: ChangelogTag;
  title: string;
  /** Two or three short paragraphs */
  paragraphs: string[];
  image: string;
  imageAlt?: string;
};

export const CHANGELOG_TAG_LABELS: Record<ChangelogTag, string> = {
  feature: 'قابلیت',
  beta: 'آزمایشی',
  enhancement: 'بهبود',
  platform: 'پلتفرم',
};

/**
 * به‌روزرسانی‌های اپ ریالیتی — فقط قابلیت‌های واقعی اپ.
 * جدیدترین بالا (تاریخ، سپس CalVer).
 * Source of truth: `changelogEntries.json` (also published at /catalog/changelog.json).
 */
export const changelogEntries: ChangelogEntry[] =
  changelogData as ChangelogEntry[];
