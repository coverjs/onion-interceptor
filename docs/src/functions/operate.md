[**onion-interceptor**](../README.md) • **Docs**

***

# 函数: operate()

> **operate**(`fn`): [`Opeartion`](../interfaces/Opeartion.md)

Generate Operator 函数用于创建一个操作符。

## 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| `fn` | [`Middleware`](../interfaces/Middleware.md)\<[`Context`](../interfaces/Context.md), `any`\> | 要转换成操作符的中间件函数。 |

## 返回值类型

[`Opeartion`](../interfaces/Opeartion.md)

转换后的操作符。

## 示例

[@onion-interceptor/pipes - npm (npmjs.com)](https://www.npmjs.com/package/@onion-interceptor/pipes) 该库中的 操作符就是基于 operate 封装的。
```typescript
// 创建操作符用于一些快捷操作 如 catchError 等
const myMiddleware:Middleware = async (ctx, next) => {
  // do something
  await next();
  // do something
};
const myOperation = operate(myMiddleware);

```

## 查看源码

[index.ts:91](https://github.com/coverjs/onion-interceptor/blob/87a6c5cc986300604182f401f081b47e89a260b5/packages/core/src/index.ts#L91)
