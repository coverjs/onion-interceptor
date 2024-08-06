import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import {
  createInterceptor,
  createFetchInterceptor,
  operate,
  OnionInterceptor,
} from "../src";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import axios from "axios";

import type { Middleware, AxiosInstanceLike } from "../src";

const server = setupServer();

const API_URL = "https://api.test.com/" as const;

// 模拟 Axios 实例
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

describe("index.ts", () => {
  // 在所有测试之前启动服务器
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

  // 所有测试后关闭服务器
  afterAll(() => server.close());

  // 每次测试后重置处理程序 `对测试隔离很重要`
  afterEach(() => server.resetHandlers());

  // createInterceptor 应该创建一个 OnionInterceptor 实例
  it("should create an interceptor", () => {
    const http = new MockAxiosInstance();
    const interceptor = createInterceptor(http);

    expect(interceptor).toBeTruthy();
  });

  // 拦截器应该能拦截请求和响应
  it("should intercept requests and responses", async () => {
    const http = new MockAxiosInstance();
    createInterceptor(http, false).use(async (ctx, next) => {
      expect(ctx.cfg?.baseURL).toBe(API_URL);
      expect(ctx.args).toEqual(["/users"]);
      expect(ctx.res).toBeFalsy();
      await next();
      expect(ctx.res).toBeTruthy();
      expect(ctx.res!.ok).toBe(true);
      return ctx.res!.data;
    });

    // 模拟请求
    const response = await http.request("/users");
    expect(response).toBe("mocked data");
  });

  it("should create an interceptor when argument is axios instance", async () => {
    const base = "http://create.an.com/" as const;
    server.use(
      http.all(base + "users", () => HttpResponse.json({ data: "mocked data" }))
    );

    const instance = axios.create({
      baseURL: base,
      headers: {
        "Content-Type": "application/json",
      },
    });
    createInterceptor(instance).use(async (ctx, next) => {
      expect(ctx.cfg!.headers?.["Content-Type"]).toBe("application/json");
      expect(ctx.args?.[0].url).toBe("/users");
      await next();
      expect(ctx.res).toBeTruthy();
    });

    try {
      await instance.get("/users");
      await instance.post("/users", { data: "test" });
      await instance.postForm("/users", { data: "test" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // noop
    }
  });

  it("should execute interceptors in the correct order", async () => {
    const order: string[] = [];
    const mockAuthInterceptor: Middleware = async (_, next) => {
      order.push("auth start");
      await next();
      order.push("auth end");
    };
    const mockLoadingInterceptor: Middleware = async (_, next) => {
      order.push("loading start");
      await next();
      order.push("loading end");
    };

    const mockErrorInterceptor: Middleware = async (_, next) => {
      order.push("error start");
      await next();
      order.push("error end");
    };

    const http = new MockAxiosInstance();
    createInterceptor(http).use(
      mockErrorInterceptor,
      mockLoadingInterceptor,
      mockAuthInterceptor
    );

    await http.request("/test");

    expect(order).toEqual([
      "error start",
      "loading start",
      "auth start",
      "auth end",
      "loading end",
      "error end",
    ]);
  });

  it("createFetchInterceptor should add interceptor to fetch", async () => {
    const base = "http://createFetchInterceptor.com/" as const;
    server.use(http.get(base, () => HttpResponse.json({ data: "mock data" })));
    const order: string[] = [];
    createFetchInterceptor(async (_, next) => {
      order.push("interceptor start");
      await next();
      order.push("interceptor end");
    });

    await fetch(base);
    expect(!!order.length).toEqual(true);
  });

  it("should create a pipe with operate", async () => {
    const base = "http://operate.com/" as const;
    server.use(http.get(base, () => HttpResponse.json({ data: "mock data" })));
    const order: string[] = [];
    const finalize = (cb: Function) =>
      operate(async (_, next) => {
        try {
          await next();
          // eslint-disable-next-line no-useless-catch
        } catch (e) {
          throw e;
        } finally {
          cb();
        }
      });

    const mockLoaidngInterceptor: Middleware = async (_, next) => {
      order.push("interceptor start");
      await next(finalize(() => order.push("interceptor end")));
    };
    const instance = axios.create({
      baseURL: base,
    });
    createInterceptor(instance).use(mockLoaidngInterceptor);
    await instance.get("");
    expect(order).toEqual(["interceptor start", "interceptor end"]);
  });

  it("should throw error when operate argument is not a function", () => {
    expect(() => operate("test" as any)).toThrowError(
      "operate must be a function"
    );
  });

  it("should throw error when middleware is not a function", async () => {
    expect(() => {
      // eslint-disable-next-line no-useless-catch
      try {
        createFetchInterceptor("test" as any);
      } catch (error) {
        throw error;
      }
    }).toThrowError("middleware or intercept must be a function!");
  });

  it("should work when interceptors is empty", async () => {
    const base = "http://interceptors.empty.com/" as const;
    server.use(http.get(base, () => HttpResponse.json({ data: "mock data" })));
    const instance = axios.create({ baseURL: base });
    createInterceptor(instance);
    instance.get("").then((res) => {
      expect(res.data).toBeTruthy();
    });
  });
});

describe("OnionInterceptor", () => {
  it("should handle result in link head", async () => {
    const mockAuthInterceptor: Middleware = async (_, next) => {
      await next();
    };
    const mockLoadingInterceptor: Middleware = async (_, next) => {
      await next();
    };

    const mockErrorInterceptor: Middleware = async (ctx, next) => {
      await next();
      return ctx.res?.data;
    };

    const mockErrorInterceptor2: Middleware = async (_, next) => {
      await next();
    };
    const mockErrorInterceptor3: Middleware = async (ctx, next) => {
      await next();
      ctx.res = void 0;
    };

    const instance = new MockAxiosInstance();
    const interceptor = new OnionInterceptor(instance, false);

    interceptor.use(
      mockErrorInterceptor,
      mockAuthInterceptor,
      mockLoadingInterceptor
    );

    // 外层返回处理后的数据
    instance.request({ url: "/users", method: "get" }).then((res) => {
      expect(res).toBe("mocked data");
    });

    const instance2 = new MockAxiosInstance();
    const interceptor2 = new OnionInterceptor(instance2, false);
    interceptor2.use(
      mockErrorInterceptor2,
      mockAuthInterceptor,
      mockLoadingInterceptor
    );

    // 外层不做任何处理 且 ctx.res 存在
    instance2.request({ url: "/users", method: "get" }).then((res) => {
      expect(res).toEqual({ data: "mocked data", ok: true });
    });

    const instance3 = new MockAxiosInstance();
    const interceptor3 = new OnionInterceptor(instance3);
    interceptor3.use(
      mockErrorInterceptor3,
      mockAuthInterceptor,
      mockLoadingInterceptor
    );

    const arg = { url: "/users", method: "get" };
    // 外层返回 nil ctx.res 不存在
    (instance3 as any).get("/users").then((res) => {
      expect(res).toEqual({
        args: [arg],
        cfg: instance3.defaults,
      });
    });
  });
});
