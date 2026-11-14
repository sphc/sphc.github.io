export function pageCount(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

export function slicePage<T>(items: T[], page: number, pageSize: number): T[] {
  return items.slice((page - 1) * pageSize, page * pageSize);
}

/**
 * Builds a pagination URL following the legacy Hexo layout:
 * page 1 is the section root, page N >= 2 is `<base>/page/N/`.
 */
export function pageHref(basePath: string, page: number): string {
  const base = basePath.replace(/\/+$/, "");
  if (page <= 1) return base === "" ? "/" : `${base}/`;
  return `${base}/page/${page}/`;
}
