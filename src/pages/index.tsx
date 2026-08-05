import type {ReactNode} from 'react';
import {useEffect, useRef} from 'react';
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

const CAFEBAZAAR_URL = 'https://cafebazaar.ir/app/ir.riality.app';
const HERO_HEADLINE = 'واقعیت ریالی شما';
const HERO_SUPPORT =
  'بدانید چقدر می‌توانید حساب‌شده خرج کنید؛ فارسی، جلالی، آفلاین و روی گوشی شما.';
const HERO_META =
  'بدانید چقدر می‌توانید حساب‌شده خرج کنید؛ فارسی، جلالی، آفلاین و روی گوشی شما.';

const fadeUp = {
  hidden: {opacity: 0, y: 24},
  visible: {opacity: 1, y: 0},
};

function PhonePreview({reduceMotion}: {reduceMotion: boolean | null}) {
  return (
    <motion.div
      className={styles.phoneStage}
      initial={reduceMotion ? false : {opacity: 0, y: 40, scale: 0.96}}
      animate={{opacity: 1, y: 0, scale: 1}}
      transition={{duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}>
      <motion.div
        className={styles.phoneFloat}
        animate={reduceMotion ? undefined : {y: [0, -10, 0]}}
        transition={
          reduceMotion
            ? undefined
            : {duration: 5.5, repeat: Infinity, ease: 'easeInOut'}
        }>
        <div className={styles.phoneFrame}>
          <span className={styles.phoneBtnSilent} aria-hidden="true" />
          <span className={styles.phoneBtnVolumeUp} aria-hidden="true" />
          <span className={styles.phoneBtnVolumeDown} aria-hidden="true" />
          <span className={styles.phoneBtnPower} aria-hidden="true" />
          <img
            className={styles.phoneImage}
            src="/img/home-app.jpg"
            alt="صفحه خانه ریالیتی؛ وضعیت خرج آزاد و پیشرفت امروز"
            width={422}
            height={1024}
            decoding="async"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const washY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  return (
    <header ref={heroRef} className={styles.hero}>
      <motion.div
        className={styles.heroWash}
        aria-hidden="true"
        style={reduceMotion ? undefined : {y: washY}}
      />
      <div className={styles.heroGrain} aria-hidden="true" />

      <div className={clsx('container', styles.heroGrid)}>
        <motion.div
          className={styles.heroCopy}
          style={reduceMotion ? undefined : {y: copyY}}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {staggerChildren: 0.09, delayChildren: 0.04},
            },
          }}>
          <motion.p className={styles.brand} variants={fadeUp}>
            {siteConfig.title}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Heading as="h1" className={styles.headline}>
              {HERO_HEADLINE}
            </Heading>
          </motion.div>

          <motion.p className={styles.support} variants={fadeUp}>
            {HERO_SUPPORT}
          </motion.p>

          <motion.div className={styles.ctaRow} variants={fadeUp}>
            <Link
              className={styles.primaryCta}
              href={CAFEBAZAAR_URL}
              target="_blank"
              rel="noopener noreferrer">
              دانلود از کافه‌بازار
            </Link>
            <Link className={styles.secondaryCta} to="/docs/intro">
              شروع راهنما
            </Link>
          </motion.div>
        </motion.div>

        <motion.div style={reduceMotion ? undefined : {y: phoneY}}>
          <PhonePreview reduceMotion={reduceMotion} />
        </motion.div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  useEffect(function syncHomeHeroNav() {
    document.documentElement.classList.add('home-hero');
    return function cleanup() {
      document.documentElement.classList.remove('home-hero');
    };
  }, []);

  return (
    <Layout title="خانه" description={HERO_META}>
      <HomepageHeader />
    </Layout>
  );
}
