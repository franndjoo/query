/** comparator handling function */
export type QueryHandler<RETURN extends any = void> = (value: any, remoteValue: any) => RETURN;