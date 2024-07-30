import { createInterceptor, type AxiosInstanceLike } from "onion-interceptor";

import { interceptors } from "../interceptor";
import axios from "axios";

const http = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

createInterceptor(http).use(...interceptors);

class FetchRequest implements AxiosInstanceLike<RequestInit, Response> {
  constructor(public defaults: RequestInit & { baseURL: string }) {}

  async request(url: string, config?: RequestInit) {
    config = {
      ...this.defaults,
      ...config,
    }; /// 这里简单处理下，正式使用的时候可以写一个 configMerge 的函数

    return await fetch(this.defaults.baseURL + url, config as RequestInit); // 实际封装时可考虑 baseUrl 的空值处理
  }
}

const fetchReq = new FetchRequest({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
  },
});

createInterceptor(fetchReq, false).use(...interceptors);

export { http, fetchReq };
