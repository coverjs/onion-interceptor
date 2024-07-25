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
