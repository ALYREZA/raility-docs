import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import type {Props} from '@theme/BlogLayout';

export default function BlogLayout(props: Props): ReactNode {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = Boolean(sidebar?.items.length);
  const hasToc = Boolean(toc);

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--lg">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx('col', {
              'col--6': hasSidebar && hasToc,
              'col--7': hasSidebar && !hasToc,
              'col--9 col--offset-1': !hasSidebar,
            })}>
            {children}
          </main>
          {toc && <div className="col col--3 blogPostTocCol">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
