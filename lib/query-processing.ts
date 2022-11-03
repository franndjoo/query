import { QueryTokens } from './config/tokens';
import { QueryString } from './query-string';
import { QueryGroup } from './query-group';
import { QueryHandler } from './types/query-processing';

/** handle a query and process it's result */
export function handleQuery(qs: string, remoteValue: any, options?: {
    lowComparator: QueryHandler<boolean>,
    highComparator: QueryHandler<boolean>,
    eqComparator: QueryHandler<boolean>
}) {
    // runned when the passed string is a query group
    if (QueryGroup.Tools.isQueryGroup(qs)) {
        let isOK: null | boolean = null;
        QueryGroup.New.parseAndRunQueryGroup(qs, (qs_) => isOK !== false ? isOK = handleQuery(qs_, remoteValue, options).result() : null);

        return {
            result: (onEqual?: () => void, onFail?: () => void) => {
                if (isOK && onEqual !== undefined) onEqual()
                else if (onFail !== undefined) onFail()

                return isOK;
            }
        }
    }

    if (QueryString.Tools.isQueryString(qs)) qs = qs.replace(QueryTokens.QueryStringSignature, "")
    else throw Error("The given string (" + qs + ") is not a query-string")

    const parsedQS = QueryString.Tools.parseQS(qs);
    let isOK = false;
    let isOKHasBeenRunned = false;

    /** if the remote value is an array and if the `ForEachItem` flag is given, the handling is made by mapping each item */
    if (Array.isArray(remoteValue) && parsedQS.goThroughtItemsOnArray) {
        remoteValue.forEach(entryValue => {
            /** continue looping until isOK is false again */
            if (isOK === false && isOKHasBeenRunned) return;
            else {
                if (parsedQS.method === QueryTokens.Equality && (options?.lowComparator(parsedQS.value, entryValue) || parsedQS.value === entryValue)) isOK = true;
                else if (parsedQS.method === QueryTokens.Higherness && (options?.highComparator(parsedQS.value, entryValue) || parsedQS.value < entryValue)) isOK = true;
                else if (parsedQS.method === QueryTokens.Lowerness && (options?.eqComparator(parsedQS.value, entryValue) || parsedQS.value > entryValue)) isOK = true;
                else isOK = false;
                isOKHasBeenRunned = true;
            }
        });
    } else {
        if (parsedQS.method === QueryTokens.Equality && (options?.lowComparator(parsedQS.value, remoteValue) || parsedQS.value === remoteValue)) isOK = true;
        if (parsedQS.method === QueryTokens.Higherness && (options?.highComparator(parsedQS.value, remoteValue) || parsedQS.value < remoteValue)) isOK = true;
        if (parsedQS.method === QueryTokens.Lowerness && (options?.eqComparator(parsedQS.value, remoteValue) || parsedQS.value > remoteValue)) isOK = true;
    }

    return {
        result(onEqual?: () => void, onFail?: () => void) {
            if (isOK && onEqual !== undefined) onEqual()
            else if (onFail !== undefined) onFail()

            return isOK;
        }
    }
}
