import type { Middleware } from 'onion-interceptor'

export const loadingInterceptor: Middleware = async function (ctx, next) {
  console.log('loadingInterceptor start', ctx)
  try {
    await next()
  } finally {
    console.log('loadingInterceptor end', ctx)
  }
}
