import type { Next } from 'onion-interceptor'

import { operate } from 'onion-interceptor'

export const delay = (ms: number) =>
  operate(async (_, next: Next) => {
    await new Promise((resolve) => setTimeout(resolve, ms))
    await next()
  })
