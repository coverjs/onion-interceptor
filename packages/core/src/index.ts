import type {
  Opeartion,
  Middleware,
  Next,
  AxiosInstanceLike,
  Context,
} from "./types";
import { operate } from "./methods";
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
          .finally(() => next())
    );
  };
  if (intercepters.length) interceptor.use(...intercepters);
  return interceptor;
}

export { OnionInterceptor, operate };

export type { Middleware, Context, Next, Opeartion, AxiosInstanceLike };
