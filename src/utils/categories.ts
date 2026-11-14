import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";

/**
 * Category URL segment, matching the legacy Hexo slug rule:
 * `PAT题解[乙级]` -> `PAT题解-乙级`.
 */
export function categorySlug(name: string): string {
  return name.replace(/\[/g, "-").replace(/\]/g, "");
}

export function getUniqueCategories(posts: CollectionEntry<"posts">[]) {
  const counts = new Map<string, { name: string; count: number }>();

  for (const post of posts.filter(postFilter)) {
    const name = post.data.category;
    if (!name) continue;
    const slug = categorySlug(name);
    const entry = counts.get(slug);
    if (entry) entry.count += 1;
    else counts.set(slug, { name, count: 1 });
  }

  return [...counts.entries()].map(([slug, value]) => ({
    slug,
    name: value.name,
    count: value.count,
  }));
}
