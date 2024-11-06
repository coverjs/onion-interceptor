import type {
  Middleware,
  Context,
  Next,
  Method,
  Opeartion,
  AxiosInstanceLike,
  AxiosRequestConfig,
  AxiosResponse,
} from "./types";
import { MiddlewareLinkNode } from "./MiddlewareLink";
import { OnionInterceptor } from "./OnionInterceptor";

export const isOpeartionKey = Symbol("__is_Opeartion");

/**
 * pipeFromArgs 函数从参数列表中获取操作符管道。
 * @param args - 包含操作符的参数数组。
 * @returns 中间件链接节点。
 */
function pipeFromArgs(args: unknown[]) {
  const head = new MiddlewareLinkNode();
  let tail = head;
  for (const item of args)
    if (isOperation(item)) {
      tail.setNext(new MiddlewareLinkNode(item));
      tail = tail.getNext() as MiddlewareLinkNode;
    }
  return head.getNext();
}

/**
 * Expand Middleware
 * @param root
 * @param context
 * @param core
 */
export function compose(
  root: MiddlewareLinkNode,
  ctx: Context,
  coreFn: Function
) {
  const visitedNodes: Set<MiddlewareLinkNode> = new Set();

  const dispatch = (
    node: MiddlewareLinkNode,
    ...args: Middleware[]
  ): Promise<any> => {
    if (node.isNil()) return Promise.resolve();
    if (visitedNodes.has(node))
      return Promise.reject(new Error("next called multiple times"));
    visitedNodes.add(node);

    const opPipe = pipeFromArgs(args);

    const nextNode: MiddlewareLinkNode =
      node.getNext() ??
      new MiddlewareLinkNode(
        node.isHandleAs(coreFn) ? void 0 : (coreFn as Middleware)
      );
    return Promise.resolve<any>(
      opPipe
        ? compose(opPipe, ctx, node.bind(ctx, dispatch.bind(void 0, nextNode)))
        : node.call(ctx, dispatch.bind(void 0, nextNode))
    ).finally(destroyFreeNode.bind(void 0, node, coreFn));
  };

  return dispatch(root);
}

function destroyFreeNode(node: MiddlewareLinkNode, coreFn: Function) {
  if (node?.isNil() || node?.isHandleAs(coreFn) || node?.isOperation())
    node?.destroy();
}

export function rewriteRequest(
  instance: AxiosInstanceLike,
  interceptor: OnionInterceptor,
  rewriteMethods: boolean = true
) {
  const original = instance.request;
  instance.request = async function request<Data = any, T = any>() {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.prototype.slice.call(arguments) as [AxiosRequestConfig];
    const ctx: Context = { args, cfg: instance.defaults };
    return (await interceptor.handle(
      ctx,
      async (_ctx: Context, next: Next) =>
        await original
          .apply(this, args)
          .then((res) => {
            _ctx.res = res;
            return res as T | PromiseLike<T>;
          })
          .catch((err) => {
            _ctx.res = err?.response ?? err;
            return Promise.reject(err);
          })
          .finally(() => next())
    )) as AxiosResponse<Data> | T;
  };

  if (!rewriteMethods) return;
  rewriteInstanceMethods(instance);
}

function rewriteInstanceMethods(instance: AxiosInstanceLike) {
  (["delete", "get", "head", "options"] as Method[]).forEach((method) => {
    instance[method] = function (url: string, config?: AxiosRequestConfig) {
      return instance.request({ url, method, ...config });
    };
  });
  (["post", "put", "patch"] as Method[]).forEach((method) => {
    instance[method] = function (
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ) {
      return instance.request({ url, data, method, ...config });
    };
    instance[method + "Form"] = function (
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ) {
      return instance.request({
        url,
        data,
        method,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config,
      });
    };
  });
}

export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";

/**
 * Determines whether it is an operator.
 * @param val
 */
export const isOperation = (val: unknown): val is Function & Opeartion =>
  isFunction(val) && (val as Opeartion)[isOpeartionKey] === true;

export const isNil = (val: unknown): val is null | undefined => val == null;

export const isAxiosInstanceLike = (val: unknown): val is AxiosInstanceLike =>
  !isNil((val as AxiosInstanceLike)?.request) &&
  isFunction((val as AxiosInstanceLike)?.request);
