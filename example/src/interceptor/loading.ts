import type { Middleware } from 'onion-interceptor'
import { finalize } from '@onion-interceptor/pipes'

export const loadingInterceptor: Middleware = async function (ctx, next) {
  console.log('loadingInterceptor start', ctx)
  await next(finalize(() => console.log('loadingInterceptor end', ctx)))
}
