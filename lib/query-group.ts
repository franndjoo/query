import { QueryTokens } from './config/tokens';
import { QueryString } from "./query-string";

export namespace QueryGroup {
    export namespace New {
        /** build a query group from query strings */
        export function queryGroupFromQueryStrings(...qs: string[]) {
            /** check if every query string is a query string */
            qs.forEach(qs_ => {
                if (!QueryString.Tools.isQueryString(qs_)) {
                    console.error("The string '" + qs_ + "' is not a query string.");
                    return ""
                }
            })

            return `${QueryTokens.QueryGroupSignature}${qs.join("+qs:")}`
        }
        /** parse a query group, every malformatted instruction will be skipped */
        export function parseAndRunQueryGroup(qg: string, onQueryString: (qs: string) => void) {
            if (QueryGroup.Tools.isQueryGroup(qg)) qg = qg.replace(QueryTokens.QueryGroupSignature, "");
            qg.split("+qs:").forEach(qs => {
                if (QueryString.Tools.isQueryString(qs)) onQueryString(qs)
            })
        }
    }
    export namespace Tools {
        /** check if a `querygroup` is really a query group */
        export function isQueryGroup(qs: string) {
            // console.log(qs.startsWith(QueryTokens.QueryGroupSignature), qs);
            return qs.startsWith(QueryTokens.QueryGroupSignature);
        }
    }
}