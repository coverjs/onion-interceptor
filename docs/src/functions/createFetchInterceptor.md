[**onion-interceptor**](../README.md) • **Docs**

***

# 函数: createFetchInterceptor()

> **createFetchInterceptor**(...`intercepters`): [`OnionInterceptor`](../classes/OnionInterceptor.md)

创建 fetch 拦截器

## 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| ...`intercepters` | [`Middleware`](../interfaces/Middleware.md)\<[`Context`](../interfaces/Context.md), `any`\>[] | 可传入多个拦截器中间件 |

## 返回值类型

[`OnionInterceptor`](../classes/OnionInterceptor.md)

## 示例

```typescript
import { createFetchInterceptor } from "onion-interceptor";
import { interceptors } from  'path of interceptors'

// 这里 interceptors 是一个中间件数组
createFetchInterceptor(...interceptors)

// 直接使用 fetch ,(会污染 全局 window.fetch , 复杂项目中 不建议使用)

fetch(...)
```

## 查看源码

[index.ts:47](https://github.com/coverjs/onion-interceptor/blob/87a6c5cc986300604182f401f081b47e89a260b5/packages/core/src/index.ts#L47)
