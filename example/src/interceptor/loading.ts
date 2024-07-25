import type { Next } from 'onion-interceptor'

export async function loadingInterceptor(ctx: any, next: Next) {
  console.log('loadingInterceptor start', ctx)
  try {
    await next()
  } finally {
    console.log('loadingInterceptor end', ctx)
  }
}
