import type { CollectionEntry } from "astro:content";
import dayjs, { type Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import config from "@/config";
import { resolveTimezone } from "./resolveTimezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/** Publication date of a post, resolved in its own (or the site) timezone. */
export function postDate(post: CollectionEntry<"posts">): Dayjs {
  return dayjs(post.data.pubDatetime).tz(
    resolveTimezone(post.data.timezone ?? config.site.timezone)
  );
}

/** All `YYYY` / `MM` buckets that have at least one post, newest first. */
export function getArchiveBuckets(posts: CollectionEntry<"posts">[]) {
  const years = new Map<string, Map<string, CollectionEntry<"posts">[]>>();

  for (const post of posts) {
    const date = postDate(post);
    const year = date.format("YYYY");
    const month = date.format("MM");
    if (!years.has(year)) years.set(year, new Map());
    const months = years.get(year)!;
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push(post);
  }

  return [...years.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, months]) => ({
      year,
      posts: [...months.values()].flat(),
      months: [...months.entries()]
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([month, monthPosts]) => ({ month, posts: monthPosts })),
    }));
}
