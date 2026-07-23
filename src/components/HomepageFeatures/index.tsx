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
    title: 'خانه',
    description:
      'وضعیت خرج آزاد و سبد خرید را با کلمات ساده ببینید — بدون نمودار شلوغ.',
    to: '/docs/home',
  },
  {
    icon: '✨',
    title: 'مربی',
    description:
      'از نوار پایین تب مربی را باز کنید و با چند پرسش کوتاه راهنمایی بگیرید.',
    to: '/docs/ai-coach',
  },
  {
    icon: '📋',
    title: 'تراکنش‌ها',
    description:
      'فهرست ماه، هفته یا روز را مرور کنید و ببینید پول کجا رفته است.',
    to: '/docs/history',
  },
];

const QuickLinks: QuickLink[] = [
  {label: 'شروع سریع', to: '/docs/intro'},
  {label: 'ثبت تراکنش', to: '/docs/add-transaction'},
  {label: 'برنامه خرج', to: '/docs/spending-plan'},
  {label: 'بودجه مشترک', to: '/docs/shared-budget'},
  {label: 'ورود خودکار', to: '/docs/import'},
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
            سه تب پایین اپ را بشناسید: خانه، مربی، تراکنش‌ها. یک تراکنش ثبت
            کنید و بقیه را وقتی لازم شد بخوانید.
          </p>
        </motion.div>

        <motion.ol
          className={styles.steps}
          variants={reveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{once: true, amount: 0.4}}
          transition={{duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1]}}>
          <li>در تب خانه، افزودن تراکنش را بزنید</li>
          <li>وضعیت ماه را در خانه ببینید؛ سؤال داشتید به مربی بروید</li>
          <li>تاریخچه کامل را از تب تراکنش‌ها مرور کنید</li>
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
