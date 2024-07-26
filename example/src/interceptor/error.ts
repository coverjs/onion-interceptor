import type { Next } from 'onion-interceptor'
export async function errorInterceptor(ctx: any, next: Next) {
  console.log('errorInterceptor start', ctx)
  try {
    await next()
  } catch (error) {
    console.log(error)
    throw Promise.reject(error)
  } finally {
    console.log('errorInterceptor end', ctx)
    // return ctx.res?.data
  }
}
