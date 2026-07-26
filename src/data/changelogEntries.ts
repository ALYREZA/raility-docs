export type ChangelogTag =
  | 'feature'
  | 'beta'
  | 'enhancement'
  | 'platform';

export type ChangelogEntry = {
  id: string;
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
 * به‌روزرسانی‌های اپ ریالیتی — جدیدترین بالا.
 */
export const changelogEntries: ChangelogEntry[] = [
  {
    id: 'shared-budget-polish',
    date: '2026-07-26',
    tag: 'enhancement',
    title: 'بودجه مشترک روان‌تر',
    paragraphs: [
      'دعوت شریک و پیوستن به بودجه مشترک ساده‌تر شده است تا دونفره شروع کار کمتر اصطکاک داشته باشد.',
      'نقش‌ها و سهم هر نفر واضح‌تر دیده می‌شود؛ دیگر لازم نیست برای فهمیدن وضعیت مشترک چند صفحه را بگردید.',
      'مرور هزینهٔ مشترک ماه جاری هم کوتاه‌تر شده تا وسط ماه بتوانید با هم تصمیم بگیرید.',
    ],
    image: '/img/changelog/shared-budget.jpg',
    imageAlt: 'دو گوشی با بودجه مشترک در ریالیتی',
  },
  {
    id: 'ai-coach-clarity',
    date: '2026-07-20',
    tag: 'beta',
    title: 'مربی کوتاه و قابل‌اجرا',
    paragraphs: [
      'مربی دیگر دیوار متن طولانی نمی‌سازد؛ پاسخ‌ها کوتاه‌تر و مرحله‌به‌مرحله‌اند.',
      'پیشنهادها به خرج آزاد و هدف‌های فعلی شما وصل می‌شوند تا راهنمایی از وضعیت واقعی ماه جدا نباشد.',
      'این نسخه هنوز آزمایشی است و با بازخورد شما دقیق‌تر می‌شود.',
    ],
    image: '/img/changelog/ai-coach.jpg',
    imageAlt: 'مربی هوشمند ریالیتی روی گوشی',
  },
  {
    id: 'smarter-import',
    date: '2026-07-18',
    tag: 'feature',
    title: 'ورود خودکار هوشمندتر',
    paragraphs: [
      'بعد از واردات، برای تراکنش‌های تازه‌وارد پیشنهاد دسته می‌بینید تا کار دستی کمتر شود.',
      'تشخیص تکراری‌ها مطمئن‌تر شده و وقتی یک منبع کامل خوانده نمی‌شود، مسیر رفع مشکل واضح‌تر است.',
      'هدف این است که ورود داده سریع بماند، بدون اینکه دقت دسته‌بندی قربانی شود.',
    ],
    image: '/img/changelog/import.jpg',
    imageAlt: 'ورود خودکار تراکنش به اپ',
  },
  {
    id: 'monthly-story',
    date: '2026-07-12',
    tag: 'feature',
    title: 'جمع‌بندی ماه',
    paragraphs: [
      'در پایان ماه یک خلاصهٔ کوتاه با کلمات ساده می‌بینید: درآمد، هزینه و خرج آزاد.',
      'به‌جای داشبورد شلوغ، دو یا سه نکتهٔ مهم برجسته می‌شود تا بدانید ماه چطور گذشت.',
      'یک پیشنهاد کوچک برای ماه بعد هم کنار خلاصه می‌آید — اختیاری و کوتاه.',
    ],
    image: '/img/changelog/monthly.jpg',
    imageAlt: 'جمع‌بندی ماه در اپ ریالیتی',
  },
  {
    id: 'multi-device-sync',
    date: '2026-07-05',
    tag: 'platform',
    title: 'همگام‌سازی چنددستگاهی',
    paragraphs: [
      'ریالیتی آفلاین‌اول می‌ماند؛ همگام‌سازی چنددستگاهی برای وقتی است که آماده‌اش باشیم.',
      'اولویت با کنترل شما روی داده و شفاف بودن چیزهایی است که همگام می‌شوند.',
      'تا آن موقع، داده روی گوشی شما می‌ماند و تجربهٔ فعلی به‌هم نمی‌ریزد.',
    ],
    image: '/img/changelog/sync.jpg',
    imageAlt: 'همگام‌سازی گوشی و تبلت',
  },
  {
    id: 'web-companion',
    date: '2026-06-28',
    tag: 'platform',
    title: 'همراه وب',
    paragraphs: [
      'اپ موبایل مرکز تجربه می‌ماند؛ همراه وب فقط وقتی معنا دارد که همان سادگی را حفظ کند.',
      'هدف، مرور وضعیت و تاریخچه روی صفحهٔ بزرگ‌تر است — نه جایگزینی عجولانه برای موبایل.',
      'این مورد هنوز زمان‌بندی انتشار ثابت ندارد و با اولویت حریم خصوصی پیش می‌رود.',
    ],
    image: '/img/changelog/platform.jpg',
    imageAlt: 'لپ‌تاپ و گوشی همراه وب ریالیتی',
  },
];
