# onion-interceptor

`onion-interceptor` 是一个受 Koa 洋葱模型和 Angular Interceptor 启发的请求拦截器工具，它允许您以 Koa 中间件的形式为 axios、fetch 等 HTTP 客户端编写请求拦截器。

## 特点

- 支持多种 HTTP 请求库。
- 灵活的洋葱模型拦截器，可以轻松添加、修改或移除拦截器。
- 易于集成和使用。

## 安装

使用 npm 或 yarn 安装 `onion-interceptor` :

```bash
npm install onion-interceptor
```

或者

```bash
yarn add onion-interceptor
```

## 使用方法

### 初始化

```typescript
/// http.ts
import { createInterceptor } from "onion-interceptor";
import {
  loadingInterceptor,
  errorInterceptor,
  authInterceptor,
  dataInterceptor,
} from "../interceptors";
import axios from "axios";

const http = axios.create({
  baseURL: "https://api.github.com",
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

/// createInterceptor接收一个类 AxiosInstance 实例作为参数
createInterceptor(http).use(
  dataInterceptor,
  errorInterceptor,
  loadingInterceptor,
  authInterceptor
);
/// 调用 use 方法 (可链式调用也可一次传入多个拦截器作为参数)
// 或者 createInterceptor(http).use(errorInterceptor).use(loadingInterceptor).use(authInterceptor)

export default http;
```

### 拦截器书写

```typescript
/// 有函数和类两种写法

import type { Next, Context, Middleware } from "onion-interceptor";

export async function authInterceptor(ctx: Context, next: Next) {
  console.log("authInterceptor start", ctx);
  await next();
  console.log("authInterceptor end", ctx);
}

export async function errorInterceptor(ctx: Context, next: Next) {
  console.log("errorInterceptor start", ctx);
  try {
    await next();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  } finally {
    console.log("errorInterceptor end", ctx);
  }
}

export async function loadingInterceptor(ctx: Context, next: Next) {
  console.log("loadingInterceptor start", ctx);
  try {
    await next();
  } finally {
    console.log("loadingInterceptor end", ctx);
  }
}

// 函数拦截器类型亦可用 Middleware 来描述
export const dataInterceptor: Middleware = async function (ctx, next) {
  console.log("dataInterceptor start", ctx);
  await next();
  console.log("dataInterceptor end", ctx);
  //// 处于洋葱最外层的拦截器 可通过 return 返回特定数据(不写 return 则会按原数据返回)
  return ctx.res.data;
};
```

当然还可以安装 `@onion-interceptor/pipes` 模块，使用封装的一系列操作管道

[@onion-interceptor/pipes - npm (npmjs.com)](https://www.npmjs.com/package/@onion-interceptor/pipes)

```typescript
import type { Next, Context } from 'onion-interceptor'
import { catchError, finalize} from '@onion-interceptor/pipes'

export async function errorInterceptor(ctx: Context, next: Next) {
  console.log('errorInterceptor start', ctx)
  await next(
    catchError(err => {
      console.log(error)
      return Promise.reject(error)
    }),
    finally(() => console.log('errorInterceptor end', ctx))
  )
}

export async function loadingInterceptor(ctx: Context, next: Next) {
  console.log('loadingInterceptor start', ctx)
  await next(finally(() => console.log('loadingInterceptor end', ctx)))
}
```

### console.log

以下是浏览器控制台输出截图

![console 截图](https://cdn.jsdelivr.net/gh/EricWXY/PictureBed_0@master/202407262129878.png)

从控制台输出可以看出，拦截器按照洋葱模型执行顺序执行，并且每个拦截器都可以修改请求和响应数据。

## 贡献

如果你有任何疑问或建议，欢迎提交 issue 或 PR。

## 许可

本项目使用 MIT 许可证。
