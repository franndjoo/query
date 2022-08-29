"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoCp = exports.eqOb = void 0;
/** # eqOb
 * **this function tries to determine if two objects with different references are matching**
 */
function eqOb(remote, local) {
    let ok = true;
    for (const attributeName in local) {
        if (ok) {
            if (typeof local[attributeName] === "object") {
                if (remote[attributeName] !== undefined &&
                    local[attributeName] !== undefined) {
                    ok = eqOb(remote[attributeName], local[attributeName]);
                }
                else
                    ok = false;
            }
            else
                ok = local[attributeName] === remote[attributeName];
        }
    }
    return ok;
}
exports.eqOb = eqOb;
/** #autoCp
 * **this function automatically determines the best way to check if 2 values are the same**
 */
function autoCp(remote, local) {
    if (typeof remote === "object" && typeof local === "object")
        return eqOb(remote, local);
    else
        return remote === local;
}
exports.autoCp = autoCp;
