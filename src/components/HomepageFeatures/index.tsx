import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {motion, useReducedMotion} from 'motion/react';
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

const reveal = {
  hidden: {opacity: 0, y: 36},
  visible: {opacity: 1, y: 0},
};

function Feature({title, description, to, icon, index}: FeatureItem & {index: number}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={clsx('col col--4', styles.featureCol)}
      variants={reveal}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1]}}>
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
    </motion.div>
  );
}

function QuickLinkItem({label, to, index}: QuickLink & {index: number}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reveal}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{once: true, amount: 0.4}}
      transition={{duration: 0.4, delay: index * 0.05, ease: 'easeOut'}}>
      <Link className={styles.quickLink} to={to}>
        {label}
      </Link>
    </motion.div>
  );
}

export default function HomepageFeatures(): ReactNode {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.features}>
      <div className="container">
        <motion.div
          className={styles.sectionIntro}
          variants={reveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{once: true, amount: 0.5}}
          transition={{duration: 0.55, ease: [0.22, 1, 0.36, 1]}}>
          <Heading as="h2" className={styles.sectionTitle}>
            از کجا شروع کنیم؟
          </Heading>
          <p className={styles.sectionLead}>
            سه قدم کافی است: یک تراکنش ثبت کنید، به خانه برگردید، بقیه را وقتی
            لازم شد بخوانید.
          </p>
        </motion.div>

        <motion.ol
          className={styles.steps}
          variants={reveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{once: true, amount: 0.4}}
          transition={{duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1]}}>
          <li>اولین درآمد یا هزینه را ثبت کنید</li>
          <li>تب خانه را باز کنید و وضعیت ماه را ببینید</li>
          <li>برای هر بخش، راهنمای گام‌به‌گام را از فهرست انتخاب کنید</li>
        </motion.ol>

        <div className="row">
          {FeatureList.map(function renderFeature(props, index) {
            return <Feature key={props.to} {...props} index={index} />;
          })}
        </div>

        <motion.div
          className={styles.quickLinksBlock}
          variants={reveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
          transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}>
          <Heading as="h3" className={styles.quickLinksTitle}>
            همه بخش‌های راهنما
          </Heading>
          <div className={styles.quickLinksGrid}>
            {QuickLinks.map(function renderQuickLink(props, index) {
              return <QuickLinkItem key={props.to} {...props} index={index} />;
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
