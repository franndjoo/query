import Crypto from "@johanmnto/crypto";
import { QueryTokens } from "./config/tokens";

/** create a query string for a specific use-case */
export namespace QueryString {
    /** create a query-string which compares a value with a remote value */
    export namespace New {
        export function isEqual(value: any) {
            return QueryString.Tools.buildQS(value, QueryTokens.Equality, QueryTokens.RemoteValue)
        }
        export function isLower(value: any) {
            return QueryString.Tools.buildQS(value, QueryTokens.Lowerness, QueryTokens.RemoteValue)
        }
        export function isHigher(value: any) {
            return QueryString.Tools.buildQS(value, QueryTokens.Higherness, QueryTokens.RemoteValue)
        }
    }
    export namespace Tools {
        /** build a query string */
        export function buildQS(value: any, comparison: string, target: string) {
            return `${Crypto.encode(value)}${comparison}${target}`;
        }
        /** parse a query string */
        export function parseQS(qs: string) {
            const parsedData = {
                value: "",
                method: "",
                target: ""
            }

            if (qs.indexOf(QueryTokens.Equality) !== -1) parsedData.method = QueryTokens.Equality
            else if (qs.indexOf(QueryTokens.Higherness) !== -1) parsedData.method = QueryTokens.Higherness
            else if (qs.indexOf(QueryTokens.Lowerness) !== -1) parsedData.method = QueryTokens.Lowerness
            else throw Error("No comparison token found in query-string " + qs);

            parsedData.value = Crypto.decode(qs.split(parsedData.method)[0]);
            parsedData.target = qs.split(parsedData.method)[1];

            return parsedData;
        }
    }
}