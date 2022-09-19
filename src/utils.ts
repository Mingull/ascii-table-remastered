import { ColorsType } from "./Colors.js";

export type AsciiTableOptions = {
	title: string;
	titleAlign: AsciiTableAlignType;
	titleColor: ColorsType;
	headings: string[];
	headingsAlign: AsciiTableAlignType;
	headingsColor: ColorsType;
	prefix: string;
	suffix: string;
	border: AsciiTableBorder;
	enableBorder: boolean;
};

/**
 * @type AsciiTableBorder
 */
export type AsciiTableBorder = {
	edge: { left: string; right: string; rest: string } | string;
	fill: { top: string; bottom: string; center: string; rest: string } | string;
	top: { left: string; right: string } | string;
	bottom: { left: string; right: string } | string;
	color: ColorsType;
};

export type AsciiTableObject = {
	title: string;
	headings: string[];
	rows: unknown[];
};

export type AsciiTableAlignType = keyof typeof AsciiTableAlign;

/**
 *
 */
export enum AsciiTableAlign {
	LEFT = 0,
	CENTER = 1,
	RIGHT = 2,
}
