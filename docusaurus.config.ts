import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Docker/CI builds copy sources without .git; eager Git VCS would throw.
// Set DOCUSAURUS_VCS=0 in the image to disable Git-backed lastmod/lastUpdated.
const vcsEnabled = process.env.DOCUSAURUS_VCS !== '0';

const config: Config = {
  title: 'ریالیتی',
  tagline: 'مربی پولی شخصی — ساده ثبت کن، با خیال راحت خرج کن',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
    experimental_vcs: vcsEnabled ? true : 'disabled',
  },

  // Keep MDX1 space-title admonitions (`:::tip Title`) working under future.v4.
  markdown: {
    mdx1Compat: {
      admonitions: true,
    },
  },

  url: 'https://riality.ir',
  baseUrl: '/',

  organizationName: 'riality',
  projectName: 'riality-help',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'fa',
    locales: ['fa'],
    localeConfigs: {
      fa: {
        label: 'فارسی',
        direction: 'rtl',
        htmlLang: 'fa-IR',
        calendar: 'persian',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          // Needed so sitemap can emit <lastmod> (from Git / front matter)
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          showLastUpdateTime: true,
          blogTitle: 'وبلاگ ریالیتی',
          blogDescription:
            'نکته‌ها، به‌روزرسانی‌ها و راهنماهای کوتاه برای مدیریت بهتر پول با ریالیتی',
          blogSidebarCount: 0,
          postsPerPage: 10,
          feedOptions: {
            type: 'all',
            title: 'وبلاگ ریالیتی',
            description:
              'نکته‌ها، به‌روزرسانی‌ها و راهنماهای کوتاه برای مدیریت بهتر پول با ریالیتی',
            copyright: `© ${new Date().getFullYear()} ریالیتی`,
            language: 'fa-IR',
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((_, index) => index < 20),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          // Google uses lastmod; priority/changefreq are ignored
          lastmod: 'date',
          priority: null,
          changefreq: null,
          ignorePatterns: ['/tags/**', '/blog/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            // Drop blog pagination (/blog/page/2, …) — keep canonical list pages
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'keywords',
        content:
          'ریالیتی, مدیریت مالی, بودجه, خرج آزاد, مربی پولی, اپ مالی فارسی',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ریالیتی',
      logo: {
        alt: 'لوگوی ریالیتی',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'helpSidebar',
          position: 'right',
          label: 'راهنما',
        },
        {
          to: '/blog',
          label: 'وبلاگ',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'راهنما',
          items: [
            {
              label: 'شروع سریع',
              to: '/docs/intro',
            },
            {
              label: 'صفحه خانه',
              to: '/docs/home',
            },
            {
              label: 'ثبت تراکنش',
              to: '/docs/add-transaction',
            },
          ],
        },
        {
          title: 'بخش‌های بیشتر',
          items: [
            {
              label: 'مربی هوشمند',
              to: '/docs/ai-coach',
            },
            {
              label: 'بودجه مشترک',
              to: '/docs/shared-budget',
            },
            {
              label: 'امنیت و پین',
              to: '/docs/security',
            },
          ],
        },
        {
          title: 'وبلاگ',
          items: [
            {
              label: 'همه مطالب',
              to: '/blog',
            },
            {
              label: 'خوراک RSS',
              // Static feed file (not a React route) — pathname:// avoids broken-link errors
              href: 'pathname:///blog/rss.xml',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} ریالیتی — راهنمای کاربری`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
