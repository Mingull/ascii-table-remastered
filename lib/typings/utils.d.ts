import Colors, { ColorsType } from "./Colors.js";
export declare type AsciiTableOptions = {
	title: string;
	titleAlign: AsciiTableAlignType;
	titleColor: ColorsType | Colors;
	prefix: string;
	suffix: string;
	border: AsciiTableBorder;
};
export declare type AsciiTableBorder = {
	edge: string;
	fill: string;
	top:
		| {
				left?: string;
				right?: string;
		  }
		| string;
	bottom:
		| {
				left?: string;
				right?: string;
		  }
		| string;
	color: string;
};
export declare type AsciiTableObject = {
	title: string;
	headings: string[];
	rows: unknown[];
};
export declare type AsciiTableAlignType = keyof typeof AsciiTableAlign;
export declare enum AsciiTableAlign {
	LEFT = 0,
	CENTER = 1,
	RIGHT = 2,
}
