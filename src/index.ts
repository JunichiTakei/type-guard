export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';

export const isNull = (value: unknown): value is null => value === null;

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

export const isKeyValue = (value: unknown): value is Record<number | string | symbol, unknown> => isObject(value) && !isNull(value) && !isArray(value);
export const hasEnumerableKey = <T>(value: T): value is Extract<T, Record<number | string, unknown>> => isKeyValue(value) && Object.keys(value).length !== 0;

export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';

export const isFunction = (value: unknown): value is Function => typeof value === 'function';

/* ------------------------------------------------------------------------------------------- */

const innerName = Symbol('name');
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
  } else if (isNull(test)) {
    return isNull(value) ? '' : `${key}: Not Null`;
  } else if (isUndefined(test)) {
    return isUndefined(value) ? '' : `${key}: Not Undefined`;
  } else {
    return 'unknown';
  }
};
export type TFirstJsonData = TBaseJsonData | { [property: string]: TJsonData } | TJsonData[];
export type TJsonData = TFirstJsonData | undefined;

export const TStrict = <T extends string | number>(arg: T): T => ({
  [innerName]: true,
  name: 'TStrict',
  $strict: arg,
} as any);
const isTStrict = (value: Record<number | string | symbol, unknown>): value is { $strict: string | number } => !isUndefined(value.$strict);
const validateTStrict = (value: unknown, test: { $strict: string | number }, key: string) => {
  const { $strict } = test;
  return value === $strict ? '' : `${key} !== ${$strict}`;
};

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
  [innerName]: true,
  name: 'TOr',
  $or: args,
} as any);
const isTOr = (value: Record<number | string | symbol, unknown>): value is { $or: TJsonData[] } => isArray(value.$or) && value.$or.length > 1;
const validateTOr = (value: unknown, test: { $or: TJsonData[] }, key: string) => {
  const { $or } = test;
  for (let i = 0, l = $or.length; i < l; i++) {
    const result = validateJson(value, $or[i], `${key}[${i}]`);
    if (result === '') return '';
  }
  return `${key}: None`;
};

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
export const TOption: TOption = (...args: any[]) => ({
  [innerName]: true,
  name: 'TOr',
  $or: [...args, TUndefined],
} as any);

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
  [innerName]: true,
  name: 'TArray',
  $array: arg,
} as any);
const isTArray = (value: Record<number | string | symbol, unknown>): value is { $array: TJsonData } => !isUndefined(value.$array);
const validateTArray = (value: unknown, test: { $array: TJsonData }, key: string) => {
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

export const TObject = <T>(arg: T): { [key: string]: T} => ({
  [innerName]: true,
  name: 'TObject',
  $object: arg,
} as any);
const isTObject = (value: Record<number | string | symbol, unknown>): value is { $object: TJsonData; } => !isUndefined(value.$object);
const validateTObject = (value: unknown, test: { $object: TJsonData }, key: string) => {
  if (isKeyValue(value)) {
    const { $object } = test;
    for (const property in value) {
      const result = validateJson(value[property], $object, `${key}.${property}`);
      if (result !== '') return result;
    }
    return '';
  } else {
    return `${key}: Not Object`;
  }
};

export const TCustomize = <T extends TJsonData>(test: T, errorMessage: string, isFunction: (value: unknown) => boolean): T => ({
  [innerName]: true,
  name: 'TCustomize',
  $customize: {
    errorMessage,  
    isFunction,
  },
} as any);
const isTCustomize = (value: Record<number | string | symbol, unknown>): value is { $customize: { errorMessage: string; isFunction: (value: unknown) => boolean; } } => !isUndefined(value.$customize);
const validateTCustomize = (value: unknown, test: { $customize: { errorMessage: string; isFunction: (value: unknown) => boolean; } }, key: string) => {
  const { errorMessage, isFunction } = test.$customize;
  return isFunction(value) ? '' : `${key}: ${errorMessage}`;
};

export const validateJson = (value: unknown, test: TJsonData, key: string = 'root'): string => {
  if (isKeyValue(test)) {
    if (innerName in test) {
      switch (test.name) {
        case 'TStrict':
          if (isTStrict(test)) {
            return validateTStrict(value, test, key);
          }
          break;
        case 'TOr':
          if (isTOr(test)) {
            return validateTOr(value, test, key);
          }
          break;
        case 'TArray':
          if (isTArray(test)) {
            return validateTArray(value, test, key);
          }
          break;
        case 'TObject':
          if (isTObject(test)) {
            return validateTObject(value, test, key);
          }
          break;
        case 'TCustomize':
          if (isTCustomize(test)) {
            return validateTCustomize(value, test, key);
          }
          break;
      }
      return 'unknown';
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
export const returnJson = <T extends TFirstJsonData>(value: unknown, test: T, valueInsteadOfError?: T): T => {
  const message = validateJson(value, test);
  if (message === '') {
    return value as any;
  } else {
    if (!isUndefined(valueInsteadOfError))
      return valueInsteadOfError;
    throw new TypeError(message);
  }
};

const a = returnJson({test: 'a'}, { test: 'a'})