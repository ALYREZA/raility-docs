import type {ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import type {Props} from '@theme/Footer/Links/MultiColumn';
import {getRecentBlogPosts} from '@site/src/data/recentBlogPosts';

type ColumnType = Props['columns'][number];
type ColumnItemType = ColumnType['items'][number];

const RECENT_LIMIT = 5;
const BLOG_COLUMN_TITLE = 'وبلاگ';

function ColumnLinkItem({item}: {item: ColumnItemType}): ReactNode {
  if (item.html) {
    return (
      <li
        className={clsx('footer__item', item.className)}
        dangerouslySetInnerHTML={{__html: item.html}}
      />
    );
  }

  return (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function enrichBlogColumn(column: ColumnType): ColumnType {
  if (column.title !== BLOG_COLUMN_TITLE) {
    return column;
  }

  const recentItems: ColumnItemType[] = getRecentBlogPosts(RECENT_LIMIT).map(
    function mapRecentPost(post) {
      return {
        label: post.title,
        to: post.path,
      };
    },
  );

  return {
    ...column,
    items: [...recentItems, ...column.items],
  };
}

function Column({column}: {column: ColumnType}): ReactNode {
  const enriched = enrichBlogColumn(column);

  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        'col footer__col',
        enriched.className,
      )}>
      <div className="footer__title">{enriched.title}</div>
      <ul className="footer__items clean-list">
        {enriched.items.map(function renderItem(item, index) {
          return <ColumnLinkItem key={index} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({columns}: Props): ReactNode {
  return (
    <div className="row footer__links">
      {columns.map(function renderColumn(column, index) {
        return <Column key={index} column={column} />;
      })}
    </div>
  );
}
