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
 */
export const changelogEntries: ChangelogEntry[] = [
  {
    id: 'goals',
    date: '2026-07-26',
    tag: 'feature',
    title: 'هدف‌ها',
    paragraphs: [
      'تب هدف‌ها اضافه شد: ذخیره اضطراری یا یک هدف مشخص با مبلغ و افق زمانی تعریف کنید.',
      'خط زمان ماه‌به‌ماه پیشرفت را نشان می‌دهد؛ واریز و برداشت از هدف جدا از خرج روزمره ثبت می‌شود.',
      'هدف اصلی در بالای لیست برجسته می‌شود — همه‌چیز روی دستگاه شما و با تقویم جلالی.',
    ],
    image: '/img/changelog/goals.jpg',
    imageAlt: 'هدف پس‌انداز در اپ ریالیتی',
  },
  {
    id: 'shared-budget',
    version: '05.05.0201',
    date: '2026-07-24',
    tag: 'feature',
    title: 'بودجه مشترک',
    paragraphs: [
      'با دعوت QR یا کد، شریک را به بودجه مشترک اضافه کنید؛ نقش مالک و عضو مشخص است.',
      'تراکنش‌های مشترک با همگام‌سازی رمزنگاری‌شده بین گوشی‌ها جابه‌جا می‌شوند — دادهٔ شخصی شما روی دستگاه می‌ماند.',
      'ریالیتی آفلاین‌اول می‌ماند؛ همگام‌سازی فقط برای همان بودجهٔ مشترک است، نه کپی کامل ابر.',
    ],
    image: '/img/changelog/shared-budget.jpg',
    imageAlt: 'دو گوشی با بودجه مشترک در ریالیتی',
  },
  {
    id: 'ai-coach',
    version: '05.04.2900',
    date: '2026-07-21',
    tag: 'beta',
    title: 'مربی (آزمایشی)',
    paragraphs: [
      'در تب مربی، پیشنهادهای کوتاه و مرحله‌به‌مرحله می‌گیرید — نه دیوار متن طولانی.',
      'پاسخ‌ها به خرج آزاد و برنامهٔ خرج ماه جاری وصل می‌شوند تا راهنمایی از وضعیت واقعی جدا نباشد.',
      'هنوز آزمایشی است؛ با دورهٔ آشنایی و اشتراک فعال می‌شود و با بازخورد شما دقیق‌تر خواهد شد.',
    ],
    image: '/img/changelog/ai-coach.jpg',
    imageAlt: 'مربی هوشمند ریالیتی روی گوشی',
  },
  {
    id: 'sms-import',
    version: '05.04.2412',
    date: '2026-07-23',
    tag: 'feature',
    title: 'ورود از پیامک بانکی',
    paragraphs: [
      'روی اندروید، پیامک‌های بانکی خوانده می‌شوند و به‌صورت نامزد واردات آمادهٔ تأیید می‌آیند.',
      'تشخیص تکراری با اثر انگشت منبع جلوی ثبت دوباره را می‌گیرد؛ خودتان هم می‌توانید موردی را تکراری علامت بزنید.',
      'دسته را هنگام تأیید انتخاب می‌کنید تا سرعت واردات، دقت دسته‌بندی را قربانی نکند.',
    ],
    image: '/img/changelog/import.jpg',
    imageAlt: 'ورود تراکنش از پیامک بانکی به اپ',
  },
  {
    id: 'spending-plan',
    version: '05.04.1910',
    date: '2026-07-21',
    tag: 'feature',
    title: 'روز حقوق و برنامهٔ خرج',
    paragraphs: [
      'ماه مالی از روز حقوق شما شروع می‌شود — نه از اول تقویم.',
      'خرج آزاد، قلک خرید و سقف هفتگی کمک می‌کنند وسط ماه غافلگیر نشوید.',
      'اگر سرعت خرج از مسیر خارج شود، یادآوری کوتاه میان‌ماه می‌آید تا هنوز قابل اصلاح باشد.',
    ],
    image: '/img/changelog/spending-plan.jpg',
    imageAlt: 'برنامهٔ خرج و روز حقوق در ریالیتی',
  },
];
