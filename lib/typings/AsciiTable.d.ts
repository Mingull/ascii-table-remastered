import { AsciiTableObject, AsciiTableOptions } from "./utils";
export default class AsciiTable {
    private _headings;
    private _rows;
    private _title;
    private _aligns;
    private _edge;
    private _fill;
    private _top;
    private _bottom;
    private _border;
    private _spacing;
    private _titleAlign;
    private _maxCells;
    private _colMaxes;
    private _headingAlign;
    private _justify;
    options: AsciiTableOptions;
    constructor(title: string, options: AsciiTableOptions);
    /**
     * create new table instance
     * @param {string} title Table Title
     * @param {AsciiTableOptions} options Table options
     * @deprecated
     * @returns
     */
    factory(title: string, options: AsciiTableOptions): AsciiTable;
    align(dir: number, str: string, length: number, pad: string): string;
    alignLeft(str: string, length: number, pad?: string): string;
    alignCenter(str: string, length: number, pad?: string): string;
    alignRight(str: string, length: number, pad?: string): string;
    alignAuto(str: string, length: number, pad?: string): string;
    arrayFill(length: number, fill: string | number): any[];
    reset(title?: string | AsciiTableObject): this;
    setBorder(edge?: string, fill?: string, top?: {
        left?: string;
        right?: string;
    } | string, bottom?: {
        left?: string;
        right?: string;
    } | string): this;
    removeBorder(): this;
    setAlign(idx: number, dir: number): this;
    setTitle(title: string): this;
    getTitle(): string | AsciiTableObject;
    setTitleAlign(dir: number): this;
    sort(method: ((a: any, b: any) => number) | undefined): this;
    sortColumn(idx: string | number, method: (a: any[], b: any[]) => number): this;
    setHeading(...columnHeadings: string[]): this;
    getHeading(): any[];
    setHeadingAlign(dir: number): this;
    addRow(...row: any[]): this;
    getRows(): any[];
    addRowMatrix(...rows: any[]): this;
    addData(data: string | any[], rowCallback: (a: any) => any, asMatrix: any): this;
    clearRows(): this;
    setJustify(val: boolean): this;
    toJSON(): {
        title: string | AsciiTableObject;
        heading: any[];
        rows: any[];
    };
    fromJSON(obj: AsciiTableObject): this;
    render(): string;
    private _separator;
    private _rowSeparator;
    private _renderTitle;
    private _renderRow;
}
export declare enum AsciiTableAlign {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2
}
