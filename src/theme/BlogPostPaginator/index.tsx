import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import type {Props} from '@theme/BlogPostPaginator';

export default function BlogPostPaginator(props: Props): ReactNode {
  const {nextItem, prevItem} = props;

  return (
    <nav
      className="pagination-nav docusaurus-mt-lg blogPostPaginator"
      aria-label={translate({
        id: 'theme.blog.post.paginator.navAriaLabel',
        message: 'کنترل پست‌های صفحه وبلاگ',
        description: 'The ARIA label for the blog posts pagination',
      })}>
      {prevItem && (
        <PaginatorNavLink
          permalink={prevItem.permalink}
          title={prevItem.title}
          subLabel="پست قبلی"
        />
      )}
      {nextItem && (
        <PaginatorNavLink
          permalink={nextItem.permalink}
          title={nextItem.title}
          subLabel="پست بعدی"
          isNext
        />
      )}
    </nav>
  );
}
