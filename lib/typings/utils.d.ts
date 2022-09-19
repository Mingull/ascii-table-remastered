import { ColorsType } from "./Colors.js";
export declare type AsciiTableOptions = {
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
export declare type AsciiTableBorder = {
    edge: {
        left: string;
        right: string;
        rest: string;
    } | string;
    fill: {
        top: string;
        bottom: string;
        center: string;
        rest: string;
    } | string;
    top: {
        left: string;
        right: string;
    } | string;
    bottom: {
        left: string;
        right: string;
    } | string;
    color: ColorsType;
};
export declare type AsciiTableObject = {
    title: string;
    headings: string[];
    rows: unknown[];
};
export declare type AsciiTableAlignType = keyof typeof AsciiTableAlign;
/**
 *
 */
export declare enum AsciiTableAlign {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2
}
