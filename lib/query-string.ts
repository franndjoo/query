import { QueryFlags, QueryFlagsToken } from './config/flags';
import Crypto from "@johanmnto/crypto";
import { QueryTokens, ValueTokens } from "./config/tokens";

/** create a query string for a specific use-case */
export namespace QueryString {
    /** create a query-string which compares a value with a remote value */
    export namespace New {
        export function withFlags(...flags: QueryFlags[]) {
            return {
                isEqual(value: any) {
                    return QueryString.Tools.buildQS(value, QueryTokens.Equality, QueryTokens.RemoteValue, flags)
                },
                /** is the value pushed in the function lower than the remote value */
                isLower(value: any) {
                    return QueryString.Tools.buildQS(value, QueryTokens.Lowerness, QueryTokens.RemoteValue, flags)
                },
                /** is the value pushed in the function higher than the remote value */
                isHigher(value: any) {
                    return QueryString.Tools.buildQS(value, QueryTokens.Higherness, QueryTokens.RemoteValue, flags)
                }
            }
        }
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
        /** check if a `querystring` is really a query string
         * @param strict will only check if the string is a query string, not if it's also a query group (default: false)
         */
        export function isQueryString(qs: string, strict = false) {
            return qs.startsWith(QueryTokens.QueryStringSignature) || (qs.startsWith(QueryTokens.QueryGroupSignature) && !strict);
        }
        /** returns the appropriate token value for the value to compare */
        export function getValueToken(value: any) {
            if (typeof value === "number" || typeof value === "bigint") return ValueTokens.Number;
            if (typeof value === "string") return ValueTokens.String;
            if (typeof value === "object") return ValueTokens.Object;
            if (typeof value === "boolean") return ValueTokens.Boolean;
        }
        /** build a query string */
        export function buildQS(value: any, comparison: string, target: string, flags: QueryFlags[] = []) {
            return `${QueryTokens.QueryStringSignature}${QueryFlagsToken.FlagsDefinitionOpenTag}${flags.join()}${QueryFlagsToken.FlagsDefinitionCloseTag}${QueryString.Tools.getValueToken(value)}${ValueTokens.ValueTypeSeparator}${Crypto.encode(value)}${comparison}${target}`;
        }
        /** parse a query string */
        export function parseQS(qs: string) {
            const parsedData: { value: any, method: string, target: string, goThroughtItemsOnArray: boolean } = {
                value: "",
                method: "",
                target: "",
                goThroughtItemsOnArray: qs.indexOf(QueryFlags.ForEachItem) > -1
            }

            /** determines what comparison is wanted in this querystring */
            if (qs.indexOf(QueryTokens.Equality) !== -1) parsedData.method = QueryTokens.Equality
            else if (qs.indexOf(QueryTokens.Higherness) !== -1) parsedData.method = QueryTokens.Higherness
            else if (qs.indexOf(QueryTokens.Lowerness) !== -1) parsedData.method = QueryTokens.Lowerness
            else throw Error("No comparison token found in query-string: " + qs);

            /** value package to parse */
            const valuePackage = (qs.split(parsedData.method[0]) as string[])[0].split("->");
            valuePackage[1] = Crypto.decode(valuePackage[1]);
            /** determines and parses the value to compare */
            if     (valuePackage[0].indexOf(ValueTokens.Boolean) > -1) parsedData.value = valuePackage[1] === "true"
            else if (valuePackage[0].indexOf(ValueTokens.Number) > -1) parsedData.value = parseInt(valuePackage[1])
            else if (valuePackage[0].indexOf(ValueTokens.Object) > -1) parsedData.value = JSON.parse(valuePackage[1])
            else if (valuePackage[0].indexOf(ValueTokens.String) > -1) parsedData.value = valuePackage[1]
            else throw Error("Failed to parse the value to be used: " + qs);

            /** determines the value to compare */
            parsedData.target = qs.split(parsedData.method)[1];

            return parsedData;
        }
    }
}