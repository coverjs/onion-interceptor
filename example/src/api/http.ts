import { OnionInterceptor } from 'onion-interceptor'

import { interceptors } from '../interceptor'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class XAxios {
  private instance: AxiosInstance
  private interceptor: OnionInterceptor
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 1000 * 10,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.interceptor = new OnionInterceptor(this.instance)
    this.interceptor.use(...interceptors)
  }

  // 简单示例
  get(config: AxiosRequestConfig): Promise<unknown> {
    return this.instance.request({ ...config, method: 'get' })
  }
  // .... 其他方法 的封装
}

const http = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json'
  }
})

const interceptor = new OnionInterceptor(http)
interceptor.use(...interceptors)

export { http }
