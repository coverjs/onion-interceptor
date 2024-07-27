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
| `ctx` | [`Context`](../type-aliases/Context.md) |
| `next` | [`Next`](Next.md)\<`any`\> |

## 返回值类型

`Promise`\<`any`\>

## 查看源码

[types.ts:173](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/types.ts#L173)

## Properties

### \[isOpeartionKey\]

> **\[isOpeartionKey\]**: `boolean`

#### 查看源码

[types.ts:174](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/types.ts#L174)
