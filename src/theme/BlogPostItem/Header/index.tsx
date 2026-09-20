import type {ReactNode} from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Link from '@docusaurus/Link';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';

function BlogListCover(): ReactNode {
  const {assets, metadata, isBlogPostPage} = useBlogPost();
  if (isBlogPostPage) {
    return null;
  }

  const image = assets.image ?? metadata.frontMatter.image;
  if (typeof image !== 'string' || image.length === 0) {
    return null;
  }

  return (
    <Link className="blogListCover" to={metadata.permalink} tabIndex={-1}>
      <img src={image} alt="" />
    </Link>
  );
}

function BlogPostItemHeader(): ReactNode {
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogListCover />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors />
    </header>
  );
}

export default BlogPostItemHeader;
