/** tokens present in a query string to understand the instructions */
export enum QueryTokens {
    Equality = "&eq=",
    Lowerness = "&low<",
    Higherness = "&high>",
    RemoteValue = "@remv_",
    QueryStringSignature = "&QS-V1.",
    QueryGroupSignature = "&QSG-V1."
}

/** tokens present in a query string to correctly parse the value to compare with the remote value */
export enum ValueTokens {
    String = "STR",
    Number = "NB",
    Object = "OBJ",
    Boolean = "BL",
    ValueTypeSeparator = "->"
}