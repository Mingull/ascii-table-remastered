import { AsciiTableOptions } from "./utils";
export default class AsciiTable {
    private _heading;
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
    options: AsciiTableOptions;
    static LEFT: number;
    static CENTER: number;
    static RIGHT: number;
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
    reset(title: string): this;
    setBorder(edge: any, fill: any, top: any, bottom: any): this;
    removeBorder(): this;
    setAlign(idx: any, dir: any): this;
    setTitle(title: any): this;
    getTitle(): string;
    setTitleAlign(dir: any): this;
    sort(method: any): this;
    sortColumn(idx: any, method: any): this;
    setHeading(...columnHeadings: any[]): this;
    getHeading(): string;
    setHeadingAlign(dir: any): this;
    addRow(...row: any[]): this;
    getRows(): any[];
    addRowMatrix(rows: any): this;
    addData(data: any, rowCallback: any, asMatrix: any): this;
    clearRows(): this;
    setJustify(val: any): this;
    toJSON(): {
        title: string;
        heading: string;
        rows: any[];
    };
    fromJSON(obj: any): this;
    render(): string;
    _separator(len: any, sep: any): string;
    _rowSeparator(): string;
    _renderTitle(len: any): string;
    _renderRow(row: any, str: any, align: any): string;
}
