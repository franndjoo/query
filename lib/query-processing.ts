import { QueryTokens } from './config/tokens';
import { QueryString } from './query-string';
import { QueryHandler } from './types/query-processing';

/** handle a query and process it's result */
export function handleQuery(qs: string, remoteValue: any, options?: {
    lowComparator: QueryHandler<boolean>,
    highComparator: QueryHandler<boolean>,
    eqComparator: QueryHandler<boolean>
}) {
    if (isQueryString(qs)) qs = qs.replace(QueryTokens.QueryStringSignature, "")
    else throw Error("The given questring (" + qs + ") is not a query-string")

    const parsedQS = QueryString.Tools.parseQS(qs);
    let isOK = false;

    if (parsedQS.method === QueryTokens.Equality && (options?.lowComparator(parsedQS.value, remoteValue) || parsedQS.value === remoteValue)) isOK = true;
    if (parsedQS.method === QueryTokens.Higherness && (options?.highComparator(parsedQS.value, remoteValue) || parsedQS.value <= remoteValue)) isOK = true;
    if (parsedQS.method === QueryTokens.Lowerness && (options?.eqComparator(parsedQS.value, remoteValue) || parsedQS.value >= remoteValue)) isOK = true;

    return {
        result: (onEqual?: () => void, onFail?: () => void) => {
            if (isOK && onEqual !== undefined) onEqual()
            else if (onFail !== undefined) onFail()

            return isOK;
        }
    }
}

/** check if a `querystring` is really a query string */
export function isQueryString(qs: string) {
    return qs.startsWith(QueryTokens.QueryStringSignature);
}