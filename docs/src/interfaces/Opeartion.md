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

[types.ts:197](https://github.com/coverjs/onion-interceptor/blob/482006a5b14f2e170b14bf7df69cb7f1dffb81fb/packages/core/src/types.ts#L197)

## Properties

### \[isOpeartionKey\]

> **\[isOpeartionKey\]**: `boolean`

#### 查看源码

[types.ts:198](https://github.com/coverjs/onion-interceptor/blob/482006a5b14f2e170b14bf7df69cb7f1dffb81fb/packages/core/src/types.ts#L198)
