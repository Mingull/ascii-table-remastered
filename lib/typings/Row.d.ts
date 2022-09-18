import { AsciiTableAlignType } from "./utils.js";
export default class Row {
    alignment: AsciiTableAlignType;
    items: unknown[];
    constructor(...items: unknown[]);
    setAlignment(align: AsciiTableAlignType): void;
    getAlignment(): "LEFT" | "CENTER" | "RIGHT";
    setItems(...items: unknown[]): void;
    getItems(): unknown[];
}
