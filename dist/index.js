"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnJson = exports.isValidJson = exports.validateJson = exports.TArray = exports.TStrictArray = exports.TOr = exports.TUndefined = exports.TNull = exports.TBoolean = exports.TNumber = exports.TString = exports.isFunction = exports.isSymbol = exports.hasEnumerableKey = exports.isKeyValue = exports.isObject = exports.isArrayOfStringNotEmpty = exports.isArrayOfString = exports.isArrayOfNumber = exports.isArray = exports.isBoolean = exports.isValidNegativeInteger = exports.isValidPositiveInteger = exports.isValidInteger = exports.isValidNegativeNumber = exports.isValidPositiveNumber = exports.isNumber = exports.isStringNotEmpty = exports.isString = exports.isNUll = exports.isUndefined = void 0;
const isUndefined = (value) => typeof value === 'undefined';
exports.isUndefined = isUndefined;
const isNUll = (value) => value === null;
exports.isNUll = isNUll;
const isString = (value) => typeof value === 'string';
exports.isString = isString;
const isStringNotEmpty = (value) => exports.isString(value) && value !== '';
exports.isStringNotEmpty = isStringNotEmpty;
const isNumber = (value) => typeof value === 'number';
exports.isNumber = isNumber;
const isValidPositiveNumber = (value) => exports.isNumber(value) && value > 0;
exports.isValidPositiveNumber = isValidPositiveNumber;
const isValidNegativeNumber = (value) => exports.isNumber(value) && value < 0;
exports.isValidNegativeNumber = isValidNegativeNumber;
const isValidInteger = (value) => exports.isNumber(value) && Number.isInteger(value);
exports.isValidInteger = isValidInteger;
const isValidPositiveInteger = (value) => exports.isValidPositiveNumber(value) && exports.isValidInteger(value);
exports.isValidPositiveInteger = isValidPositiveInteger;
const isValidNegativeInteger = (value) => exports.isValidNegativeNumber(value) && exports.isValidInteger(value);
exports.isValidNegativeInteger = isValidNegativeInteger;
const isBoolean = (value) => typeof value === 'boolean';
exports.isBoolean = isBoolean;
const isArray = (value) => Array.isArray(value);
exports.isArray = isArray;
const isArrayOfNumber = (value) => Array.isArray(value) && value.every(v => exports.isNumber(v));
exports.isArrayOfNumber = isArrayOfNumber;
const isArrayOfString = (value) => Array.isArray(value) && value.every(v => exports.isString(v));
exports.isArrayOfString = isArrayOfString;
const isArrayOfStringNotEmpty = (value) => Array.isArray(value) && value.every(v => exports.isStringNotEmpty(v));
exports.isArrayOfStringNotEmpty = isArrayOfStringNotEmpty;
const isObject = (value) => typeof value === 'object';
exports.isObject = isObject;
const isKeyValue = (value) => exports.isObject(value) && !exports.isNUll(value) && !exports.isArray(value);
exports.isKeyValue = isKeyValue;
const hasEnumerableKey = (value) => exports.isKeyValue(value) && Object.keys(value).length !== 0;
exports.hasEnumerableKey = hasEnumerableKey;
const isSymbol = (value) => typeof value === 'symbol';
exports.isSymbol = isSymbol;
const isFunction = (value) => typeof value === 'function';
exports.isFunction = isFunction;
exports.TString = '';
exports.TNumber = 0;
exports.TBoolean = true;
exports.TNull = null;
exports.TUndefined = undefined;
const validateBaseJsonData = (value, test, key) => {
    if (exports.isString(test)) {
        return exports.isString(value) ? '' : `${key}: Not String`;
    }
    else if (exports.isNumber(test)) {
        return exports.isNumber(value) ? '' : `${key}: Not Number`;
    }
    else if (exports.isBoolean(test)) {
        return exports.isBoolean(value) ? '' : `${key}: Not Boolean`;
    }
    else if (exports.isNUll(test)) {
        return exports.isNUll(value) ? '' : `${key}: Not Null`;
    }
    else if (exports.isUndefined(test)) {
        return exports.isUndefined(value) ? '' : `${key}: Not Undefined`;
    }
    else {
        return 'unknown';
    }
};
const TOr = (...args) => ({
    name: 'TOr',
    $or: args,
});
exports.TOr = TOr;
const isTOr = (value) => value.name === 'TOr' && exports.isArray(value.$or) && value.$or.length > 1;
const validateOr = (value, test, key) => {
    const { $or } = test;
    for (let i = 0, l = $or.length; i < l; i++) {
        const result = exports.validateJson(value, $or[i], `${key}[${i}]`);
        if (result === '')
            return '';
    }
    return `${key}: None`;
};
const TStrictArray = (...args) => args;
exports.TStrictArray = TStrictArray;
const TArray = (arg) => ({
    name: 'TArray',
    $array: arg,
});
exports.TArray = TArray;
const isTArray = (value) => value.name === 'TArray' && !exports.isUndefined(value.$array);
const validateArray = (value, test, key) => {
    if (exports.isArray(value)) {
        const { $array } = test;
        for (let i = 0, l = value.length; i < l; i++) {
            const result = exports.validateJson(value[i], $array, `${key}[${i}]`);
            if (result !== '')
                return result;
        }
        return '';
    }
    else {
        return `${key}: Not Array`;
    }
};
const validateJson = (value, test, key = 'root') => {
    if (exports.isKeyValue(test)) {
        if (isTOr(test)) {
            return validateOr(value, test, key);
        }
        if (isTArray(test)) {
            return validateArray(value, test, key);
        }
        if (exports.isKeyValue(value)) {
            for (const property in test) {
                const result = exports.validateJson(value[property], test[property], `${key}.${property}`);
                if (result !== '')
                    return result;
            }
            return '';
        }
        return `${key}: Not Object`;
    }
    else if (exports.isArray(test)) {
        if (exports.isArray(value)) {
            for (let i = 0, l = test.length; i < l; i++) {
                const result = exports.validateJson(value[i], test[i], `${key}[${i}]`);
                if (result !== '')
                    return result;
            }
            return '';
        }
        else {
            return `${key}: Not Array`;
        }
    }
    return validateBaseJsonData(value, test, key);
};
exports.validateJson = validateJson;
const isValidJson = (value, test) => exports.validateJson(value, test) === '';
exports.isValidJson = isValidJson;
const returnJson = (value, test, valueInsteadOfError) => {
    const message = exports.validateJson(value, test);
    if (message === '') {
        return value;
    }
    else {
        if (!exports.isUndefined(valueInsteadOfError))
            return valueInsteadOfError;
        throw new TypeError(message);
    }
};
exports.returnJson = returnJson;
//# sourceMappingURL=index.js.map