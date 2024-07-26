[**onion-interceptor**](../README.md) • **Docs**

***

# 函数: operate()

> **operate**(`fn`): [`Opeartion`](../interfaces/Opeartion.md)

Generate Operator 函数用于创建一个操作符。

## 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| `fn` | [`Middleware`](../type-aliases/Middleware.md) | 要转换成操作符的中间件函数。 |

## 返回值类型

[`Opeartion`](../interfaces/Opeartion.md)

转换后的操作符。

## 示例

```typescript
// 创建操作符用于 一些快捷操作 如 catchError 等
const myMiddleware = (ctx: any, next: Next) => {
  // do something
};
const myOperation = operate(myMiddleware);

```

## 查看源码

[index.ts:71](https://github.com/coverjs/onion-interceptor/blob/4cc2c488931cb6f687c063d370f3262121050ff8/packages/core/src/index.ts#L71)
