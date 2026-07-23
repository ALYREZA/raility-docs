import React, {type ReactNode} from 'react';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';

/**
 * Blog post header without the author avatar/name block.
 * All posts are from the Riality team — the logo+name row added noise on the list.
 */
export default function BlogPostItemHeader(): ReactNode {
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
    </header>
  );
}
