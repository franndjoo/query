# @johanmnto/query
**An easy query string library.**

## Get started
Install this library:
`pnpm i @johanmnto/query`

## How to use
### Use a query string with a single condition
A query string with a single condition is created by calling `Query.New.[isEqual,isLower,isHigher]`.
You can call the appropriate comparison mode to handle your query string, other comparison modes may be added later.

```javascript
// create a query string to compare a remote value with 12
// you can read it as `remoteValue` < 12
const someCondition = Query.New.isLower(12);

// to run a query string, use `Query.Handle.Process`
Query.Handle.Process(
    // put here your query string
    someCondition,
    // put here the remote value of your query
    8
).result(); // true
```

### Use a query string with multiple conditions
To use a query string with multiple conditions, you need to build a query group. To do so, the `Query.NewGroup` will be used to build it.
It works by combining multiple query string together.
```javascript
const someCondition = Query.NewGroup(Query.New.isLower(12), Query.New.isHigher(6));
Query.Handle.ProcessGroup(someCondition, 10).result(); // true
```

## Advanced usage
### Use flags with a query string
Flags are useful because they describe how the Query processor will behave. They can be set using `withFlags` after `Query.New`. 
Flags are defined on `Query.Flags`.
```javascript
// this query will apply the condition to each item of an array 
const someFlaggedCondition = Query.New.withFlags(Query.Flags.ForEachItem).isEqual("ab");
Query.Handle.Process(someFlaggedCondition, ["bg", "ab"]).result(); // false
```