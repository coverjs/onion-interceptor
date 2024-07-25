import type { Next, MiddlewareKlass } from 'onion-interceptor'
export async function authInterceptor(ctx: any, next: Next) {
  console.log('authInterceptor start', ctx)
  await next()
  console.log('authInterceptor end', ctx)
}

export class AuthInterceptor implements MiddlewareKlass {
  async intercept(ctx: any, next: Next) {
    console.log('AuthInterceptor start', ctx)
    await next()
    console.log('AuthInterceptor end', ctx)
  }
}
