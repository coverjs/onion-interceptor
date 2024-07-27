[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: MiddlewareKlass\<Ctx\>

MiddlewareKlass 接口定义了一个中间件类的结构。
它包含一个 intercept 方法，该方法符合 Middleware 函数签名。

## Template

上下文对象的类型。

## 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `Ctx` | [`Context`](../type-aliases/Context.md) |

## Properties

### intercept

> **intercept**: [`Middleware`](Middleware.md)\<`Ctx`, `any`\>

#### 查看源码

[types.ts:191](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/types.ts#L191)
