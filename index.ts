import { QueryString } from "./lib/query-string";
import { handleQuery, isQueryString } from "./lib/query-processing";

export namespace Query {
    export const New = QueryString.New;
    export namespace Handle {
        export const Process = handleQuery;
        export const IsQueryString = isQueryString;
    }
}