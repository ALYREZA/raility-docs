import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  helpSidebar: [
    'intro',
    {
      type: 'category',
      label: 'راهنمای بخش‌ها',
      collapsed: false,
      items: [
        'home',
        'add-transaction',
        'history',
        'spending-plan',
        'ai-coach',
        'shared-budget',
        'import',
        'security',
        'data-management',
        'subscription',
      ],
    },
  ],
};

export default sidebars;
