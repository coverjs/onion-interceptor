import type { Context, Next } from 'onion-interceptor'

import { operate } from 'onion-interceptor'

type Cb = (ctx: Context) => void
type Throw = (err: unknown) => void

export const tap = function (cb: Cb, throwE?: Throw, finalize?: () => void) {
  return operate(async (ctx: Context, next: Next) => {
    try {
      await next()
      cb(ctx)
    } catch (error) {
      throwE?.(error)
    } finally {
      finalize?.()
    }
  })
}
