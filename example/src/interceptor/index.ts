import { authInterceptor } from './auth'
import { errorInterceptor } from './error'
import { loadingInterceptor } from './loading'

export const interceptors = [authInterceptor, errorInterceptor, loadingInterceptor]