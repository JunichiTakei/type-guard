# type-guard

## 背景

TypeScirptで記述するのに毎回typeofを書いていたため、統一感があり見やすくするために構築  
4.3.2時点ではnotがなく、Exclude<T, U>では正確な型推論が働かないためすべて"is"で実装  
また、JSONのバリデーションでは様々なライブラリがあるものの、型推論と同時にバリデーションを行えるものはなかったため仕組みを実装

## typeguard 関数

基本となる関数  
typeofの変わりに利用することになる

|  関数名  |  判定  |
| ------ | ------------- |
| isUndefined | undefined |
| isNUll | null |
| isString | string |
| isNumber | number |
| isBoolean | boolean |
| isArray | array |
| isObject | object |
| isSymbol | symbol |
| isFunction | function |

発展形の関数  
個人的によく利用するものをまとめたもの

|  関数名  |  判定  |
| ------ | ------------- |
| isStringNotEmpty | stringかつ空文字列ではない |
| isArrayOfNumber | number[] |
| isArrayOfString | string[] |
| isArrayOfStringNotEmpty | (stringかつ空文字列ではない)[] |
| isKeyValue | { [key: number \| string \| symbol]: unknown } |

## バリデーション関数

型判別以上のことを行う関数  
TypeScriptの型としては上記と変わらないが、追加でロジックを追加しているため扱い注意

|  関数名  |  判定  |
| ------ | ------------- |
| isValidPositiveNumber | 0より大きい数 |
| isValidNegativeNumber | 0より小さい数 |
| isValidInteger | 整数 |
| isValidPositiveInteger | 0より大きい整数 |
| isValidNegativeInteger | 0より小さい整数 |
| hasEnumerableKey | 列挙可能プロパティが存在するオブジェクト |

## JSONのバリデーション関数

#### validateJson(jsonData: any, testData: TJsonData, key: string = 'root'): string

判定を行い、問題がなければ空文字列が返る  
問題がある場合には、詳細が文字列として返る

 - 第一引数: jsonデータ
 - 第二引数: 判定用のデータ

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

typeguardとして機能し、判定を行う

 - 第一引数: jsonデータ
 - 第二引数: 判定用のデータ

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

型指定した上で値を返す  
第三引数を指定しない場合、判定で適切ではない場合にはエラーとなる  
指定した場合にはエラーにはならずに、その指定した値を返す

 - 第一引数: jsonデータ
 - 第二引数: 判定用のデータ
 - 第三引数: エラーの代わりとなるデータ

```ts
  import { returnJson, TNumber } from '@jt/type-guard';

  const jsonData = returnJson(require('../config.json'), {
    network: {
      port: TNumber
    }
  });
```

### 判定用のデータ作成のための値

JSONの仕様としてはundefinedは存在しないが、TypeScriptの型では存在する可能性がある

 - TString
 - TNumber
 - TBoolean
 - TNull
 - TUndefined

### JSON function

JavaScriptには型がないため、表現するための関数  
型のためにキャストを行っている  
実際の返り値と型は一致していないので、単独では利用しないこと

 - TOr
 - TStrictArray
 - TArray

## 例

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
