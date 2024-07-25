import { authInterceptor, AuthInterceptor } from './auth'
import { errorInterceptor } from './error'
import { loadingInterceptor } from './loading'

export const interceptors = [AuthInterceptor, authInterceptor, errorInterceptor, loadingInterceptor]
