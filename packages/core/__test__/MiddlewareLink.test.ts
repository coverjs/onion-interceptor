import { describe, it, expect, vi } from "vitest";
import { MiddlewareLinkNode } from "../src/MiddlewareLink"; // 根据实际路径调整导入

import type { Middleware } from "../src/types";

describe("MiddlewareLinkNode", () => {
  it("should create a node with a middleware handle", () => {
    const middleware: Middleware = async (_, next) => {
      await next();
    };
    const node = new MiddlewareLinkNode(middleware);
    expect(node.isNil()).toBeFalsy();
    expect(node.isHandleAs(middleware)).toBeTruthy();
  });

  it("should allow chaining nodes", () => {
    const node1 = new MiddlewareLinkNode();
    const node2 = new MiddlewareLinkNode();
    node1.setNext(node2);
    expect(node1.hasNext()).toBeTruthy();
    expect(node1.getNext()).toBe(node2);
  });

  it("should handle null as next node", () => {
    const node = new MiddlewareLinkNode();
    // node.setNext(null);
    expect(node.hasNext()).toBeFalsy();
  });

  it("should bind and call middleware correctly", async () => {
    const ctx = {};
    const next = vi.fn();
    const middleware: Middleware = async (_ctx, next) => {
      expect(_ctx).toBe(ctx);
      next();
    };
    const node = new MiddlewareLinkNode(middleware);

    const boundMiddleware = node.bind(ctx, next);
    expect(boundMiddleware).toBeInstanceOf(Function);

    await boundMiddleware();
    expect(next).toHaveBeenCalledOnce();
  });

  it("should do nothing if the node has no middleware", async () => {
    const ctx = {};
    const next = vi.fn();
    const node = new MiddlewareLinkNode();

    const boundMiddleware = node.bind(ctx, next);
    expect(boundMiddleware).toBeInstanceOf(Function);

    await boundMiddleware();
    expect(next).not.toHaveBeenCalled();
  });

  it("should destroy the node and remove the middleware handle", () => {
    const middleware: Middleware = async () => {};
    const node = new MiddlewareLinkNode(middleware);
    node.destroy();

    expect(node.isNil()).toBeTruthy();
    expect(node.isHandleAs(middleware)).toBeFalsy();
  });
});
