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
import {
  compareJalaliCalVer,
  formatAppVersionLabel,
} from '@site/src/utils/jalaliCalVer';
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
  const versionLabel = entry.version
    ? formatAppVersionLabel(entry.version)
    : null;

  return (
    <li
      id={entry.id}
      className={clsx(styles.item, isLast && styles.itemLast)}>
      <div className={styles.dateCol}>
        <div className={styles.stickyBlock}>
          <div className={styles.dateMeta}>
            {versionLabel ? (
              <span className={styles.version} dir="ltr">
                {versionLabel}
              </span>
            ) : null}
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
        <p className={styles.mobileMeta}>
          {versionLabel ? (
            <>
              <span className={styles.mobileVersion} dir="ltr">
                {versionLabel}
              </span>
              <span className={styles.metaSep} aria-hidden="true">
                ·
              </span>
            </>
          ) : null}
          <time className={styles.mobileDate} dateTime={entry.date}>
            {jalaliDate}
          </time>
        </p>
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

/** Newest first: date desc, then Jalali CalVer desc. */
function sortChangelogEntriesNewestFirst(
  a: ChangelogEntry,
  b: ChangelogEntry,
): number {
  const byDate = b.date.localeCompare(a.date);
  if (byDate !== 0) {
    return byDate;
  }

  if (a.version && b.version) {
    return compareJalaliCalVer(b.version, a.version);
  }
  if (a.version && !b.version) {
    return -1;
  }
  if (!a.version && b.version) {
    return 1;
  }
  return 0;
}

export default function RoadmapPage(): ReactNode {
  const reduceMotion = useReducedMotion();
  const entries = [...changelogEntries].sort(sortChangelogEntriesNewestFirst);
  const latestVersion = entries.reduce<string | undefined>(
    function findHighestCalVer(best, entry) {
      if (!entry.version) {
        return best;
      }
      if (!best) {
        return entry.version;
      }
      return compareJalaliCalVer(entry.version, best) > 0
        ? entry.version
        : best;
    },
    undefined,
  );
  const latestVersionLabel = latestVersion
    ? formatAppVersionLabel(latestVersion)
    : null;

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
              شمارهٔ نسخه‌ها همان شمارهٔ جلالی داخل اپ است — آخرین:{' '}
              {latestVersionLabel ? (
                <span className={styles.leadVersion} dir="ltr">
                  {latestVersionLabel}
                </span>
              ) : (
                '—'
              )}
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
