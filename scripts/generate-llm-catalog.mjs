#!/usr/bin/env node
/**
 * Builds machine-readable indexes for LLMs / MCP:
 *   static/llms.txt
 *   static/llms-full.txt
 *   static/catalog/docs.json
 *   static/catalog/blog.json
 *   static/catalog/changelog.json
 *
 * Run via `pnpm generate:catalog` (also hooked to prestart / prebuild).
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const siteUrl = 'https://riality.ir';

const TAG_LABELS = {
  feature: 'قابلیت',
  beta: 'آزمایشی',
  enhancement: 'بهبود',
  platform: 'پلتفرم',
};

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeUtf8(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), {recursive: true});
  fs.writeFileSync(filePath, contents, 'utf8');
}

function unquote(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/** Minimal YAML frontmatter parser for our MDX files. */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return {data: {}, body: content.trim()};
  }

  const data = {};
  const lines = match[1].split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) {
      i += 1;
      continue;
    }

    const key = kv[1];
    const raw = kv[2].trim();

    if (raw === '' || raw === '|' || raw === '>') {
      const items = [];
      i += 1;
      while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
        items.push(unquote(lines[i].replace(/^\s+-\s+/, '')));
        i += 1;
      }
      data[key] = items;
      continue;
    }

    if (raw.startsWith('[') && raw.endsWith(']')) {
      const inner = raw.slice(1, -1).trim();
      data[key] = inner
        ? inner.split(',').map((part) => unquote(part))
        : [];
      i += 1;
      continue;
    }

    data[key] = unquote(raw);
    i += 1;
  }

  const body = content.slice(match[0].length).trim();
  return {data, body};
}

function stripMdxForLlm(body) {
  return body
    .replace(/^import\s.+;$/gm, '')
    .replace(/^export\s.+;$/gm, '')
    .replace(new RegExp('\\{/\\*[\\s\\S]*?\\*/\\}', 'g'), '')
    .replace(
      /:::(tip|note|info|warning|caution|danger|important)[^\n]*\n([\s\S]*?):::/g,
      '$2',
    )
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function docUrlFromId(id, slug) {
  if (typeof slug === 'string' && slug.length > 0) {
    const normalized = slug.startsWith('/') ? slug.slice(1) : slug;
    return `${siteUrl}/docs/${normalized}`;
  }
  return `${siteUrl}/docs/${id}`;
}

function sidebarDocOrder() {
  const source = readUtf8(path.join(root, 'sidebars.ts'));
  const ids = [];
  const re = /'([a-z0-9-]+)'/g;
  let match;
  while ((match = re.exec(source)) !== null) {
    if (match[1] === 'category') continue;
    ids.push(match[1]);
  }
  // First match is sidebar id `helpSidebar` — drop non-doc tokens by intersecting files
  return ids;
}

function collectDocs() {
  const docsDir = path.join(root, 'docs');
  const files = fs
    .readdirSync(docsDir)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'));

  const byId = new Map();
  for (const file of files) {
    const id = file.replace(/\.mdx?$/, '');
    const {data, body} = parseFrontmatter(readUtf8(path.join(docsDir, file)));
    byId.set(id, {
      id,
      title: data.title ?? id,
      description: data.description ?? '',
      slug: data.slug,
      sidebarPosition:
        data.sidebar_position !== undefined
          ? Number(data.sidebar_position)
          : undefined,
      url: docUrlFromId(id, data.slug),
      path: `/docs/${typeof data.slug === 'string' && data.slug.startsWith('/') ? data.slug.slice(1) : data.slug || id}`,
      body: stripMdxForLlm(body),
    });
  }

  const order = sidebarDocOrder().filter((id) => byId.has(id));
  const orderedIds = [
    ...order,
    ...[...byId.keys()].filter((id) => !order.includes(id)).sort(),
  ];

  return orderedIds.map((id, index) => {
    const doc = byId.get(id);
    return {
      id: doc.id,
      title: doc.title,
      description: doc.description,
      url: doc.url,
      path: doc.path,
      order: index + 1,
      body: doc.body,
    };
  });
}

function collectBlog() {
  const blogDir = path.join(root, 'blog');
  const files = fs
    .readdirSync(blogDir)
    .filter(
      (name) =>
        (name.endsWith('.md') || name.endsWith('.mdx')) &&
        !name.startsWith('_'),
    );

  const posts = files.map((file) => {
    const {data} = parseFrontmatter(readUtf8(path.join(blogDir, file)));
    const dateFromName = file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
    const slug = data.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
    const date = data.date || dateFromName || '';
    return {
      title: data.title ?? slug,
      description: data.description ?? '',
      slug,
      date,
      tags: Array.isArray(data.tags) ? data.tags : [],
      authors: Array.isArray(data.authors)
        ? data.authors
        : data.authors
          ? [data.authors]
          : [],
      image: data.image,
      url: `${siteUrl}/blog/${slug}`,
      path: `/blog/${slug}`,
    };
  });

  posts.sort((a, b) => {
    if (a.date === b.date) return a.slug.localeCompare(b.slug);
    return a.date < b.date ? 1 : -1;
  });

  return posts;
}

function collectChangelog() {
  const entries = JSON.parse(
    readUtf8(path.join(root, 'src/data/changelogEntries.json')),
  );
  return entries.map((entry) => ({
    ...entry,
    tagLabel: TAG_LABELS[entry.tag] ?? entry.tag,
    url: `${siteUrl}/roadmap#${entry.id}`,
    path: `/roadmap#${entry.id}`,
  }));
}

function buildLlmsTxt({docs, blog, changelog}) {
  const lines = [
    '# ریالیتی',
    '> مربی پولی شخصی — راهنمای فارسی اپلیکیشن مدیریت مالی (آفلاین‌اول).',
    '',
    `سایت: ${siteUrl}`,
    'زبان: fa-IR (RTL)',
    '',
    'این فایل فهرست منابع قابل‌خواندن برای LLM و ابزارهای MCP است.',
    'برای متن کامل راهنماها: /llms-full.txt',
    'برای فهرست ساخت‌یافته: /catalog/docs.json ، /catalog/blog.json ، /catalog/changelog.json',
    '',
    '## Docs',
    '',
  ];

  for (const doc of docs) {
    const desc = doc.description ? `: ${doc.description}` : '';
    lines.push(`- [${doc.title}](${doc.url})${desc}`);
  }

  lines.push('', '## Blog', '');
  lines.push(`- [فهرست وبلاگ](${siteUrl}/blog)`);
  lines.push(`- [JSON Feed](${siteUrl}/blog/feed.json)`);
  lines.push(`- [RSS](${siteUrl}/blog/rss.xml)`);
  lines.push(`- [Atom](${siteUrl}/blog/atom.xml)`);
  lines.push(`- [کاتالوگ JSON](${siteUrl}/catalog/blog.json)`);
  lines.push('');

  for (const post of blog) {
    const desc = post.description ? `: ${post.description}` : '';
    lines.push(`- [${post.title}](${post.url})${desc}`);
  }

  lines.push('', '## Changelog / Roadmap', '');
  lines.push(`- [صفحه به‌روزرسانی‌ها](${siteUrl}/roadmap)`);
  lines.push(`- [کاتالوگ JSON](${siteUrl}/catalog/changelog.json)`);
  lines.push('');

  for (const entry of changelog) {
    const version = entry.version ? ` (${entry.version})` : '';
    lines.push(
      `- [${entry.title}](${entry.url}) — ${entry.tagLabel}${version}: ${entry.paragraphs[0] ?? ''}`,
    );
  }

  lines.push('', '## Machine indexes', '');
  lines.push(`- [llms.txt](${siteUrl}/llms.txt)`);
  lines.push(`- [llms-full.txt](${siteUrl}/llms-full.txt) — متن کامل docs`);
  lines.push(`- [docs catalog](${siteUrl}/catalog/docs.json)`);
  lines.push(`- [blog catalog](${siteUrl}/catalog/blog.json)`);
  lines.push(`- [changelog catalog](${siteUrl}/catalog/changelog.json)`);
  lines.push(`- [sitemap](${siteUrl}/sitemap.xml)`);
  lines.push('');

  return `${lines.join('\n')}\n`;
}

function buildLlmsFullTxt(docs) {
  const parts = [
    '# ریالیتی — متن کامل راهنما',
    '',
    `منبع: ${siteUrl}`,
    'این فایل از docs تولید شده و برای بارگذاری یک‌جای زمینهٔ LLM است.',
    '',
  ];

  for (const doc of docs) {
    parts.push(`# ${doc.title}`);
    parts.push('');
    parts.push(`URL: ${doc.url}`);
    if (doc.description) {
      parts.push(`Description: ${doc.description}`);
    }
    parts.push('');
    parts.push(doc.body);
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  return `${parts.join('\n').trim()}\n`;
}

function main() {
  const docs = collectDocs();
  const blog = collectBlog();
  const changelog = collectChangelog();
  const generatedAt = new Date().toISOString();

  const docsCatalog = {
    site: siteUrl,
    generatedAt,
    count: docs.length,
    docs: docs.map(({body, ...rest}) => rest),
  };

  const blogCatalog = {
    site: siteUrl,
    generatedAt,
    count: blog.length,
    posts: blog,
  };

  const changelogCatalog = {
    site: siteUrl,
    generatedAt,
    page: `${siteUrl}/roadmap`,
    count: changelog.length,
    entries: changelog,
  };

  writeUtf8(
    path.join(root, 'static/catalog/docs.json'),
    `${JSON.stringify(docsCatalog, null, 2)}\n`,
  );
  writeUtf8(
    path.join(root, 'static/catalog/blog.json'),
    `${JSON.stringify(blogCatalog, null, 2)}\n`,
  );
  writeUtf8(
    path.join(root, 'static/catalog/changelog.json'),
    `${JSON.stringify(changelogCatalog, null, 2)}\n`,
  );
  writeUtf8(
    path.join(root, 'static/llms.txt'),
    buildLlmsTxt({docs, blog, changelog}),
  );
  writeUtf8(path.join(root, 'static/llms-full.txt'), buildLlmsFullTxt(docs));

  console.log(
    `Generated LLM catalogs: ${docs.length} docs, ${blog.length} posts, ${changelog.length} changelog entries`,
  );
}

main();
