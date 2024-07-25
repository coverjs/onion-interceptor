import { OnionInterceptor, type Next } from 'onion-interceptor'

import { interceptors } from '../interceptor'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class Http {
  private instance: AxiosInstance
  private ctx: any
  private interceptor: OnionInterceptor
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 1000 * 10,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.interceptor = new OnionInterceptor()
    interceptors.forEach((item) => this.interceptor.use(item))
  }
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    this.ctx = { config }

    return new Promise<T>((resolve, reject) => {
      this.interceptor.handle(this.ctx, async (_: unknown, next: Function) => {
        await this.instance
          .request(config)
          .then(async (res) => {
            this.ctx.res = res
            console.log(res)
            resolve(res as unknown as Promise<T>)
            next(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  }

  get(config: AxiosRequestConfig): Promise<any> {
    return this.request({ ...config, method: 'get' })
  }
}
