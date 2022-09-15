import { QueryString } from "./lib/query-string";
import { handleQuery } from "./lib/query-processing";
import { QueryGroup } from "./lib/query-group";

export namespace Query {
    export const New = QueryString.New;
    export const NewGroup = QueryGroup.New;
    export namespace Handle {
        export const Process = handleQuery;
        /**
         * Does the same as `Query.Handle.Process` but is used to
         * clarify use cases when the dev knows if a process group will be used
         */
        export const ProcessGroup = handleQuery;
        export const IsQueryString = QueryString.Tools.isQueryString;
    }
}