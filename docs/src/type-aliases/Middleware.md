[**onion-interceptor**](../README.md) • **Docs**

***

# 类型别名: Middleware()\<Ctx, Res\>

> **Middleware**\<`Ctx`, `Res`\>: (`ctx`, `next`) => `Promise`\<`void` \| `Res`\>

Middleware 类型定义了一个中间件函数的签名。
中间件函数接收一个上下文对象和一个 next 函数，并返回一个 Promise 对象。

## 类型参数

| 类型参数 | Value | 描述 |
| :------ | :------ | :------ |
| `Ctx` | `any` | 上下文对象的类型。 |
| `Res` | `any` | - |

## 参数

| 参数名 | 类型 |
| :------ | :------ |
| `ctx` | `Ctx` |
| `next` | [`Next`](Next.md) |

## 返回值类型

`Promise`\<`void` \| `Res`\>

## 查看源码

[types.ts:8](https://github.com/coverjs/onion-interceptor/blob/4cc2c488931cb6f687c063d370f3262121050ff8/packages/core/src/types.ts#L8)
