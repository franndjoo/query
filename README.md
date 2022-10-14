# @johanmnto/query
**An easy query string library.**

## Get started
Install this library:
`pnpm i @johanmnto/query`

## How to use
### Use query string with a single condition
A query string with a single condition is created by calling `Query.New.[isEqual,isLower,isHigher]`.
You can call the appropriate comparison mode to handle your query string, other comparison modes may be added later.

```
// create a query string to compare a remote value with 12
// you can read it as `remoteValue` < 12
const someCondition = Query.Handle.New.isLower(12);

// to run a query string, use `Query.Handle.Process`
Query.Handle.Process(
    // put here your query string
    someCondition,
    // put here the remote value of your query
    8
).result();
```