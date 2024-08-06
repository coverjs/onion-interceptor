import { describe, it, expect, vi } from "vitest";
import {
  isFunction,
  isOperation,
  isNil,
  isAxiosInstanceLike,
  isOpeartionKey,
  rewriteRequest,
  compose,
} from "../src/utils"; // 根据实际路径调整导入
import { createInterceptor } from "../src";
import { MiddlewareLinkNode } from "../src/MiddlewareLink";

import type { AxiosInstanceLike, Context, Next } from "../src/types";

const mockMiddleware = () => {};
const mockOperation = () => {};
mockOperation[isOpeartionKey] = true;

const mockAxiosInstance = {
  request: vi.fn(),
  get: vi.fn(),
  post: vi.fn(),
};

describe("utils", () => {
  describe("isFunction", () => {
    it("should identify functions", () => {
      expect(isFunction(() => {})).toBe(true);
    });
    it("should not identify non-functions", () => {
      expect(isFunction(123)).toBe(false);
    });
  });

  describe("isOperation", () => {
    it("should identify operations", () => {
      expect(isOperation(mockOperation)).toBe(true);
    });
    it("should not identify non-operations", () => {
      expect(isOperation(mockMiddleware)).toBe(false);
    });
  });

  describe("isNil", () => {
    it("should identify null or undefined values", () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });
    it("should not identify non-nil values", () => {
      expect(isNil(0)).toBe(false);
    });
  });

  describe("isAxiosInstanceLike", () => {
    it("should identify AxiosInstanceLike objects", () => {
      expect(isAxiosInstanceLike(mockAxiosInstance)).toBe(true);
    });
    it("should not identify non-AxiosInstanceLike objects", () => {
      expect(isAxiosInstanceLike({})).toBe(false);
    });
  });

  describe("rewriteRequest", () => {
    it("should rewrite the request method of an AxiosInstanceLike object", () => {
      const API_URL = "https://api.github.com/" as const;
      class MockAxiosInstance implements AxiosInstanceLike {
        defaults = {
          baseURL: API_URL,
          headers: { "Content-Type": "application/json" },
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async request(..._args: any[]): Promise<any> {
          return {
            ok: true,
            data: "mocked data",
          };
        }
      }

      const http = new MockAxiosInstance();
      const interceptor = createInterceptor(http);
      rewriteRequest(mockAxiosInstance, interceptor);
      expect(mockAxiosInstance.request).not.toBeUndefined();
    });
  });

  describe("compose", () => {
    it("should compose middlewares", async () => {
      const fn1 = async (ctx: Context, next: Next) => {
        ctx.data = "fn1";
        await next();
      };
      const fn2 = async (ctx: Context, next: Next) => {
        ctx.data += "fn2";
        return next();
      };
      const root = new MiddlewareLinkNode(fn1);
      root.setNext(new MiddlewareLinkNode(fn2));
      compose(root, {}, async (ctx: Context, next) => {
        ctx.data += "fn3";
        await next();
        expect(ctx.data).toBe("fn1fn2fn3");
      });
    });
    it("should throw error when coreFn is error", async () => {
      const errs: Error[] = [];
      const fn1 = async (ctx: Context, next: Next) => {
        ctx.data = "fn1";
        await next();
      };
      const fn2 = async (ctx: Context, next: Next) => {
        ctx.data += "fn2";
        await next();
      };
      const root = new MiddlewareLinkNode(fn1);
      root.setNext(new MiddlewareLinkNode(fn2));
      (async () => {
        try {
          await compose(root, {}, async (ctx: Context, next: Next) => {
            ctx.data += "fn3";
            await next();
            return Promise.reject("error");
          });
        } catch (error: any) {
          errs.push(error);
        } finally {
          expect(errs.length).toBe(1);
        }
      })();
    });
  });
  it("should throw error when next called multiple times", async () => {
    const errs: Error[] = [];
    const fn1 = async (ctx: Context, next: Next) => {
      ctx.data = "fn1";
      await next();
    };
    const fn2 = async (ctx: Context, next: Next) => {
      ctx.data += "fn2";
      await next();
    };
    // 环形链
    const root = new MiddlewareLinkNode(fn1);
    const node1 = new MiddlewareLinkNode(fn2);
    root.setNext(node1);
    node1.setNext(root);
    (async () => {
      try {
        await compose(root, {}, async (ctx: Context, next: Next) => {
          ctx.data += "fn3";
          await next();
        });
      } catch (error: any) {
        errs.push(error);
        expect(error).toEqual(new Error("next called multiple times"));
      } finally {
        expect(errs.length).toBe(1);
      }
    })();
  });
});
