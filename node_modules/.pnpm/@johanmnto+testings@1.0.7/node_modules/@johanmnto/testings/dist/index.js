"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPack = exports.unit = void 0;
const comparators_1 = require("./comparators");
/** a test-unit is made from this function */
function unit(name, runner, expect) {
    console.time(name);
    const result = runner();
    console.timeLog(name, (0, comparators_1.autoCp)(result, expect) ? "\x1b[32m" : "\x1b[31m", "→ result:", (0, comparators_1.autoCp)(result, expect) ? "👌 Passed\x1b[0m" : "❌ Fail");
    if (!(0, comparators_1.autoCp)(result, expect)) {
        console.group();
        console.group(`↓ runner output (${name})`);
        console.groupEnd();
        console.group(result);
        console.groupEnd();
        console.group("\x1b[31m↓ was expecting\x1b[0m");
        console.groupEnd();
        console.group(expect);
        console.groupEnd();
        console.groupEnd();
        console.groupEnd();
    }
}
exports.unit = unit;
/** multiple test unit runner, tests to run can be filtered from the `testFilter` prop */
function testPack(units, testFilter) {
    units.forEach((_unit) => (testFilter !== undefined && testFilter.indexOf(_unit.name) !== -1) ||
        testFilter === undefined
        ? unit(_unit.name, _unit.runner, _unit.expect)
        : null);
}
exports.testPack = testPack;
