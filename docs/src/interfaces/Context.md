[**onion-interceptor**](../README.md) • **Docs**

***

# 接口: Context

上下文类型

## 继承

- `AxiosLikeCtx`

## Indexable

 \[`key`: `string`\]: `any`

## Properties

### args?

> `optional` **args**: `AxiosRequestConfig`\<`any`\>[]

请求参数 调用 request 时候传入的 （只有一个config）

#### Inherited from

`AxiosLikeCtx.args`

#### 查看源码

[types.ts:150](https://github.com/coverjs/onion-interceptor/blob/39df853848f88c9b20849334a641a1e2329fe982/packages/core/src/types.ts#L150)

***

### cfg?

> `optional` **cfg**: `AxiosRequestConfig`\<`any`\>

默认配置 调用 axios.create 时候传入的配置

#### Inherited from

`AxiosLikeCtx.cfg`

#### 查看源码

[types.ts:154](https://github.com/coverjs/onion-interceptor/blob/39df853848f88c9b20849334a641a1e2329fe982/packages/core/src/types.ts#L154)

***

### res?

> `optional` **res**: `AxiosResponse`\<`any`\>

请求响应

#### Inherited from

`AxiosLikeCtx.res`

#### 查看源码

[types.ts:158](https://github.com/coverjs/onion-interceptor/blob/39df853848f88c9b20849334a641a1e2329fe982/packages/core/src/types.ts#L158)
