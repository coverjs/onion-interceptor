import type {
  Opeartion,
  Middleware,
  Next,
  MiddlewareKlass,
  MiddlewareKlassConstructor,
  AxiosResponse,
  AxiosInstanceLike,
  AxiosLikeCtx,
  Context,
  Method,
  AxiosRequestConfig
} from './types'
import { isOpeartionKey } from './constants'
import { isFunction, isOperation, isNil, isAxiosInstanceLike } from './is'

const nextPKey = Symbol('nextP')
const handleMap: WeakMap<MiddlewareLinkNode, Middleware> = new WeakMap()

/**
 * MiddlewareLinkNode 类代表中间件链接节点。
 * 此类用于创建洋葱模型的中间件链。
 */
class MiddlewareLinkNode<Ctx extends Context = Context> {
  private [nextPKey]: MiddlewareLinkNode<Ctx> | null = null
  constructor(handle?: Middleware) {
    isFunction(handle) && handleMap.set(this, handle)
  }

  getNext() {
    return this[nextPKey]
  }
  setNext(node: MiddlewareLinkNode<Ctx>) {
    this[nextPKey] = node
  }
  hasNext() {
    return this[nextPKey] != null
  }

  isNil() {
    return handleMap.get(this) == null
  }
  isHandleAs(fn: Function) {
    return handleMap.get(this) === fn
  }
  isOperation() {
    return isOperation(handleMap.get(this))
  }

  bind(ctx: Ctx, next: Next) {
    return !this.isNil() ? handleMap.get(this)!.bind(null, ctx, next) : () => void 0
  }
  call(ctx: Ctx, next: Next) {
    if (!this.isNil()) return handleMap.get(this)!.call(null, ctx, next)
  }

  destroy() {
    handleMap.delete(this)
  }
}

/**
 * Generate Operator 函数用于创建一个操作符。
 * @param fn - 要转换成操作符的中间件函数。
 * @returns 转换后的操作符。
 *
 * @example
 * ```typescript
 * // 创建操作符用于 一些快捷操作 如 catchError 等
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
  if (!isFunction(fn)) throw new TypeError('operate must be a function!')
  ;(fn as Opeartion)[isOpeartionKey] = true
  return fn as Opeartion
}

/**
 * pipeFromArgs 函数从参数列表中获取操作符管道。
 * @param args - 包含操作符的参数数组。
 * @returns 中间件链接节点。
 *
 * @example
 * ```typescript
 * const middlewareA:Middleware = async (ctx, next) => {
 *   // do something
 *   await next();
 *   // do something
 * };
 * const middlewareB = operate(async (ctx: Context, next: Next) => {
 *   // do something
 *   await next();
 *   // do something
 * });
 * const pipe = pipeFromArgs([middlewareA, middlewareB]);
 * ```
 */
function pipeFromArgs(args: unknown[]) {
  const head = new MiddlewareLinkNode()
  let tail = head
  for (let item of args)
    if (isOperation(item)) {
      tail.setNext(new MiddlewareLinkNode(item))
      tail = tail.getNext() as MiddlewareLinkNode
    }
  return head.getNext()
}

/**
 * Expand Middleware
 * @param root
 * @param context
 * @param core
 */
function compose(root: MiddlewareLinkNode, ctx: Context, coreFn: Function) {
  const visitedNodes: Set<MiddlewareLinkNode> = new Set()

  const dispatch = (node: MiddlewareLinkNode, ...args: Middleware[]): Promise<void> => {
    if (node.isNil()) return Promise.resolve()
    if (visitedNodes.has(node)) return Promise.reject(new Error('next called multiple times'))
    visitedNodes.add(node)

    const opPipe = pipeFromArgs(args)

    try {
      const nextNode: MiddlewareLinkNode =
        node.getNext() ??
        new MiddlewareLinkNode(node.isHandleAs(coreFn) ? void 0 : (coreFn as Middleware))
      return Promise.resolve<void>(
        opPipe
          ? compose(opPipe, ctx, node.bind(ctx, dispatch.bind(void 0, nextNode)))
          : node.call(ctx, dispatch.bind(void 0, nextNode))
      ).finally(destroyFreeNode.bind(void 0, node, coreFn))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return dispatch(root)
}

function destroyFreeNode(node: MiddlewareLinkNode, coreFn: Function) {
  if (node?.isNil() || node?.isHandleAs(coreFn) || node?.isOperation()) node?.destroy()
}

function tryInstantiationMiddleware<T>(middleware: Middleware<T> | MiddlewareKlassConstructor<T>) {
  let result = middleware
  try {
    const klassMiddlewareIns = new (middleware as MiddlewareKlassConstructor<T>)()
    if (isFunction(klassMiddlewareIns.intercept))
      return (ctx: T, next: Next) => klassMiddlewareIns.intercept(ctx, next)
  } catch (_) {
    /* do nothing */
  }
  return result as Middleware<T>
}

function rewriteRequest(instance: AxiosInstanceLike, interceptor: OnionInterceptor) {
  const original = instance.request
  instance.request = async function request<Data = any, T = any>() {
    const args = Array.prototype.slice.call(arguments) as [AxiosRequestConfig]
    const ctx: Context = { args, cfg: instance.defaults } as Context
    return (await interceptor.handle(
      ctx,
      async (_ctx, next: Next) =>
        await original
          .apply(this, args)
          .then((res) => {
            _ctx.res = res
            return res as T | PromiseLike<T>
          })
          .finally(() => next())
    )) as AxiosResponse<Data> | T
  }
  ;(['delete', 'get', 'head', 'options'] as Method[]).forEach((method) => {
    instance[method] = function (url: string, config?: AxiosRequestConfig) {
      return instance.request({ url, method, ...config })
    }
  })
  ;(['post', 'put', 'patch'] as Method[]).forEach((method) => {
    instance[method] = function (url: string, data?: unknown, config?: AxiosRequestConfig) {
      return instance.request({ url, data, method, ...config })
    }
    instance[method + 'Form'] = function (
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ) {
      return instance.request({
        url,
        data,
        method,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        ...config
      })
    }
  })
}

const headMap: WeakMap<OnionInterceptor, MiddlewareLinkNode> = new WeakMap()
const tailMap: WeakMap<OnionInterceptor, MiddlewareLinkNode> = new WeakMap()

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
   */
  constructor(instance?: AxiosInstanceLike) {
    headMap.set(
      this,
      new MiddlewareLinkNode(async (ctx, next) => {
        const res = await next()
        return !isNil(res) ? res : (ctx?.res ?? ctx)
      })
    ) // The handler function in the first node is used if use() is never used.
    tailMap.set(this, headMap.get(this) as MiddlewareLinkNode)
    if (isAxiosInstanceLike(instance)) rewriteRequest(instance!, this)
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
   * async funciont loadingMiddleware(ctx: Context, next: Next) {
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
  public use(...args: Array<Middleware | MiddlewareKlassConstructor<Context>>) {
    args.forEach((middleware) => {
      const fn = tryInstantiationMiddleware(middleware)
      if (!isFunction(fn)) throw new TypeError('middleware or intercept must be a function!')
      tailMap.get(this)?.setNext(new MiddlewareLinkNode(fn))
      tailMap.set(this, tailMap.get(this)?.getNext() as MiddlewareLinkNode)
    })
    return this
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
  public handle(ctx: Context, coreFn: Function) {
    return compose(headMap.get(this) as MiddlewareLinkNode, ctx, coreFn)
  }
}

export { Middleware, MiddlewareKlass, Context, AxiosLikeCtx, Next, Opeartion }
