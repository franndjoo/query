/** test-unit definition, it can be used to create a test pack
 * @important this is the structure of the type definition: []
 */
export declare type UnitParameters<T extends any> = {
    name: string;
    runner: () => T;
    expect: T;
};
/** a test-unit is made from this function */
export declare function unit<T>(name: string, runner: () => T, expect: T): void;
/** multiple test unit runner, tests to run can be filtered from the `testFilter` prop */
export declare function testPack(units: UnitParameters<any>[], testFilter?: string[]): void;
