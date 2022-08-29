import { QueryString } from "./lib/query-string";
import { handleQuery } from "./lib/query-processing";

export namespace Query {
    export const New = QueryString.New;
    export const Handle = handleQuery;
}