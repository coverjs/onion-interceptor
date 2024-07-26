import { isOpeartionKey } from './constants'

/**
 * Middleware 类型定义了一个中间件函数的签名。
 * 中间件函数接收一个上下文对象和一个 next 函数，并返回一个 Promise 对象。
 * @template Ctx 上下文对象的类型。
 */
export type Middleware<Ctx = any, Res = any> = (ctx: Ctx, next: Next) => Promise<void | Res>

/**
 * Next 类型定义了 next 函数的签名。
 * next 函数用于调用中间件链的下一个中间件或执行核心逻辑。
 * @returns 返回一个 Promise 对象，代表 next 调用的结果。
 */
export type Next = (...args: Opeartion[]) => Promise<void>

/**
 * Operation 接口扩展了 Middleware 类型，表示一个操作。
 * 操作对象包含一个特殊的键，用于标识它是一个操作。
 */
export interface Opeartion extends Middleware {
  [isOpeartionKey]: boolean
}

/**
 * MiddlewareKlassConstructor 接口定义了一个中间件类的构造函数。
 * @template T 上下文对象的类型。
 */
export interface MiddlewareKlassConstructor<T> {
  new (): MiddlewareKlass<T>
}

/**
 * MiddlewareKlass 接口定义了一个中间件类的结构。
 * 它包含一个 intercept 方法，该方法符合 Middleware 函数签名。
 * @template T 上下文对象的类型。
 */
export interface MiddlewareKlass<T = any> {
  intercept: Middleware<T>
}

/**
 * AxiosInstanceLike 接口定义了一个类似 Axios 实例的结构。
 * 它包含 request 方法以及可选的 HTTP 方法快捷函数。
 */
export interface AxiosInstanceLike {
  /**
   * request 方法用于执行 HTTP 请求。
   * @param args - 请求参数。
   * @returns 返回一个 Promise 对象，代表请求的结果。
   */
  request: (...args: Array<any>) => Promise<any>
  /** defaults 属性存储实例的默认配置。 */
  defaults?: any

  // 快捷 HTTP 方法的声明
  get?: (...args: Array<any>) => Promise<any>
  delete?: (...args: Array<any>) => Promise<any>
  head?: (...args: Array<any>) => Promise<any>
  options?: (...args: Array<any>) => Promise<any>
  post?: (...args: Array<any>) => Promise<any>
  put?: (...args: Array<any>) => Promise<any>
  patch?: (...args: Array<any>) => Promise<any>
  // 快捷 HTTP 方法的声明，用于表单提交
  postForm?: (...args: Array<any>) => Promise<any>
  putForm?: (...args: Array<any>) => Promise<any>
  patchForm?: (...args: Array<any>) => Promise<any>
}
