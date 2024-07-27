import type { Next } from 'onion-interceptor'

import { operate } from 'onion-interceptor'

export const catchError = (cb: (err: Error) => void) =>
  operate(async (_, next: Next) => {
    try {
      await next()
    } catch (err) {
      cb(err as Error)
    }
  })
