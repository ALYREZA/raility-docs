import type {ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {motion, useReducedMotion} from 'motion/react';

import {
  CHANGELOG_TAG_LABELS,
  changelogEntries,
  type ChangelogEntry,
} from '@site/src/data/changelogEntries';
import {formatJalaliDate} from '@site/src/utils/formatJalaliDate';
import styles from './roadmap.module.css';

type ChangelogItemProps = {
  entry: ChangelogEntry;
  index: number;
  isLast: boolean;
};

function ChangelogItem({entry, index, isLast}: ChangelogItemProps) {
  const reduceMotion = useReducedMotion();
  const jalaliDate = formatJalaliDate(entry.date);
  const tagLabel = CHANGELOG_TAG_LABELS[entry.tag];

  return (
    <li className={clsx(styles.item, isLast && styles.itemLast)}>
      <div className={styles.dateCol}>
        <div className={styles.stickyBlock}>
          <div className={styles.dateMeta}>
            <time className={styles.date} dateTime={entry.date}>
              {jalaliDate}
            </time>
            <span className={clsx(styles.tag, styles[`tag_${entry.tag}`])}>
              {tagLabel}
            </span>
          </div>
          <span className={styles.dot} aria-hidden="true" />
        </div>
      </div>

      <motion.article
        className={styles.entry}
        initial={reduceMotion ? false : {opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.15}}
        transition={{
          duration: 0.45,
          delay: Math.min(index * 0.04, 0.12),
          ease: [0.22, 1, 0.36, 1],
        }}>
        <time className={styles.mobileDate} dateTime={entry.date}>
          {jalaliDate}
        </time>
        <span
          className={clsx(
            styles.tag,
            styles.mobileTag,
            styles[`tag_${entry.tag}`],
          )}>
          {tagLabel}
        </span>

        <div className={styles.entryHeader}>
          <Heading as="h2" className={styles.entryTitle}>
            {entry.title}
          </Heading>
        </div>

        <div className={styles.media}>
          <img
            className={styles.image}
            src={entry.image}
            alt={entry.imageAlt ?? entry.title}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>

        <div className={styles.paragraphs}>
          {entry.paragraphs.map(function renderParagraph(text, pIndex) {
            return <p key={`${entry.id}-p-${pIndex}`}>{text}</p>;
          })}
        </div>
      </motion.article>
    </li>
  );
}

export default function RoadmapPage(): ReactNode {
  const reduceMotion = useReducedMotion();
  const entries = [...changelogEntries].sort(function sortByDateDesc(a, b) {
    return b.date.localeCompare(a.date);
  });

  return (
    <Layout
      title="به‌روزرسانی‌ها"
      description="تازه‌ترین قابلیت‌ها و تغییرات اپ ریالیتی.">
      <main className={styles.page}>
        <div className={clsx('container', styles.wrap)}>
          <motion.header
            className={styles.intro}
            initial={reduceMotion ? false : {opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}>
            <Heading as="h1" className={styles.title}>
              به‌روزرسانی‌ها
            </Heading>
            <p className={styles.lead}>
              تغییرات و قابلیت‌های جدید اپ ریالیتی را اینجا دنبال کنید.
            </p>
          </motion.header>

          <ol className={styles.list}>
            {entries.map(function renderEntry(entry, index) {
              return (
                <ChangelogItem
                  key={entry.id}
                  entry={entry}
                  index={index}
                  isLast={index === entries.length - 1}
                />
              );
            })}
          </ol>
        </div>
      </main>
    </Layout>
  );
}
