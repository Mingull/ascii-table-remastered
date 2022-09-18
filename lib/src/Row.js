export default class Row {
    alignment;
    items;
    constructor(...items) {
        this.alignment = "LEFT";
        this.items = items;
    }
    setAlignment(align) {
        this.alignment = align;
    }
    getAlignment() {
        return this.alignment;
    }
    setItems(...items) {
        this.items = items;
    }
    getItems() {
        return this.items;
    }
}
