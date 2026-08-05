import catalog from '@site/static/catalog/blog.json';

export type RecentBlogPost = {
  title: string;
  description: string;
  slug: string;
  date: string;
  path: string;
  image?: string;
};

export function getRecentBlogPosts(limit = 5): RecentBlogPost[] {
  return catalog.posts.slice(0, limit).map(function mapPost(post) {
    return {
      title: post.title,
      description: post.description,
      slug: post.slug,
      date: post.date,
      path: post.path,
      image: post.image,
    };
  });
}
