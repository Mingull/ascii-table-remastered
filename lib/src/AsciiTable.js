import { AsciiTableAlign, } from "./utils.js";
import Colors from "./Colors.js";
import _ from "lodash";
/**
 * Create table with ascii characters to output in console
 * @author Mingull
 * @since 0.0.1
 */
class AsciiTable {
    _headings = [];
    _headingAlign = AsciiTableAlign.LEFT;
    _rows = [];
    _title = "";
    _titleAlign = AsciiTableAlign.CENTER;
    _aligns = [];
    _edge = "|";
    _fill = "-";
    _top = ".";
    _bottom = "'";
    _border = true;
    _spacing = 1;
    _maxCells = 0;
    _maxCols = [];
    _justify = false;
    options;
    /**
     * Initialize a new table
     * @param {string} title Title of the table
     * @param {AsciiTableOptions|undefined} options options to customize the table
     */
    constructor(title, options) {
        this.options = {
            title: "Default Table",
            titleAlign: "CENTER",
            titleColor: "Blue",
            headings: ["#", "name", "age"],
            headingsAlign: "CENTER",
            headingsColor: "Cyan",
            prefix: "",
            suffix: "",
            border: {
                edge: { left: "├", right: "┤", rest: "│" },
                fill: "─",
                top: { left: "┌", right: "┐" },
                bottom: { left: "└", right: "┘" },
                color: "Red",
            },
            enableBorder: true,
        };
        _.merge(this.options, options);
        this.reset(title);
    }
    /**
     * statically make a new table instance
     * @param {string} title Table Title
     * @param {AsciiTableOptions} options Table options
     * @static
     * @returns {AsciiTable}
     */
    static factory(title, options) {
        return new AsciiTable(title, options);
    }
    align(direction, str, length, pad) {
        if (direction === "LEFT")
            return this.alignLeft(str, length, pad);
        if (direction === "RIGHT")
            return this.alignRight(str, length, pad);
        if (direction === "CENTER")
            return this.alignCenter(str, length, pad);
        return this.alignAuto(str, length, pad);
    }
    alignLeft(str, length, pad = " ") {
        if (!length || length < 0)
            return "";
        var aLength = length + 1 - str.length;
        if (aLength <= 0)
            return str;
        return str + Array(length + 1 - str.length).join(pad);
    }
    alignCenter(str, length, pad = " ") {
        if (!length || length < 0)
            return "";
        var strLength = str.length;
        var half = Math.floor(length / 2 - strLength / 2);
        var odds = Math.abs((strLength % 2) - (length % 2));
        var length = str.length;
        return this.alignRight("", half, pad) + str + this.alignLeft("", half + odds, pad);
    }
    alignRight(str, length, pad = " ") {
        const type = typeof str;
        if (type !== "string") {
            str = str.toString();
        }
        if (!length || length < 0)
            return "";
        var aLength = length + 1 - str.length;
        if (aLength <= 0)
            return str;
        return Array(length + 1 - str.length).join(pad) + str;
    }
    alignAuto(str, length, pad = " ") {
        const type = typeof str;
        length = +length;
        if (type !== "string") {
            str = str.toString();
        }
        if (str.length < length) {
            switch (type) {
                case "number":
                    return this.alignRight(str, length, pad);
                default:
                    return this.alignLeft(str, length, pad);
            }
        }
        return str;
    }
    arrayFill(length, fill) {
        var arr = new Array(length);
        for (var i = 0; i !== length; i++) {
            arr[i] = fill;
        }
        return arr;
    }
    reset(title) {
        this.options.title = "";
        this._rows = [];
        this._maxCells = 0;
        this._aligns = [];
        this._maxCols = [];
        this._spacing = 1;
        this._headings = [];
        this._headingAlign = AsciiTableAlign.CENTER;
        this.setBorder();
        if (typeof title === "string") {
            this.options.title = title;
        }
        else if (typeof title === "object") {
            this.fromJSON(title);
        }
        return this;
    }
    /**
     * Set the border of the table
     * @param {AsciiTableBorder | undefined} border border to be set
     * @returns {AsciiTable}
     */
    setBorder(border) {
        this.options.enableBorder = true;
        if (!border)
            return this;
        this.options.border.edge = border.edge || "|";
        this.options.border.fill = border.fill || "-";
        this.options.border.top = border.top || ".";
        this.options.border.bottom = border.bottom || "'";
        return this;
    }
    /**
     * Remove the border of the table
     * @returns {this}
     */
    removeBorder() {
        this.options.enableBorder = false;
        this.options.border.edge = " ";
        this.options.border.fill = " ";
        return this;
    }
    /**
     * Align a row to LEFT, CENTER, RIGHT
     * @param {number} row row to align
     * @param {AsciiTableAlign} direction the direction to align
     * @returns {this}
     */
    setRowAlign(row, direction) {
        this._aligns[row] = AsciiTableAlign[direction];
        return this;
    }
    /**
     * Align all rows to LEFT, CENTER, RIGHT
     * @param {AsciiTableAlign} direction the direction to align
     * @returns {this}
     */
    setAlign(direction) {
        for (var i = 0; i < this._rows.length; i++) {
            this._aligns.push(AsciiTableAlign[direction]);
        }
        return this;
    }
    setTitle(title) {
        this.options.title = title;
        return this;
    }
    getTitle() {
        return this.options.title;
    }
    setTitleAlign(direction) {
        this.options.titleAlign = direction;
        return this;
    }
    sort(method) {
        this._rows.sort(method);
        return this;
    }
    sortColumn(idx, method) {
        this._rows.sort((a, b) => {
            return method(a[idx], b[idx]);
        });
        return this;
    }
    setHeading(...columnHeadings) {
        if (arguments.length > 1 || !Array.isArray(columnHeadings)) {
            columnHeadings = Array.prototype.slice.call(arguments);
        }
        this._headings = columnHeadings;
        return this;
    }
    getHeading() {
        return this.options.headings.slice();
    }
    setHeadingAlign(dir) {
        this._headingAlign = dir;
        return this;
    }
    addRow(...row) {
        if (arguments.length > 1 || Object.prototype.toString.call(row) !== "[object Array]") {
            row = Array.prototype.slice.call(arguments);
        }
        // if (this._maxCells == undefined) {
        // 	this._maxCells = 0;
        // }
        this._maxCells = Math.max(this._maxCells | 0, row.length);
        this._rows.push(row);
        return this;
    }
    getRows() {
        return this._rows.slice().map(function (row) {
            return row.slice();
        });
    }
    addRowMatrix(...rows) {
        for (var i = 0; i < rows.length; i++) {
            this.addRow(rows[i]);
        }
        return this;
    }
    addData(data, rowCallback, asMatrix) {
        if (Object.prototype.toString.call(data) !== "[object Array]") {
            return this;
        }
        for (var index = 0, limit = data.length; index < limit; index++) {
            var row = rowCallback(data[index]);
            if (asMatrix) {
                this.addRowMatrix(row);
            }
            else {
                this.addRow(row);
            }
        }
        return this;
    }
    clearRows() {
        this._rows = [];
        this._maxCells = 0;
        this._maxCols = [];
        return this;
    }
    setJustify(val) {
        arguments.length === 0 && (val = true);
        this._justify = !!val;
        return this;
    }
    toJSON() {
        return {
            title: this.getTitle(),
            heading: this.getHeading(),
            rows: this.getRows(),
        };
    }
    fromJSON(obj) {
        return this.reset()
            .setTitle(obj.title)
            .setHeading(...obj.headings)
            .addRowMatrix(obj.rows);
    }
    /**
     * Render the table with `console.log()`
     * @returns {string} the table to output
     */
    render() {
        var body = [];
        var mLen = this._maxCells;
        var max = this.arrayFill(mLen, 0);
        var total = mLen * 3;
        var rows = this._rows;
        var justify;
        var border = this._border;
        var all = this._headings ? [this._headings].concat(rows) : rows;
        // Calculate max table cell lengths across all rows
        for (var i = 0; i < all.length; i++) {
            var row = all[i];
            for (var k = 0; k < mLen; k++) {
                var cell = row[k];
                max[k] = Math.max(max[k], cell ? cell.toString().length : 0);
            }
        }
        this._maxCols = max;
        justify = this._justify ? Math.max.apply(null, max) : 0;
        // Get
        max.forEach((x) => {
            total += justify ? justify : x + this._spacing;
        });
        justify && (total += max.length);
        total -= this._spacing;
        // Heading
        border && body.push(this._separator(total - mLen + 1, this.options.border.top));
        if (this.options.title) {
            body.push(this._renderTitle(total - mLen + 1));
            border && body.push(this._separator(total - mLen + 1));
        }
        if (this._headings) {
            body.push(this._renderRow(this._headings, " ", this._headingAlign));
            body.push(this._rowSeparator());
            // body.push(this._rowSeparator(mLen, this._fill));
        }
        for (var i = 0; i < this._rows.length; i++) {
            body.push(this._renderRow(this._rows[i], " "));
        }
        border && body.push(this._separator(total - mLen + 1, this.options.border.bottom));
        var prefix = this.options.prefix || "";
        var suffix = this.options.suffix || "";
        return prefix + body.join(suffix + "\n" + prefix) + suffix;
    }
    _separator(len, sep) {
        if (typeof sep === "object") {
            if (typeof this.options.border.fill !== "object")
                return sep.left + this.alignRight(sep.right, len, this.options.border.fill);
            else {
                return sep.left + this.alignRight(sep.right, len, this.options.border.fill.rest);
            }
        }
        sep || (sep = this.options.border.edge);
        if (typeof sep === "object") {
            if (typeof this.options.border.fill !== "object")
                return sep.left + this.alignRight(sep.right, len, this.options.border.fill);
            else {
                return sep.left + this.alignRight(sep.right, len, this.options.border.fill.rest);
            }
        }
        if (typeof this.options.border.fill !== "object")
            return sep + this.alignRight(sep, len, this.options.border.fill);
    }
    _rowSeparator() {
        var blanks = this.arrayFill(this._maxCells, this._fill);
        return this._renderRow(blanks, this._fill);
    }
    _renderTitle(len) {
        var coloredTitle = Colors[this.options.titleColor].colorize(this.options.title);
        var title = " " + coloredTitle + " ";
        var str = this.align(this.options.titleAlign, title, len + coloredTitle.length - this.options.title.length - 1, " ");
        return this._edge + str + this._edge;
    }
    _renderRow(row, str, align) {
        var tmp = [""];
        var max = this._maxCols;
        for (var k = 0; k < this._maxCells; k++) {
            var cell = row[k];
            var justified = this._justify ? Math.max.apply(null, max) : max[k];
            // var pad = k === this._maxCells - 1 ? just : just + this._spacing;
            const cAlign = this._aligns[k];
            var useAlign = align;
            var method = "alignAuto";
            if (typeof align === "undefined")
                useAlign = cAlign;
            if (useAlign === AsciiTableAlign.LEFT)
                method = "alignLeft";
            if (useAlign === AsciiTableAlign.CENTER)
                method = "alignCenter";
            if (useAlign === AsciiTableAlign.RIGHT)
                method = "alignRight";
            tmp.push(this[method](cell, justified, str));
        }
        var front;
        if (typeof this.options.border.edge !== "object") {
            front = tmp.join(str + this.options.border.edge + str);
        }
        else {
            front = tmp.join(str + this.options.border.edge.rest + str);
        }
        front = front.substring(1, front.length);
        return front + str + this._edge;
    }
}
export default AsciiTable;
