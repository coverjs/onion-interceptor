[**onion-interceptor**](../README.md) • **Docs**

***

# 类: OnionInterceptor\<Ctx\>

创建一个洋葱模型拦截器
 ,泛型 Ctx 上下文类型

## 类型参数

| 类型参数 | Value |
| :------ | :------ |
| `Ctx` | `any` |

## Constructors

### new OnionInterceptor()

> **new OnionInterceptor**\<`Ctx`\>(`instance`?): [`OnionInterceptor`](OnionInterceptor.md)\<`Ctx`\>

构造函数

#### 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| `instance`? | [`AxiosInstanceLike`](../interfaces/AxiosInstanceLike.md) | axios实例(可选) |

#### 返回值类型

[`OnionInterceptor`](OnionInterceptor.md)\<`Ctx`\>

#### 查看源码

[index.ts:184](https://github.com/coverjs/onion-interceptor/blob/d78f7a0ebce89e605082747d9c7461d8b8bdb161/packages/core/src/index.ts#L184)

## Methods

### handle()

> **handle**(`ctx`, `coreFn`): `Promise`\<`void`\>

Use the onion interceptor to intercept the target function.

#### 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| `ctx` | `Ctx` |  |
| `coreFn` | `Function` |  |

#### 返回值类型

`Promise`\<`void`\>

#### 查看源码

[index.ts:215](https://github.com/coverjs/onion-interceptor/blob/d78f7a0ebce89e605082747d9c7461d8b8bdb161/packages/core/src/index.ts#L215)

***

### use()

> **use**(...`args`): [`OnionInterceptor`](OnionInterceptor.md)\<`Ctx`\>

Adding Middleware to the Interceptor Instance

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| ...`args` | ([`Middleware`](../type-aliases/Middleware.md)\<`Ctx`\> \| [`MiddlewareKlassConstructor`](../interfaces/MiddlewareKlassConstructor.md)\<`Ctx`\>)[] |

#### 返回值类型

[`OnionInterceptor`](OnionInterceptor.md)\<`Ctx`\>

#### 查看源码

[index.ts:200](https://github.com/coverjs/onion-interceptor/blob/d78f7a0ebce89e605082747d9c7461d8b8bdb161/packages/core/src/index.ts#L200)
