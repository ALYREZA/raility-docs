import type {ReactNode} from 'react';
import {useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

import styles from './index.module.css';

const fadeUp = {
  hidden: {opacity: 0, y: 28},
  visible: {opacity: 1, y: 0},
};

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <header ref={heroRef} className={clsx('hero', styles.heroBanner)}>
      <motion.div
        className={styles.heroGlow}
        aria-hidden="true"
        style={reduceMotion ? undefined : {y: glowY, scale: glowScale}}
      />
      <div className={styles.heroMesh} aria-hidden="true" />

      <motion.div
        className={clsx('container', styles.heroInner)}
        style={reduceMotion ? undefined : {y: contentY, opacity: contentOpacity}}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {staggerChildren: 0.1, delayChildren: 0.05},
          },
        }}>
        <motion.div className={styles.heroBadgeRow} variants={fadeUp}>
          <span className={styles.heroBadge}>راهنمای کاربری</span>
          <span className={styles.heroBadge}>فارسی · آفلاین‌اول</span>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
            {siteConfig.title}
          </Heading>
        </motion.div>

        <motion.p
          className={clsx('hero__subtitle', styles.heroSubtitle)}
          variants={fadeUp}>
          {siteConfig.tagline}
        </motion.p>

        <motion.p className={styles.heroLead} variants={fadeUp}>
          درآمد و هزینه را سریع ثبت کنید، وضعیت ماه را با کلمات ساده ببینید، و
          بدون داشبورد شلوغ تصمیم بگیرید.
        </motion.p>

        <motion.ul className={styles.heroHighlights} variants={fadeUp}>
          <li>ثبت در چند ثانیه</li>
          <li>داده روی گوشی شما</li>
          <li>تقویم جلالی</li>
        </motion.ul>

        <motion.div className={styles.buttons} variants={fadeUp}>
          <Link
            className={clsx(
              'button button--secondary button--lg',
              styles.primaryCta,
            )}
            to="/docs/intro">
            شروع راهنما
          </Link>
          <Link
            className={clsx(
              'button button--outline button--lg',
              styles.secondaryCta,
            )}
            to="/docs/add-transaction">
            ثبت اولین تراکنش
          </Link>
        </motion.div>
      </motion.div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollCueDot} />
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
