import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ریالیتی',
  tagline: 'مربی پولی شخصی — ساده ثبت کن، با خیال راحت خرج کن',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://help.riality.app',
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
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'وبلاگ ریالیتی',
          blogDescription:
            'نکته‌ها، به‌روزرسانی‌ها و راهنماهای کوتاه برای مدیریت بهتر پول با ریالیتی',
          blogSidebarTitle: 'آخرین مطالب',
          blogSidebarCount: 'ALL',
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
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
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
