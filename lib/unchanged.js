"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
function filterUnchanged(hasChanged = (a, b) => (a !== b)) {
    let value;
    return operators_1.filter((v, i) => {
        if (i === 0 || hasChanged(value, v)) {
            value = v;
            return true;
        }
        return false;
    });
}
exports.filterUnchanged = filterUnchanged;
