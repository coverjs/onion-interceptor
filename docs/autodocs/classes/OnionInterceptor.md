[**onion-interceptor**](../README.md) • **Docs**

***

# 类: OnionInterceptor\<Ctx\>

OnionInterceptor 类创建一个洋葱模型拦截器。
拦截器可以用于拦截和修改 HTTP 请求和响应。

## Param

(可选) Axios 实例。

## 示例

```typescript
import axios from 'axios';
const http = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});
const interceptor = new OnionInterceptor(http);

interceptor.use(async(ctx: any, next: Next) => {
  // 在这里可以修改请求配置或执行其他操作
  await next();
});
```

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
| `instance`? | `AxiosInstanceLike` | axios实例(可选) |

#### 返回值类型

[`OnionInterceptor`](OnionInterceptor.md)\<`Ctx`\>

#### 查看源码

[index.ts:230](https://github.com/coverjs/onion-interceptor/blob/d9442ccfd97eaff0832faec07c8e2be488e1ba7c/packages/core/src/index.ts#L230)

## Methods

### handle()

> **handle**(`ctx`, `coreFn`): `Promise`\<`void`\>

handle 方法用于使用洋葱拦截器拦截目标函数(是的通用性大幅提高)。

#### 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| `ctx` | `Ctx` | 上下文对象。 |
| `coreFn` | `Function` | 核心函数。 |

#### 返回值类型

`Promise`\<`void`\>

一个 Promise，代表拦截处理的结果。

#### Example

```typescript
// 当构造函数为传入参数，可以使用 handle 方法进行拦截处理。
const ctx = { foo: 'bar' };
interceptor.handle(ctx, async(_ctx, next) => {
  // 执行核心逻辑
  await doSomething();
  ctx.someData = 'some data';
  next();
});
```

#### 查看源码

[index.ts:298](https://github.com/coverjs/onion-interceptor/blob/d9442ccfd97eaff0832faec07c8e2be488e1ba7c/packages/core/src/index.ts#L298)

***

### use()

> **use**(...`args`): [`OnionInterceptor`](OnionInterceptor.md)\<`Ctx`\>

use 方法用于添加中间件到拦截器实例。

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| ...`args` | ([`Middleware`](../type-aliases/Middleware.md)\<`Ctx`\> \| [`MiddlewareKlassConstructor`](../interfaces/MiddlewareKlassConstructor.md)\<`Ctx`\>)[] |

#### 返回值类型

[`OnionInterceptor`](OnionInterceptor.md)\<`Ctx`\>

当前拦截器实例。

#### Example

```typescript
class AuthMiddleware {
  async intercept(ctx: any, next: Next) {
    // 添加认证逻辑
    await next();
  }
}

async funciont loadingMiddleware(ctx: any, next: Next) {
   // loading start
   try {
     await next();
   } finally {
     // loading end
   }
}

interceptor.use(loadingMiddlewre, AuthMiddleware);
// or interceptor.use(loadingMiddlewre).use(AuthMiddleware);
// or interceptor.use(loadingMiddlewre); interceptor.use(AuthMiddleware);
```

#### 查看源码

[index.ts:270](https://github.com/coverjs/onion-interceptor/blob/d9442ccfd97eaff0832faec07c8e2be488e1ba7c/packages/core/src/index.ts#L270)
