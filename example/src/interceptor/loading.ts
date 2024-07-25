import type { Next } from 'onion-interceptor'

export async function loadingInterceptor(ctx: any, next: Next) {
  console.log('loadingInterceptor start', ctx)
  await next()
  console.log('loadingInterceptor end', ctx)
}
