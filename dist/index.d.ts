export declare const isUndefined: (value: unknown) => value is undefined;
export declare const isNull: (value: unknown) => value is null;
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
declare const innerName: unique symbol;
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
export declare const TStrict: <T extends string | number>(arg: T) => T;
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
interface TOption {
    <A>(...args: [A]): A | undefined;
    <A, B>(...args: [A, B]): A | B | undefined;
    <A, B, C>(...args: [A, B, C]): A | B | C | undefined;
    <A, B, C, D>(...args: [A, B, C, D]): A | B | C | D | undefined;
    <A, B, C, D, E>(...args: [A, B, C, D, E]): A | B | C | D | E | undefined;
    <A, B, C, D, E, F>(...args: [A, B, C, D, E, F]): A | B | C | D | E | F | undefined;
    <A, B, C, D, E, F, G>(...args: [A, B, C, D, E, F, G]): A | B | C | D | E | F | G | undefined;
    <A, B, C, D, E, F, G, H>(...args: [A, B, C, D, E, F, G, H]): A | B | C | D | E | F | G | H | undefined;
    <A, B, C, D, E, F, G, H, I>(...args: [A, B, C, D, E, F, G, H, I]): A | B | C | D | E | F | G | H | I | undefined;
    <A, B, C, D, E, F, G, H, I, J>(...args: [A, B, C, D, E, F, G, H, I, J]): A | B | C | D | E | F | G | H | I | J | undefined;
}
export declare const TOption: TOption;
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
export declare const TObject: <T>(arg: T) => {
    [key: string]: T;
};
export declare const TCustomize: <T extends TJsonData>(test: T, errorMessage: string, isFunction: (value: unknown) => boolean) => {
    [innerName]: boolean;
    name: string;
    $customize: {
        errorMessage: string;
        isFunction: (value: unknown) => boolean;
    };
};
export declare const validateJson: (value: unknown, test: TJsonData, key?: string) => string;
export declare const isValidJson: <T extends TFirstJsonData>(value: unknown, test: T) => value is T;
export declare const returnJson: <T extends TFirstJsonData>(value: unknown, test: T, valueInsteadOfError?: T | undefined) => T;
export {};
