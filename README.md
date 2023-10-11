# ts-undefined-partial: TypeScript recursive conversion between optional (partial) and undefined properties

The library has 2 typing utilities:

1. `PartialToUndefined<T>` removes "?" optionality marker on all properties
   (recursively) and replaces them with `| undefined`. I.e. it makes the type
   "stricter" in assignments.
2. `UndefinedToPartial<T>` adds "?" optionality marker for all properties
   (recursively) which can accept `undefined` as a value. I.e. it makes the type
   "more relaxed" in assignments.

These tools ignore "complex" objects which have at lease 1 method on them (like
Date, Map etc.). I.e. the library is suited for data objects only.

## Examples

```ts
PartialToUndefined<{ a?: string; c: MyClass; some: { x?: string } }>
// -> { a: string | undefined; c: MyClass; some: { x: string | undefined } }

UndefinedToPartial<{ a: string | undefined; c: MyClass; some: { x: string | undefined } }>
// -> { a?: string | undefined; c: MyClass; some: { x?: string | undefined } }
```

## Background

For object properties, TypeScript supports two slightly different notions of "optionality":

1. whether a property is "required" or "optional" ("?" suffix marker);
2. whether a property accepts `undefined` as a value or not.

Examples:

```ts
let optional: {
  a?: number;
};
optional = {}; // OK; property can be omitted
optional = { a: undefined }; // OK

let undefinable: {
  a: number | undefined;
};
optional = {}; // ERROR
optional = { a: undefined }; // OK
```

There is also the 3rd notion (`a?: number | undefined`) which is technically
different, but in practice, TypeScript can't distinguish it from `a?: number` in
many cases, especially when working with generics.
