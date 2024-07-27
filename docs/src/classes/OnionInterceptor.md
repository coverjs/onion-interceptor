[**onion-interceptor**](../README.md) • **Docs**

***

# 类: OnionInterceptor

OnionInterceptor 类创建一个洋葱模型拦截器。
拦截器可以用于拦截和修改 HTTP 请求和响应。

## Param

(可选) Axios 实例。

## 示例

```typescript
import type { Context, Next } from 'onion-interceptor';
import { OnionInterceptor } from 'onion-interceptor';
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 洋葱拦截器 实例化时可以传入类 Axios 实例 (也就意味着 可以通过 fetch 封装)
// 只需要实例上存在 request 方法，和 defaults (默认配置) 属性即可
const interceptor = new OnionInterceptor(http);

interceptor.use(async(ctx: Context, next: Next) => {
  // 在这里可以修改请求配置或执行其他操作
  await next();
});
```

## Constructors

### new OnionInterceptor()

> **new OnionInterceptor**(`instance`?): [`OnionInterceptor`](OnionInterceptor.md)

构造函数

#### 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| `instance`? | `AxiosInstanceLike`\<`any`\> | axios实例(可选) |

#### 返回值类型

[`OnionInterceptor`](OnionInterceptor.md)

#### 查看源码

[index.ts:245](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/index.ts#L245)

## Methods

### handle()

> **handle**(`ctx`, `coreFn`): `Promise`\<`void`\>

handle 方法用于使用洋葱拦截器拦截目标函数(是的通用性大幅提高)。

#### 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| `ctx` | [`Context`](../type-aliases/Context.md) | 上下文对象。 |
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

[index.ts:313](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/index.ts#L313)

***

### use()

> **use**(...`args`): [`OnionInterceptor`](OnionInterceptor.md)

use 方法用于添加中间件到拦截器实例。

#### 参数

| 参数名 | 类型 |
| :------ | :------ |
| ...`args` | ([`Middleware`](../interfaces/Middleware.md)\<[`Context`](../type-aliases/Context.md), `any`\> \| `MiddlewareKlassConstructor`\<[`Context`](../type-aliases/Context.md)\>)[] |

#### 返回值类型

[`OnionInterceptor`](OnionInterceptor.md)

当前拦截器实例。

#### Example

```typescript
class AuthMiddleware {
  async intercept(ctx: Context, next: Next) {
    // 添加认证逻辑
    await next();
  }
}

async funciont loadingMiddleware(ctx: Context, next: Next) {
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

[index.ts:285](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/index.ts#L285)
