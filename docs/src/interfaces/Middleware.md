[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: Middleware()\<Ctx, Res\>

Middleware 类型定义了一个中间件函数的签名。
中间件函数接收一个上下文对象和一个 next 函数，并返回一个 Promise 对象。

## Extended by

- [`Opeartion`](Opeartion.md)

## 类型参数

| 类型参数 | Value | 描述 |
| :------ | :------ | :------ |
| `Ctx` | [`Context`](../type-aliases/Context.md) | 上下文对象的类型。 |
| `Res` | `any` | 中间件函数返回类型。 |

> **Middleware**(`ctx`, `next`): `Promise`\<`Res`\>

## 参数

| 参数名 | 类型 |
| :------ | :------ |
| `ctx` | `Ctx` |
| `next` | [`Next`](Next.md)\<`any`\> |

## 返回值类型

`Promise`\<`Res`\>

## 查看源码

[types.ts:157](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/types.ts#L157)
