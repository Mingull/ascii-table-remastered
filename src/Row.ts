import { AsciiTableAlignType } from "./utils.js";

export default class Row {
	alignment: AsciiTableAlignType;
	items: unknown[];
	constructor(...items: unknown[]) {
		this.alignment = "LEFT";
		this.items = items;
	}

	setAlignment(align: AsciiTableAlignType) {
		this.alignment = align;
	}

	getAlignment() {
		return this.alignment;
	}

	setItems(...items: unknown[]) {
		this.items = items;
	}

	getItems() {
		return this.items;
	}
}
