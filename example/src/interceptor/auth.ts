import type { Next } from 'onion-interceptor'
export async function authInterceptor(ctx: any, next: Next) {
  console.log('authInterceptor start', ctx)
  next()
  console.log('authInterceptor end', ctx)
}
