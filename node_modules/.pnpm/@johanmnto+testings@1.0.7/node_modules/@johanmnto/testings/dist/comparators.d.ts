/** # eqOb
 * **this function tries to determine if two objects with different references are matching**
 */
export declare function eqOb(remote: {
    [v: string]: any;
}, local: {
    [v: string]: any;
}): boolean;
/** #autoCp
 * **this function automatically determines the best way to check if 2 values are the same**
 */
export declare function autoCp(remote: any, local: any): boolean;
