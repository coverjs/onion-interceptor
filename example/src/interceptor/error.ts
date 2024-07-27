import type { Next, Context } from 'onion-interceptor'
export async function errorInterceptor(ctx: Context, next: Next) {
  console.log('errorInterceptor start', ctx)
  try {
    await next()
  } catch (error) {
    console.log(error)
    throw Promise.reject(error)
  } finally {
    console.log('errorInterceptor end', ctx)
  }
}
