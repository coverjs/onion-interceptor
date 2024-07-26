[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: Opeartion()

Operation 接口扩展了 Middleware 类型，表示一个操作。
操作对象包含一个特殊的键，用于标识它是一个操作。

## 继承

- [`Middleware`](../type-aliases/Middleware.md)

> **Opeartion**(`ctx`, `next`): `Promise`\<`any`\>

## 参数

| 参数名 | 类型 |
| :------ | :------ |
| `ctx` | `any` |
| `next` | [`Next`](../type-aliases/Next.md) |

## 返回值类型

`Promise`\<`any`\>

## 查看源码

[types.ts:21](https://github.com/coverjs/onion-interceptor/blob/4cc2c488931cb6f687c063d370f3262121050ff8/packages/core/src/types.ts#L21)

## Properties

### \[isOpeartionKey\]

> **\[isOpeartionKey\]**: `boolean`

#### 查看源码

[types.ts:22](https://github.com/coverjs/onion-interceptor/blob/4cc2c488931cb6f687c063d370f3262121050ff8/packages/core/src/types.ts#L22)
