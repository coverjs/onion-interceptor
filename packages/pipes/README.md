# @onion-interceptor/pipes

`@onion-interceptor/pipes` 是一个操作管道工具，它允许您以一种更简洁的方式编写请求拦截器。

## 安装

使用 npm 或 yarn 或 pnpm 安装 `@onion-interceptor/pipes` :

```bash
npm install @onion-interceptor/pipes
```

或者

```bash
yarn add @onion-interceptor/pipes
```

或者

```bash
pnpm add @onion-interceptor/pipes
```

## 使用方法

- catchError

> 捕获错误

```typescript
import { catchError } from "@onion-interceptor/pipes";
import type { Next, Context } from "onion-interceptor";

export async function errorInterceptor(ctx: Context, next: Next) {
  console.log("errorInterceptor start", ctx);
  await next(
    catchError((err) => {
      console.log(error);
      return Promise.reject(error);
    })
  );
  console.log("errorInterceptor end", ctx);
}
```

- finalize

> finalize 是一个操作管道，用于在请求或响应完成时执行一些操作(不管成功或失败)。

```typescript
import { finalize } from '@onion-interceptor/pipes'
import type { Next, Context } from 'onion-interceptor'

export async function loadingInterceptor(ctx: Context, next: Next) {
  console.log('loadingInterceptor start', ctx)
  await next(finally(() => console.log('loadingInterceptor end', ctx)))
}
```

- tap

> tap 是一个操作管道，可接受三个回调函数，后两个选填 分别为 成功后的回调，错误回调，无论成功还是失败都会执行的回调。

```typescript
import { tap } from "@onion-interceptor/pipes";

export async function errorInterceptor(ctx: Context, next: Next) {
  console.log("errorInterceptor start", ctx);
  await next(
    tap(
      (_ctx) => console.log("find error in res", _ctx.res),
      (error) => {
        console.log(error);
        return Promise.reject(error);
      },
      () => console.log("errorInterceptor end", ctx)
    )
  );
}
```

- delay

> 延迟拦截器

```typescript
import type { Next, Context } from 'onion-interceptor'
import { delay,finalize } from '@onion-interceptor/pipes'

export async function loadingInterceptor(ctx: Context, next: Next) {
  console.log('loadingInterceptor start', ctx)
  // 延迟 1 秒才执行
  await next(delay(1000),finally(() => console.log('loadingInterceptor end', ctx)))
}
```

## 贡献

如果你有任何疑问或建议，欢迎提交 issue 或 PR。

## 许可

本项目使用 MIT 许可证。
