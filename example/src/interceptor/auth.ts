import type { Context, Next, MiddlewareKlass, Middleware } from 'onion-interceptor'
export const authInterceptor: Middleware = async function (ctx, next) {
  console.log('authInterceptor start', ctx)
  await next()
  console.log('authInterceptor end', ctx)
}

export class AuthInterceptor implements MiddlewareKlass {
  async intercept(ctx: Context, next: Next) {
    console.log('AuthInterceptor start', ctx)
    await next()
    console.log('AuthInterceptor end', ctx)
  }
}
