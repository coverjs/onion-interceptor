import type { Middleware, Context, Next } from "./types";
import { isFunction, isOperation } from "./is";

const nextPKey = Symbol("nextP");
const handleMap: WeakMap<MiddlewareLinkNode, Middleware> = new WeakMap();

/**
 * MiddlewareLinkNode 类代表中间件链接节点。
 * 此类用于创建洋葱模型的中间件链。
 */
export class MiddlewareLinkNode<Ctx extends Context = Context> {
  private [nextPKey]: MiddlewareLinkNode<Ctx> | null = null;
  constructor(handle?: Middleware) {
    isFunction(handle) && handleMap.set(this, handle);
  }

  getNext() {
    return this[nextPKey];
  }
  setNext(node: MiddlewareLinkNode<Ctx>) {
    this[nextPKey] = node;
  }
  hasNext() {
    return this[nextPKey] != null;
  }

  isNil() {
    return handleMap.get(this) == null;
  }
  isHandleAs(fn: Function) {
    return handleMap.get(this) === fn;
  }
  isOperation() {
    return isOperation(handleMap.get(this));
  }

  bind(ctx: Ctx, next: Next) {
    return !this.isNil()
      ? handleMap.get(this)!.bind(null, ctx, next)
      : () => void 0;
  }
  call(ctx: Ctx, next: Next) {
    if (!this.isNil()) return handleMap.get(this)!.call(null, ctx, next);
  }

  destroy() {
    handleMap.delete(this);
  }
}
