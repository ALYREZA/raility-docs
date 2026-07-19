import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroBadgeRow}>
          <span className={styles.heroBadge}>راهنمای کاربری</span>
          <span className={styles.heroBadge}>فارسی · آفلاین‌اول</span>
        </div>
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <p className={styles.heroLead}>
          درآمد و هزینه را سریع ثبت کنید، وضعیت ماه را با کلمات ساده ببینید، و
          بدون داشبورد شلوغ تصمیم بگیرید.
        </p>
        <ul className={styles.heroHighlights}>
          <li>ثبت در چند ثانیه</li>
          <li>داده روی گوشی شما</li>
          <li>تقویم جلالی</li>
        </ul>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--secondary button--lg', styles.primaryCta)}
            to="/docs/intro">
            شروع راهنما
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.secondaryCta)}
            to="/docs/add-transaction">
            ثبت اولین تراکنش
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="راهنمای کاربری"
      description="راهنمای فارسی ریالیتی — معرفی کوتاه و آموزش هر بخش اپلیکیشن">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
