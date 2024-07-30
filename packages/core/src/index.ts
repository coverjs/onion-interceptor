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
 * @param rewriteMethods 是否重写 GET、POST等请求方法 - 封装 fetch 时建议传 false
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
  rewriteMethods: boolean = true
) {
  return new OnionInterceptor(instance, rewriteMethods);
}

export { OnionInterceptor, operate };

export type { Middleware, Context, Next, Opeartion, AxiosInstanceLike };
