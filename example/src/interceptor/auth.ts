import type {  Middleware } from 'onion-interceptor'
export const authInterceptor: Middleware = async function (ctx, next) {
  console.log('authInterceptor start', ctx)
  await next()
  console.log('authInterceptor end', ctx)
}
