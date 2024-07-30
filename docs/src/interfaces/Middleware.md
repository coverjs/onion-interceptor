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
| `Ctx` | [`Context`](Context.md) | 上下文对象的类型。 |
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

[types.ts:181](https://github.com/coverjs/onion-interceptor/blob/39df853848f88c9b20849334a641a1e2329fe982/packages/core/src/types.ts#L181)
