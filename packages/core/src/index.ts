import type {
  Opeartion,
  Middleware,
  Next,
  MiddlewareKlassConstructor,
  AxiosInstanceLike
} from './types'
import { isOpeartionKey } from './constants'
import { isFunction, isOperation, isNil, isAxiosInstanceLike } from './is'

const nextPKey = Symbol('nextP')
const handleMap: WeakMap<MiddlewareLinkNode, Middleware> = new WeakMap()
class MiddlewareLinkNode<Ctx = any> {
  private [nextPKey]: MiddlewareLinkNode<Ctx> | null = null
  constructor(handle?: Middleware<Ctx>) {
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
 * Generate Operator
 * @param fn
 */
export function operate(fn: Middleware) {
  if (!isFunction(fn)) throw new TypeError('operate must be a function!')
  ;(fn as Opeartion)[isOpeartionKey] = true
  return fn as Opeartion
}

/**
 * Get operator pipe from argument list
 * @param args
 */
function pipeFromArgs<T>(args: unknown[]) {
  const head = new MiddlewareLinkNode<T>()
  let tail = head
  for (let item of args)
    if (isOperation(item)) {
      tail.setNext(new MiddlewareLinkNode<T>(item))
      tail = tail.getNext() as MiddlewareLinkNode<T>
    }
  return head.getNext()
}

/**
 * Expand Middleware
 * @param root
 * @param context
 * @param core
 */
function compose<Ctx>(root: MiddlewareLinkNode<Ctx>, ctx: Ctx, coreFn: Function) {
  const visitedNodes: Set<MiddlewareLinkNode<Ctx>> = new Set()

  const dispatch = (node: MiddlewareLinkNode<Ctx>, ...args: Middleware<Ctx>[]): Promise<void> => {
    if (node.isNil()) return Promise.resolve()
    if (visitedNodes.has(node)) return Promise.reject(new Error('next called multiple times'))
    visitedNodes.add(node)

    const opPipe = pipeFromArgs(args)

    try {
      const nextNode: MiddlewareLinkNode<Ctx> =
        node.getNext() ??
        new MiddlewareLinkNode<Ctx>(node.isHandleAs(coreFn) ? void 0 : (coreFn as Middleware<Ctx>))
      return Promise.resolve<void>(
        opPipe
          ? compose<Ctx>(opPipe, ctx, node.bind(ctx, dispatch.bind(void 0, nextNode)))
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
  interface Ctx<T> {
    cfg: any
    args: Array<any>
    res?: T | Promise<T>
  }
  const original = instance.request
  instance.request = async function request<T = any>() {
    const args = Array.prototype.slice.call(arguments)
    const ctx: Ctx<T> = { args, cfg: instance.defaults }
    return await interceptor.handle(
      ctx,
      async (_ctx: Ctx<T>, next: Next) =>
        await original
          .apply(this, args)
          .then((res) => {
            _ctx.res = res
            return res as T | PromiseLike<T>
          })
          .finally(() => next())
    )
  }
  ;['delete', 'get', 'head', 'options'].forEach((method) => {
    instance[method] = function (url, config) {
      return instance.request({ url, method, ...config })
    }
  })
  ;['post', 'put', 'patch'].forEach((method) => {
    instance[method] = function (url, data, config) {
      return instance.request({ url, data, method, ...config })
    }
  })
  ;['postForm', 'putForm', 'patchForm'].forEach((method) => {
    instance[method] = function (url, data, config) {
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
 *  创建一个洋葱模型拦截器
 *  ,泛型 Ctx 上下文类型
 */
export class OnionInterceptor<Ctx = any> {
  /**
   * 构造函数
   * @param instance axios实例(可选)
   */
  constructor(instance?: AxiosInstanceLike) {
    headMap.set(
      this,
      new MiddlewareLinkNode<Ctx>(async (ctx: Ctx, next) => {
        const res = await next()
        return !isNil(res) ? res : ((ctx as any)?.res ?? ctx)
      })
    ) // The handler function in the first node is used if use() is never used.
    tailMap.set(this, headMap.get(this) as MiddlewareLinkNode<Ctx>)
    if (isAxiosInstanceLike(instance)) rewriteRequest(instance!, this)
  }

  /**
   * Adding Middleware to the Interceptor Instance
   * @param middleware
   */
  public use(...args: Array<Middleware<Ctx> | MiddlewareKlassConstructor<Ctx>>) {
    args.forEach((middleware) => {
      const fn = tryInstantiationMiddleware<Ctx>(middleware)
      if (!isFunction(fn)) throw new TypeError('middleware or intercept must be a function!')
      tailMap.get(this)?.setNext(new MiddlewareLinkNode<Ctx>(fn))
      tailMap.set(this, tailMap.get(this)?.getNext() as MiddlewareLinkNode<Ctx>)
    })
    return this
  }

  /**
   * Use the onion interceptor to intercept the target function.
   * @param ctx
   * @param coreFn
   */
  public handle(ctx: Ctx, coreFn: Function) {
    return compose<Ctx>(headMap.get(this) as MiddlewareLinkNode<Ctx>, ctx, coreFn)
  }
}

export * from './types'
