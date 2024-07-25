import { OnionInterceptor } from 'onion-interceptor'

import { interceptors } from '../interceptor'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
// import { resolve } from 'path'

export class Http {
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
    // interceptors.forEach((item) => this.interceptor.use(item))
    this.interceptor.use(...interceptors)
  }
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise<T>((resolve) => {
      this.instance.request<T>(config).then((res) => {
        resolve(res.data)
      })
    })
  }

  get(config: AxiosRequestConfig): Promise<any> {
    return this.request({ ...config, method: 'get' })
  }
}
