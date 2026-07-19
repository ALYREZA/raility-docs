import type {ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

function useSyntheticTitle(): string | null {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

function useDocDescription(): string | null {
  const {frontMatter} = useDoc();
  if (frontMatter.hide_description) {
    return null;
  }
  if (typeof frontMatter.description !== 'string') {
    return null;
  }
  return frontMatter.description;
}

type DocItemContentProps = {
  children: ReactNode;
};

function DocItemContent({children}: DocItemContentProps): ReactNode {
  const syntheticTitle = useSyntheticTitle();
  const description = useDocDescription();

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {(syntheticTitle || description) && (
        <header className="docItemHeader">
          {syntheticTitle && (
            <Heading as="h1" className="docItemTitle">
              {syntheticTitle}
            </Heading>
          )}
          {description && (
            <div className="docItemDescription">{description}</div>
          )}
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}

export default DocItemContent;
