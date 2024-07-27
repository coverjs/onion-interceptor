import { isOpeartionKey } from './constants'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* -----------------------------------------------axios types start------------------------------------------- */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

type Params = Record<string, any>
type IHeaders = Record<string, any>

interface AxiosTransformer {
  (data: unknown, headers: IHeaders): any
}

interface Cancel {
  message?: string
}

interface AxiosBasicCredentials {
  username: string
  password: string
}

interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
  [k: string]: any
}

export interface AxiosRequestConfig<D = any> {
  method?: Method
  url?: string
  data?: D
  params?: Params
  headers?: IHeaders | null | any
  responseType?: XMLHttpRequestResponseType | ResponseType | any
  timeout?: number
  baseURL?: string
  adapter?: 'http' | 'xhr' | 'fetch' | Function | any

  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  cancelToken?: CancelToken | any

  withCredentials?: boolean

  xsrfCookieName?: string
  xsrfHeaderName?: string

  auth?: AxiosBasicCredentials

  validateStatus?: (status: number) => boolean

  paramsSerializer?: (params: Params) => string

  onDownloadProgress?: (e: any) => void
  onUploadProgress?: (e: any) => void

  [k: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: IHeaders
  config: AxiosRequestConfig
  request: XMLHttpRequest
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
/**
 * AxiosInstanceLike 接口定义了一个类似 Axios 实例的结构。
 * 它包含 request 方法以及可选的 HTTP 方法快捷函数。
 */
export interface AxiosInstanceLike<Cfg = any> {
  /**
   * request 方法用于执行 HTTP 请求。
   * @param config - 请求配置。// 这里用 any 是方便 fetch 封装
   * @returns 返回一个 Promise 对象，代表请求的结果。
   */
  request: (config: Cfg) => Promise<any>
  /** defaults 属性存储实例的默认配置。 */
  defaults?: AxiosRequestConfig | any

  // 快捷 HTTP 方法的声明
  get?<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete?<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head?<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options?<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post?<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<T>
  put?<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<T>
  patch?<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<T>

  // 快捷 HTTP 方法的声明，用于表单提交
  postForm?<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<T>
  putForm?<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<T>
  patchForm?<T = any>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<T>
  [key: string]: any
}

/**
 * 类 axios 上下文 （ new OnionInterceptor() 时传入类 axios 示例时生效）
 */
export interface AxiosLikeCtx {
  /**
   * 请求参数 调用 request 时候传入的 （只有一个config）
   */
  args?: AxiosRequestConfig[]
  /**
   * 默认配置 调用 axios.create 时候传入的配置
   */
  cfg?: AxiosRequestConfig
  /**
   * 请求响应
   */
  res?: AxiosResponse
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* -----------------------------------------------axios types end------------------------------------------- */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ----------------------------------------------------------------------------------------------------------

export type CustomCtx = Record<string, any>

/**
 * 上下文类型
 */
export type Context = CustomCtx & AxiosLikeCtx

/**
 * Middleware 类型定义了一个中间件函数的签名。
 * 中间件函数接收一个上下文对象和一个 next 函数，并返回一个 Promise 对象。
 * @template Ctx 上下文对象的类型。
 * @template Res 中间件函数返回类型。
 */
export interface Middleware<Ctx = Context, Res = any> {
  (ctx: Ctx, next: Next): Promise<Res>
}

/**
 * Next 类型定义了 next 函数的签名。
 * next 函数用于调用中间件链的下一个中间件或执行核心逻辑。
 * @returns 返回一个 Promise 对象，代表 next 调用的结果。
 */
export interface Next<Res = any> {
  (...args: Opeartion[]): Promise<void | Res>
}

/**
 * Operation 接口扩展了 Middleware 类型，表示一个操作。
 * 操作对象包含一个特殊的键，用于标识它是一个操作。
 */
export interface Opeartion extends Middleware {
  [isOpeartionKey]: boolean
}

/**
 * MiddlewareKlassConstructor 接口定义了一个中间件类的构造函数。
 * @template T 上下文对象的类型。
 */
export interface MiddlewareKlassConstructor<T> {
  new (): MiddlewareKlass<T>
}

/**
 * MiddlewareKlass 接口定义了一个中间件类的结构。
 * 它包含一个 intercept 方法，该方法符合 Middleware 函数签名。
 * @template T 上下文对象的类型。
 */
export interface MiddlewareKlass<Ctx = Context> {
  intercept: Middleware<Ctx>
}
