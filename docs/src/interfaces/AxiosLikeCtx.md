[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: AxiosLikeCtx

类 axios 上下文 （ new OnionInterceptor() 时传入类 axios 示例时生效）

## Properties

### args?

> `optional` **args**: `AxiosRequestConfig`\<`any`\>[]

请求参数 调用 request 时候传入的 （只有一个config）

#### 查看源码

[types.ts:126](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/types.ts#L126)

***

### cfg?

> `optional` **cfg**: `AxiosRequestConfig`\<`any`\>

默认配置 调用 axios.create 时候传入的配置

#### 查看源码

[types.ts:130](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/types.ts#L130)

***

### res?

> `optional` **res**: `AxiosResponse`\<`any`\>

请求响应

#### 查看源码

[types.ts:134](https://github.com/coverjs/onion-interceptor/blob/d236aa63ca3a9e0fbece66c5ed18f82df60eea1f/packages/core/src/types.ts#L134)
