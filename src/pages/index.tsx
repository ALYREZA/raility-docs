import type {ReactNode} from 'react';
import {useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

import styles from './index.module.css';

const HERO_LEAD =
  'همین حالا بدانید چقدر می‌توانید با خیال راحت خرج کنید؛ بدون داشبوردهای شلوغ و پیچیده. کاملاً فارسی، با تقویم جلالی، آفلاین‌محور و با نگهداری داده‌ها فقط روی گوشی شما.';

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
          {HERO_LEAD}
        </motion.p>

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
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="راهنمای کاربری" description={HERO_LEAD}>
      <HomepageHeader />
    </Layout>
  );
}
