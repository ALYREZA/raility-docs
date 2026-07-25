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
        'goals',
        'ai-coach',
        'history',
        'add-transaction',
        'spending-plan',
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
