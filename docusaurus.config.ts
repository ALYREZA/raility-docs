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
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
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
