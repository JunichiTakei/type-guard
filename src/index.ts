export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';

export const isNUll = (value: unknown): value is null => value === null;

export const isString = (value: unknown): value is string => typeof value === 'string';
interface IsStringNotEmpty {
  (value: ''): value is never;
  (value: unknown): value is string;
}
export const isStringNotEmpty: IsStringNotEmpty = (value: unknown): value is never => isString(value) && value !== '';

export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isValidPositiveNumber = (value: unknown): value is number => isNumber(value) && value > 0;
export const isValidNegativeNumber = (value: unknown): value is number => isNumber(value) && value < 0;
export const isValidInteger = (value: unknown): value is number => isNumber(value) && Number.isInteger(value);
export const isValidPositiveInteger = (value: unknown): value is number => isValidPositiveNumber(value) && isValidInteger(value);
export const isValidNegativeInteger = (value: unknown): value is number => isValidNegativeNumber(value) && isValidInteger(value);

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);
interface IsArrayOfNumber {
  <T extends number>(value: T[]): value is Extract<T, string>[];
  <T>(value: T[]): value is never;
  (value: unknown): value is string[];
}
export const isArrayOfNumber: IsArrayOfNumber = (value: unknown): value is never => Array.isArray(value) && value.every(v => isNumber(v));
interface IsArrayOfString {
  <T extends string>(value: T[]): value is Extract<T, string>[];
  <T>(value: T[]): value is never;
  (value: unknown): value is string[];
}
export const isArrayOfString: IsArrayOfString = (value: unknown): value is never => Array.isArray(value) && value.every(v => isString(v));
export const isArrayOfStringNotEmpty = (value: unknown): value is string[] => Array.isArray(value) && value.every(v => isStringNotEmpty(v));

export const isObject = (value: unknown): value is object => typeof value === 'object';

export const isKeyValue = (value: unknown): value is Record<number | string | symbol, unknown> => isObject(value) && !isNUll(value) && !isArray(value);
export const hasEnumerableKey = <T>(value: T): value is Extract<T, Record<number | string, unknown>> => isKeyValue(value) && Object.keys(value).length !== 0;

export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';

export const isFunction = (value: unknown): value is Function => typeof value === 'function';


export const TString: string = '';
export const TNumber: number = 0;
export const TBoolean: boolean = true;
export const TNull = null;
export const TUndefined = undefined;

export type TBaseJsonData = string | number | boolean | null;
const validateBaseJsonData = (value: unknown, test: TBaseJsonData | undefined, key: string) => {
  if (isString(test)) {
    return isString(value) ? '' : `${key}: Not String`;
  } else if (isNumber(test)) {
    return isNumber(value) ? '' : `${key}: Not Number`;
  } else if (isBoolean(test)) {
    return isBoolean(value) ? '' : `${key}: Not Boolean`;
  } else if (isNUll(test)) {
    return isNUll(value) ? '' : `${key}: Not Null`;
  } else if (isUndefined(test)) {
    return isUndefined(value) ? '' : `${key}: Not Undefined`;
  } else {
    return 'unknown';
  }
};
export type TFirstJsonData = TBaseJsonData | { [property: string]: TJsonData } | TJsonData[];
export type TJsonData = TFirstJsonData | undefined;

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
export const TOr: TOr = (...args: any[]) => ({
  name: 'TOr',
  $or: args,
} as any);
const isTOr = (value: Record<number | string | symbol, unknown>): value is { name: 'TOr'; $or: TJsonData[] } => value.name === 'TOr' && isArray(value.$or) && value.$or.length > 1;
const validateOr = (value: unknown, test: { name: 'TOr'; $or: TJsonData[] }, key: string) => {
  const { $or } = test;
  for (let i = 0, l = $or.length; i < l; i++) {
    const result = validateJson(value, $or[i], `${key}[${i}]`);
    if (result === '') return '';
  }
  return `${key}: None`;
};

interface TStrictArray {
  <A>(...args: [A]): [A];
  <A, B>(...args: [A, B]): [A, B];
  <A, B, C>(...args: [A, B, C]):[A, B, C];
  <A, B, C, D>(...args: [A, B, C, D]): [A, B, C, D];
  <A, B, C, D, E>(...args: [A, B, C, D, E]): [A, B, C, D, E];
  <A, B, C, D, E, F>(...args: [A, B, C, D, E, F]): [A, B, C, D, E, F];
  <A, B, C, D, E, F, G>(...args: [A, B, C, D, E, F, G]): [A, B, C, D, E, F, G];
  <A, B, C, D, E, F, G, H>(...args: [A, B, C, D, E, F, G, H]): [A, B, C, D, E, F, G, H];
  <A, B, C, D, E, F, G, H, I>(...args: [A, B, C, D, E, F, G, H, I]): [A, B, C, D, E, F, G, H, I];
  <A, B, C, D, E, F, G, H, I, J>(...args: [A, B, C, D, E, F, G, H, I, J]): [A, B, C, D, E, F, G, H, I, J];
}
export const TStrictArray: TStrictArray = (...args: any[]) => args as any;

export const TArray = <T>(arg: T): T[] => ({
  name: 'TArray',
  $array: arg,
} as any);
const isTArray = (value: Record<number | string | symbol, unknown>): value is { name: 'TArray'; $array: TJsonData } => value.name === 'TArray' && !isUndefined(value.$array);
const validateArray = (value: unknown, test: { name: 'TArray'; $array: TJsonData }, key: string) => {
  if (isArray(value)) {
    const { $array } = test;
    for (let i = 0, l = value.length; i < l; i++) {
      const result = validateJson(value[i], $array, `${key}[${i}]`);
      if (result !== '') return result;
    }
    return '';
  } else {
    return `${key}: Not Array`;
  }
};

export const validateJson = (value: unknown, test: TJsonData, key: string = 'root'): string => {
  if (isKeyValue(test)) {
    if (isTOr(test)) {
      return validateOr(value, test, key);
    }
    if (isTArray(test)) {
      return validateArray(value, test, key);
    }
    if (isKeyValue(value)) {
      for (const property in test) {
        const result = validateJson(value[property], test[property], `${key}.${property}`);
        if (result !== '') return result;
      }
      return '';
    }
    return `${key}: Not Object`;
  } else if (isArray(test)) {
    if (isArray(value)) {
      for (let i = 0, l = test.length; i < l; i++) {
        const result = validateJson(value[i], test[i], `${key}[${i}]`);
        if (result !== '') return result;
      }
      return '';
    } else {
      return `${key}: Not Array`;
    }
  }
  return validateBaseJsonData(value, test, key);
};
export const isValidJson = <T extends TFirstJsonData>(value: unknown, test: T): value is T => validateJson(value, test) === '';
export const returnJson = <T extends TFirstJsonData>(value: unknown, test: T, valueIfError?: T): T => {
  const message = validateJson(value, test);
  if (message === '') {
    return value as any;
  } else {
    if (!isUndefined(valueIfError))
      return valueIfError;
    throw new TypeError(message);
  }
};