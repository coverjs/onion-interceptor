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
 * @example
 * ```typescript
 * import { createInterceptor } from "onion-interceptor";
 * import axios from "axios";
 * 
 * const http = axios.create({...})
 * createInterceptor(http).use(...)
 * ```
 */
export function createInterceptor(instance?: AxiosInstanceLike) {
  return new OnionInterceptor(instance);
}

export { OnionInterceptor, operate };

export type { Middleware, Context, Next, Opeartion };
