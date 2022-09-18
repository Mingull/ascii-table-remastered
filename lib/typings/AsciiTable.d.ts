import { AsciiTableAlignType, AsciiTableObject, AsciiTableOptions } from "./utils.js";
export default class AsciiTable {
    private _headings;
    private _headingAlign;
    private _rows;
    private _title;
    private _titleAlign;
    private _aligns;
    private _edge;
    private _fill;
    private _top;
    private _bottom;
    private _border;
    private _spacing;
    private _maxCells;
    private _maxCols;
    private _justify;
    options: AsciiTableOptions;
    /**
     *
     * @param {string} title
     * @param {AsciiTableOptions} options
     */
    constructor(title: string, options: AsciiTableOptions);
    /**
     * create new table instance
     * @param {string} title Table Title
     * @param {AsciiTableOptions} options Table options
     * @static
     * @returns
     */
    static factory(title: string, options: AsciiTableOptions): AsciiTable;
    align(direction: AsciiTableAlignType, str: string, length: number, pad: string): string;
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
    setRowAlign(row: number, direction: AsciiTableAlignType): this;
    setAlign(direction: AsciiTableAlignType): this;
    setTitle(title: string): this;
    getTitle(): string;
    setTitleAlign(direction: AsciiTableAlignType): this;
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
        title: string;
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
