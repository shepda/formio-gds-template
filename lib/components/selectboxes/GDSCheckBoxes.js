"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("formiojs/components/_classes/field/Field");
const SelectBoxes_1 = require("formiojs/components/selectboxes/SelectBoxes");
class GDSCheckBoxes extends SelectBoxes_1.default {
    render() {
        // @ts-ignore
        return Field_1.default.prototype.render.call(this, this.renderTemplate('selectboxes', {
            // @ts-ignore
            input: this.inputInfo,
            // @ts-ignore
            inline: this.component.inline,
            // @ts-ignore
            values: this.component.values,
            // @ts-ignore
            value: this.dataValue,
            // @ts-ignore
            row: this.row,
        }));
    }
}
exports.default = GDSCheckBoxes;