[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: Context

上下文类型

## Indexable

 \[`key`: `string`\]: `any`

## Properties

### args?

> `optional` **args**: `RequestConfig`[]

请求参数 调用 request 时候传入的 （只有一个config）

#### 查看源码

[types.ts:162](https://github.com/coverjs/onion-interceptor/blob/d48ad023f73534829e47c23c8616819619efd619/packages/core/src/types.ts#L162)

***

### cfg?

> `optional` **cfg**: `RequestConfig`

默认配置 调用 axios.create 时候传入的配置

#### 查看源码

[types.ts:166](https://github.com/coverjs/onion-interceptor/blob/d48ad023f73534829e47c23c8616819619efd619/packages/core/src/types.ts#L166)

***

### res?

> `optional` **res**: `RequestResponse`

请求响应

#### 查看源码

[types.ts:170](https://github.com/coverjs/onion-interceptor/blob/d48ad023f73534829e47c23c8616819619efd619/packages/core/src/types.ts#L170)
