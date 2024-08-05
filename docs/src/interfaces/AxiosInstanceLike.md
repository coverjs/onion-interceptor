[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: AxiosInstanceLike\<Cfg, Res\>

AxiosInstanceLike 接口定义了一个类似 Axios 实例的结构。
它包含 request 方法以及可选的 HTTP 方法快捷函数。

## 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `Cfg` | `RequestConfig` |
| `Res` | `RequestResponse` |

## Indexable

 \[`key`: `string`\]: `any`

## Properties

### defaults?

> `optional` **defaults**: `any`

defaults 属性存储实例的默认配置。

#### 查看源码

[types.ts:109](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L109)

***

### request()

> **request**: (...`args`) => `Promise`\<`Res`\>

request 方法用于执行 HTTP 请求。

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| ...`args` | `any`[] |

#### 返回值类型

`Promise`\<`Res`\>

#### 查看源码

[types.ts:107](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L107)

## Methods

### delete()?

> `optional` **delete**\<`T`\>(`url`, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:113](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L113)

***

### get()?

> `optional` **get**\<`T`\>(`url`, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:112](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L112)

***

### head()?

> `optional` **head**\<`T`\>(`url`, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:114](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L114)

***

### options()?

> `optional` **options**\<`T`\>(`url`, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:115](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L115)

***

### patch()?

> `optional` **patch**\<`T`\>(`url`, `data`?, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `data`? | `unknown` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:126](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L126)

***

### patchForm()?

> `optional` **patchForm**\<`T`\>(`url`, `data`?, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `data`? | `unknown` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:143](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L143)

***

### post()?

> `optional` **post**\<`T`\>(`url`, `data`?, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `data`? | `unknown` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:116](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L116)

***

### postForm()?

> `optional` **postForm**\<`T`\>(`url`, `data`?, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `data`? | `unknown` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:133](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L133)

***

### put()?

> `optional` **put**\<`T`\>(`url`, `data`?, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `data`? | `unknown` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:121](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L121)

***

### putForm()?

> `optional` **putForm**\<`T`\>(`url`, `data`?, `config`?): `AxiosPromise`\<`T`\>

#### 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `T` | `any` |

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| `url` | `string` |
| `data`? | `unknown` |
| `config`? | `AxiosRequestConfig`\<`any`\> |

#### 返回值类型

`AxiosPromise`\<`T`\>

#### 查看源码

[types.ts:138](https://github.com/coverjs/onion-interceptor/blob/0d4864b4abe76f2775e8aa0322864f4fcb048baa/packages/core/src/types.ts#L138)
