import { isOpeartionKey } from './constants'

export type Middleware<Ctx = any> = (ctx: Ctx, next: Next) => Promise<void>
export type Next = (...args: Opeartion[]) => Promise<void>

export interface Opeartion extends Middleware {
  [isOpeartionKey]: boolean
}

export interface MiddlewareKlassConstructor<T> {
  new (): MiddlewareKlass<T>
}

export interface MiddlewareKlass<T = any> {
  intercept: Middleware<T>
}

export interface AxiosInstanceLike {
  request: (...args: Array<any>) => Promise<any>
  defaults?: any
  get?: (...args: Array<any>) => Promise<any>
  delete?: (...args: Array<any>) => Promise<any>
  head?: (...args: Array<any>) => Promise<any>
  options?: (...args: Array<any>) => Promise<any>
  post?: (...args: Array<any>) => Promise<any>
  put?: (...args: Array<any>) => Promise<any>
  patch?: (...args: Array<any>) => Promise<any>
  postForm?: (...args: Array<any>) => Promise<any>
  putForm?: (...args: Array<any>) => Promise<any>
  patchForm?: (...args: Array<any>) => Promise<any>
}
