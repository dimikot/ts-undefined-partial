/**
 * Turns properties of T which accept `undefined` to ?-optional. Basically, it
 * adds "?" suffix to all properties which are undefined-assignable. Does it
 * recursively for sub-properties (including arrays) and produces the most
 * IntelliSense-clean typing possible (thus playing with never/unknown).
 *
 * Examples:
 * ```
 * UndefinedToPartial<{ a: { b: string | undefined }>
 *                 -> { a: { b?: string | undefined } }
 *
 * UndefinedToPartial<{ a: Array<{ b: string | undefined } | undefined>>
 *                 -> { a?: Array<{ b?: string | undefined }> | undefined }
 * ```
 *
 * Notice that there is currently no way to generate `{ a?: string }` type in
 * TS: it always adds `| undefined` alternative for ?-properties.
 */
export type UndefinedToPartial<T> = T extends [any, ...any[]]
  ? { [K in keyof T]: UndefinedToPartial<T[K]> }
  : T extends unknown[]
  ? Array<UndefinedToPartial<T[number]>>
  : T extends object
  ? FunctionPropertyNames<T> extends never
    ? (ExcludeKeys<T, undefined> extends never
        ? unknown // there are no required props
        : { [K in ExcludeKeys<T, undefined>]: UndefinedToPartial<T[K]> }) &
        (OnlyKeys<T, undefined> extends never
          ? unknown // there are no undefined props
          : { [K in OnlyKeys<T, undefined>]?: UndefinedToPartial<T[K]> })
    : T
  : T;

/**
 * Converts `{ a?: T | undefined }` to `{ a: T | undefined }` (i.e. removes "?"
 * keeping `undefined`). This is convenient for input values of some API when we
 * want to make sure that, when we add a new optional API field, we don't forget
 * to populate it with data. The tool never touches properties of objects with
 * at least one method (e.g. it doesn't touch Date, Set, Map and any other class
 * instances with methods).
 */
export type PartialToUndefined<T> = T extends [any, ...any[]]
  ? { [K in keyof T]: PartialToUndefined<T[K]> } // tuple
  : T extends unknown[]
  ? Array<PartialToUndefined<T[number]>> // array
  : T extends object
  ? FunctionPropertyNames<T> extends never // object
    ? { [K in keyof Required<T>]: PartialToUndefined<T[K]> }
    : T
  : T;

// Returns the union of all possible method names in an object.
// - See https://stackoverflow.com/a/49402091/322708 for "T extends T"
// - We also use `(() => any) extends T[K]` and not `T[K] extends Function`,
//   because we want the union type like "Function | undefined" to be treated as
//   a functional property too.
type FunctionPropertyNames<T> = T extends object
  ? T extends T
    ? {
        [K in keyof T]-?: ((...args: any[]) => any) extends T[K] ? K : never;
      }[keyof T]
    : never
  : never;
/**
 * All of the keys of T to which U can be assigned.
 */
type OnlyKeys<T, U> = {
  [K in keyof T]: U extends T[K] ? K : never;
}[keyof T];

/**
 * All of the keys of T except those to which U can be assigned.
 */
type ExcludeKeys<T, U> = {
  [K in keyof T]: U extends T[K] ? never : K;
}[keyof T];
