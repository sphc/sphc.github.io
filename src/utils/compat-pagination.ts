import type { Page } from "astro";

/**
 * 生成与旧站一致的 Page 对象：
 * 第 1 页是 basePath，第 N 页是 `${basePath}/page/N/`。
 * 首页（basePath 为空）时第 1 页为 "/"。
 */
export function makePage<T>(
	items: T[],
	currentPage: number,
	pageSize: number,
	basePath = ""
): Page<T> {
	const lastPage = Math.max(1, Math.ceil(items.length / pageSize));
	const pageUrl = (p: number) =>
		p === 1 ? `${basePath}/` : `${basePath}/page/${p}/`;

	const start = (currentPage - 1) * pageSize;
	const data = items.slice(start, start + pageSize);

	return {
		data,
		currentPage,
		lastPage,
		url: {
			current: pageUrl(currentPage),
			prev: currentPage > 1 ? pageUrl(currentPage - 1) : undefined,
			next: currentPage < lastPage ? pageUrl(currentPage + 1) : undefined,
		},
		start,
		end: start + data.length,
		total: items.length,
		size: pageSize,
		props: {},
	} as unknown as Page<T>;
}

/** 生成 2..lastPage 的页码数组，用于 getStaticPaths */
export function pageNumbers(total: number, pageSize: number): number[] {
	const lastPage = Math.max(1, Math.ceil(total / pageSize));
	return Array.from({ length: Math.max(0, lastPage - 1) }, (_, i) => i + 2);
}

/** 按站点时区取年月，"2017-12" */
export function yearMonthOf(date: Date | string): { year: string; month: string } {
	const formatted = new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Shanghai",
		year: "numeric",
		month: "2-digit",
	}).format(new Date(date));
	const [year, month] = formatted.split("-");
	return { year, month };
}
