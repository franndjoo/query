import Crypto from "@johanmnto/crypto";
import { QueryTokens } from "./config/tokens";

/** create a query string for a specific use-case */
export namespace QueryString {
    /** create a query-string which compares a value with a remote value */
    export namespace New {
        export function isEqual(value: any) {
            return QueryString.Tools.buildQS(value, QueryTokens.Equality, QueryTokens.RemoteValue)
        }
        /** is the value pushed in the function lower than the remote value */
        export function isLower(value: any) {
            return QueryString.Tools.buildQS(value, QueryTokens.Lowerness, QueryTokens.RemoteValue)
        }
        /** is the value pushed in the function higher than the remote value */
        export function isHigher(value: any) {
            return QueryString.Tools.buildQS(value, QueryTokens.Higherness, QueryTokens.RemoteValue)
        }
    }
    export namespace Tools {
        /** check if a `querystring` is really a query string */
        export function isQueryString(qs: string) {
            return qs.startsWith(QueryTokens.QueryStringSignature);
        }
        /** build a query string */
        export function buildQS(value: any, comparison: string, target: string) {
            return `${QueryTokens.QueryStringSignature}${Crypto.encode(value)}${comparison}${target}`;
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