export default class AsciiTable {
    _headings = [];
    _rows = [];
    _title = "";
    _aligns = [];
    _edge = "|";
    _fill = "-";
    _top = ".";
    _bottom = "'";
    _border = true;
    _spacing = 1;
    _titleAlign = AsciiTableAlign.CENTER;
    _maxCells = 0;
    _colMaxes = [];
    _headingAlign = AsciiTableAlign.LEFT;
    _justify = false;
    options;
    constructor(title, options) {
        this.options = options || { prefix: "" };
        this.reset(title);
    }
    /**
     * create new table instance
     * @param {string} title Table Title
     * @param {AsciiTableOptions} options Table options
     * @deprecated
     * @returns
     */
    factory(title, options) {
        return new AsciiTable(title, options);
    }
    align(dir, str, length, pad) {
        if (dir === AsciiTableAlign.LEFT)
            return this.alignLeft(str, length, pad);
        if (dir === AsciiTableAlign.RIGHT)
            return this.alignRight(str, length, pad);
        if (dir === AsciiTableAlign.CENTER)
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
        if (!length || length < 0)
            return "";
        var alen = length + 1 - str.length;
        if (alen <= 0)
            return str;
        return Array(length + 1 - str.length).join(pad) + str;
    }
    alignAuto(str, length, pad = " ") {
        var type = Object.prototype.toString.call(str);
        pad || (pad = " ");
        length = +length;
        if (type !== "[object String]") {
            str = str.toString();
        }
        if (str.length < length) {
            switch (type) {
                case "[object Number]":
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
        this._title = "";
        this._titleAlign = AsciiTableAlign.CENTER;
        this._rows = [];
        this._maxCells = 0;
        this._aligns = [];
        this._colMaxes = [];
        this._spacing = 1;
        this._headings = [];
        this._headingAlign = AsciiTableAlign.CENTER;
        this.setBorder();
        if (typeof title === "string") {
            this._title = title;
        }
        else if (typeof title === "object") {
            this.fromJSON(title);
        }
        return this;
    }
    setBorder(edge, fill, top, bottom) {
        this._border = true;
        if (arguments.length === 1) {
            fill = top = bottom = edge;
        }
        this._edge = edge || "|";
        this._fill = fill || "-";
        this._top = top || ".";
        this._bottom = bottom || "'";
        return this;
    }
    removeBorder() {
        this._border = false;
        this._edge = " ";
        this._fill = " ";
        return this;
    }
    setAlign(idx, dir) {
        this._aligns[idx] = dir;
        return this;
    }
    setTitle(title) {
        this._title = title;
        return this;
    }
    getTitle() {
        return this._title;
    }
    setTitleAlign(dir) {
        this._titleAlign = dir;
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
        return this._headings.slice();
    }
    setHeadingAlign(dir) {
        this._headingAlign = dir;
        return this;
    }
    addRow(...row) {
        if (arguments.length > 1 || toString.call(row) !== "[object Array]") {
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
        this._colMaxes = [];
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
        this._colMaxes = max;
        justify = this._justify ? Math.max.apply(null, max) : 0;
        // Get
        max.forEach((x) => {
            total += justify ? justify : x + this._spacing;
        });
        justify && (total += max.length);
        total -= this._spacing;
        // Heading
        border && body.push(this._separator(total - mLen + 1, this._top));
        if (this._title) {
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
        border && body.push(this._separator(total - mLen + 1, this._bottom));
        var prefix = this.options.prefix || "";
        return prefix + body.join("\n" + prefix);
    }
    _separator(len, sep) {
        if (typeof sep === "object") {
            return sep.left + this.alignRight(sep.right, len, this._fill);
        }
        sep || (sep = this._edge);
        return sep + this.alignRight(sep, len, this._fill);
    }
    _rowSeparator() {
        var blanks = this.arrayFill(this._maxCells, this._fill);
        return this._renderRow(blanks, this._fill);
    }
    _renderTitle(len) {
        var title = " " + this._title + " ";
        var str = this.align(this._titleAlign, title, len - 1, " ");
        return this._edge + str + this._edge;
    }
    _renderRow(row, str, align) {
        var tmp = [""];
        var max = this._colMaxes;
        for (var k = 0; k < this._maxCells; k++) {
            var cell = row[k];
            var just = this._justify ? Math.max.apply(null, max) : max[k];
            // var pad = k === this._maxCells - 1 ? just : just + this._spacing;
            var pad = just;
            var cAlign = this._aligns[k];
            var use = align;
            var method = "alignAuto";
            if (typeof align === "undefined")
                use = cAlign;
            if (use === AsciiTableAlign.LEFT)
                method = "alignLeft";
            if (use === AsciiTableAlign.CENTER)
                method = "alignCenter";
            if (use === AsciiTableAlign.RIGHT)
                method = "alignRight";
            tmp.push(this[method](cell, pad, str));
        }
        var front = tmp.join(str + this._edge + str);
        front = front.substring(1, front.length);
        return front + str + this._edge;
    }
}
export var AsciiTableAlign;
(function (AsciiTableAlign) {
    AsciiTableAlign[AsciiTableAlign["LEFT"] = 0] = "LEFT";
    AsciiTableAlign[AsciiTableAlign["CENTER"] = 1] = "CENTER";
    AsciiTableAlign[AsciiTableAlign["RIGHT"] = 2] = "RIGHT";
})(AsciiTableAlign || (AsciiTableAlign = {}));
