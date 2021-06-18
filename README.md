# type-guard

## The typeguard function

|  name  |  description  |
| ------ | ------------- |
| isUndefined | If the first argument is undefined, return true. |
| isNUll | If the first argument is null, return true. |
| isString | If the first argument is string, return true. |
| isNumber | If the first argument is number, return true. |
| isBoolean | If the first argument is boolean, return true. |
| isArray | If the first argument is array, return true. |
| isObject | If the first argument is object, return true. |
| isSymbol | If the first argument is symbol, return true. |
| isFunction | If the first argument is function, return true. |

|  name  |  description  |
| ------ | ------------- |
| isStringNotEmpty | If the first argument is string and not the empty string, return true. |
| isArrayOfNumber | If the first argument is number[], return true. |
| isArrayOfString | If the first argument is string[], return true. |
| isArrayOfStringNotEmpty | If the first argument is string[], return true. |
| isKeyValue | If the first argument is key-value object, return true. |

## The validate function

|  name  |  description  |
| ------ | ------------- |
| isValidPositiveNumber | If the first argument is positive number, return true. |
| isValidNegativeNumber | If the first argument is negative number, return true. |
| isValidInteger | If the first argument is integer, return true. |
| isValidPositiveInteger | If the first argument is positive integer, return true. |
| isValidNegativeInteger | If the first argument is negative integer, return true. |
| hasEnumerableKey | If the first argument is key-value object and has at least one enumerable key, return true. |

## JSON validation

#### validateJson(jsonData: any, testData: TJsonData, key: string = 'root'): string

```ts
  import { validateJson, TNumber } from '@jt/type-guard';

  const jsonData = require('../config.json');
  const message = validateJson(jsonData, {
    network: {
      port: TNumber
    }
  });
```

#### isValidJson(jsonData: any, testData: TJsonData): boolean

```ts
  import { validateJson, TNumber } from '@jt/type-guard';

  const jsonData = require('../config.json');
  if(isValidJson(jsonData, {
    network: {
      port: TNumber
    }
  })) {
    /*...*/
  };
```

#### returnJson(jsonData: any, testData: TJsonData, valueInsteadOfError?: TJsonData): TJsonData

```ts
  import { returnJson, TNumber } from '@jt/type-guard';

  const jsonData = returnJson(require('../config.json'), {
    network: {
      port: TNumber
    }
  });
```

### JSON data

 - TString
 - TNumber
 - TBoolean
 - TNull
 - TUndefined

### JSON function

 - TStrict
 - TOr
 - TOption
 - TStrictArray
 - TArray
 - TObject

## Example

```ts
  import { isValidJson, TString, TNumber, TBoolean, TNull, TUndefined, TOr, TArray } from '@jt/type-guard';

  const jsonData: any = {
    "item": [
      {
        "id": 100,
        "name": "item-name",
        "active": true,
        "description": null,
        "attributes": {
          "color": "red",
          "size": 10
        }
      },
      {
        "id": 101,
        "name": "item-name1",
        "active": false,
        "description": "inactive",
        "attributes": {
          "color": "blue"
        }
      }
    ]
  };
  if(isValidJson(jsonData, {
    item: TArray({
      id: TNumber,
      name: TString,
      active: TBoolean,
      description: TOr(TString, TNull),
      attributes: {
        color: TString,
        size: TOr(TNumber, TUndefined),
      },
    }),
  })) {
    /*...*/
  };
```

 # License

MIT
