import {
	AsciiTableAlign,
	AsciiTableAlignType,
	AsciiTableBorder,
	AsciiTableObject,
	AsciiTableOptions,
} from "./utils.js";
import Colors from "./Colors.js";
import _ from "lodash";

/**
 * Create table with ascii characters to output in console
 * @author Mingull
 * @since 0.0.1
 */
class AsciiTable {
	private _headings: any[] = [];
	private _headingAlign: AsciiTableAlign = AsciiTableAlign.LEFT;
	private _rows: any[] = [];
	private _title: string | AsciiTableObject = "";
	private _titleAlign: AsciiTableAlign = AsciiTableAlign.CENTER;
	private _aligns: AsciiTableAlign[] = [];
	private _edge: string = "|";
	private _fill: string = "-";
	private _top: { left?: string; right?: string } | string = ".";
	private _bottom: { left?: string; right?: string } | string = "'";
	private _border: boolean = true;
	private _spacing: number = 1;
	private _maxCells: number = 0;
	private _maxCols: any[] = [];
	private _justify: boolean = false;
	options: AsciiTableOptions;

	/**
	 * Initialize a new table
	 * @param {string} title Title of the table
	 * @param {AsciiTableOptions|undefined} options options to customize the table
	 */
	constructor(title: string, options?: AsciiTableOptions) {
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
	static factory(title: string, options: AsciiTableOptions): AsciiTable {
		return new AsciiTable(title, options);
	}

	private align(direction: AsciiTableAlignType, str: string, length: number, pad: string) {
		if (direction === "LEFT") return this.alignLeft(str, length, pad);
		if (direction === "RIGHT") return this.alignRight(str, length, pad);
		if (direction === "CENTER") return this.alignCenter(str, length, pad);
		return this.alignAuto(str, length, pad);
	}

	private alignLeft(str: string, length: number, pad: string = " ") {
		if (!length || length < 0) return "";
		var aLength = length + 1 - str.length;
		if (aLength <= 0) return str;
		return str + Array(length + 1 - str.length).join(pad);
	}

	private alignCenter(str: string, length: number, pad: string = " ") {
		if (!length || length < 0) return "";
		var strLength = str.length;
		var half = Math.floor(length / 2 - strLength / 2);
		var odds = Math.abs((strLength % 2) - (length % 2));
		var length = str.length;

		return this.alignRight("", half, pad) + str + this.alignLeft("", half + odds, pad);
	}

	private alignRight(str: string, length: number, pad: string = " ") {
		const type = typeof str;
		if (type !== "string") {
			str = str.toString();
		}
		if (!length || length < 0) return "";
		var aLength = length + 1 - str.length;
		if (aLength <= 0) return str;

		return Array(length + 1 - str.length).join(pad) + str;
	}

	private alignAuto(str: string, length: number, pad: string = " ") {
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

	private arrayFill(length: number, fill: string | number) {
		var arr = new Array(length);
		for (var i = 0; i !== length; i++) {
			arr[i] = fill;
		}
		return arr;
	}

	private reset(title?: string | AsciiTableObject) {
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
		} else if (typeof title === "object") {
			this.fromJSON(title);
		}
		return this;
	}

	/**
	 * Set the border of the table
	 * @param {AsciiTableBorder | undefined} border border to be set
	 * @returns {AsciiTable}
	 */
	setBorder(border?: AsciiTableBorder): this {
		this.options.enableBorder = true;
		if (!border) return this;
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
	removeBorder(): this {
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
	setRowAlign(row: number, direction: AsciiTableAlignType): this {
		this._aligns[row] = AsciiTableAlign[direction];
		return this;
	}
	/**
	 * Align all rows to LEFT, CENTER, RIGHT
	 * @param {AsciiTableAlign} direction the direction to align
	 * @returns {this}
	 */
	setAlign(direction: AsciiTableAlignType): this {
		for (var i = 0; i < this._rows.length; i++) {
			this._aligns.push(AsciiTableAlign[direction]);
		}
		return this;
	}

	setTitle(title: string): this {
		this.options.title = title;
		return this;
	}

	getTitle(): string {
		return this.options.title;
	}

	setTitleAlign(direction: AsciiTableAlignType): this {
		this.options.titleAlign = direction;
		return this;
	}

	sort(method: ((a: any, b: any) => number) | undefined): this {
		this._rows.sort(method);
		return this;
	}

	sortColumn(idx: string | number, method: (a: any[], b: any[]) => number): this {
		this._rows.sort((a, b) => {
			return method(a[idx], b[idx]);
		});
		return this;
	}

	setHeading(...columnHeadings: string[]): this {
		if (arguments.length > 1 || !Array.isArray(columnHeadings)) {
			columnHeadings = Array.prototype.slice.call(arguments);
		}
		this._headings = columnHeadings;
		return this;
	}

	getHeading(): string[] {
		return this.options.headings.slice();
	}

	setHeadingAlign(dir: number): this {
		this._headingAlign = dir;
		return this;
	}

	addRow(...row: any[]): this {
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

	getRows(): any[] {
		return this._rows.slice().map(function (row) {
			return row.slice();
		});
	}

	addRowMatrix(...rows: any[]): this {
		for (var i = 0; i < rows.length; i++) {
			this.addRow(rows[i]);
		}
		return this;
	}
	addData(data: string | any[], rowCallback: (a: any) => any, asMatrix: any): this {
		if (Object.prototype.toString.call(data) !== "[object Array]") {
			return this;
		}
		for (var index = 0, limit = data.length; index < limit; index++) {
			var row = rowCallback(data[index]);
			if (asMatrix) {
				this.addRowMatrix(row);
			} else {
				this.addRow(row);
			}
		}
		return this;
	}

	clearRows(): this {
		this._rows = [];
		this._maxCells = 0;
		this._maxCols = [];
		return this;
	}

	setJustify(val: boolean): this {
		arguments.length === 0 && (val = true);
		this._justify = !!val;
		return this;
	}

	toJSON(): {
		title: string;
		heading: string[];
		rows: any[];
	} {
		return {
			title: this.getTitle(),
			heading: this.getHeading(),
			rows: this.getRows(),
		};
	}

	fromJSON(obj: AsciiTableObject): this {
		return this.reset()
			.setTitle(obj.title)
			.setHeading(...obj.headings)
			.addRowMatrix(obj.rows);
	}
	/**
	 * Render the table with `console.log()`
	 * @returns {string} the table to output
	 */
	render(): string {
		var body = [];
		var mLen = this._maxCells;
		var max = this.arrayFill(mLen, 0);
		var total = mLen * 3;
		var rows = this._rows;
		var justify: number;
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

	private _separator(len: number, sep?: { left: string; right: string } | string) {
		if (typeof sep === "object") {
			if (typeof this.options.border.fill !== "object")
				return sep.left + this.alignRight(sep.right!, len, this.options.border.fill);
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
			return sep! + this.alignRight(sep, len, this.options.border.fill);
	}

	private _rowSeparator() {
		var blanks = this.arrayFill(this._maxCells, this._fill);
		return this._renderRow(blanks, this._fill);
	}

	private _renderTitle(len: number) {
		var coloredTitle = Colors[this.options.titleColor].colorize(this.options.title);
		var title = " " + coloredTitle + " ";
		var str = this.align(
			this.options.titleAlign,
			title,
			len + coloredTitle.length - this.options.title.length - 1,
			" "
		);
		return this._edge + str + this._edge;
	}

	private _renderRow(row: any[], str: string, align?: AsciiTableAlign) {
		var tmp = [""];
		var max = this._maxCols;
		for (var k = 0; k < this._maxCells; k++) {
			var cell = row[k];
			var justified = this._justify ? Math.max.apply(null, max) : max[k];
			// var pad = k === this._maxCells - 1 ? just : just + this._spacing;
			const cAlign: AsciiTableAlign = this._aligns[k];
			var useAlign = align;
			var method: string = "alignAuto";

			if (typeof align === "undefined") useAlign = cAlign;

			if (useAlign === AsciiTableAlign.LEFT) method = "alignLeft";
			if (useAlign === AsciiTableAlign.CENTER) method = "alignCenter";
			if (useAlign === AsciiTableAlign.RIGHT) method = "alignRight";

			tmp.push((this as any)[method](cell, justified, str));
		}
		var front;
		if (typeof this.options.border.edge !== "object") {
			front = tmp.join(str + this.options.border.edge + str);
		} else {
			front = tmp.join(str + this.options.border.edge.rest + str);
		}
		front = front.substring(1, front.length);
		return front + str + this._edge;
	}
}

export default AsciiTable;
