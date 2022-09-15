/** tokens present in a query string to understand the instructions */
export enum QueryTokens {
    Equality = "&eq=",
    Lowerness = "&low<",
    Higherness = "&high>",
    RemoteValue = "@remv_",
    QueryStringSignature = "&QS-V1.",
    QueryGroupSignature = "&QSG-V1."
}