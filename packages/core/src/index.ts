import type {
  Opeartion,
  Middleware,
  Next,
  AxiosInstanceLike,
  Context,
} from "./types";
import { isFunction, isOpeartionKey } from "./utils";
import { OnionInterceptor } from "./OnionInterceptor";

/**
 * 创建 OnionInterceptor实例
 * @param instance 类Axios实例
 * @param useAxios 是否使用的 Axios 实例
 * @example
 * ```typescript
 * import { createInterceptor } from "onion-interceptor";
 * import axios from "axios";
 *
 * const http = axios.create({...})
 * createInterceptor(http).use(...)
 * ```
 */
export function createInterceptor(
  instance?: AxiosInstanceLike,
  useAxios: boolean = true
) {
  return new OnionInterceptor(instance, useAxios);
}

/**
 * 创建 fetch 拦截器
 * @param intercepters 可传入多个拦截器中间件
 * @example
 * ```typescript
 * import { createFetchInterceptor } from "onion-interceptor";
 * import { interceptors } from  'path of interceptors'
 *
 * // 这里 interceptors 是一个中间件数组
 * createFetchInterceptor(...interceptors)
 *
 * // 直接使用 fetch ,(会污染 全局 window.fetch , 复杂项目中 不建议使用)
 *
 * fetch(...)
 * ```
 */
export function createFetchInterceptor(...intercepters: Middleware[]) {
  const interceptor = createInterceptor();

  const { fetch: original } = window;

  window.fetch = async function fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ) {
    const ctx: Context = { input, init };
    return await interceptor.handle(
      ctx,
      async (_ctx: Context, next: Next) =>
        await original
          .call(this, input, init)
          .then((res) => {
            _ctx.res = res;
            return res as Response;
          })
          .catch((err) => Promise.reject(err))
          .finally(() => next())
    );
  };
  if (intercepters.length) interceptor.use(...intercepters);
  return interceptor;
}

/**
 * Generate Operator 函数用于创建一个操作符。
 * @param fn - 要转换成操作符的中间件函数。
 * @returns 转换后的操作符。
 *
 * @example
 * [@onion-interceptor/pipes - npm (npmjs.com)](https://www.npmjs.com/package/@onion-interceptor/pipes) 该库中的 操作符就是基于 operate 封装的。
 * ```typescript
 * // 创建操作符用于一些快捷操作 如 catchError 等
 * const myMiddleware:Middleware = async (ctx, next) => {
 *   // do something
 *   await next();
 *   // do something
 * };
 * const myOperation = operate(myMiddleware);
 *
 * ```
 */
export function operate(fn: Middleware) {
  if (!isFunction(fn)) throw new TypeError("operate must be a function!");
  (fn as Opeartion)[isOpeartionKey] = true;
  return fn as Opeartion;
}

export { OnionInterceptor };

export type { Middleware, Context, Next, Opeartion, AxiosInstanceLike };
