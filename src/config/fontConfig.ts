/**
 * 字体配置（统一入口）
 *
 * 站点使用系统字体栈，不通过 Astro Font API 下载远程字体，
 * 避免构建期依赖 Google Fonts / Fontsource CDN。
 */
import type { FontDefinition, FontSelectionConfig } from "@/types/fontConfig";

export const fontsList: FontDefinition[] = [];

// ─── 字体选择与区域覆盖 ─────────────────────────────────────
export const fontConfig: FontSelectionConfig = {
	// 是否启用自定义字体功能
	enable: false,
	// 使用 "system" 表示系统字体（不加载任何自定义字体）
	selected: ["system"],

	// 各区域独立字体设置，留空则使用全局 selected 字体
	bannerTitleFont: "",
	bannerSubtitleFont: "",
	navbarTitleFont: "",
	// 代码块字体，留空使用主题内置等宽字体栈
	codeFont: "",

	subsetFonts: {},
};
