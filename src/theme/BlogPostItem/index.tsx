import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import type {Props} from '@theme/BlogPostItem';

function useContainerClassName(): string | undefined {
  const {isBlogPostPage} = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

function useBlogPostCoverImage(): string | undefined {
  const {assets, metadata} = useBlogPost();
  const frontMatterImage = metadata.frontMatter.image;
  const baseUrlImage = useBaseUrl(
    typeof frontMatterImage === 'string' ? frontMatterImage : '',
  );

  if (assets.image) {
    return assets.image;
  }
  if (typeof frontMatterImage === 'string' && frontMatterImage.length > 0) {
    return baseUrlImage;
  }
  return undefined;
}

function BlogPostItemCover(): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const image = useBlogPostCoverImage();

  if (!image) {
    return null;
  }

  const img = (
    <img
      className="blogPostCoverImage"
      src={image}
      alt={metadata.title}
      loading={isBlogPostPage ? 'eager' : 'lazy'}
    />
  );

  if (isBlogPostPage) {
    return <div className="blogPostCover">{img}</div>;
  }

  return (
    <Link
      className="blogPostCover"
      to={metadata.permalink}
      tabIndex={-1}
      aria-hidden="true">
      {img}
    </Link>
  );
}

export default function BlogPostItem({children, className}: Props): ReactNode {
  const containerClassName = useContainerClassName();

  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemCover />
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
