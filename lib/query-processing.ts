import { QueryTokens } from './config/tokens';
import { QueryString } from './query-string';
import { QueryHandler } from './types/query-processing';

export function handleQuery(qs: string, remoteValue: any, options?: {
    lowComparator: QueryHandler<boolean>,
    highComparator: QueryHandler<boolean>,
    eqComparator: QueryHandler<boolean>
}) {
    const parsedQS = QueryString.Tools.parseQS(qs);
    let isOK = false;

    if (parsedQS.method === QueryTokens.Equality && (options?.lowComparator(parsedQS.value, remoteValue) || parsedQS.value === remoteValue)) isOK = true;
    if (parsedQS.method === QueryTokens.Higherness && (options?.lowComparator(parsedQS.value, remoteValue) || parsedQS.value >= remoteValue)) isOK = true;
    if (parsedQS.method === QueryTokens.Lowerness && (options?.lowComparator(parsedQS.value, remoteValue) || parsedQS.value <= remoteValue)) isOK = true;

    return {
        result: (onEqual?: () => void, onFail?: () => void) => {
            if (isOK && onEqual !== undefined) onEqual()
            else if (onFail !== undefined) onFail()

            return isOK;
        }
    }
}