[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: Next()\<Res\>

Next 类型定义了 next 函数的签名。
next 函数用于调用中间件链的下一个中间件或执行核心逻辑。

## 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `Res` | `any` |

> **Next**(...`args`): `Promise`\<`void` \| `Res`\>

## 参数

| 参数名 | 类型 |
| :------ | :------ |
| ...`args` | [`Opeartion`](Opeartion.md)[] |

## 返回值类型

`Promise`\<`void` \| `Res`\>

## 查看源码

[types.ts:193](https://github.com/coverjs/onion-interceptor/blob/387df229bd70097d41558280358ae6cae4483713/packages/core/src/types.ts#L193)
