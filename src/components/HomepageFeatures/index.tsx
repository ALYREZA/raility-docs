import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: string;
  to: string;
  icon: string;
};

type QuickLink = {
  label: string;
  to: string;
};

const FeatureList: FeatureItem[] = [
  {
    icon: '🏠',
    title: 'خانه و وضعیت ماه',
    description:
      'ببینید ماهتان راحت است یا محتاط — بدون نمودار و عددهای گیج‌کننده.',
    to: '/docs/home',
  },
  {
    icon: '➕',
    title: 'ثبت تراکنش',
    description:
      'درآمد یا هزینه را در چند ثانیه ثبت کنید؛ با دسته‌بندی فارسی و تقویم جلالی.',
    to: '/docs/add-transaction',
  },
  {
    icon: '🤖',
    title: 'مربی و بودجه مشترک',
    description:
      'راهنمایی ساده بگیرید یا بودجه را با شریک زندگی‌تان هم‌زمان نگه دارید.',
    to: '/docs/ai-coach',
  },
];

const QuickLinks: QuickLink[] = [
  {label: 'شروع سریع', to: '/docs/intro'},
  {label: 'برنامه خرج', to: '/docs/spending-plan'},
  {label: 'تراکنش‌ها', to: '/docs/history'},
  {label: 'ورود خودکار', to: '/docs/import'},
  {label: 'امنیت', to: '/docs/security'},
  {label: 'اشتراک', to: '/docs/subscription'},
];

function Feature({title, description, to, icon}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Link className={styles.featureCard} to={to}>
        <span className={styles.featureIcon} aria-hidden="true">
          {icon}
        </span>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
        <span className={styles.featureCta}>مشاهده راهنما ←</span>
      </Link>
    </div>
  );
}

function QuickLinkItem({label, to}: QuickLink) {
  return (
    <Link className={styles.quickLink} to={to}>
      {label}
    </Link>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <Heading as="h2" className={styles.sectionTitle}>
            از کجا شروع کنیم؟
          </Heading>
          <p className={styles.sectionLead}>
            سه قدم کافی است: یک تراکنش ثبت کنید، به خانه برگردید، بقیه را وقتی
            لازم شد بخوانید.
          </p>
        </div>

        <ol className={styles.steps}>
          <li>اولین درآمد یا هزینه را ثبت کنید</li>
          <li>تب خانه را باز کنید و وضعیت ماه را ببینید</li>
          <li>برای هر بخش، راهنمای گام‌به‌گام را از فهرست انتخاب کنید</li>
        </ol>

        <div className="row">
          {FeatureList.map(function renderFeature(props) {
            return <Feature key={props.to} {...props} />;
          })}
        </div>

        <div className={styles.quickLinksBlock}>
          <Heading as="h3" className={styles.quickLinksTitle}>
            همه بخش‌های راهنما
          </Heading>
          <div className={styles.quickLinksGrid}>
            {QuickLinks.map(function renderQuickLink(props) {
              return <QuickLinkItem key={props.to} {...props} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
