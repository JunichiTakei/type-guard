"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnJson = exports.isValidJson = exports.validateJson = exports.TCustomize = exports.TObject = exports.TArray = exports.TStrictArray = exports.TOption = exports.TOr = exports.TStrict = exports.TUndefined = exports.TNull = exports.TBoolean = exports.TNumber = exports.TString = exports.isFunction = exports.isSymbol = exports.hasEnumerableKey = exports.isKeyValue = exports.isObject = exports.isArrayOfStringNotEmpty = exports.isArrayOfString = exports.isArrayOfNumber = exports.isArray = exports.isBoolean = exports.isValidNegativeInteger = exports.isValidPositiveInteger = exports.isValidInteger = exports.isValidNegativeNumber = exports.isValidPositiveNumber = exports.isNumber = exports.isStringNotEmpty = exports.isString = exports.isNull = exports.isUndefined = void 0;
const isUndefined = (value) => typeof value === 'undefined';
exports.isUndefined = isUndefined;
const isNull = (value) => value === null;
exports.isNull = isNull;
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
const isKeyValue = (value) => exports.isObject(value) && !exports.isNull(value) && !exports.isArray(value);
exports.isKeyValue = isKeyValue;
const hasEnumerableKey = (value) => exports.isKeyValue(value) && Object.keys(value).length !== 0;
exports.hasEnumerableKey = hasEnumerableKey;
const isSymbol = (value) => typeof value === 'symbol';
exports.isSymbol = isSymbol;
const isFunction = (value) => typeof value === 'function';
exports.isFunction = isFunction;
/* ------------------------------------------------------------------------------------------- */
const innerName = Symbol('name');
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
    else if (exports.isNull(test)) {
        return exports.isNull(value) ? '' : `${key}: Not Null`;
    }
    else if (exports.isUndefined(test)) {
        return exports.isUndefined(value) ? '' : `${key}: Not Undefined`;
    }
    else {
        return 'unknown';
    }
};
const TStrict = (arg) => ({
    [innerName]: true,
    name: 'TStrict',
    $strict: arg,
});
exports.TStrict = TStrict;
const isTStrict = (value) => !exports.isUndefined(value.$strict);
const validateTStrict = (value, test, key) => {
    const { $strict } = test;
    return value === $strict ? '' : `${key} !== ${$strict}`;
};
const TOr = (...args) => ({
    [innerName]: true,
    name: 'TOr',
    $or: args,
});
exports.TOr = TOr;
const isTOr = (value) => exports.isArray(value.$or) && value.$or.length > 1;
const validateTOr = (value, test, key) => {
    const { $or } = test;
    const errors = [];
    for (let i = 0, l = $or.length; i < l; i++) {
        const result = exports.validateJson(value, $or[i], key);
        if (result === '') {
            return '';
        }
        else {
            errors.push(result);
        }
    }
    return `${key}: [${errors.join(', ')}]`;
};
const TOption = (...args) => ({
    [innerName]: true,
    name: 'TOr',
    $or: [...args, exports.TUndefined],
});
exports.TOption = TOption;
const TStrictArray = (...args) => args;
exports.TStrictArray = TStrictArray;
const TArray = (arg) => ({
    [innerName]: true,
    name: 'TArray',
    $array: arg,
});
exports.TArray = TArray;
const isTArray = (value) => !exports.isUndefined(value.$array);
const validateTArray = (value, test, key) => {
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
const TObject = (arg) => ({
    [innerName]: true,
    name: 'TObject',
    $object: arg,
});
exports.TObject = TObject;
const isTObject = (value) => !exports.isUndefined(value.$object);
const validateTObject = (value, test, key) => {
    if (exports.isKeyValue(value)) {
        const { $object } = test;
        for (const property in value) {
            const result = exports.validateJson(value[property], $object, `${key}.${property}`);
            if (result !== '')
                return result;
        }
        return '';
    }
    else {
        return `${key}: Not Object`;
    }
};
const TCustomize = (test, errorMessage, isFunction) => ({
    [innerName]: true,
    name: 'TCustomize',
    $customize: {
        errorMessage,
        isFunction,
    },
});
exports.TCustomize = TCustomize;
const isTCustomize = (value) => !exports.isUndefined(value.$customize);
const validateTCustomize = (value, test, key) => {
    const { errorMessage, isFunction } = test.$customize;
    return isFunction(value) ? '' : `${key}: ${errorMessage}`;
};
const validateJson = (value, test, key = 'root') => {
    if (exports.isKeyValue(test)) {
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
            if (value.length === test.length) {
                for (let i = 0, l = test.length; i < l; i++) {
                    const result = exports.validateJson(value[i], test[i], `${key}[${i}]`);
                    if (result !== '')
                        return result;
                }
                return '';
            }
            else {
                return `${key}: Arrays' length are different from each other`;
            }
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
const a = exports.returnJson({ test: 'a' }, { test: 'a' });
//# sourceMappingURL=index.js.map