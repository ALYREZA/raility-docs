import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Docker/CI builds copy sources without .git; eager Git VCS would throw.
// Set DOCUSAURUS_VCS=0 in the image to disable Git-backed lastmod/lastUpdated.
const vcsEnabled = process.env.DOCUSAURUS_VCS !== '0';

const siteUrl = 'https://riality.ir';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'ریالیتی',
      url: `${siteUrl}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/img/logo.png`,
        width: 1024,
        height: 1024,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'ریالیتی',
      description:
        'همین حالا بدانید چقدر می‌توانید با خیال راحت خرج کنید؛ بدون داشبوردهای شلوغ و پیچیده. کاملاً فارسی، با تقویم جلالی، آفلاین‌محور و با نگهداری داده‌ها فقط روی گوشی شما.',
      inLanguage: 'fa-IR',
      publisher: {'@id': `${siteUrl}/#organization`},
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#sitenav`,
      name: 'لینک‌های مهم ریالیتی',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: 'شروع سریع',
          url: `${siteUrl}/docs/intro`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: 'ثبت تراکنش',
          url: `${siteUrl}/docs/add-transaction`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'خانه اپ',
          url: `${siteUrl}/docs/home`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 4,
          name: 'وبلاگ',
          url: `${siteUrl}/blog`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 5,
          name: 'اشتراک',
          url: `${siteUrl}/docs/subscription`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 6,
          name: 'مربی هوشمند',
          url: `${siteUrl}/docs/ai-coach`,
        },
      ],
    },
  ],
};

const config: Config = {
  title: 'ریالیتی',
  tagline:
    'بدانید چقدر می‌توانید حساب‌شده خرج کنید؛ فارسی، جلالی، آفلاین و روی گوشی شما.',
  // Google Search prefers a square PNG that is a multiple of 48px.
  favicon: 'img/favicon-96x96.png',

  future: {
    v4: true,
    experimental_vcs: vcsEnabled ? true : 'disabled',
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: '48x48',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/img/favicon-96x96.png',
        sizes: '96x96',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/img/favicon-192x192.png',
        sizes: '192x192',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/apple-touch-icon.png',
        sizes: '180x180',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'text/plain',
        href: '/llms.txt',
        title: 'llms.txt',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/json',
        href: '/catalog/docs.json',
        title: 'Docs catalog',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(structuredData),
    },
  ],

  // Keep MDX1 space-title admonitions (`:::tip Title`) working under future.v4.
  markdown: {
    mdx1Compat: {
      admonitions: true,
    },
  },

  url: siteUrl,
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

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        // Persian is not supported by lunr-languages; index raw tokens instead.
        removeDefaultStopWordFilter: true,
        removeDefaultStemmer: true,
        highlightSearchTermsOnTargetPage: true,
        searchBarPosition: 'left',
        searchBarShortcut: true,
        searchBarShortcutKeymap: 'mod+k',
      },
    ],
  ],

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
          to: '/roadmap',
          label: 'به‌روزرسانی‌ها',
          position: 'right',
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
            {
              label: 'به‌روزرسانی‌ها',
              to: '/roadmap',
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
            {
              label: 'llms.txt',
              href: 'pathname:///llms.txt',
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
