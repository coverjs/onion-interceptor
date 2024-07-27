import type { Next } from 'onion-interceptor'

import { operate } from 'onion-interceptor'

export const finalize = (cb: Function) =>
  operate(async (_, next: Next) => {
    try {
      await next()
    } finally {
      cb()
    }
  })
