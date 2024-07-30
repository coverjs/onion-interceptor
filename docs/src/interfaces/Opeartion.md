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

[types.ts:200](https://github.com/coverjs/onion-interceptor/blob/387df229bd70097d41558280358ae6cae4483713/packages/core/src/types.ts#L200)

## Properties

### \[isOpeartionKey\]

> **\[isOpeartionKey\]**: `boolean`

#### 查看源码

[types.ts:201](https://github.com/coverjs/onion-interceptor/blob/387df229bd70097d41558280358ae6cae4483713/packages/core/src/types.ts#L201)
