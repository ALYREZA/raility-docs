import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeader from '@theme-original/BlogPostItem/Header';

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

export default function BlogPostItemHeaderWrapper(): ReactNode {
  return (
    <>
      <BlogPostItemCover />
      <BlogPostItemHeader />
    </>
  );
}
