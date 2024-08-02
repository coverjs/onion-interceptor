import type { AxiosInstanceLike, Middleware, Context } from "./types";

import { MiddlewareLinkNode } from "./MiddlewareLink";
import {
  rewriteRequest,
  compose,
  isFunction,
  isAxiosInstanceLike,
  isNil,
} from "./utils";

const headMap: WeakMap<OnionInterceptor, MiddlewareLinkNode> = new WeakMap();
const tailMap: WeakMap<OnionInterceptor, MiddlewareLinkNode> = new WeakMap();

/**
 * OnionInterceptor 类创建一个洋葱模型拦截器。
 * 拦截器可以用于拦截和修改 HTTP 请求和响应。
 * @param instance - (可选) Axios 实例。
 *
 * @example
 * ```typescript
 * import type { Context, Next } from 'onion-interceptor';
 * import { OnionInterceptor } from 'onion-interceptor';
 * import axios from 'axios';
 *
 * const http = axios.create({
 *   baseURL: 'https://api.github.com/',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   }
 * });
 *
 * // 洋葱拦截器 实例化时可以传入类 Axios 实例 (也就意味着 可以通过 fetch 封装)
 * // 只需要实例上存在 request 方法，和 defaults (默认配置) 属性即可
 * const interceptor = new OnionInterceptor(http);
 *
 * interceptor.use(async(ctx: Context, next: Next) => {
 *   // 在这里可以修改请求配置或执行其他操作
 *   await next();
 * });
 * ```
 */
export class OnionInterceptor {
  /**
   * 构造函数
   * @param instance axios实例(可选)
   * @param useAxios 是否使用的 Axios 实例 - 封装 fetch 时建议传 false (可选)
   */
  constructor(instance?: AxiosInstanceLike, useAxios: boolean = true) {
    headMap.set(
      this,
      new MiddlewareLinkNode(async (ctx, next) => {
        const res = await next();
        return !isNil(res) ? res : ctx?.res ?? ctx;
      })
    ); // The handler function in the first node is used if use() is never used.
    tailMap.set(this, headMap.get(this) as MiddlewareLinkNode);
    if (isAxiosInstanceLike(instance))
      rewriteRequest(instance!, this, useAxios);
  }

  /**
   * use 方法用于添加中间件到拦截器实例。
   * @param middleware - 一个或多个中间件函数或中间件类构造器。
   * @returns 当前拦截器实例。
   *
   * @example
   * ```typescript
   * class AuthMiddleware {
   *   async intercept(ctx: Context, next: Next) {
   *     // 添加认证逻辑
   *     await next();
   *   }
   * }
   *
   * async function loadingMiddleware(ctx: Context, next: Next) {
   *    // loading start
   *    try {
   *      await next();
   *    } finally {
   *      // loading end
   *    }
   * }
   *
   * interceptor.use(loadingMiddlewre, AuthMiddleware);
   * // or interceptor.use(loadingMiddlewre).use(AuthMiddleware);
   * // or interceptor.use(loadingMiddlewre); interceptor.use(AuthMiddleware);
   * ```
   */
  public use(...args: Array<Middleware>) {
    args.forEach((middleware) => {
      const fn = middleware;
      if (!isFunction(fn))
        throw new TypeError("middleware or intercept must be a function!");
      tailMap.get(this)?.setNext(new MiddlewareLinkNode(fn));
      tailMap.set(this, tailMap.get(this)?.getNext() as MiddlewareLinkNode);
    });
    return this;
  }

  /**
   * handle 方法用于使用洋葱拦截器拦截目标函数(是的通用性大幅提高)。
   * @param ctx - 上下文对象。
   * @param coreFn - 核心函数。
   * @returns 一个 Promise，代表拦截处理的结果。
   *
   * @example
   * ```typescript
   * // 当构造函数为传入参数，可以使用 handle 方法进行拦截处理。
   * const ctx = { foo: 'bar' };
   * interceptor.handle(ctx, async(_ctx, next) => {
   *   // 执行核心逻辑
   *   await doSomething();
   *   ctx.someData = 'some data';
   *   next();
   * });
   * ```
   */
  public handle<Res = any>(ctx: Context, coreFn: Function) {
    return compose(
      headMap.get(this) as MiddlewareLinkNode,
      ctx,
      coreFn
    ) as Promise<Res>;
  }
}
