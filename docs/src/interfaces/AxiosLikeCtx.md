[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: AxiosLikeCtx

类 axios 上下文 （ new OnionInterceptor() 时传入类 axios 示例时生效）

## Properties

### args?

> `optional` **args**: `AxiosRequestConfig`\<`any`\>[]

请求参数 调用 request 时候传入的 （只有一个config）

#### 查看源码

[types.ts:126](https://github.com/coverjs/onion-interceptor/blob/d9442ccfd97eaff0832faec07c8e2be488e1ba7c/packages/core/src/types.ts#L126)

***

### cfg?

> `optional` **cfg**: `AxiosRequestConfig`\<`any`\>

默认配置 调用 axios.create 时候传入的配置

#### 查看源码

[types.ts:130](https://github.com/coverjs/onion-interceptor/blob/d9442ccfd97eaff0832faec07c8e2be488e1ba7c/packages/core/src/types.ts#L130)

***

### res?

> `optional` **res**: `AxiosResponse`\<`any`\>

请求响应

#### 查看源码

[types.ts:134](https://github.com/coverjs/onion-interceptor/blob/d9442ccfd97eaff0832faec07c8e2be488e1ba7c/packages/core/src/types.ts#L134)
