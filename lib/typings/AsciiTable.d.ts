import { AsciiTableAlignType, AsciiTableBorder, AsciiTableObject, AsciiTableOptions } from "./utils.js";
/**
 * Create table with ascii characters to output in console
 * @author Mingull
 * @since 0.0.1
 */
declare class AsciiTable {
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
     * Initialize a new table
     * @param {string} title Title of the table
     * @param {AsciiTableOptions|undefined} options options to customize the table
     */
    constructor(title: string, options?: AsciiTableOptions);
    /**
     * statically make a new table instance
     * @param {string} title Table Title
     * @param {AsciiTableOptions} options Table options
     * @static
     * @returns {AsciiTable}
     */
    static factory(title: string, options: AsciiTableOptions): AsciiTable;
    private align;
    private alignLeft;
    private alignCenter;
    private alignRight;
    private alignAuto;
    private arrayFill;
    private reset;
    /**
     * Set the border of the table
     * @param {AsciiTableBorder | undefined} border border to be set
     * @returns {AsciiTable}
     */
    setBorder(border?: AsciiTableBorder): this;
    /**
     * Remove the border of the table
     * @returns {this}
     */
    removeBorder(): this;
    /**
     * Align a row to LEFT, CENTER, RIGHT
     * @param {number} row row to align
     * @param {AsciiTableAlign} direction the direction to align
     * @returns {this}
     */
    setRowAlign(row: number, direction: AsciiTableAlignType): this;
    /**
     * Align all rows to LEFT, CENTER, RIGHT
     * @param {AsciiTableAlign} direction the direction to align
     * @returns {this}
     */
    setAlign(direction: AsciiTableAlignType): this;
    setTitle(title: string): this;
    getTitle(): string;
    setTitleAlign(direction: AsciiTableAlignType): this;
    sort(method: ((a: any, b: any) => number) | undefined): this;
    sortColumn(idx: string | number, method: (a: any[], b: any[]) => number): this;
    setHeading(...columnHeadings: string[]): this;
    getHeading(): string[];
    setHeadingAlign(dir: number): this;
    addRow(...row: any[]): this;
    getRows(): any[];
    addRowMatrix(...rows: any[]): this;
    addData(data: string | any[], rowCallback: (a: any) => any, asMatrix: any): this;
    clearRows(): this;
    setJustify(val: boolean): this;
    toJSON(): {
        title: string;
        heading: string[];
        rows: any[];
    };
    fromJSON(obj: AsciiTableObject): this;
    /**
     * Render the table with `console.log()`
     * @returns {string} the table to output
     */
    render(): string;
    private _separator;
    private _rowSeparator;
    private _renderTitle;
    private _renderRow;
}
export default AsciiTable;
