[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: Opeartion()

Operation 接口扩展了 Middleware 类型，表示一个操作。
操作对象包含一个特殊的键，用于标识它是一个操作。

## 继承

- [`Middleware`](Middleware.md)

> **Opeartion**(`ctx`, `next`): `Promise`\<`any`\>

## 参数

| 参数名 | 类型 |
| :------ | :------ |
| `ctx` | [`Context`](Context.md) |
| `next` | [`Next`](Next.md)\<`any`\> |

## 返回值类型

`Promise`\<`any`\>

## 查看源码

[types.ts:202](https://github.com/coverjs/onion-interceptor/blob/87a6c5cc986300604182f401f081b47e89a260b5/packages/core/src/types.ts#L202)

## Properties

### \[isOpeartionKey\]

> **\[isOpeartionKey\]**: `boolean`

#### 查看源码

[types.ts:203](https://github.com/coverjs/onion-interceptor/blob/87a6c5cc986300604182f401f081b47e89a260b5/packages/core/src/types.ts#L203)
