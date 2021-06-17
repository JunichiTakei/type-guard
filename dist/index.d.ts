export declare const isUndefined: (value: unknown) => value is undefined;
export declare const isNUll: (value: unknown) => value is null;
export declare const isString: (value: unknown) => value is string;
interface IsStringNotEmpty {
    (value: ''): value is never;
    (value: unknown): value is string;
}
export declare const isStringNotEmpty: IsStringNotEmpty;
export declare const isNumber: (value: unknown) => value is number;
export declare const isValidPositiveNumber: (value: unknown) => value is number;
export declare const isValidNegativeNumber: (value: unknown) => value is number;
export declare const isValidInteger: (value: unknown) => value is number;
export declare const isValidPositiveInteger: (value: unknown) => value is number;
export declare const isValidNegativeInteger: (value: unknown) => value is number;
export declare const isBoolean: (value: unknown) => value is boolean;
export declare const isArray: (value: unknown) => value is unknown[];
interface IsArrayOfNumber {
    <T extends number>(value: T[]): value is Extract<T, string>[];
    <T>(value: T[]): value is never;
    (value: unknown): value is string[];
}
export declare const isArrayOfNumber: IsArrayOfNumber;
interface IsArrayOfString {
    <T extends string>(value: T[]): value is Extract<T, string>[];
    <T>(value: T[]): value is never;
    (value: unknown): value is string[];
}
export declare const isArrayOfString: IsArrayOfString;
export declare const isArrayOfStringNotEmpty: (value: unknown) => value is string[];
export declare const isObject: (value: unknown) => value is object;
export declare const isKeyValue: (value: unknown) => value is Record<string | number | symbol, unknown>;
export declare const hasEnumerableKey: <T>(value: T) => value is Extract<T, Record<string | number, unknown>>;
export declare const isSymbol: (value: unknown) => value is symbol;
export declare const isFunction: (value: unknown) => value is Function;
export declare const TString: string;
export declare const TNumber: number;
export declare const TBoolean: boolean;
export declare const TNull: null;
export declare const TUndefined: undefined;
export declare type TBaseJsonData = string | number | boolean | null;
export declare type TFirstJsonData = TBaseJsonData | {
    [property: string]: TJsonData;
} | TJsonData[];
export declare type TJsonData = TFirstJsonData | undefined;
interface TOr {
    <A, B>(...args: [A, B]): A | B;
    <A, B, C>(...args: [A, B, C]): A | B | C;
    <A, B, C, D>(...args: [A, B, C, D]): A | B | C | D;
    <A, B, C, D, E>(...args: [A, B, C, D, E]): A | B | C | D | E;
    <A, B, C, D, E, F>(...args: [A, B, C, D, E, F]): A | B | C | D | E | F;
    <A, B, C, D, E, F, G>(...args: [A, B, C, D, E, F, G]): A | B | C | D | E | F | G;
    <A, B, C, D, E, F, G, H>(...args: [A, B, C, D, E, F, G, H]): A | B | C | D | E | F | G | H;
    <A, B, C, D, E, F, G, H, I>(...args: [A, B, C, D, E, F, G, H, I]): A | B | C | D | E | F | G | H | I;
    <A, B, C, D, E, F, G, H, I, J>(...args: [A, B, C, D, E, F, G, H, I, J]): A | B | C | D | E | F | G | H | I | J;
}
export declare const TOr: TOr;
interface TStrictArray {
    <A>(...args: [A]): [A];
    <A, B>(...args: [A, B]): [A, B];
    <A, B, C>(...args: [A, B, C]): [A, B, C];
    <A, B, C, D>(...args: [A, B, C, D]): [A, B, C, D];
    <A, B, C, D, E>(...args: [A, B, C, D, E]): [A, B, C, D, E];
    <A, B, C, D, E, F>(...args: [A, B, C, D, E, F]): [A, B, C, D, E, F];
    <A, B, C, D, E, F, G>(...args: [A, B, C, D, E, F, G]): [A, B, C, D, E, F, G];
    <A, B, C, D, E, F, G, H>(...args: [A, B, C, D, E, F, G, H]): [A, B, C, D, E, F, G, H];
    <A, B, C, D, E, F, G, H, I>(...args: [A, B, C, D, E, F, G, H, I]): [A, B, C, D, E, F, G, H, I];
    <A, B, C, D, E, F, G, H, I, J>(...args: [A, B, C, D, E, F, G, H, I, J]): [A, B, C, D, E, F, G, H, I, J];
}
export declare const TStrictArray: TStrictArray;
export declare const TArray: <T>(arg: T) => T[];
export declare const validateJson: (value: unknown, test: TJsonData, key?: string) => string;
export declare const isValidJson: <T extends TFirstJsonData>(value: unknown, test: T) => value is T;
export declare const returnJson: <T extends TFirstJsonData>(value: unknown, test: T, valueInsteadOfError?: T | undefined) => T;
export {};
