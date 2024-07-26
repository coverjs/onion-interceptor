[**onion-interceptor**](../README.md) • **Docs**

***

# 类型别名: Next()

> **Next**: (...`args`) => `Promise`\<`void`\>

Next 类型定义了 next 函数的签名。
next 函数用于调用中间件链的下一个中间件或执行核心逻辑。

## 参数

| 参数名 | 类型 |
| :------ | :------ |
| ...`args` | [`Opeartion`](../interfaces/Opeartion.md)[] |

## 返回值类型

`Promise`\<`void`\>

## 查看源码

[types.ts:15](https://github.com/coverjs/onion-interceptor/blob/4cc2c488931cb6f687c063d370f3262121050ff8/packages/core/src/types.ts#L15)
