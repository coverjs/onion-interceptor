import { OnionInterceptor } from 'onion-interceptor'

const interceptor = new OnionInterceptor()

interceptor.use(async (ctx, next) => {
  console.log('first middleware')
  await next()
  console.log('first middleware end')
})

interceptor.use(async (ctx, next) => {
  console.log('second middleware')
  await next()
  console.log('second middleware end')
})